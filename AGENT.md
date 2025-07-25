# Agent Instructions for Vertex SDK

This file provides guidance to LLMs when working with code in this repository.

## Repository Overview

The Vertex TypeScript SDK is a monorepo containing utilities for interacting with the Vertex Protocol API and contracts. The project uses Lerna for workspace management and provides a comprehensive SDK for trading on Vertex.

## Key Commands

### Development

- `yarn build` - Build all packages in the monorepo using Lerna
- `yarn clean` - Clean all packages
- `yarn dev` - Run development mode for all packages
- `yarn test` - Run Jest tests across the entire codebase
- `yarn lint` - Run ESLint with auto-fix and Prettier formatting
- `yarn typecheck` - Run TypeScript type checking for all packages

### Testing

- E2E tests in `apps/e2e` are excluded from main test runs

### Package Management

- `yarn link-local` / `yarn unlink-local` - Link/unlink packages for local development
- `yarn publish-all` - Clean, build, and publish all packages via Lerna

## Architecture

### Monorepo Structure

The project follows a monorepo pattern with these core packages:

1. **`@vertex-protocol/client`** - Main entry point that composes all other packages into a unified `VertexClient`
2. **`@vertex-protocol/engine-client`** - Handles off-chain matching engine communication
3. **`@vertex-protocol/indexer-client`** - Provides indexer queries for historical data
4. **`@vertex-protocol/trigger-client`** - Manages trigger service for stop/TP/SL orders
5. **`@vertex-protocol/contracts`** - Contract utilities, ABIs, and on-chain interactions
6. **`@vertex-protocol/utils`** - Common utilities including BigNumber.js for decimal math

### Client Architecture

- `VertexClient` is the main class that orchestrates all API interactions
- Uses `viem` for Ethereum wallet/provider functionality (migrated from ethers)
- Supports both chain signers and linked signers for trading
- Modular API design with separate classes for Market, Spot, Perp, Subaccount, and WebSocket operations

### Key Patterns

- All packages use TypeScript with strict type checking
- BigDecimal/BigNumber.js for precise decimal calculations
- EIP-712 signing for off-chain order execution
- Comprehensive type definitions for all API responses
- Consistent error handling with custom error classes

## TypeScript SDK Style Guide

For detailed coding standards, formatting requirements, and best practices, see [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md).
