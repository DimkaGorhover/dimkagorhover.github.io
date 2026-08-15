---
name: test-site
description: Build the Hugo site and verify it in a headless browser with agent-browser. Use after changing content, data/cv.yaml, config, or layouts, or when asked to test/check/verify the site locally.
---

# Test the site locally

## 1. Build check

```bash
hugo --gc --minify --printPathWarnings
```

Must exit 0 with no ERROR lines. This catches template errors, bad YAML in
`data/cv.yaml`, and broken front matter.

## 2. Browser check (agent-browser)

Requires `agent-browser` (install once: `brew install agent-browser`, then
`agent-browser install` to download its Chrome).

Start the dev server in the background (use a Bash background task, port 1313):

```bash
hugo server --buildDrafts
```

Then verify each page:

```bash
agent-browser open http://localhost:1313/
agent-browser snapshot # homepage: profile with name, headline, social links, recent posts
agent-browser open http://localhost:1313/cv/
agent-browser snapshot # CV: About, Contacts, Skills, Experience, Education sections
agent-browser open http://localhost:1313/posts/
agent-browser snapshot # posts list renders (drafts visible with --buildDrafts)
agent-browser open http://localhost:1313/awesome/
agent-browser snapshot # projects: cards with star counts, category filter works
```

What to check in snapshots:

- Homepage shows author name, headline and social links.
- `/cv/` shows all sections and every experience entry from `data/cv.yaml`.
- `/posts/` lists posts; open one and confirm code blocks render.
- Navigation menu contains CV and Posts and the links work (click them).

Take a screenshot if visual layout is in question:

```bash
agent-browser screenshot /tmp/site.png
```

## 3. Cleanup

```bash
agent-browser close
```

and stop the background `hugo server` task.
