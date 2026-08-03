# CLAUDE.md

Hugo + Blowfish static site (CV + blog). See README.md for setup/theming.

- The CV is edited only in `data/cv.yaml`: entries newest first, dates are
  `YYYY-MM` strings, omit `end` for "Present". Years of experience are
  computed from `first_working_year` — never hardcode them.
- After changing content, data, config, or layouts, verify with the
  `test-site` skill.
- `git push` is blocked for Claude by a hook — the user pushes.
