# CLAUDE.md

Personal site (CV + blog): Hugo + Blowfish theme, deployed to GitHub Pages.
Static only — no backend, no Node toolchain.

## Commands

- `make serve` — dev server with drafts at http://localhost:1313
- `make build` — production build into `./public`
- `hugo` needs the extended version, v0.158.0+; theme is a git submodule
  (`git submodule update --init` after a fresh clone)

## Where things live

| What | Where |
|------|-------|
| CV content (the only place to edit the CV) | `data/cv.yaml` |
| CV rendering | `layouts/shortcodes/cv.html` + `layouts/partials/cv-date.html` |
| Blog posts | `content/posts/<slug>/index.md` (front matter: title, date, tags, `draft: true` until ready) |
| Site config | `config/_default/hugo.toml` |
| Theme options, color scheme (`colorScheme = "..."`) | `config/_default/params.toml` |
| Author name/headline/bio/social links | `config/_default/languages.en.toml` |
| Menu (CV, Posts) | `config/_default/menus.en.toml` |
| Deploy workflow | `.github/workflows/deploy.yml` |

## Conventions

- CV entries: newest first; dates are `YYYY-MM` strings; omit `end` for
  "Present". Years of experience are computed from `first_working_year` —
  never hardcode them.
- Don't edit anything under `themes/blowfish/` (submodule). Override via
  site-level `layouts/`, `assets/`, or config.
- Custom color palette: copy a file from `themes/blowfish/assets/css/schemes/`
  to `assets/css/schemes/<name>.css` and set `colorScheme = "<name>"`.

## Verification

After changing content, data, config, or layouts, use the `test-site` skill:
`hugo --gc --minify --printPathWarnings` must pass, then check pages with
agent-browser against the dev server.

## Deploy

Push to `master` → GitHub Actions builds and publishes (Pages source must be
"GitHub Actions"). No deploy branch. `git push` is blocked for Claude by a
hook — the user pushes.
