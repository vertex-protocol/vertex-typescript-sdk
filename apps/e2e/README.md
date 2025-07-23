# Vertex SDK E2E Scripts

## Setup

Before running any tests, make sure to configure your environment and set up the test account:

1. Copy `.env.example` into `.env` and fill out any appropriate values

2. Run the `pnpm account-setup` to mint and deposit tokens for the test account

## E2E Tests

| Command          | Description                       |
| ---------------- | --------------------------------- |
| pnpm e2e         | Runs all E2E tests                |
| pnpm e2e:client  | Runs all client-related E2E tests |
| pnpm e2e:engine  | Runs all engine-client E2E tests  |
| pnpm e2e:indexer | Runs all indexer-client E2E tests |
| pnpm e2e:trigger | Runs all trigger-client E2E tests |
