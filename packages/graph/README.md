# `@vertex-protocol/graph`

Export `VertexGraphClient`, which exposes a set of common 
queries against the Vertex Clearinghouse subgraph.

## Adding Queries

We use the [Graph Client](https://github.com/graphprotocol/graph-client) to generate
typed GraphQL queries. To add a new query:
- Add a `.graphql` file under `src/graphql`
- Run `yarn run generate-graph-client`
