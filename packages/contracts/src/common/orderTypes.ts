import { BigNumber } from 'ethers';

export interface OrderbookID {
  priceX18: string;
  queuePos: BigNumber;
}

interface BaseOrder {
  price: BigNumber;
  amount: BigNumber;
  filled: BigNumber;
  productId: number;
  // Whether an order is currently stored within orderbook state
  onBookContract: boolean;
}

export interface OrderbookOrder extends BaseOrder {
  orderbookId: OrderbookID;
  status: 'filled' | 'on_book' | 'cancelled' | 'expired';
  expiration: number;
}

export type ImmediateFillOrder = BaseOrder;
