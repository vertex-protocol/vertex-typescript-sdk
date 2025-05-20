# Vertex SDK E2E Scripts

## Setup

Copy `.env.example` into `.env` and fill out any appropriate values

Before running any tests, make sure to initialize the environment and test accounts:

`yarn account-setup`

## Running Tests

### Client Tests

| Command                      | Description                                                            |
| ---------------------------- | ---------------------------------------------------------------------- |
| yarn client/collateral-tests | E2E tests for depositing, withdrawing, and transferring collateral     |
| yarn client/order-tests      | E2E tests for placing, canceling, and modifying orders                 |
| yarn client/query-tests      | E2E tests for client-side queries (markets, subaccounts, etc.)         |
| yarn client/ws-message-tests | E2E tests for WebSocket message formatting (place, cancel, mint, etc.) |
| yarn client/full-sanity      | Runs all client-related E2E tests                                      |

### Engine Client Tests

| Command                        | Description                                         |
| ------------------------------ | --------------------------------------------------- |
| yarn engine/collateral-tests   | Engine-level tests for collateral operations        |
| yarn engine/lp-tests           | Tests for liquidity provider minting and burning    |
| yarn engine/query-tests        | Tests for engine-side state queries                 |
| yarn engine/signer-order-tests | Tests using EIP-712 signatures and order validation |
| yarn engine/vlp-tests          | Tests related to Vertex LP (VLP) functionality      |
| yarn engine/full-sanity        | Runs all engine-client E2E tests                    |

### Indexer Client Tests

| Command                               | Description                             |
| ------------------------------------- | --------------------------------------- |
| yarn indexer/leaderboard-tests        | Tests for leaderboard query responses   |
| yarn indexer/markets-queries-tests    | Tests for market data queries           |
| yarn indexer/subaccount-queries-tests | Tests for subaccount-related queries    |
| yarn indexer/staking-queries-tests    | Tests for staking and validator queries |
| yarn indexer/rewards-queries-tests    | Tests for rewards-related data          |
| yarn indexer/vlp-queries-tests        | Tests for VLP-related indexer endpoints |
| yarn indexer/full-sanity              | Runs all indexer-client E2E tests       |

### Trigger Client Tests

| Command                  | Description                       |
| ------------------------ | --------------------------------- |
| yarn trigger/full-sanity | Runs all trigger-client E2E tests |
