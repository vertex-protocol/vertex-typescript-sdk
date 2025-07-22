# LLM Instructions for Vertex SDK

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

### Test and Verification Sequence

When completing coding tasks, **ALWAYS** run the following verification sequence in order:

1. **Type Check**: `yarn typecheck` - Verify all TypeScript types are correct
2. **Lint Check**: `yarn lint` - Ensure code follows linting rules and standards
3. **Build Verification**: `yarn build` - Confirm the project builds successfully without errors
4. **Test Verification**: `yarn test` - Run all tests to ensure functionality remains intact

**Requirements:**

- All four commands must pass successfully before considering a task complete
- Fix any errors found during verification before marking tasks as done
- Run these commands after any significant code changes
- If any command fails, address the issues and re-run the full sequence

### JSDoc Documentation Standards

**🚨 ALWAYS use JSDoc format (`/** ... */`) for:**

- **ALL exported functions** - Every function with `export` keyword must have JSDoc docstring describing purpose, parameters, and return value
- **ALL exported classes and methods** - Class constructors, public methods, and static methods
- **ALL exported variables/constants** - Any constant or variable with `export` keyword used outside the current package
- **ALL exported types and interfaces** - Including their properties and purpose
- **ALL interface/type properties** - Individual property descriptions for public APIs

**JSDoc Formatting:**

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

### SDK-Specific JSDoc Patterns

**Financial/Trading Operations:**
- Always document precision and decimal handling for BigDecimal/BigNumber operations
- Include units for financial values (USDC, ETH, etc.)
- Document rounding behavior for price calculations

````typescript
/**
 * Calculates the notional value of a position
 * @param size - Position size in base units (BigDecimal)
 * @param price - Current price per unit (BigDecimal, precision 18)
 * @returns Notional value in quote currency (USDC), rounded to 6 decimal places
 * @throws {InvalidPositionError} When size is zero or negative
 * @example
 * ```typescript
 * const notional = calculateNotional(toBigDecimal('1.5'), toBigDecimal('2500.123456'));
 * console.log(notional.toString()); // "3750.185184"
 * ```
 */
````

**Async Operations with Blockchain:**
- Document gas estimation and transaction behavior
- Include network timeout and retry information
- Specify when operations require wallet signatures

````typescript
/**
 * Places a limit order on the Vertex exchange
 * @param params - Order parameters including product, size, and price
 * @returns Promise resolving to transaction hash and order digest
 * @throws {InsufficientBalanceError} When account lacks required collateral
 * @throws {NetworkError} When blockchain connection fails after 3 retries
 * @example
 * ```typescript
 * const order = await client.spot.placeLimitOrder({
 *   productId: 1,
 *   size: toBigDecimal('100'),
 *   price: toBigDecimal('2500')
 * });
 * console.log(`Order placed: ${order.digest}`);
 * ```
 */
````

**API Response Types:**
- Document nullable fields and their conditions
- Include version compatibility notes for breaking changes
- Specify rate limiting and caching behavior

````typescript
/**
 * Market summary data from the indexer API
 * @interface MarketSummary
 */
interface MarketSummary {
  /** Product ID (uint32) */
  productId: number;
  /** 24h volume in quote currency (USDC), null if no trades */
  volume24h: string | null;
  /** Last trade price, null if no recent trades */
  lastPrice: string | null;
  /** Price change percentage over 24h (-100 to +∞) */
  priceChange24h: string;
}
````

### TypeScript Conventions

- Use `interface` for object shapes that might be extended or implemented
- Use `type` for unions, primitives, computed types, and utility types
- **Never use `any` type** - Prefer `unknown` for truly unknown types, or create proper type definitions
- Use descriptive generic constraints: `<T extends Record<string, unknown>>`

### Class and Method Patterns

✅ **Good client class pattern:**

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

  /**
   * Retrieves current market data for a product
   * @param productId - The product ID to query
   * @returns Promise resolving to market data
   * @throws {ProductNotFoundError} When product ID is invalid
   */
  async getMarketData(productId: number): Promise<MarketData> {
    // Implementation
  }
}
```

### Error Handling Patterns

- Create custom error classes extending base `VertexError`
- Use `@throws` JSDoc tags to document all possible errors
- Provide detailed error context and recovery suggestions

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

### Naming Conventions

- **Use camelCase** for variables, functions, and methods
- **Use PascalCase** for classes, interfaces, types, and enums
- **Use CAPITAL_SNAKE_CASE** for constants and environment variables
- **Client classes** should end with `Client` (e.g., `MarketClient`, `VertexClient`)
- **Error classes** should end with `Error` (e.g., `ValidationError`, `NetworkError`)
- **Type guards** should start with `is` (e.g., `isMarketOrder`, `isValidAddress`)

### Constants and Configuration

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

### Utility Function Patterns

- Write pure functions where possible
- Include comprehensive JSDoc with examples
- Use proper type guards and validators
- Handle edge cases gracefully

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

### Code Quality Checklist

When reviewing SDK code, ensure:

- [ ] JSDoc format is used for all exported functions, classes, and types
- [ ] Proper error handling with custom error classes
- [ ] Type safety with no `any` types
- [ ] Async operations use proper Promise handling
- [ ] Constants are properly frozen and exported
- [ ] Tests cover both success and error scenarios
- [ ] Naming conventions are followed consistently
