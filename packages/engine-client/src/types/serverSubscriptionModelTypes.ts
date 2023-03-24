export interface SubscriptionTradeEvent {
  timestamp: number;
  product_id: 1;
  price: string;
  taker_qty: string;
  maker_qty: string;
  is_taker_buyer: boolean;
}

export interface SubscriptionBestBidOfferEvent {
  timestamp: number;
  product_id: number;
  bid_price: string;
  bid_qty: string;
  ask_price: string;
  ask_qty: string;
}

export interface SubscriptionFillEvent {
  timestamp: number;
  product_id: number;
  subaccount: string;
  order_digest: string;
  filled_qty: string;
  remaining_qty: string;
  price: string;
  is_taker: boolean;
}

export interface SubscriptionPositionChangeEvent {
  timestamp: number;
  product_id: number;
  is_lp: false;
  subaccount: string;
  amount: string;
  v_quote_amount: string;
}

export type BookDepthBid = [string, string];

export type BookDepthAsk = [string, string];

export interface SubscriptionBookDepthEvent {
  min_timestamp: number;
  max_timestamp: number;
  product_id: number;
  bids: BookDepthBid[];
  asks: BookDepthAsk[];
}
