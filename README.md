# dimkagorhover.github.io

Personal site: CV + blog. Static site built with [Hugo](https://gohugo.io/)
and the [Blowfish](https://blowfish.page/) theme, deployed to GitHub Pages.

## Prerequisites

- [mise](https://mise.jdx.dev/) (`brew install mise`) — installs the pinned
  Hugo extended version from `mise.toml` via `mise install`
- Clone with submodules: `git clone --recurse-submodules` (or run
  `git submodule update --init` after a plain clone — the theme lives in
  `themes/blowfish`)

## Everyday tasks

| Task | How |
|------|-----|
| Run locally | `mise run serve` → <http://localhost:1313> (drafts included) |
| Add a CV entry | Append to `experience:` in `data/cv.yaml` (newest first) |
| Write a post | Create `content/posts/<slug>/index.md` (see below) |
| Production build | `mise run build` |

## Writing a post

```
content/posts/my-post/
└─ index.md
```

```markdown
---
title: "My Post"
date: 2026-08-03
tags: ["java"]
draft: true          # remove when ready to publish
---

Content here. Images go next to index.md and are referenced by filename.
```

## CV

All CV content lives in [`data/cv.yaml`](data/cv.yaml) — about, contacts,
skills, experience, education, languages. The page at `/cv` is rendered from
it by `layouts/shortcodes/cv.html`. Years of experience are computed from
`first_working_year`, so they never go stale.

## Colors / theming

The color scheme is set in `config/_default/params.toml`:

```toml
colorScheme = "ocean"
```

Built-in schemes: `blowfish`, `avocado`, `fire`, `ocean`, `forest`,
`princess`, `neon`, `bloody`, `terminal`, `marvel`, `noir`, `autumn`,
`congo`, `slate`, `github`, `one-light`. To define your own palette, create
`assets/css/schemes/<name>.css` (copy one from
`themes/blowfish/assets/css/schemes/` and change the color values), then set
`colorScheme = "<name>"`. Docs: <https://blowfish.page/docs/getting-started/#colour-schemes>

Other appearance settings (light/dark default, homepage layout, header
style) are in `params.toml`; author name, headline, bio and social links are
in `config/_default/languages.en.toml`.

## Deployment

Every push to `master` triggers `.github/workflows/deploy.yml`, which builds
the site with Hugo and publishes it via the official GitHub Pages actions.
No deploy branch, no manual steps.

## Testing locally

`mise run serve` for a live preview. For automated verification there is a
Claude Code skill at `.claude/skills/test-site/` that builds the site and
drives it in a headless browser
([agent-browser](https://github.com/vercel-labs/agent-browser)) — in a
Claude Code session, ask it to "test the site".
