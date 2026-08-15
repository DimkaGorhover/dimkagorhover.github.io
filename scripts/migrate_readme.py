#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = ["pyyaml"]
# ///
"""One-shot migration: parse my-awesome-list README.md into data/*.yaml."""

import re
import sys
from pathlib import Path

import yaml

SKIP_SECTIONS = {"Contents", "License"}
ENTRY = re.compile(
    r"^- \[(?P<id>[^\]]+)\]\((?P<url>https://github\.com/[^)\s]+)\)"
    r" — (?P<desc>.*?)"
    r"(?P<archived> _\(archived\)_)?"
    r" `(?:(?P<lang>[^·`]+) · )?⭐ (?P<stars>[\d.]+[km]?)`$"
)


def parse_stars(text: str) -> int:
    for suffix, mult in (("m", 1_000_000), ("k", 1_000)):
        if text.endswith(suffix):
            return round(float(text[: -len(suffix)]) * mult)
    return int(text)


def parse_readme(text: str) -> tuple[list[str], list[dict], list[str]]:
    categories: list[str] = []
    projects: dict[str, dict] = {}  # keyed by canonical URL
    errors: list[str] = []
    category = None
    for lineno, line in enumerate(text.splitlines(), 1):
        if line.startswith("## "):
            name = line[3:].strip()
            category = None if name in SKIP_SECTIONS else name
            if category:
                categories.append(category)
            continue
        if category is None or not line.startswith("- ["):
            continue
        m = ENTRY.match(line)
        if not m:
            errors.append(f"line {lineno}: unparsed entry: {line[:100]}")
            continue
        record = projects.setdefault(
            m["url"],
            {
                "id": m["id"],
                "url": m["url"],
                "description": m["desc"].strip(),
                "stars": parse_stars(m["stars"]),
                "topics": [],
                "categories": [],
            },
        )
        record["categories"].append(category)
        if m["lang"]:
            record["language"] = m["lang"].strip()
        if m["archived"]:
            record["archived"] = True
    return categories, list(projects.values()), errors


def main() -> None:
    readme = Path(sys.argv[1])
    out_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("data")
    categories, projects, errors = parse_readme(readme.read_text())
    if errors:
        print("\n".join(errors), file=sys.stderr)
        sys.exit(f"{len(errors)} unparsed entries — fix the parser, not the README")
    projects.sort(key=lambda p: (-p["stars"], p["id"].lower()))
    placements = sum(len(p["categories"]) for p in projects)
    (out_dir / "projects.yaml").write_text(
        yaml.safe_dump(
            {"collected_at": "2026-08-14", "projects": projects},
            allow_unicode=True,
            sort_keys=False,
            width=10_000,
        )
    )
    (out_dir / "categories.yaml").write_text(
        yaml.safe_dump({"categories": categories}, allow_unicode=True, sort_keys=False)
    )
    print(
        f"{len(projects)} unique projects, {placements} category placements, "
        f"{len(categories)} categories"
    )


if __name__ == "__main__":
    main()
