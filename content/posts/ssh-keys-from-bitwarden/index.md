---
title: "Keeping SSH keys in Bitwarden, not in ~/.ssh"
date: 2026-11-17
draft: false
description: >-
  Serve SSH private keys from Bitwarden through the rbw agent, and fetch the
  matching public keys on demand with fnox and an ssh_config Match exec block,
  so a migrated host leaves no key file in ~/.ssh at all.
tags: ["ssh", "bitwarden", "fnox", "security"]
---

Moving SSH private keys into a password manager is the easy part. Bitwarden
can store SSH keys, and [rbw](https://github.com/torreirow/rbw) runs an SSH
agent that serves them, so `SSH_AUTH_SOCK` points at rbw and the private
halves never touch the disk.

{{< alert >}}
The original [doy/rbw](https://github.com/doy/rbw) has gone quiet. Its README
calls it feature-complete, and the last release, 1.15.0, came out on
2025-12-31. I use the fork [torreirow/rbw](https://github.com/torreirow/rbw),
which still merges fixes: the SSH agent no longer dies when a client
disconnects during the pinentry prompt, dependencies with RUSTSEC advisories
are patched, and `rbw edit` no longer corrupts items that have their own
encryption key. See [Installing rbw](#installing-rbw) for how I install it.
{{< /alert >}}

The public halves are what stayed behind. Every host in my `~/.ssh/config`
still had an `IdentityFile ~/.ssh/pub/<name>.pub` line, which meant a folder
of `.pub` files to keep in sync with the vault by hand. This post removes
that folder too: ssh asks Bitwarden for the public key at connection time.

## Links

- [Github: torreirow/rbw](https://github.com/torreirow/rbw), the fork I use
- [Github: doy/rbw](https://github.com/doy/rbw), the original
- [fnox](https://fnox.jdx.dev/) and its
  [Bitwarden provider](https://fnox.jdx.dev/providers/bitwarden)
- [ssh_config(5)](https://man.openbsd.org/ssh_config)

## Why ssh needs the public key at all

With an agent holding several keys, ssh offers them to the server one by one.
Servers cut you off after a few failed attempts (`MaxAuthTries` defaults to
6), so with enough keys in the agent you get `Too many authentication
failures` before the right key comes up.

The usual fix is a per-host block:

```text
Host git.example.com
  IdentitiesOnly yes
  IdentityFile ~/.ssh/pub/work_gitlab_auth.pub
```

`IdentitiesOnly yes` makes ssh offer only the identities named in the config.
`IdentityFile` can point at a *public* key: ssh reads it, finds the agent key
with the same public half, and asks the agent to sign. The private key is
never needed locally. All ssh needs from that file is a way to identify the
key, which is why it's fine to generate it on the fly.

## The setup

There are three pieces: a fnox provider for Bitwarden, a small script that
writes the public key to a temp file, and a `Match exec` block that runs the
script and points `IdentityFile` at the result. All of them sit on top of
rbw, so it goes in first.

### Installing rbw

I install rbw with [mise](https://mise.jdx.dev/). The fork publishes no
release binaries after 2.0.0, so mise builds it from source with its cargo
backend, which needs a Rust toolchain. Two entries in
`~/.config/mise/config.toml` do it:

```toml
[tools]
rbw = "tag:v2.0.3"

[tool_alias]
rbw = "cargo:torreirow/rbw"
```

The alias maps the short name `rbw` to the fork's git repository, and
`tag:v2.0.3` builds that tag. I pin the tag because the fork has one
maintainer and rbw holds the keys to my vault, so I read the diff before
I move to a new tag.

### fnox provider

[fnox](https://fnox.jdx.dev/) maps secret names to providers. The global
config, `~/.config/fnox/config.toml`, defines Bitwarden with the rbw backend:

```toml
default_provider = "bitwarden_com"

[providers.bitwarden_com]
type = "bitwarden"
backend = "rbw"
```

Bitwarden SSH key items expose a `public_key` field, which fnox reads as
`<item>/public_key`.

fnox shells out to rbw, so it is a little slower than calling rbw directly:
over 10 runs, `rbw get --field public_key` averaged 62 ms and `fnox get`
averaged 77 ms. The speed comes from rbw, whose daemon keeps the vault
unlocked in memory; that's what makes it so much quicker than the official
Node-based `bw` CLI. I pay the extra 15 ms for fnox because it gives me one
config of named secrets for everything I fetch, and I can swap a provider
without touching the scripts that use it.

### gen.sh

`~/.ssh/src/gen.sh <key>` writes `${TMPDIR}/<key>.pub`:

```bash
#!/bin/bash
# Usage: gen.sh <key>
# Writes ${TMPDIR}/<key>.pub from fnox (Bitwarden) for ssh `Match exec`.
# Exit 0 = file is fresh; non-zero = Match block not applied.
set -euo pipefail

key="${1:?usage: gen.sh <key>}"
# The key becomes a file name, so allow nothing that could leave ${TMPDIR}.
[[ "${key}" =~ ^[A-Za-z0-9_-]+$ ]] || {
  echo "gen.sh: bad key name: ${key}" >&2
  exit 1
}
dir="${TMPDIR:?TMPDIR is not set}"
path="${dir%/}/${key}.pub"

# Cache: reuse a non-empty file younger than 10 minutes.
[[ -n "$(find "${path}" -mmin -10 -size +0 2>/dev/null)" ]] && exit 0

# fnox resolves config from cwd; Match exec runs in the caller's cwd.
cd ~/.ssh

pub="$(fnox get "${key}")" || {
  echo "gen.sh: fnox get ${key} failed" >&2
  exit 1
}

case "${pub}" in
  ssh-* | ecdsa-sha2-* | sk-*) ;;
  *)
    echo "gen.sh: ${key} is not an ssh public key" >&2
    exit 1
    ;;
esac

# Write to a temp file and rename, so a parallel run never reads a half-written file.
tmp="$(mktemp "${path}.XXXXXX")"
printf '%s\n' "${pub}" >"${tmp}"
mv -f "${tmp}" "${path}"
```

The script only reads from fnox. Each key is registered once, from `~/.ssh`,
so the entry lands in that directory's fnox config:

```bash
cd ~/.ssh
fnox set work_gitlab_auth --provider bitwarden_com --key-name work_gitlab_auth/public_key
```

`${TMPDIR}` is a macOS assumption. There it points to a per-user directory
under `/var/folders` that only you can read. On Linux `TMPDIR` is usually
unset, so the script exits and ssh skips the Match block. Don't swap in
`/tmp`, because another user could create the file before you do. Use
`${XDG_RUNTIME_DIR}` in both the script and the `IdentityFile` line instead.

### Match exec

```text
Match host git.example.com exec "bash ~/.ssh/src/gen.sh work_gitlab_auth"
  IdentityFile ${TMPDIR}/work_gitlab_auth.pub

Host git.example.com
  IdentitiesOnly yes
  # Fail closed: if the Match above didn't fire, offer no key instead of ~/.ssh/id_*.
  IdentityFile none
```

`Match exec` runs the command and applies the block only if it exits 0.
`IdentityFile` expands environment variables (OpenSSH 8.4+), so
`${TMPDIR}` works. I'll come back to `IdentityFile none` below.

## Gotchas

**`Match exec` runs in the caller's working directory.** fnox looks for its
config starting from the current directory, so `fnox get` from inside some git
repo won't see `~/.ssh/fnox.local.toml`. That's what the `cd ~/.ssh` is for.

**`exec` runs on every connection.** Every `git fetch`, `git push`, and
`ssh -G` runs it. At 77 ms per call that adds up in a script that loops over
many repositories, so the script reuses a file younger than 10 minutes.

## Failure mode

The design is meant to fail closed. If Bitwarden is locked, `fnox get` fails,
`gen.sh` exits 1, ssh skips the Match block, and authentication fails. The
cache is the exception: for up to 10 minutes after the last fetch, ssh keeps
offering the public key from the file, even if the vault is locked or the key
was rotated in Bitwarden. A shorter `-mmin` narrows that window.

I tested it by locking rbw and deleting the cached file. `gen.sh` exited 1
and ssh skipped the Match block, as intended. Then, with no `IdentityFile`
left, ssh fell back to its defaults (`id_rsa`, `id_ecdsa`, `id_ed25519`, and
so on) and offered my old `~/.ssh/id_rsa` to the server. `IdentitiesOnly`
doesn't prevent that: when nothing else is configured, the default files count
as the configured identities.

The login still failed, but the server saw a public key it had no reason to
see, and if that key had been registered there, I would have logged in as the
wrong identity. Adding `IdentityFile none` to the `Host` block fixes it. The
Match block's file still applies when the Match fires, and when it doesn't,
ssh has nothing to offer:

```text
debug1: No more authentication methods to try.
git@git.example.com: Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
```

## Variation: delete the file after use

The cached `.pub` in `${TMPDIR}` isn't secret, but leaving it there goes
against the idea of keeping no key files around. OpenSSH has no on-close hook,
but `LocalCommand` runs after authentication:

```text
Host git.example.com
  PermitLocalCommand yes
  LocalCommand rm -f ${TMPDIR}/work_gitlab_auth.pub
```

Drop the 10-minute cache at the same time. This cleanup is best effort.
`LocalCommand` runs only after a successful login that opens its own
connection, so a failed login, an unreachable host, `ssh -G`, or a session
that reuses a `ControlMaster` connection writes the file and never deletes it.
There is also a race: two parallel connections to the same host share one
file path, since ssh_config has no per-process token, so one connection can
delete the file while the other is still reading it. I haven't switched to
this. The cache works and the file holds only a public key.

## Where this leaves ~/.ssh

So far only one host is migrated. The rest still use static `.pub` files, and
a few older keys still sit on disk as files. Each migration means moving the
key into a Bitwarden SSH key item, adding the two config blocks above, and
deleting the files.
