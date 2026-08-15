import json

from refresh_projects import build_query, fatal_errors, merge

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


def test_merge_clears_fields_github_reports_empty():
    # spec: when the repo resolves, API values win — nulls clear the field
    record = make_record()
    record["language"] = "C++"
    merge(record, {**NODE, "description": None, "primaryLanguage": None})
    assert "description" not in record
    assert "language" not in record


def test_fatal_errors_ignores_not_found_only():
    payload = {
        "errors": [
            {"type": "NOT_FOUND", "message": "Could not resolve r3"},
            {"type": "RATE_LIMITED", "message": "API rate limit exceeded"},
        ]
    }
    assert [e["type"] for e in fatal_errors(payload)] == ["RATE_LIMITED"]
    assert fatal_errors({"data": {}}) == []


def test_build_query_aliases_and_escapes():
    query = build_query([{"id": "a/b"}, {"id": 'we"ird/repo.name'}])
    assert 'r0: repository(owner: "a", name: "b")' in query
    assert json.dumps('we"ird') in query
    assert "repositoryTopics(first: 10)" in query
