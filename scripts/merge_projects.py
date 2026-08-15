#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = ["pyyaml"]
# ///
"""Merge refreshed shards back into data/projects.yaml.

Usage: uv run scripts/merge_projects.py <shard-dir> <dst-yaml> <n>

Refuses to write unless all N shards are present, were refreshed today, and
together hold exactly as many projects as the destination — a missing or
failed shard must not silently publish stale or fewer projects. Sort key and
serialization match refresh_projects.py, so a merged run is byte-comparable
with a single sequential one (star counts aside, shards fetch at different
times).
"""

import sys
from datetime import date
from pathlib import Path

import yaml


def main() -> None:
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    src, dst, n = Path(sys.argv[1]), Path(sys.argv[2]), int(sys.argv[3])

    today = date.today().isoformat()
    paths = sorted(src.glob("*.yaml"))
    shards = [yaml.safe_load(p.read_text()) for p in paths]
    stale = [p.name for p, s in zip(paths, shards) if str(s["collected_at"]) != today]
    if len(paths) != n or stale:
        sys.exit(
            f"refusing to merge: {len(paths)}/{n} shards present, not refreshed today: {stale}"
        )
    projects = [p for s in shards for p in s["projects"]]
    before = len(yaml.safe_load(dst.read_text())["projects"])
    if len(projects) != before:
        sys.exit(
            f"refusing to merge: {len(projects)} projects in shards vs {before} in {dst}"
        )
    projects.sort(key=lambda p: (-p["stars"], p["id"].lower()))
    doc = {"collected_at": today, "projects": projects}
    dst.write_text(yaml.safe_dump(doc, allow_unicode=True, sort_keys=False, width=10_000))
    print(f"merged {len(projects)} projects from {len(shards)} shards")


if __name__ == "__main__":
    main()
