import { BigNumber } from 'ethers';

/**
 * Compound ID to retrieve an order from the orderbook
 */
export interface OrderbookID {
  // X18 fixed point price
  priceX18: string;
  // Orderbook queue position for the given price
  queuePos: BigNumber;
}

/**
 * Shared properties across orders placed on the orderbook and orders filled immediately
 */
interface BaseOrder {
  price: BigNumber;
  // Initial order amount of the order request
  initialAmount: BigNumber;
  // Amount filled so far
  filledAmount: BigNumber;
  productId: number;
  // Whether the order was filled immediately on placing the order
  isImmediateFill: boolean;
}

export interface OrderbookOrder extends BaseOrder {
  orderbookId: OrderbookID;
  status: 'filled' | 'on_book' | 'cancelled' | 'expired';
  isImmediateFill: false;
  expiration: number;
  /**
   * Whether an order is currently stored within orderbook state. An order can be expired but not yet
   * removed from the orderbook as this is done in a lazy manner.
   */
  onBookContract: boolean;
}

export interface ImmediateFillOrder extends BaseOrder {
  isImmediateFill: true;
}
