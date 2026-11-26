---
title: "Semantic search for Backstage TechDocs with Ollama and pgvector"
date: 2026-11-26
draft: false
description: >-
  Backstage's Postgres search engine only finds documents that contain every
  word of the query, so plain questions return nothing. A small search module
  embeds TechDocs, ADRs and announcements with a CPU-only Ollama into
  pgvector, gives AI agents a semantic MCP tool, and fuses the same vectors
  into the search page with reciprocal rank fusion.
tags: ["backstage", "pgvector", "ollama", "search", "mcp", "roadie"]
---

**TL;DR:** Backstage keyword search returned nothing for questions, only for
the exact words the docs use. I added a search module that embeds the docs
with a self-hosted Ollama into pgvector, first as a tool for AI agents and
then fused into the normal search page, with keyword search kept as the
floor.

## Background

I build and run a company's Backstage developer portal: the software
catalog, TechDocs, architecture decision records (ADRs) and announcements,
about 1,600 documents or 10,000 chunks once split for embedding. It also
runs a read-only MCP server, so AI coding assistants can search the portal.
Everything runs on on-prem Kubernetes with Argo CD, on CPU-only nodes.

## Issue

Search runs on the official Postgres engine,
`@backstage/plugin-search-backend-module-pg`. It turns the query into a
`tsquery` that ANDs every word, so it is good at names, IDs and error
strings and **bad at questions**. _"how do I give an AI agent access to the
MCP server token"_ returned 0 hits; `MCP token` returned 3.

Most questions came from AI agents, and agents ask in sentences. Questions
also came in a second language with a non-Latin script, while the docs are
in English, so those never matched by keyword.

First I told agents, in the MCP server instructions, to pass 2 to 4 keywords
instead of the question. That helped, but the agent still had to guess the
docs' words: "credentials" finds nothing when the page says "token".

The constraints:

- **Documents must not leave the cluster**, so no hosted embedding API.
- No GPU: the nodes have 16 CPUs and 16 GiB each.
- Keyword search must not change or slow down, and Backstage must start
  normally if anything new is missing.

I built this as an experiment, and started it before I looked closely at
Roadie's
[RAG AI plugin](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/backend/rag-ai-backend).
It also stores embeddings in pgvector, and its OpenAI embeddings module
accepts a custom OpenAI-compatible endpoint, so it could have used the same
in-cluster Ollama. More on that in [In hindsight](#in-hindsight).

## The design

The existing collators already produce every TechDocs page, ADR and
announcement for the keyword index on a schedule. A module hooks into that
stream, chunks the text, embeds only changed chunks, and stores the vectors
in the same Postgres. The diagram shows indexing on the left and the two
query paths on the right.

{{< mermaid >}}
graph LR
    C[Collators: TechDocs, ADR, announcements] --> D[Pass-through decorator]
    D --> K[(Keyword index)]
    D -. snapshot, background .-> S[Chunk + hash]
    S -->|changed chunks only| O[Ollama bge-m3]
    O --> V[(pgvector: semantic_chunks)]
    A[MCP agent] -->|search.semantic-query| V
    U[Search page] --> H[Hybrid engine]
    H --> K
    H --> V
{{< /mermaid >}}

It shipped in two steps: first an MCP tool for agents only, then, a few days
later, a hybrid engine for the search page. Both live in one internal
backend module for the `search` plugin. The snippets below leave out config
parsing, a query cache and tests. It runs on Backstage 1.56, PostgreSQL 18
with pgvector 0.8.6, and Ollama with `bge-m3`.

## Indexing: a decorator that changes nothing

A module can add a _decorator_, a Node `Transform`, to the indexing stream
of a document type. Mine passes every document through unchanged and keeps
a copy:

```ts
export class SemanticDecoratorFactory implements DocumentDecoratorFactory {
  readonly types: string[];

  constructor(private readonly type: string, private readonly onSnapshot: OnSnapshot) {
    this.types = [type];
  }

  async getDecorator(): Promise<Transform> {
    const { type, onSnapshot } = this;
    const docs: IndexableDocument[] = [];
    return new Transform({
      objectMode: true,
      transform(doc, _enc, done) {
        docs.push(doc);
        done(null, doc);
      },
      flush(done) {
        onSnapshot(type, docs); // starts the sync, never awaited
        done();
      },
    });
  }
}
```

`flush` runs only when the stream ends cleanly, so **a failed collator run
never deletes vectors**. Sync errors are logged, never thrown: with Ollama
stopped, the log shows `Collating documents ... succeeded` next to
`Semantic sync ... failed`. `getDecorator()` is not told its type, hence one
factory per type.

The sync strips HTML, splits each document into 200-word windows with a
40-word overlap, and hashes each chunk with the model name. Only new or
edited chunks go to Ollama, 16 per committed batch; chunks of deleted pages
are removed. The first full index took **3 to 5 hours on 2 CPUs**; after
that a sync embeds a handful of chunks, and a restart resumes where it
stopped. An empty snapshot is ignored, so a collator that runs before the
catalog is ready cannot wipe a type.

## The model: bge-m3 on two CPUs

I started with `nomic-embed-text` (768 dimensions, English only). It matched
2 of 4 cross-language test questions. `bge-m3` (1024 dimensions,
multilingual) matched **4 of 4**, so I switched before the first rollout.
It needs about 3 GiB of memory and a 3 GiB model volume.

Ollama runs as one pod with a 2-CPU limit, and `num_thread` mattered most:

```ts
await fetch(`${baseUrl}/api/embed`, {
  method: 'POST',
  body: JSON.stringify({
    model: 'bge-m3',
    input: inputs,
    keep_alive: -1, // keep the model loaded
    options: { num_thread: 2 }, // must equal the pod's CPU limit
  }),
});
```

Without it, Ollama starts one thread per node core, not per pod CPU. The CFS
quota throttled 16 threads on 2 CPUs, and **a query took 9.7 s instead of
19 ms** (measured with `nomic-embed-text`; `bge-m3` takes about 40 ms).

## Storage and the agent tool

Vectors go into one table in the search plugin's database, with an HNSW
index for cosine distance:

```sql
CREATE TABLE IF NOT EXISTS semantic_chunks (
  type text, location text, chunk_index integer,
  title text, text text, hash text,
  embedding vector(1024) NOT NULL,
  PRIMARY KEY (type, location, chunk_index)
);
CREATE INDEX IF NOT EXISTS semantic_chunks_embedding_idx
  ON semantic_chunks USING hnsw (embedding vector_cosine_ops);
```

`vector` is not a trusted extension, so I enable it once on the database
host and the module never runs `CREATE EXTENSION`. If it is missing, the
module logs a warning and turns itself off, and Backstage starts with
keyword search only.

The agent tool, `search.semantic-query`, embeds the question and asks
Postgres for the nearest chunks, optionally of some types:

```ts
await db.transaction(async trx => {
  await trx.raw('SET LOCAL hnsw.iterative_scan = strict_order');
  return trx('semantic_chunks')
    .select('type', 'title', 'location', 'text',
      trx.raw('1 - (embedding <=> ?::vector) AS score', [v]))
    .whereIn('type', types)
    .orderByRaw('embedding <=> ?::vector', [v])
    .limit(limit);
});
```

An HNSW scan returns only `hnsw.ef_search` candidates (40 by default), and
the `type` filter runs after that. ADRs are a small share of the chunks, so
an ADR query could get 40 TechDocs candidates and come back almost empty.
**Iterative scan keeps scanning until enough rows pass the filter**, and
`strict_order` keeps exact distance order. It needs pgvector 0.8+; older
versions silently ignore it.

Each result is a passage with its `url` and score. The agent writes the
answer and cites the links. The MCP server instructions send questions to
`search.semantic-query` and exact names and IDs to `search.query`.

## Hybrid search for people

Next, I wanted the search page to use the same vectors, with keyword
results as the floor.

The Backstage search plugin accepts **exactly one search engine**; a second
`setSearchEngine` fails startup with `Multiple Search engines is not
supported`. So the semantic module builds `PgSearchEngine` itself, wraps
it, and registers the result in a `finally`, so every early return of the
semantic setup still leaves keyword search in place. The Pg module is no
longer added to the backend.

The hybrid engine decides per query:

```ts
const words = query.term.trim().split(/\s+/).filter(Boolean).length;
if (types.length === 0 || words < 3 || Date.now() < this.semanticPausedUntil) {
  return keyword.query(query);
}
const [keywordHits, semanticHits] = await Promise.all([
  keyword.query({ ...query, pageCursor: undefined, pageLimit: 100 }),
  this.semantic(query, types), // 25 nearest documents, score >= 0.5, 1 s timeout
]);
const fused = fuse(keywordHits.results, semanticHits);
```

Queries under 3 words stay keyword-only, which keeps names and IDs exact and
spares Ollama most keystrokes of the search bar. If the semantic half fails
or times out, the user gets keyword results and the semantic half pauses
for 30 s.

`ts_rank_cd` and cosine similarity are on different scales, but ranks are
comparable, so the lists are merged by reciprocal rank fusion:

```ts
const K = 60;
for (const list of [keyword, semantic]) {
  list.forEach((result, index) => {
    const key = JSON.stringify([result.type, result.document.location]);
    const entry = merged.get(key);
    const score = 1 / (K + index + 1);
    if (entry) entry.score += score;
    else merged.set(key, { result, score });
  });
}
```

A document in both lists sums both scores and keeps the keyword hit with
its highlight. `K = 60` is the constant from the RRF paper.

The `0.5` floor came from data: on a copy of the production vectors,
nonsense queries scored at most 0.43 and relevant pages 0.55 to 0.72.

So that semantic hits render, filter and pass permission checks like keyword
hits, the table got a `document jsonb` column with the collator fields, plus
a `meta_hash`. A metadata-only change updates that column without calling
Ollama, and adding it to the existing table re-embedded nothing
(`embedded 0, refreshed 108` for ADRs).

On the production copy, the MCP-token question went **from 2 to 16 hits**,
and a second-language question about deploy freezes went from 0 to 17, with
the right ADR first. One- and two-word queries return byte-identical
results. Hybrid search is switched by a Helm value (`SEMANTIC_SEARCH_HYBRID`)
and is on in production.

One bug showed up only live. After an Ollama restart, loading the model
takes about 1.35 s, over the 1 s budget, and the aborted request cancels the
load, so hybrid search never recovered. Now a semantic failure triggers one
background warm-up through the indexing client (120 s timeout), and the
first query after the cooldown is fast.

## Checking it works

The backend log shows whether the module is on and what each sync did:

```bash
kubectl -n my-namespace logs deploy/backstage | grep -i semantic
```

```text
Semantic search enabled for techdocs, adr, announcements using bge-m3
Hybrid UI search enabled: queries of 3+ words fuse semantic hits (timeout 1000 ms, min score 0.5)
Semantic sync techdocs: embedded 12, refreshed 0, deleted 3
```

For quality, a fixed set of 32 real questions, each with the page that
answers it, scores the live tool by hit@3, hit@5 and MRR before and after
any change to chunking, ranking or the model. Never quote an eval question
in the docs: the page that quotes it outranks the page that answers it.

## What it does not do

- **Ollama is on the interactive path.** One worker answers about 30 new
  questions a second; above that, queries time out to keyword results.
- **Indexing and queries share one worker**, so during the first index
  agent queries can take seconds.
- **The agent tool has no per-document permission filter.** That is fine
  only while every MCP token can read all of search. Hybrid UI results do
  pass Backstage's permission check.
- **Paging stops at the fused window** of 100 keyword and 25 semantic hits,
  and the reported total can exceed what paging reaches.
- **A new model means a full re-index** and a new `0.5` calibration.
- TechDocs from the local builder are indexed only after someone opens the
  site once.

## In hindsight

Roadie's `@roadiehq/rag-ai-backend-embeddings-openai` reads
`ai.embeddings.openai.openAiBaseUrl` and passes it to LangChain's
`OpenAIEmbeddings` as `baseURL`. Ollama serves an OpenAI-compatible API under
`/v1`, so this should work against the same pod. I have not tested it:

```yaml
ai:
  embeddings:
    openai:
      openAiBaseUrl: http://ollama:11434/v1
      openAiApiKey: unused # Ollama ignores it, the client requires one
      modelName: bge-m3
```

Today I would start there and move to a custom module only when I hit its
limits. For this portal, they are:

- **It indexes the catalog and TechDocs only.** ADRs are covered only if they
  are published inside a TechDocs site; ADRs from the ADR plugin and
  announcements need your own indexer.
- **It answers in an LLM chat modal.** It does not change the search page
  and has no MCP tool, and on CPU-only nodes a chat model costs far more
  than an embedding model.
- **The OpenAI-compatible endpoint takes no Ollama options**, so
  `num_thread` and `keep_alive` move into a Modelfile or the
  `OLLAMA_KEEP_ALIVE` variable.

## Conclusion

- Backstage's Postgres search ANDs every word, so questions need a semantic
  path; keyword search stays the right tool for names and IDs.
- A pass-through decorator on the existing collators feeds the embeddings
  without a second crawler and cannot break keyword indexing.
- A multilingual `bge-m3` on 2 CPUs is enough for about 1,600 documents, if
  Ollama's `num_thread` equals the CPU limit.
- On pgvector 0.8+, `hnsw.iterative_scan` keeps filtered queries from
  coming back empty.
- Reciprocal rank fusion merges keyword and vector hits without comparing
  scores: a question went **from 2 to 16 hits** with short queries
  unchanged.
- Check Roadie's RAG AI plugin first: it can use an in-cluster Ollama
  through `openAiBaseUrl`. Go custom for other document types, the search
  page or an MCP tool.

## Links

- [Backstage: search concepts and engines](https://backstage.io/docs/features/search/concepts)
- [Backstage: Postgres search engine](https://backstage.io/docs/features/search/search-engines#postgres)
- [pgvector: iterative index scans](https://github.com/pgvector/pgvector#iterative-index-scans)
- [Ollama: embed API](https://docs.ollama.com/api/embed)
- [BGE-M3 model card](https://huggingface.co/BAAI/bge-m3)
- [Reciprocal Rank Fusion (Cormack, Clarke and Büttcher, SIGIR 2009)](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf)
- [Roadie RAG AI plugin](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/backend/rag-ai-backend)
- [Roadie RAG AI OpenAI embeddings module](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/backend/rag-ai-backend-embeddings-openai)
- [Ollama: OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility)
