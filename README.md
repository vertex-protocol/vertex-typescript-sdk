# Vertex Typescript SDK

Monorepo for the Vertex TS SDK. The Vertex SDK is a collection of utilities
for interacting with the Vertex API and contracts.

[SDK Docs](https://vertex-protocol.github.io/vertex-sdk)

## Packages

### `@vertex-protocol/client`

Exposes `VertexClient`, which composes utils for API & contract interaction.

### `@vertex-protocol/contracts`

Exports ABIs, types, and utility functions for interacting with contracts

### `@vertex-protocol/utils`

Common utilities, including our BigNumber library of choice at
Vertex, [`bignumber.js`](https://mikemcl.github.io/bignumber.js/)

## Development

### Workspace Scripts

This is a Lerna monorepo. See `package.json` for common tasks, some of which are:

**clean/build/dev/lint**: Fairly common & self-explanatory tasks, operate on the entire repo

**gen-typedoc**: Generates documentation using [TypeDoc](https://typedoc.org/)

**link-local/unlink-local**: Used for local package development.
Uses `yarn link/unlink` ([docs](https://classic.yarnpkg.com/en/docs/cli/link))
to enable other local repos to consume Vertex packages without having to publish a new version.

    > When making a change to the SDK, you will need to build the SDK, then run `yarn install --force` on the consuming
    > repo for the changes to be picked up.