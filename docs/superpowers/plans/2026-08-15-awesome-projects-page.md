# Awesome Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the starred-projects catalog from `my-awesome-list/README.md` into `data/projects.yaml` + `data/categories.yaml` in this Hugo site and render it as a filterable `/projects/` page.

**Architecture:** A one-shot parser script converts the README into deduplicated YAML records (categories as a list per record); an enrichment script fills `topics` and exact metadata from the GitHub GraphQL API; a Hugo shortcode renders the data as category sections (same pattern as the CV page); ~30 lines of vanilla JS provide in-page filtering.

**Tech Stack:** Hugo 0.164.0 (Blowfish theme), Python 3.12 single-file uv scripts (PEP 723, pyyaml), pytest, `gh` CLI (GraphQL), vanilla JS.

**Spec:** `docs/superpowers/specs/2026-08-15-awesome-projects.md`

## Global Constraints

- Working dir is the site repo: `/Users/dhorkhover/dev/oss/github.com/DimkaGorhover/dimkagorhover.github.io`.
- Migration input README (read-only): `/Users/dhorkhover/dev/personal/my-awesome-list/README.md`.
- Scripts are single-file uv scripts with PEP 723 headers; run via `uv run`, test via `uv run --with pytest --with pyyaml pytest scripts/ -v`.
- Build/verify command: `hugo --gc --minify --printPathWarnings` must exit 0 with no ERROR lines; final browser verification follows `.claude/skills/test-site/SKILL.md`.
- `git push` is blocked for Claude in this repo — commit locally, the user pushes.
- Commit messages use conventional commits (`feat:`, `data:`, `docs:`, `test:` as fitting).
- Expected migration totals (must match): 1,480 unique projects, 1,740 category placements, 31 categories.
- `data/projects.yaml` stores projects pre-sorted by stars descending then `id` case-insensitive; templates never sort.

______________________________________________________________________

### Task 1: README parser script

**Files:**

- Create: `scripts/migrate_readme.py`
- Test: `scripts/test_migrate_readme.py`

**Interfaces:**

- Produces: `parse_readme(text: str) -> tuple[list[str], list[dict], list[str]]` (categories in README order, project records, unparsed-line errors) and `parse_stars(text: str) -> int`. CLI: `uv run scripts/migrate_readme.py <readme-path> [out-dir]` writes `projects.yaml` + `categories.yaml` into out-dir (default `data/`). Record keys: `id`, `url`, `description`, `stars`, `topics` (always `[]` here), `categories`, optional `language`, optional `archived: true`.

- [ ] **Step 1: Write the failing tests**

```python
# scripts/test_migrate_readme.py
from migrate_readme import parse_readme, parse_stars

FIXTURE = """\
# Awesome List

## Contents

- [Go](#go) (2)

## Go

- [ollama/ollama](https://github.com/ollama/ollama) — Get up and running with models `Go · ⭐ 178.5k`
- [old/tool](https://github.com/old/tool) — Dead project _(archived)_ `Dockerfile · ⭐ 15`

## Tools

- [ollama/ollama](https://github.com/ollama/ollama) — Get up and running with models `Go · ⭐ 178.5k`
- [no/lang](https://github.com/no/lang) — Plain docs `⭐ 92k`
- [tiny/repo](https://github.com/tiny/repo) — Small `Jupyter Notebook · ⭐ 24`

## License

[CC0](https://creativecommons.org/publicdomain/zero/1.0/)
"""


def test_categories_skip_contents_and_license():
    cats, _, errors = parse_readme(FIXTURE)
    assert cats == ["Go", "Tools"]
    assert errors == []


def test_duplicate_repo_merges_categories():
    _, projects, _ = parse_readme(FIXTURE)
    assert len(projects) == 4
    ollama = next(p for p in projects if p["id"] == "ollama/ollama")
    assert ollama["categories"] == ["Go", "Tools"]
    assert ollama["url"] == "https://github.com/ollama/ollama"
    assert ollama["stars"] == 178500
    assert ollama["language"] == "Go"
    assert ollama["topics"] == []
    assert "archived" not in ollama


def test_entry_variants():
    _, projects, _ = parse_readme(FIXTURE)
    by_id = {p["id"]: p for p in projects}
    assert by_id["old/tool"]["archived"] is True
    assert by_id["old/tool"]["description"] == "Dead project"
    assert "language" not in by_id["no/lang"]
    assert by_id["no/lang"]["stars"] == 92000
    assert by_id["tiny/repo"]["stars"] == 24
    assert by_id["tiny/repo"]["language"] == "Jupyter Notebook"


def test_parse_stars():
    assert parse_stars("178.5k") == 178500
    assert parse_stars("92k") == 92000
    assert parse_stars("1.1m") == 1100000
    assert parse_stars("24") == 24


def test_unparsed_line_reported():
    _, _, errors = parse_readme(
        "## Go\n\n- [bad entry](https://github.com/a/b) no dash\n"
    )
    assert len(errors) == 1
    assert "line 3" in errors[0]
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `uv run --with pytest --with pyyaml pytest scripts/ -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'migrate_readme'`

- [ ] **Step 3: Write the implementation**

```python
# scripts/migrate_readme.py
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
            return int(float(text[: -len(suffix)]) * mult)
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
```

Note: `collected_at: "2026-08-14"` is the README's generation date; Task 3 overwrites it with the enrichment run date.

- [ ] **Step 4: Run tests to verify they pass**

Run: `uv run --with pytest --with pyyaml pytest scripts/ -v`
Expected: 5 passed

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate_readme.py scripts/test_migrate_readme.py
git commit -m "feat: add README-to-YAML migration parser for starred projects"
```

______________________________________________________________________

### Task 2: Generate the real data files

**Files:**

- Create: `data/projects.yaml` (generated)
- Create: `data/categories.yaml` (generated)

**Interfaces:**

- Consumes: `scripts/migrate_readme.py` CLI from Task 1.

- Produces: `data/projects.yaml` with top-level keys `collected_at` (string) and `projects` (list of records as defined in Task 1), and `data/categories.yaml` with top-level key `categories` (list of 31 strings ending in `Other Stars`). Hugo reads them as `hugo.Data.projects` / `hugo.Data.categories`.

- [ ] **Step 1: Run the migration**

Run: `uv run scripts/migrate_readme.py /Users/dhorkhover/dev/personal/my-awesome-list/README.md`
Expected: `1480 unique projects, 1740 category placements, 31 categories`

If the totals differ or unparsed-entry errors appear, fix the parser regex in Task 1 (with a new test case reproducing the offending line) — never hand-edit the README or the output.

- [ ] **Step 2: Spot-check the output**

Run: `uv run --with pyyaml python -c " import yaml doc = yaml.safe_load(open('data/projects.yaml')) cats = yaml.safe_load(open('data/categories.yaml'))['categories'] assert len(doc['projects']) == 1480 assert sum(len(p['categories']) for p in doc['projects']) == 1740 assert len(cats) == 31 and cats[-1] == 'Other Stars' ids = [p['id'].lower() for p in doc['projects']] assert len(set(p['url'] for p in doc['projects'])) == 1480 multi = [p['id'] for p in doc['projects'] if len(p['categories']) > 1] print('multi-category projects:', len(multi)) stars = [p['stars'] for p in doc['projects']] print('OK; top:', doc['projects'][0]['id'], stars[0]) "`
Expected: `multi-category projects: 231`, top entry `sindresorhus/awesome` (the highest-starred repo, ~495700).

- [ ] **Step 3: Commit**

```bash
git add data/projects.yaml data/categories.yaml
git commit -m "feat: add starred-projects dataset migrated from my-awesome-list README"
```

______________________________________________________________________

### Task 3: Enrich records from the GitHub API (topics + exact metadata)

**Files:**

- Create: `scripts/refresh_projects.py`
- Test: `scripts/test_refresh_projects.py`
- Modify: `data/projects.yaml` (regenerated by the script)

**Interfaces:**

- Consumes: `data/projects.yaml` from Task 2 (record shape from Task 1).

- Produces: `merge(record: dict, node: dict | None) -> bool` (applies one GraphQL repository node onto a record in place; False when node is None) and `build_query(batch: list[dict]) -> str`. CLI: `uv run scripts/refresh_projects.py [path-to-projects.yaml]` — rerunnable; later phases reuse it for scheduled refreshes. After it runs, every record's `topics` is populated from GitHub (`repositoryTopics`, first 10) and `stars`/`description`/`language`/`archived` hold exact API values; records the API can't find keep their old data and are listed on stdout.

- [ ] **Step 1: Write the failing tests**

```python
# scripts/test_refresh_projects.py
import json

from refresh_projects import build_query, merge

NODE = {
    "description": "Fast OLAP database",
    "stargazerCount": 42123,
    "isArchived": False,
    "primaryLanguage": {"name": "C++"},
    "repositoryTopics": {
        "nodes": [{"topic": {"name": "olap"}}, {"topic": {"name": "sql"}}]
    },
}


def make_record():
    return {
        "id": "ClickHouse/ClickHouse",
        "url": "https://github.com/ClickHouse/ClickHouse",
        "description": "old rounded description",
        "stars": 42100,
        "topics": [],
        "categories": ["OLAP"],
    }


def test_merge_applies_api_fields():
    record = make_record()
    assert merge(record, NODE) is True
    assert record["stars"] == 42123
    assert record["topics"] == ["olap", "sql"]
    assert record["description"] == "Fast OLAP database"
    assert record["language"] == "C++"
    assert "archived" not in record
    assert record["categories"] == ["OLAP"]  # curation is never touched


def test_merge_sets_and_clears_archived():
    record = make_record()
    merge(record, {**NODE, "isArchived": True})
    assert record["archived"] is True
    merge(record, NODE)
    assert "archived" not in record


def test_merge_keeps_old_data_when_node_missing():
    record = make_record()
    assert merge(record, None) is False
    assert record["stars"] == 42100
    assert record["description"] == "old rounded description"


def test_merge_handles_null_description_and_language():
    record = make_record()
    merge(record, {**NODE, "description": None, "primaryLanguage": None})
    assert record["description"] == "old rounded description"
    assert record["language"] == "C++"  # pre-existing value retained


def test_build_query_aliases_and_escapes():
    query = build_query([{"id": "a/b"}, {"id": 'we"ird/repo.name'}])
    assert 'r0: repository(owner: "a", name: "b")' in query
    assert json.dumps('we"ird') in query
    assert "repositoryTopics(first: 10)" in query
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `uv run --with pytest --with pyyaml pytest scripts/test_refresh_projects.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'refresh_projects'`

- [ ] **Step 3: Write the implementation**

```python
# scripts/refresh_projects.py
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
    if node is None:
        return False
    if node.get("description"):
        record["description"] = node["description"]
    record["stars"] = node["stargazerCount"]
    record["topics"] = [t["topic"]["name"] for t in node["repositoryTopics"]["nodes"]]
    if node.get("primaryLanguage"):
        record["language"] = node["primaryLanguage"]["name"]
    if node["isArchived"]:
        record["archived"] = True
    else:
        record.pop("archived", None)
    return True


def fetch(batch: list[dict]) -> dict:
    # gh exits non-zero when some aliases 404, but still returns partial data
    proc = subprocess.run(
        ["gh", "api", "graphql", "-f", f"query={build_query(batch)}"],
        capture_output=True,
        text=True,
    )
    try:
        payload = json.loads(proc.stdout)
    except json.JSONDecodeError:
        sys.exit(f"gh api graphql produced no JSON: {proc.stderr[:500]}")
    return payload.get("data") or {}


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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `uv run --with pytest --with pyyaml pytest scripts/ -v`
Expected: 10 passed (5 from Task 1 + 5 here)

- [ ] **Step 5: Run the enrichment for real**

Run: `uv run scripts/refresh_projects.py` (requires `gh auth status` OK — already verified for account DimkaGorhover; ~30 batches, about a minute)
Expected: `updated N/1480 projects` with N close to 1480; a short `not found` list of renamed/deleted repos is normal.

- [ ] **Step 6: Verify topics landed**

Run: `uv run --with pyyaml python -c " import yaml doc = yaml.safe_load(open('data/projects.yaml')) with_topics = sum(1 for p in doc['projects'] if p['topics']) assert len(doc['projects']) == 1480 print(f'{with_topics}/1480 records have topics; collected_at={doc[\"collected_at\"]}') "`
Expected: a clear majority of records with topics (many repos legitimately have none) and today's `collected_at`.

- [ ] **Step 7: Commit**

```bash
git add scripts/refresh_projects.py scripts/test_refresh_projects.py data/projects.yaml
git commit -m "feat: enrich project records with GitHub topics and exact metadata"
```

______________________________________________________________________

### Task 4: Projects page (shortcode, content, menu)

**Files:**

- Create: `layouts/shortcodes/projects.html`
- Create: `layouts/partials/star-count.html`
- Create: `content/projects.md`
- Modify: `config/_default/menus.en.toml` (append a menu entry)

**Interfaces:**

- Consumes: `hugo.Data.projects` (`collected_at`, `projects` pre-sorted by stars desc) and `hugo.Data.categories.categories` from Tasks 2–3.

- Produces: `/projects/` page; each entry `<li>` carries a lowercase `data-search` attribute and each category is wrapped in `<section class="project-category">` — Task 5's filter JS relies on both, plus the `#project-filter` / `#project-filter-count` elements added here.

- [ ] **Step 1: Write the star-count partial**

```html
{{- /* layouts/partials/star-count.html — 42123 -> "42.1k", 24 -> "24" */ -}}
{{- if ge . 1000000 -}}
{{ strings.TrimSuffix ".0" (lang.FormatNumberCustom 1 (div (float .) 1000000)) }}m
{{- else if ge . 1000 -}}
{{ strings.TrimSuffix ".0" (lang.FormatNumberCustom 1 (div (float .) 1000)) }}k
{{- else -}}
{{ . }}
{{- end -}}
```

- [ ] **Step 2: Write the projects shortcode**

```html
{{- /* layouts/shortcodes/projects.html */ -}}
{{- $doc := hugo.Data.projects -}}
{{- $cats := hugo.Data.categories.categories -}}
{{- $placements := 0 -}}
{{- range $doc.projects }}{{ $placements = add $placements (len .categories) }}{{ end -}}

<p>
  {{ lang.FormatNumber 0 (len $doc.projects) }} unique projects ·
  {{ lang.FormatNumber 0 $placements }} category placements ·
  metadata collected {{ $doc.collected_at }}.
  Projects may appear in more than one category.
</p>

<p>
  <input
    type="search"
    id="project-filter"
    placeholder="Filter projects — name, topic, language, category…"
    autocomplete="off"
    style="width: 100%; padding: 0.5rem 0.75rem"
  />
  <small id="project-filter-count" aria-live="polite"></small>
</p>

{{- range $cat := $cats }}
<section class="project-category">
  <h2 id="{{ anchorize $cat }}">{{ $cat }}</h2>
  <ul>
    {{- range $doc.projects }}{{ if in .categories $cat }}
    <li
      data-search="{{ printf `%s %s %s %s %s` .id (or .description ``) (delimit .topics ` `) (or .language ``) (delimit .categories ` `) | lower }}"
    >
      <a href="{{ .url }}" target="_blank" rel="noopener">{{ .id }}</a>
      {{- with .description }} — {{ . }}{{ end }}
      {{- if .archived }} <em>(archived)</em>{{ end }}
      <small>
        {{ with .language }}{{ . }} · {{ end }}⭐ {{ partial "star-count.html" .stars }}
        {{- range .topics }} <code>#{{ . }}</code>{{ end }}
      </small>
    </li>
    {{- end }}{{ end }}
  </ul>
</section>
{{- end }}
```

Note: the nested `range`/`in` is O(projects × categories) ≈ 46k checks at build time — fine for Hugo. `data-search` and `href` are auto-escaped by Hugo's HTML attribute context.

- [ ] **Step 3: Write the content page**

```markdown
---
title: "Projects"
description: "GitHub projects starred by Dmytro Horkhover, grouped by topic — mirror of the my-awesome-list catalog"
showDate: false
showAuthor: false
showReadingTime: false
showWordCount: false
showPagination: false
showTableOfContents: true
---

{{</* projects */>}}
```

(File: `content/projects.md`. The shortcode call is written here with Hugo comment-escaping so this plan file stays renderable; in the real file it is the plain shortcode delimiters with `projects` inside.)

- [ ] **Step 4: Add the menu entry**

Append to `config/_default/menus.en.toml`:

```toml
[[main]]
name = "Projects"
pageRef = "projects"
weight = 30
```

- [ ] **Step 5: Build check**

Run: `hugo --gc --minify --printPathWarnings`
Expected: exit 0, no ERROR lines. Then:

Run: `grep -o 'data-search' public/projects/index.html | wc -l`
Expected: `1740` (grep -o, not -c — the minified HTML is one line)

- [ ] **Step 6: Commit**

```bash
git add layouts/shortcodes/projects.html layouts/partials/star-count.html content/projects.md config/_default/menus.en.toml
git commit -m "feat: add /projects page rendered from starred-projects dataset"
```

______________________________________________________________________

### Task 5: In-page search filter

**Files:**

- Modify: `layouts/shortcodes/projects.html` (append a `<script>` block at the end)

**Interfaces:**

- Consumes: `#project-filter`, `#project-filter-count`, `li[data-search]`, `section.project-category` from Task 4.

- Produces: live filtering — whitespace-split terms AND-matched as substrings against `data-search`; non-matching `<li>` and empty sections get `hidden`; the count element shows `N of 1740 entries` while a query is active.

- [ ] **Step 1: Append the filter script to the shortcode**

```html
<script>
  (function () {
    const input = document.getElementById("project-filter");
    const count = document.getElementById("project-filter-count");
    const items = Array.from(document.querySelectorAll("li[data-search]"));
    const sections = Array.from(
      document.querySelectorAll("section.project-category"),
    );
    input.addEventListener("input", function () {
      const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      let visible = 0;
      for (const li of items) {
        const show = terms.every((t) => li.dataset.search.includes(t));
        li.hidden = !show;
        if (show) visible++;
      }
      for (const section of sections) {
        section.hidden = !section.querySelector("li:not([hidden])");
      }
      count.textContent = terms.length
        ? visible + " of " + items.length + " entries"
        : "";
    });
  })();
</script>
```

- [ ] **Step 2: Build check**

Run: `hugo --gc --minify --printPathWarnings`
Expected: exit 0, no ERROR lines.

- [ ] **Step 3: Browser verification (test-site skill)**

Follow `.claude/skills/test-site/SKILL.md` (build + agent-browser). On `http://localhost:1313/projects/` verify specifically:

1. The page loads with all 31 category headings and the TOC sidebar lists them.
1. Type `kubernetes` into `#project-filter`: the count shows `N of 1740 entries` with 0 < N < 1740, and sections without matches disappear.
1. Type `kubernetes go` (two terms): N shrinks further (AND semantics).
1. Clear the input: count text empties and all entries are visible again.
1. No console errors.

- [ ] **Step 4: Commit**

```bash
git add layouts/shortcodes/projects.html
git commit -m "feat: add client-side filter to /projects page"
```

______________________________________________________________________

## Deliberately skipped (with upgrade paths)

- Separate `validate-data` script from the handoff proposal — the parser fails hard on unparsed lines and Task 2/3 inline checks cover the invariants; add a standalone script when the refresh workflow (later phase) needs it in CI.
- Fuse.js fuzzy matching — substring AND-match first; Blowfish vendors Fuse if ranking is ever wanted.
- README regeneration and the scheduled GitHub Action — later phase; `refresh_projects.py` is already the reusable core of it.
