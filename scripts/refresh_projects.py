#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = ["pyyaml"]
# ///
"""Refresh data/projects.yaml with live GitHub metadata via `gh api graphql`.

Updates topics, stars, description, language, archived. Never touches
categories (curated) — records the API can't resolve keep their old data.
"""

import json
import subprocess
import sys
from datetime import date
from pathlib import Path

import yaml

BATCH = 50


def build_query(batch: list[dict]) -> str:
    parts = []
    for i, project in enumerate(batch):
        owner, name = project["id"].split("/", 1)
        parts.append(
            f"r{i}: repository(owner: {json.dumps(owner)}, name: {json.dumps(name)}) {{"
            " description stargazerCount isArchived"
            " primaryLanguage { name }"
            " repositoryTopics(first: 10) { nodes { topic { name } } } }"
        )
    return "query { " + " ".join(parts) + " }"


def merge(record: dict, node: dict | None) -> bool:
    """Apply one GraphQL node onto a record. When the repo resolves, API values
    win: null description/language clears the field (spec: omitted when GitHub
    reports none). Only an unresolved repo (node is None) keeps old data."""
    if node is None:
        return False
    for field, value in (
        ("description", node.get("description")),
        ("language", (node.get("primaryLanguage") or {}).get("name")),
    ):
        if value:
            record[field] = value
        else:
            record.pop(field, None)
    record["stars"] = node["stargazerCount"]
    record["topics"] = [t["topic"]["name"] for t in node["repositoryTopics"]["nodes"]]
    if node["isArchived"]:
        record["archived"] = True
    else:
        record.pop("archived", None)
    return True


def fatal_errors(payload: dict) -> list[dict]:
    """GraphQL errors other than per-alias NOT_FOUND (deleted repos) are fatal:
    auth, rate-limit, or transport problems must abort before anything is written."""
    return [e for e in (payload.get("errors") or []) if e.get("type") != "NOT_FOUND"]


def fetch(batch: list[dict]) -> dict:
    # gh exits non-zero when any alias 404s, but still returns partial data,
    # so the exit code alone can't distinguish "deleted repo" from "API down" —
    # classify via the errors array instead.
    proc = subprocess.run(
        ["gh", "api", "graphql", "-f", f"query={build_query(batch)}"],
        capture_output=True,
        text=True,
        timeout=60,
    )
    try:
        payload = json.loads(proc.stdout)
    except json.JSONDecodeError:
        sys.exit(
            f"gh api graphql produced no JSON (exit {proc.returncode}): {proc.stderr[:500]}"
        )
    if fatal := fatal_errors(payload):
        sys.exit(f"aborting, GraphQL errors: {fatal[:3]}")
    data = payload.get("data")
    if data is None:
        sys.exit(f"no data in response (exit {proc.returncode}): {proc.stderr[:500]}")
    return data


def main() -> None:
    path = Path(sys.argv[1] if len(sys.argv) > 1 else "data/projects.yaml")
    doc = yaml.safe_load(path.read_text())
    projects = doc["projects"]
    missing: list[str] = []
    for start in range(0, len(projects), BATCH):
        batch = projects[start : start + BATCH]
        data = fetch(batch)
        for i, record in enumerate(batch):
            if not merge(record, data.get(f"r{i}")):
                missing.append(record["id"])
        print(f"{min(start + BATCH, len(projects))}/{len(projects)}", file=sys.stderr)
    projects.sort(key=lambda p: (-p["stars"], p["id"].lower()))
    doc["collected_at"] = date.today().isoformat()
    path.write_text(
        yaml.safe_dump(doc, allow_unicode=True, sort_keys=False, width=10_000)
    )
    print(f"updated {len(projects) - len(missing)}/{len(projects)} projects")
    if missing:
        print(f"not found on GitHub ({len(missing)}): {', '.join(missing)}")


if __name__ == "__main__":
    main()
