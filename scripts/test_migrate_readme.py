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
    assert parse_stars("32.3k") == 32300  # requires round(): int(32.3 * 1000) == 32299


def test_unparsed_line_reported():
    _, _, errors = parse_readme(
        "## Go\n\n- [bad entry](https://github.com/a/b) no dash\n"
    )
    assert len(errors) == 1
    assert "line 3" in errors[0]
