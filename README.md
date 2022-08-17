# Vertex Typescript SDK

Monorepo for the Vertex TS SDK. The Vertex SDK is a collection of utilities
for interacting with the Vertex Clearinghouse and associated Subgraph.

[SDK Docs](https://vertex-protocol.github.io/vertex-sdk)

## Packages

### `@vertex-protocol/client`

Exposes `VertexClient`, which composes utils for subgraph & contract interaction.

### `@vertex-protocol/graph`

Exposes `VertexGraphClient`, an interface for interacting with the Clearinghouse Subgraph.

### `@vertex-protocol/contracts`

Exports ABIs, types, and utility functions for interacting with contracts

### `@vertex-protocol/utils`

Common utilities, including our BigNumber library of choice at Vertex, [`bignumber.js`](https://mikemcl.github.io/bignumber.js/)

## Development

This is a Lerna monorepo. See `package.json` for common tasks.