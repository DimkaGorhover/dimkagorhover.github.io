#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = ["pyyaml"]
# ///
"""Add one repo to data/projects.yaml with live GitHub metadata.

Usage: uv run scripts/add_project.py owner/repo "Category" ["Category"...]

Categories must already exist in data/categories.yaml — the /awesome
shortcode iterates that list, so an unknown category renders nowhere.
"""

import sys
from pathlib import Path

import yaml

from refresh_projects import fetch, merge

# key order of the existing records, kept so diffs stay readable
ORDER = ["id", "url", "description", "stars", "topics", "categories", "language", "archived", "stale"]


def main() -> None:
    if len(sys.argv) < 3 or "/" not in sys.argv[1]:
        sys.exit(__doc__)
    repo_id, categories = sys.argv[1], sys.argv[2:]

    cats_path = Path("data/categories.yaml")
    known = yaml.safe_load(cats_path.read_text())["categories"]
    if unknown := [c for c in categories if c not in known]:
        sys.exit(f"unknown categories {unknown}; pick from {cats_path} or add them there first")

    # ponytail: unlocked read-append-write — concurrent runs silently drop a
    # record. Run one at a time; add flock if this ever needs to be parallel.
    path = Path("data/projects.yaml")
    doc = yaml.safe_load(path.read_text())
    if existing := next((p for p in doc["projects"] if p["id"].lower() == repo_id.lower()), None):
        sys.exit(f"{existing['id']} is already listed under {existing['categories']}")

    record = {
        "id": repo_id,
        "url": f"https://github.com/{repo_id}",
        "categories": categories,
    }
    if not merge(record, fetch([record]).get("r0")):
        sys.exit(f"{repo_id} not found on GitHub")

    doc["projects"].append({k: record[k] for k in ORDER if k in record})
    doc["projects"].sort(key=lambda p: (-p["stars"], p["id"].lower()))
    path.write_text(yaml.safe_dump(doc, allow_unicode=True, sort_keys=False, width=10_000))
    print(f"added {record['id']} ({record['stars']} stars) to {categories}")


if __name__ == "__main__":
    main()
