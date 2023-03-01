// Known Subgraph endpoints
export const GRAPH_CLIENT_ENDPOINTS = {
  local: {
    core: 'http://localhost:8000/subgraphs/name/vertex-subgraphs-core',
    markets: 'http://localhost:8000/subgraphs/name/vertex-subgraphs-markets',
    candlesticks:
      'http://localhost:8000/subgraphs/name/vertex-subgraphs-candlesticks',
  },
  testnet: {
    core: 'https://api.thegraph.com/subgraphs/name/vertex-protocol/vertex-dev-core',
    markets:
      'https://api.thegraph.com/subgraphs/name/vertex-protocol/vertex-dev-markets',
    candlesticks:
      'https://api.thegraph.com/subgraphs/name/vertex-protocol/vertex-dev-candlesticks',
  },
};
