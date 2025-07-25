# TypeScript SDK Style Guide

## Test and Verification Sequence

After making edits, **ALWAYS** run the following verification sequence:

1. **Type Check**: `yarn typecheck` - Verify all TypeScript types are correct
2. **Lint Check**: `yarn lint` - Ensure code follows linting rules and standards

After task is complete run:

3. **Build Verification**: `yarn build` - Confirm the project builds successfully without errors
4. **Test Verification**: `yarn test` - Run all tests to ensure functionality remains intact

**Requirements:**

- All four commands must pass successfully before considering a task complete
- Fix any errors found during verification before marking tasks as done
- Run these commands after any significant code changes
- If any command fails, address the issues and re-run the full sequence

## JSDoc Documentation Standards

**🚨 ALWAYS use JSDoc format (`/** ... */`) for:**

- **ALL exported functions** - Every function with `export` keyword must have JSDoc docstring describing its purpose, parameters, and return value
- **ALL exported variables/constants** - Any constant or variable with `export` keyword used outside the current file
- **ALL exported types and interfaces** - Including their properties and purpose
- **ALL interface/type properties** - Individual property descriptions

**⚠️ When you see `export function`, `export const`, `export type`, or `export interface`, automatically add JSDoc format.**

### When NOT to Use JSDoc Format

- **Implementation comments** - Comments inside function bodies explaining logic flow
- **Inline comments** - Comments on the same line as code
- **Temporary/debugging comments** - Comments meant for development purposes only
- **Non-exported private utilities** - Internal helper functions not used elsewhere

### JSDoc Formatting Requirements

#### Basic Structure

```typescript
/**
 * Brief description of the function/variable/type
 * @param {type} paramName - Description of parameter
 * @returns {type} Description of return value
 * @type {type} - For variable type annotations
 */
```

#### Quality Guidelines

- **Be Concise** - Keep descriptions clear and to the point
- **Be Specific** - Explain what the function/variable does, not how it works
- **Use Proper Grammar** - Start with capital letters, end with periods
- **Avoid Redundancy** - Don't repeat information already clear from the code
- **Include Edge Cases** - Document important limitations or special behaviors

### Code Enforcement Rules

**When generating or reviewing code, LLM should:**

1. **Detect export keywords** - Scan for `export function`, `export const`, `export type`, `export interface`
2. **Check for JSDoc** - Verify each export has proper `/** ... */` documentation
3. **Suggest JSDoc format** - Auto-complete JSDoc blocks for any missing documentation
4. **Flag regular comments** - Convert `//` comments above exports to JSDoc format
5. **Apply to all files** - Enforce in `apps/`, `packages/`, and all TypeScript files

### Detection Patterns for Regular Comments Above Exports

**🚨 CRITICAL: Always detect and flag these patterns for JSDoc conversion:**

- `// comment\nexport function` → Convert to JSDoc
- `/* comment */\nexport function` → Convert to JSDoc
- `// comment\nexport const` → Convert to JSDoc
- `// comment\nexport interface` → Convert to JSDoc
- `// comment\nexport type` → Convert to JSDoc
- `// comment\nexport class` → Convert to JSDoc

**Example:**

❌ **Avoid - Regular comment above export:**

```typescript
// calculates position notional value
export function calculateNotional(size: BigDecimal, price: BigDecimal) {
  // Should be converted to JSDoc format
}
```

✅ **Good - Proper JSDoc:**

```typescript
/**
 * Calculates the notional value of a position
 * @param size - Position size in base units (BigDecimal)
 * @param price - Current price per unit (BigDecimal, precision 18)
 * @returns Notional value in quote currency (USDC), rounded to 6 decimal places
 * @throws {InvalidPositionError} When size is zero or negative
 */
export function calculateNotional(
  size: BigDecimal,
  price: BigDecimal,
): BigDecimal {
  // Implementation
}
```

## TypeScript Conventions

- Use `interface` for object shapes that might be extended or implemented
- Use `type` for unions, primitives, computed types, and utility types
- **Never use `any` type** - Prefer `unknown` for truly unknown types, or create proper type definitions
- Use descriptive generic constraints: `<T extends Record<string, unknown>>`

## Class and Method Patterns

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

## Error Handling Patterns

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

## Naming Conventions

- **Use camelCase** for variables, functions, and methods
- **Use PascalCase** for classes, interfaces, types, and enums
- **Use CAPITAL_SNAKE_CASE** for constants and environment variables
- **Client classes** should end with `Client` (e.g., `MarketClient`, `VertexClient`)
- **Error classes** should end with `Error` (e.g., `ValidationError`, `NetworkError`)
- **Type guards** should start with `is` (e.g., `isMarketOrder`, `isValidAddress`)

## Constants and Configuration

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

## Utility Function Patterns

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

## Code Quality Checklist

When reviewing SDK code, ensure:

- [ ] JSDoc format is used for all exported functions, classes, and types
- [ ] Proper error handling with custom error classes
- [ ] Type safety with no `any` types
- [ ] Async operations use proper Promise handling
- [ ] Constants are properly frozen and exported
- [ ] Tests cover both success and error scenarios
- [ ] Naming conventions are followed consistently