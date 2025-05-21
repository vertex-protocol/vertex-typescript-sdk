# Vertex SDK E2E Scripts

## Setup

Copy `.env.example` into `.env` and fill out any appropriate values

Before running any tests, make sure to initialize the environment and test accounts:

`yarn account-setup`

## Running Tests

### Client Tests

| Command                          | Description                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| yarn e2e:client/collateral-tests | E2E tests for depositing, withdrawing, and transferring collateral     |
| yarn e2e:client/order-tests      | E2E tests for placing, canceling, and modifying orders                 |
| yarn e2e:client/query-tests      | E2E tests for client-side queries (markets, subaccounts, etc.)         |
| yarn e2e:client/ws-message-tests | E2E tests for WebSocket message formatting (place, cancel, mint, etc.) |
| yarn e2e:client                  | Runs all client-related E2E tests                                      |

### Engine Client Tests

| Command                            | Description                                         |
| ---------------------------------- | --------------------------------------------------- |
| yarn e2e:engine/collateral-tests   | Engine-level tests for collateral operations        |
| yarn e2e:engine/lp-tests           | Tests for liquidity provider minting and burning    |
| yarn e2e:engine/query-tests        | Tests for engine-side state queries                 |
| yarn e2e:engine/signer-order-tests | Tests using EIP-712 signatures and order validation |
| yarn e2e:engine/vlp-tests          | Tests related to Vertex LP (VLP) functionality      |
| yarn e2e:engine                    | Runs all engine-client E2E tests                    |

### Indexer Client Tests

| Command                                   | Description                             |
| ----------------------------------------- | --------------------------------------- |
| yarn e2e:indexer/leaderboard-tests        | Tests for leaderboard query responses   |
| yarn e2e:indexer/markets-queries-tests    | Tests for market data queries           |
| yarn e2e:indexer/subaccount-queries-tests | Tests for subaccount-related queries    |
| yarn e2e:indexer/staking-queries-tests    | Tests for staking and validator queries |
| yarn e2e:indexer/rewards-queries-tests    | Tests for rewards-related data          |
| yarn e2e:indexer/vlp-queries-tests        | Tests for VLP-related indexer endpoints |
| yarn e2e:indexer                          | Runs all indexer-client E2E tests       |

### Trigger Client Tests

| Command      | Description                       |
| ------------ | --------------------------------- |
| yarn trigger | Runs all trigger-client E2E tests |
