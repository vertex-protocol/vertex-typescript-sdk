# Vertex Typescript SDK

Monorepo for the Vertex TS SDK. The Vertex SDK is a collection of utilities
for interacting with the Vertex API and contracts.

[SDK Docs](https://vertex-protocol.github.io/vertex-typescript-sdk/index.html)

## 0.x.x → 1.x.x Breaking Changes

`1.x.x` now uses `viem` instead of `ethers`. When upgrading to `1.x.x`:

- Remove `ethers` and add `viem` as dependencies
- The `ethers` `Wallet` instance has been replaced with `viem`'s `WalletClient`
- The `ethers` `Provider` instance has been replaced with `viem`'s `PublicClient`

## Packages

### `@vertex-protocol/client`

Exposes the top-level `VertexClient`, which composes subpackages for API & contract interaction.

### `@vertex-protocol/engine-client`

Exports queries & executes that talk to the off-chain matching engine.

### `@vertex-protocol/indexer-client`

Exports queries that talk to the indexer.

### `@vertex-protocol/trigger-client`

Exports queries and executes that talk to the trigger service (used for stop & TP/SL orders).

### `@vertex-protocol/utils`

Common utilities, including [`bignumber.js`](https://mikemcl.github.io/bignumber.js/), which is used for representing
large numbers.

## Development

### Workspace Scripts

This is a Lerna monorepo. See `package.json` for common tasks, some of which are:

**clean/build/dev/lint/typecheck**: Fairly common & self-explanatory tasks, operate on the entire repo

**gen-typedoc**: Generates documentation using [TypeDoc](https://typedoc.org/)

**link/unlink-local**: Used for local package development.
Uses `yarn link/unlink` ([docs](https://classic.yarnpkg.com/en/docs/cli/link))
to enable other local repos to consume Vertex packages without having to publish a new version.

> When making a change to the SDK, you will need to build the SDK, then run `yarn install --force` on the consuming
> repo for the changes to be picked up.

**depcruise:all**: Run dependency-cruiser on all packages to check for dependency issues (incl. circular dependencies).

## Agent Instructions

This repository includes agent instruction files for LLM-based development tools:

- `AGENT.md` - Master instructions file
- `CLAUDE.md` - Automatically symlinked to `AGENT.md` (managed by the repository)
- `.github/copilot-instructions.md` - Automatically symlinked to `AGENT.md` for GitHub Copilot

For other LLM agents (Qwen, Gemini, etc.), you can manually create symlinks:

```bash
# For Qwen
ln -sf AGENT.md QWEN.md

# For Gemini
ln -sf AGENT.md GEMINI.md
```

Note: `QWEN.md` and `GEMINI.md` are ignored by git, so each developer can create their own symlinks as needed.
