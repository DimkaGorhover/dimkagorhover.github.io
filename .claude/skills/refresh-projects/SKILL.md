---
name: refresh-projects
description: Use when asked to refresh, update or re-fetch the starred projects data (stars, topics, descriptions, archived and stale flags) in data/projects.yaml for the /awesome page.
---

# Refresh projects stars

`scripts/refresh_projects.py` pulls live GitHub metadata (stars, topics,
description, language, archived, stale) into `data/projects.yaml`. Curated
`categories` are never touched. It takes the YAML path as `$1`, so the work
shards across agents by file.

Two health flags, both written as `true` or omitted, both rendered as markers
on `/awesome`:

- `archived: true` — GitHub reports `isArchived`.
- `stale: true` — no default-branch commit and no release in the last 365
  days (`STALE_AFTER` in the script). Recomputed every run, so a revived repo
  loses the flag.

Preflight: `gh auth status` must exit 0 (each subagent inherits the same `gh`
credentials).

## 1. Shard

~1500 projects, 50 repos per GraphQL call. Split into as many shards as your
harness will run concurrently (8–10 is the practical cap). Shards live in a
fixed temp dir so every step and subagent resolves the same path — pass
`"${TMPDIR:-/tmp}/projects-shards"` verbatim, it is not a placeholder.

```bash
uv run scripts/shard_projects.py "${TMPDIR:-/tmp}/projects-shards" 8
```

## 2. Fan out — one subagent per shard, all dispatched in ONE message

Spawn as many subagents as there are shards, in a single message so they run
concurrently. Use the cheapest fast model available: `haiku` on Claude Code,
`luna` on Codex, the equivalent small model elsewhere. This is mechanical work
— never spend a large model on it.

Each subagent gets exactly one instruction:

> Run `uv run scripts/refresh_projects.py "${TMPDIR:-/tmp}/projects-shards/<k>.yaml"`
> from the repo root. Report its stdout and exit code verbatim. Edit no file
> yourself — that command rewrites your assigned shard and nothing else.

Shards are disjoint files, so there is no write contention. Every shard must
report success before merging; re-dispatch any that failed — the others are
already written and are not re-fetched.

## 3. Merge

Pass the same shard count as step 1 — the merge refuses to write unless every
shard is present and was refreshed today, so a missing or failed shard can't
silently publish stale or fewer projects.

```bash
uv run scripts/merge_projects.py "${TMPDIR:-/tmp}/projects-shards" data/projects.yaml 8
```

## 4. Verify

- `git diff --stat data/projects.yaml` — expect one changed file, star counts
  and `collected_at` moved, plus `archived`/`stale` lines appearing and
  disappearing.
- `grep -c '^  stale: true' data/projects.yaml` — sanity-check the count; a
  jump to nearly every project means the query broke, not the ecosystem.
- Report any `not found on GitHub` ids the subagents printed; they keep their
  old data and may need removing from the catalog.
- Run the `test-site` skill (the `/awesome` page renders from this data).

## Fallback

No subagents available, or fewer than ~200 projects? Skip the sharding
entirely and run `mise run refresh-projects` (~30 sequential GraphQL calls).
