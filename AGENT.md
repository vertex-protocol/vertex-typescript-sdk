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
- `yarn gen-typedoc` - Generate TypeDoc documentation for all packages

### Testing

- E2E tests in `apps/e2e`
- `yarn --cwd apps/e2e e2e` - Run all E2E tests
- `yarn --cwd apps/e2e e2e:client` - Run client-specific E2E tests
- `yarn --cwd apps/e2e e2e:engine` - Run engine-client E2E tests  
- `yarn --cwd apps/e2e e2e:indexer` - Run indexer-client E2E tests
- `yarn --cwd apps/e2e e2e:trigger` - Run trigger-client E2E tests

### Package Management

- `yarn link-local` / `yarn unlink-local` - Link/unlink packages for local development
- `yarn publish-all` - Clean, build, and publish all packages via Lerna
- `yarn depcruise:all` - Analyze package dependencies and detect circular dependencies

### Individual Package Scripts

Each package in `packages/` has these common scripts:
- `yarn build` - Build the specific package
- `yarn clean` - Clean build artifacts  
- `yarn dev` - Watch mode for development
- `yarn lint` - Check linting rules only
- `yarn lint:fix` - Fix linting issues automatically
- `yarn typecheck` - Type check without emitting files

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
- ESM-only modules (no CommonJS support in published packages)
- Viem as the primary Ethereum library dependency

## Test and Verification Sequence

After making edits, **ALWAYS** run the following verification sequence:

1. **Type Check**: `yarn typecheck` - Verify all TypeScript types are correct across all packages
2. **Lint Check**: 
   - If changes are made in only one package: `yarn lint:fix` (from that specific package directory)
   - If changes are made in multiple packages: `yarn lint` (from root directory)

**Requirements:**

- All commands must pass successfully before considering a task complete
- Fix any errors found during verification before marking tasks as done
- If any command fails, address the issues and re-run the full sequence
- For E2E testing, run `yarn --cwd apps/e2e e2e` separately if needed

## TypeScript SDK Style Guide

For detailed coding standards and conventions, see [STYLEGUIDE.md](./docs/STYLEGUIDE.md).

### Key areas covered in the style guide:

- JSDoc documentation standards
- TypeScript conventions and type safety
- Client class patterns and architecture
- Error handling and custom exceptions
- Naming conventions and file structure
- Constants and configuration management
- Utility function patterns and validation

