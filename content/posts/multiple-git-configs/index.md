---
title: "One git config, several identities"
date: 2026-11-19
draft: false
description: >-
  Pick the git identity, signing key, hooks and global ignore file per project
  from the remote URL, using includeIf hasconfig, so a fresh clone commits as
  the right person without any per-repo setup.
tags: ["git", "dotfiles", "ssh"]
---

I commit to repositories that belong to different projects, and each one wants
a different `user.email`, a different signing key and sometimes different
hooks. Setting that per repo with `git config --local` works until the first
fresh clone, when you forget, and the commit goes out under the wrong name.

This post sets everything up once, in `~/.config/git`, and lets git pick the
identity from the repository's remote URL. The examples use a personal identity
plus two projects, `alpha` and `beta`. They can be two employers or two teams
in one company; git doesn't care.

## Links

- [git-config(1): Conditional includes](https://git-scm.com/docs/git-config#_conditional_includes)
- [githooks(5)](https://git-scm.com/docs/githooks)
- [Keeping SSH keys in Bitwarden, not in ~/.ssh]({{< ref "posts/ssh-keys-from-bitwarden" >}})

## Requirements

- git 2.36 or newer for `includeIf "hasconfig:remote.*.url:..."`.
- git 2.34 or newer for SSH commit signing (`gpg.format = ssh`).

`git --version` tells you which one you have.

## Layout

```text
~/.gitconfig -> ~/.config/git/root.gitconfig

~/.config/git
├── root.gitconfig        # git config: personal identity, shared settings, includes
├── alpha.gitconfig
├── beta.gitconfig
│
├── root.gitignore        # global ignore files, one per identity
├── alpha.gitignore
├── beta.gitignore
│
├── allowed_signers       # signing: email-to-key map for signature checks
│
└── hooks
    └── projects          # hook shims, used by alpha and beta
        ├── commit-msg
        ├── pre-commit
        └── pre-push
```

`~/.gitconfig` is a symlink, so the whole directory can live in one place
and go under version control.

## The root config

`root.gitconfig` holds the personal identity and every setting shared by all
identities: aliases, pull and rebase behaviour, the pager. The personal
`[user]` block and `core.excludesfile` sit at the top, as in any gitconfig.
Below them come signing and the project overrides:

```ini
[gpg]
	format = ssh
[gpg "ssh"]
	allowedSignersFile = ~/.config/git/allowed_signers
[commit]
	gpgsign = true
[tag]
	gpgsign = true

# alpha: self-hosted GitLab
[includeIf "hasconfig:remote.*.url:git@git.alpha.example:*/**"]
	path = ~/.config/git/alpha.gitconfig
[includeIf "hasconfig:remote.*.url:https://git.alpha.example/**"]
	path = ~/.config/git/alpha.gitconfig

# beta: an organization on GitHub
[includeIf "hasconfig:remote.*.url:git@github.com:beta-org/**"]
	path = ~/.config/git/beta.gitconfig
[includeIf "hasconfig:remote.*.url:https://github.com/beta-org/**"]
	path = ~/.config/git/beta.gitconfig
```

Git reads config top to bottom and the last value wins, so the includes have to
come after the personal `[user]` block. When no remote matches, nothing is
included and the repo stays on the personal identity.

A project file only overrides what is different:

```ini
# alpha.gitconfig
[user]
	name = Jane Doe
	email = jane.doe@alpha.example
	signingkey = key::ssh-ed25519 AAAA... jane.doe@alpha.example
[core]
	excludesfile = ~/.config/git/alpha.gitignore
	hooksPath = ~/.config/git/hooks/projects
```

`beta.gitconfig` has the same shape with beta's values:

```ini
# beta.gitconfig
[user]
	name = Jane Doe
	email = jane.doe@beta.example
	signingkey = key::ssh-ed25519 AAAA... jane.doe@beta.example
[core]
	excludesfile = ~/.config/git/beta.gitignore
	hooksPath = ~/.config/git/hooks/projects
```

### Why hasconfig and not gitdir

The older condition is `gitdir:`, which matches on where the repository sits
on disk:

```ini
[includeIf "gitdir:~/dev/alpha/"]
	path = ~/.config/git/alpha.gitconfig
```

It works from git 2.13, but only if every alpha repo is cloned under
`~/dev/alpha/`. A quick clone into `/tmp` falls back to the personal identity.
`hasconfig:remote.*.url:` matches on the remote, so the repo gets the right
identity wherever it is on disk.

It needs a remote to match against, though. Right after `git init`, before
`git remote add`, the repo uses the personal identity.

## Every URL form needs its own line

The pattern matches the URL as it is written in the repo's `.git/config`, not
the host it ends up connecting to. The same project can be cloned as
`git@github.com:beta-org/x.git` or `https://github.com/beta-org/x.git`, so each
form needs its own `includeIf`.

SSH host aliases add a third form. If you keep a separate SSH key per project,
`~/.ssh/config` usually has an alias like this:

```text
Host github-beta
  HostName github.com
  IdentitiesOnly yes
  IdentityFile ~/.ssh/beta.pub
```

and the root config rewrites the canonical URL onto it, so you can paste
clone URLs from the web UI unchanged:

```ini
[url "git@github-beta:beta-org/"]
	insteadOf = git@github.com:beta-org/
```

A repo cloned through the alias directly has
`git@github-beta:beta-org/...` in its config, and that form needs a line too:

```ini
[includeIf "hasconfig:remote.*.url:git@github-beta:beta-org/**"]
	path = ~/.config/git/beta.gitconfig
```

If a form is missing, git gives no warning and the commit goes out under the
personal identity, so when you add a project, list every form it can appear as.

## Signing keys

Each identity has its own `user.signingkey`. With `key::` the public key sits
inline in the config, and the private half comes from the SSH agent. In my case
the agent is a password manager, which the
[Bitwarden post]({{< ref "posts/ssh-keys-from-bitwarden" >}}) covers.

To check signatures with `git log --show-signature`, git needs to know which key
belongs to which email. `allowed_signers` has one line per identity:

```text
jane@personal.example ssh-ed25519 AAAA...
jane.doe@alpha.example ssh-ed25519 AAAA...
jane.doe@beta.example ssh-ed25519 AAAA...
```

When you rotate a key, update it in both places.

## Hooks

`core.hooksPath` points git at a directory of hooks shared by every repo
that uses the identity. Only the project files set it here, so personal repos
keep the default `.git/hooks`.

Once `core.hooksPath` is set, git stops looking in `.git/hooks` entirely. A
hook that a repo installs there, say from the project's setup script, silently
stops running, so the shared hooks have to call it themselves. The shim below
runs your own checks, then hands over to the repo-local hook of the same name
if there is one:

```bash
#!/usr/bin/env bash
# ~/.config/git/hooks/projects/pre-commit
set -euo pipefail

# Your own checks go here. Exit non-zero to block the commit.

# Hand over to the repo's own hook of the same name, if it has one.
_local="$(git rev-parse --git-common-dir)/hooks/$(basename "$0")"
[[ -x "${_local}" ]] && exec "${_local}" "$@"
exit 0
```

The path lookup is where this usually breaks. `git rev-parse --git-dir` works
in a normal clone, but in a linked worktree it points at
`.git/worktrees/<name>`, which has no `hooks` directory, and the local hook is
skipped. `--git-common-dir` returns the main `.git` directory in both cases.
`git rev-parse --git-path hooks` looks like the obvious choice, but it respects
`core.hooksPath` and returns the shared directory, so the shim would `exec`
itself forever.

The same chaining applies to every hook type, not just `pre-commit`. If the
shared directory has no `commit-msg`, a repo's `.git/hooks/commit-msg` won't
run either. Put a copy of the shim, or a symlink to it, under every hook name
you want to keep, even the ones that add no checks of their own. Hooks that
read stdin, like `pre-push`, need care: if your own check reads stdin, save it
first and feed it to the local hook, or the local hook gets nothing.

The shim is also where your own hooks go: checks you want in every repo of a
project without committing anything to those repos, like a commit message
format or a secret scan of the staged diff.

## Ignore files

`core.excludesfile` sets the global ignore file, the place for things that are
about your machine rather than the project: editor folders, OS clutter, local
tool configs. Each identity can point it at its own file, as `alpha.gitconfig`
does above, so a tool you only use on one project doesn't need an entry in
everyone's `.gitignore`.

The drawback is that these files don't compose. `core.excludesfile` takes one
path, a later value replaces an earlier one, and ignore files have no include
syntax. `alpha.gitignore` can't reuse `root.gitignore`, so the shared rules end
up copied into every file and drift apart over time. If that gets annoying,
keep the shared rules in one file and generate each project's file by
concatenating it with the project's own part, for example from a small script
or a `make` target.

## Checking which identity won

Run these from inside a repo of the project, not from `~/.config/git`:

```bash
git config --show-origin --get user.email
git config --show-origin --get core.hooksPath
git config --list --show-origin
```

`--show-origin` prints the file each value came from. If `user.email` comes
from `root.gitconfig` in a project repo, the remote URL didn't match any
`includeIf`, and the usual cause is a URL form you haven't listed.
