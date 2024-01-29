import { EngineServerPriceTickLiquidity } from './serverQueryTypes';

/**
 * @description Event from subscribing to a `trade` stream.
 */
export interface SubscriptionTradeEvent {
  timestamp: string;
  product_id: number;
  price: string;
  taker_qty: string;
  maker_qty: string;
  is_taker_buyer: boolean;
}

/**
 * @description Event from subscribing to a `best_bid_offer` stream.
 */
export interface SubscriptionBestBidOfferEvent {
  timestamp: string;
  product_id: number;
  bid_price: string;
  bid_qty: string;
  ask_price: string;
  ask_qty: string;
}

/**
 * @description Event from subscribing to a `fill` stream.
 */
export interface SubscriptionFillEvent {
  id?: string;
  timestamp: string;
  product_id: number;
  subaccount: string;
  order_digest: string;
  filled_qty: string;
  remaining_qty: string;
  price: string;
  is_taker: boolean;
}

/**
 * @description Event from subscribing to a `position_change` stream.
 */
export interface SubscriptionPositionChangeEvent {
  timestamp: string;
  product_id: number;
  is_lp: false;
  subaccount: string;
  amount: string;
  v_quote_amount: string;
}

export interface SubscriptionBookDepthEvent {
  min_timestamp: string;
  max_timestamp: string;
  product_id: number;
  bids: EngineServerPriceTickLiquidity[];
  asks: EngineServerPriceTickLiquidity[];
}
