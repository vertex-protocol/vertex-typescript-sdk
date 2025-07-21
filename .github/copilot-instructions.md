# GitHub Copilot Instructions for Vertex SDK

This file provides guidance to GitHub Copilot when working with code in this repository.

## Repository Overview

The Vertex TypeScript SDK is a monorepo containing utilities for interacting with the Vertex Protocol API and contracts. The project uses Lerna for workspace management and provides a comprehensive SDK for trading on Vertex.

## Architecture & Conventions

### Monorepo Structure

- **`@vertex-protocol/client`** - Main entry point composing all packages into unified `VertexClient`
- **`@vertex-protocol/engine-client`** - Off-chain matching engine communication
- **`@vertex-protocol/indexer-client`** - Historical data indexer queries
- **`@vertex-protocol/trigger-client`** - Trigger service for stop/TP/SL orders
- **`@vertex-protocol/contracts`** - Contract utilities, ABIs, on-chain interactions
- **`@vertex-protocol/utils`** - Common utilities including BigNumber.js for decimal math

### Key Technical Patterns

- Uses `viem` for Ethereum wallet/provider functionality (migrated from ethers v1.x.x)
- BigDecimal/BigNumber.js for precise decimal calculations
- EIP-712 signing for off-chain order execution
- Comprehensive TypeScript with strict type checking
- Custom error classes extending base `VertexError`

### Chain Support

- **Mainnet**: Arbitrum (`arbitrum`)
- **Testnet**: Arbitrum Sepolia (`arbitrumTestnet`)
- **Local**: Development chains (`local`)

## Code Style Guidelines

### TypeScript Conventions

- Use `interface` for object shapes that might be extended or implemented
- Use `type` for unions, primitives, computed types, and utility types
- **NEVER use `any` type** - prefer `unknown` for truly unknown types
- Use descriptive generic constraints: `<T extends Record<string, unknown>>`

### JSDoc Requirements

**ALWAYS use JSDoc format (`/** ... */`) for:**

- ALL exported functions, classes, methods, variables, constants
- ALL exported types and interfaces including their properties
- Include `@param`, `@returns`, `@throws`, and `@example` tags where applicable

````typescript
/**
 * Brief description of the function/class/variable
 * @param {type} paramName - Description of parameter
 * @returns {type} Description of return value
 * @throws {ErrorType} Description of when this error is thrown
 * @example
 * ```typescript
 * const result = myFunction('example');
 * console.log(result); // Expected output
 * ```
 */
````

### Naming Conventions

- **camelCase**: variables, functions, methods
- **PascalCase**: classes, interfaces, types, enums
- **CAPITAL_SNAKE_CASE**: constants and environment variables
- **Client classes**: end with `Client` (e.g., `MarketClient`, `VertexClient`)
- **Error classes**: end with `Error` (e.g., `ValidationError`, `NetworkError`)
- **Type guards**: start with `is` (e.g., `isMarketOrder`, `isValidAddress`)

### Error Handling Pattern

```typescript
/**
 * Base error class for all Vertex SDK errors
 */
export abstract class VertexError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
```

### Constants Pattern

```typescript
/**
 * Default configuration values for the Vertex client
 */
export const DEFAULT_CLIENT_CONFIG: Readonly<VertexClientConfig> =
  Object.freeze({
    chainId: 42161, // Arbitrum mainnet
    timeout: 30000,
    retryAttempts: 3,
    debug: false,
  });
```

## Development Commands

### Build & Test Sequence

When making changes, ALWAYS run this verification sequence:

1. `yarn typecheck` - Verify TypeScript types
2. `yarn lint` - Ensure code follows standards
3. `yarn build` - Confirm project builds successfully
4. `yarn test` - Run all tests (excludes e2e in `apps/e2e`)

### Package Management

- `yarn dev` - Development mode for all packages
- `yarn clean` - Clean all packages
- `yarn link-local` / `yarn unlink-local` - Link/unlink for local development
- `yarn publish-all` - Clean, build, and publish via Lerna

## Code Quality Requirements

When suggesting or generating code:

- [ ] JSDoc format for all exported items
- [ ] Proper error handling with custom error classes
- [ ] Type safety with no `any` types
- [ ] Async operations use proper Promise handling
- [ ] Constants are frozen and exported appropriately
- [ ] Follow existing patterns in the codebase
- [ ] Security best practices (no exposed secrets/keys)
- [ ] Write pure functions where possible
- [ ] Handle edge cases gracefully

## Client Architecture Patterns

### Main Client Pattern

```typescript
/**
 * Main client for interacting with Vertex Protocol
 */
export class VertexClient {
  private readonly config: VertexClientConfig;
  private readonly signer?: Signer;

  /**
   * Creates a new Vertex client instance
   * @param config - Client configuration options
   * @param signer - Optional signer for authenticated operations
   */
  constructor(config: VertexClientConfig, signer?: Signer) {
    this.config = config;
    this.signer = signer;
  }
}
```

### Utility Function Pattern

```typescript
/**
 * Converts a decimal string to BigDecimal with validation
 * @param value - String representation of decimal number
 * @param name - Optional field name for error context
 * @returns BigDecimal representation of the input
 * @throws {ValidationError} When input is not a valid decimal
 */
export function toBigDecimal(value: string, name?: string): BigDecimal {
  // Implementation with validation
}
```

## Important Notes

- The VertexClient orchestrates all API interactions through modular design
- Supports both chain signers and linked signers for trading
- Uses comprehensive type definitions for all API responses
- Maintains consistent error handling across all packages
- Follows security best practices for financial trading operations
