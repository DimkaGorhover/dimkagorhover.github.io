# Awesome Projects Page — Spec

## Goal

Move the starred-projects catalog from a single generated `README.md` in
`my-awesome-list` into typed YAML data files in this Hugo site (same pattern as
`data/cv.yaml`), and render it as a `/projects/` page with an in-page search
filter. This implements "Phase 1: establish the source of truth" from
`my-awesome-list/.handoff/project-storage-recommendations.md`, with the site
repo as the owner of the data.

## Source of truth

- Input (one-time migration): `/Users/dhorkhover/dev/personal/my-awesome-list/README.md`
  — 1,480 unique repos, 1,740 category placements across 31 sections, entries
  formatted as `- [owner/name](url) — description `Lang · ⭐ 12.3k`. Variants that the parser must handle: missing language (` `⭐ 92k` \`\`),
  plain star counts (`⭐ 24`), `k`-suffixed counts with and without decimals,
  and an ` _(archived)_` marker before the metadata block (78 occurrences).
- After migration, `data/projects.yaml` + `data/categories.yaml` in this repo
  are authoritative. The README becomes a downstream artifact (out of scope
  here).

## Data model

`data/projects.yaml` — each repo stored exactly once; categories are a list on
the record (the README's duplicate entries collapse into multi-category
records):

```yaml
collected_at: '2026-08-15'
projects:
  - id: ClickHouse/ClickHouse
    url: https://github.com/ClickHouse/ClickHouse
    description: Fast open-source OLAP database management system.
    stars: 42100
    topics: [olap, sql, analytics]
    categories: [ClickHouse, OLAP, SQL]
    language: C++          # omitted when GitHub reports none
    archived: true          # omitted when false
```

Rules:

- `id` is `owner/name`; `url` is the canonical dedup key during migration.
- `topics` is required on every record (may be empty only if GitHub has none).
  Topics come from the GitHub GraphQL API (`repositoryTopics`, first 10) —
  the README does not contain them, so migration includes an API enrichment
  pass that also replaces the README's rounded star counts with exact ones
  and refreshes `description`, `language`, `archived`.
- The projects list is stored pre-sorted by stars descending, then `id`
  (case-insensitive) — templates never sort.
- No derived display strings (e.g. `` `Go · ⭐ 3.1k` ``) in the data.
- Repos the API no longer finds (renamed/deleted) keep their README data;
  the enrichment script reports them instead of erasing them.

`data/categories.yaml` — display order (README section order: alphabetical
with `Other Stars` last):

```yaml
categories:
  - AI & LLMs
  - Ansible
  # …
  - Other Stars
```

## Page

- `content/projects.md` + `layouts/shortcodes/projects.html`, mirroring the
  CV page (`content/cv.md` + `layouts/shortcodes/cv.html`); "Projects" added
  to the main menu at weight 30.
- One `<h2>` section per category in `categories.yaml` order; a project
  renders in every category it belongs to (matches the README's
  cross-listing). Blowfish's TOC sidebar navigates the sections.
- Entry line: linked `id` — description, `(archived)` marker, then small
  metadata: language, formatted stars (`12.3k` / `1.1m`), topics as `#tag`
  chips.
- Header states both totals explicitly ("1,480 unique projects · 1,740
  category placements") plus `collected_at`, so the numbers can't be
  misread — a handoff requirement.
- Known trade-off: one page of ~1,740 entries is roughly 1–1.5 MB of HTML.
  Acceptable for GitHub Pages; upgrade path is per-category pages if it ever
  feels slow.

## Search — research findings

Four options were evaluated:

1. **Blowfish built-in search** (`enableSearch = true`, already on): Fuse.js
   over a site-wide `index.json`, one entry per *page*. It will surface the
   projects page for matching queries but cannot filter individual projects.
   Keep as-is; not sufficient alone.
1. **In-page vanilla JS filter** — chosen. Each `<li>` carries a lowercase
   `data-search` attribute (`id description topics language categories`); an
   `<input type="search">` AND-matches whitespace-split terms as substrings,
   hides non-matching entries and empty sections, and shows a live match
   count. ~30 lines, zero dependencies, instant on 1,740 DOM nodes.
1. **In-page Fuse.js** — Blowfish already vendors Fuse, so fuzzy matching and
   ranking are available without a new dependency. Upgrade path if substring
   matching proves too strict; not needed initially.
1. **External search (Pagefind, Algolia)** — overkill for one page on a
   static personal site. Rejected.

## Out of scope (later phases)

- Regenerating `my-awesome-list/README.md` from this YAML.
- Scheduled refresh workflow (GitHub Action); `scripts/refresh_projects.py`
  is written to be rerunnable so the Action only has to call it.
- Taxonomy cleanup: splitting `Other Stars` (519 entries), category
  descriptions, controlled tags.

## Acceptance criteria

- Every repository exists exactly once in `data/projects.yaml`; migration
  reports 1,480 unique projects and 1,740 placements, matching the README.
- Every record has `topics` populated from the GitHub API (or explicitly
  empty, with API misses listed by the script).
- `hugo --gc --minify --printPathWarnings` exits 0; `/projects/` renders all
  categories with counts consistent with the data.
- Typing into the filter narrows entries across all sections and updates the
  match count; clearing it restores the full list.
- Migration and refresh are rerunnable via documented `uv run` commands with
  deterministic output ordering.
