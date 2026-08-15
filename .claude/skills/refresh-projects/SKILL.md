---
name: refresh-projects
description: Use when asked to refresh, update or re-fetch the starred projects data (stars, topics, descriptions, archived flags) in data/projects.yaml for the /projects page.
---

# Refresh projects stars

`scripts/refresh_projects.py` pulls live GitHub metadata (stars, topics,
description, language, archived) into `data/projects.yaml`. Curated
`categories` are never touched. It takes the YAML path as `$1`, so the work
shards across agents by file.

Preflight: `gh auth status` must exit 0 (each subagent inherits the same `gh`
credentials).

## 1. Shard

~1500 projects, 50 repos per GraphQL call. Split into as many shards as your
harness will run concurrently (8–10 is the practical cap). Shards live in a
fixed temp dir so every step and subagent resolves the same path — copy the
`SHARD_DIR=` line verbatim, it is not a placeholder.

```bash
SHARD_DIR="${TMPDIR:-/tmp}/projects-shards" && rm -rf "$SHARD_DIR" && uv run --with pyyaml python - "$SHARD_DIR" 8 <<'PY'
import pathlib, sys, yaml
out, n = pathlib.Path(sys.argv[1]), int(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
doc = yaml.safe_load(pathlib.Path("data/projects.yaml").read_text())
for k in range(n):
    shard = dict(doc, projects=doc["projects"][k::n])
    (out / f"{k}.yaml").write_text(yaml.safe_dump(shard, allow_unicode=True, sort_keys=False, width=10_000))
    print(f"{out}/{k}.yaml: {len(shard['projects'])}")
PY
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
SHARD_DIR="${TMPDIR:-/tmp}/projects-shards" && uv run --with pyyaml python - "$SHARD_DIR" data/projects.yaml 8 <<'PY'
import pathlib, sys, yaml
from datetime import date
src, dst, n = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]), int(sys.argv[3])
today = date.today().isoformat()
paths = sorted(src.glob("*.yaml"))
shards = [yaml.safe_load(p.read_text()) for p in paths]
stale = [p.name for p, s in zip(paths, shards) if str(s["collected_at"]) != today]
if len(paths) != n or stale:
    sys.exit(f"refusing to merge: {len(paths)}/{n} shards present, not refreshed today: {stale}")
projects = [p for s in shards for p in s["projects"]]
before = len(yaml.safe_load(dst.read_text())["projects"])
if len(projects) != before:
    sys.exit(f"refusing to merge: {len(projects)} projects in shards vs {before} in {dst}")
projects.sort(key=lambda p: (-p["stars"], p["id"].lower()))
doc = {"collected_at": today, "projects": projects}
dst.write_text(yaml.safe_dump(doc, allow_unicode=True, sort_keys=False, width=10_000))
print(f"merged {len(projects)} projects from {len(shards)} shards")
PY
```

Sort key and YAML serialization match the script's own, so the merged file has
the same ordering and formatting as a single sequential run (star counts can
differ, shards are fetched at slightly different times).

## 4. Verify

- `git diff --stat data/projects.yaml` — expect one changed file, star counts
  and `collected_at` moved.
- Report any `not found on GitHub` ids the subagents printed; they keep their
  stale data and may need removing from the catalog.
- Run the `test-site` skill (the `/projects` page renders from this data).

## Fallback

No subagents available, or fewer than ~200 projects? Skip the sharding
entirely and run `mise run refresh-projects` (~30 sequential GraphQL calls).
