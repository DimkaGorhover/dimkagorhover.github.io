#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = ["pyyaml"]
# ///
"""Split data/projects.yaml into N shards so refresh_projects.py can run in parallel.

Usage: uv run scripts/shard_projects.py <shard-dir> <n> [path-to-projects.yaml]

Round-robin split, so every shard holds a mix of popular and long-tail repos
and the GraphQL batches take about the same time. Wipes <shard-dir> first.
"""

import shutil
import sys
from pathlib import Path

import yaml


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    out, n = Path(sys.argv[1]), int(sys.argv[2])
    src = Path(sys.argv[3] if len(sys.argv) > 3 else "data/projects.yaml")

    shutil.rmtree(out, ignore_errors=True)
    out.mkdir(parents=True)
    doc = yaml.safe_load(src.read_text())
    for k in range(n):
        shard = dict(doc, projects=doc["projects"][k::n])
        (out / f"{k}.yaml").write_text(
            yaml.safe_dump(shard, allow_unicode=True, sort_keys=False, width=10_000)
        )
        print(f"{out}/{k}.yaml: {len(shard['projects'])}")


if __name__ == "__main__":
    main()
