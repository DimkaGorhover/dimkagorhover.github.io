---
name: add-project
description: Use when asked to add a repo, star or project to the projects catalog, data/projects.yaml or the /awesome page.
---

# Add a project

`scripts/add_project.py` appends one repo to `data/projects.yaml`, filling
description, stars, topics, language and archived from GitHub, then re-sorts
the file. Categories are the only curated field, so they are the only thing
you have to decide.

Prereq: `gh auth status` must be logged in.

## 1. Pick categories

Categories must already exist in `data/categories.yaml` — `/awesome` renders
by iterating that list, so an unknown category makes the project invisible.
Read the file and pick one or more that fit; `Other Stars` is the catch-all.

A genuinely new category goes into `data/categories.yaml` first (keep the list
alphabetical, `Other Stars` stays last).

## 2. Delegate the run to a cheap subagent

This is mechanical — never spend a large model on it. Spawn one subagent with
the cheapest fast model your harness offers: `haiku` on Claude Code, `luna` on
Codex, the equivalent small model elsewhere. Only run it yourself if your
harness has no subagents.

The subagent gets exactly one instruction:

> From the repo root run
> `uv run scripts/add_project.py <owner/repo> "<Category>" ["<Category>"...]`
> Report its combined stdout and stderr verbatim, plus the exit status. Run
> only that command — do not edit any file by hand.

Adding several projects? Run them strictly one at a time, waiting for each to
finish before starting the next. The script does read-append-write over the
whole file with no locking, so concurrent runs silently drop records: the
slower writer overwrites the faster one's record and nothing fails. There is
no conflict to detect and nothing to retry.

The script refuses duplicates, unknown categories and repos GitHub can't
resolve. Those messages go to stderr with a non-zero exit — relay whichever
one comes back instead of working around it.

## 3. Verify

- `git diff data/projects.yaml` — expect exactly one added record, plus the
  reordering that the star-sort implies. If step 1 introduced a new category,
  `data/categories.yaml` changes too; nothing else should.
- Run the `test-site` skill and check `/awesome` shows the new entry under
  each category you picked.

Star counts of everything else go stale on their own — that is the
`refresh-projects` skill's job, not this one.
