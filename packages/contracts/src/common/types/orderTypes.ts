import { BigNumberish } from 'ethers';

// TODO: Change when Graph is finalized
export type OrderbookID = string;

export type OrderAction = 'order' | 'cancellation';

/**
 * TODO: Remove this
 * An abstraction type to be used to map to OffchainBook order structs
 */
export interface OrderbookOrder {
  /**
   * IOC/FOK not currently supported
   * Number -> Expiration time in seconds
   */
  expiration: BigNumberish;
  // Subaccount ID to use for this order, the resulting signed order must be signed by the owner of the subaccount
  subaccountId: BigNumberish;
  // Limit price
  price: BigNumberish;
  // Positive for buy, negative for sell
  amount: BigNumberish;
  // A unique nonce to identify the order
  nonce: BigNumberish;
}

export interface OrderbookRequest {
  action: OrderAction;
  order: OrderbookOrder;
}

/**
 * Representation of the ValidationResult enum used within the contract
 * Enums do not get reflected in the ABI, so this must be manually defined
 */
export enum ValidationResult {
  VALID, // passed all checks
  PRE_VALID, // passed pre-checks
  // pre-check failure modes
  INVALID_PRICE,
  INVALID_SIZE,
  INVALID_SIGNATURE,
  // post-check failure modes
  RISK_CHECK_FAILED, // failed health check
  EXPIRED, // order expired
  CANCELLED, // order cancelled explicitly by user
  FILLED, // fully filled
}

/**
 * Maps a raw ValidationResult enum value to the proper type
 * @param val
 */
export function toValidationResult(val: number): ValidationResult {
  switch (val) {
    case 0:
      return ValidationResult.VALID;
    case 1:
      return ValidationResult.PRE_VALID;
    case 2:
      return ValidationResult.INVALID_PRICE;
    case 3:
      return ValidationResult.INVALID_SIZE;
    case 4:
      return ValidationResult.INVALID_SIGNATURE;
    case 5:
      return ValidationResult.RISK_CHECK_FAILED;
    case 6:
      return ValidationResult.EXPIRED;
    case 7:
      return ValidationResult.CANCELLED;
    case 8:
      return ValidationResult.FILLED;
    default:
      throw new Error(`Unknown validation result: ${val}`);
  }
}
