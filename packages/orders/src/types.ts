import { BigNumberish } from 'ethers';
import { IOffchainBook } from '@vertex-protocol/contracts';

/**
 * Base types
 */

export type EngineAppResponse<TResult> =
  | {
      status: 'failed';
      reason: string;
    }
  | {
      status: 'success';
      result: TResult;
    };

export interface EngineOrder {
  subaccount: BigNumberish;
  priceX18: BigNumberish;
  amount: BigNumberish;
  expiration: BigNumberish;
  nonce: BigNumberish;
}

// Represents an order with an accompanying signature by the order sender
export interface SignedEngineOrder {
  order: EngineOrder;
  signature: string;
}

export interface GetOrdersResult {
  // Currently enqueued for processing or placement on book
  enqueued: SignedEngineOrder[];
  // Currently placed on book
  open: SignedEngineOrder[];
}

type BookTickLiquidity = {
  // Price for this tick
  price: BigNumberish;
  // Total liquidity available at this price tick
  liquidity: BigNumberish;
};

// Returned results will only have tick levels that have active liquidity, zero-liquidity tick levels will not be returned
export interface BookLiquidityResult {
  bids: BookTickLiquidity[];
  asks: BookTickLiquidity[];
}

/**
 * Client request & response types
 */

interface BaseParams {
  // Address of the orderbook associated with the request
  orderbookAddress: string;
}

export interface SubmitOrderParams extends BaseParams {
  order: IOffchainBook.SignedOrderStruct;
}

export interface SubmitOrderResponse {
  digest: string;
}

export interface CancelOrderParams extends BaseParams {
  order: IOffchainBook.SignedOrderStruct;
}

export interface CancelOrderResponse {
  digest: string;
}

export interface GetSubaccountOrdersParams extends BaseParams {
  subaccountId: BigNumberish;
}

export type GetSubaccountOrdersResponse = GetOrdersResult;

export interface GetOrderByDigestParams extends BaseParams {
  digest: string;
}

export type GetOrderByDigestResponse = GetOrdersResult;

export interface GetBookLiquidityParams extends BaseParams {
  /**
   * Number of price ticks on each side (bid/ask) around the current price to return.
   * The matching engine does not return price ticks with zero liquidity,
   * so the returned price ticks may extend beyond the hypothetical orderbook depth with evenly spaced
   * ticks at increments of the orderbook's price tick size.
   *
   * @default 20
   * @example If depth is 20, there will be up to 20 bid ticks and 20 ask ticks returned
   */
  depth?: number;
}

export type GetBookLiquidityResponse = BookLiquidityResult;