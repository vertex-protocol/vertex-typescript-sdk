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

**depcruise:all**: Run dependency-cruiser on all packages to check for dependency issues (incl. circular dependencies).

### Production Build Setup

We're using [Tsup](https://tsup.egoist.dev/) for building the packages in CJS and ESM formats.
Each package has its own `tsup.config.ts` file importing `tsup.base.config.ts` at the root of the monorepo.
`apps/node-compat-test` tests the compatibility of the SDK in a pure, bundler-less, Node.js environment.
