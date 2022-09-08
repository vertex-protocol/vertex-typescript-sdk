import { BigNumberish } from 'ethers';

export interface RedisSpotProduct {
  productId: number;
  price_x18: BigNumberish;
  cumulative_deposits_multiplier_x18: BigNumberish;
  cumulative_borrows_multiplier_x18: BigNumberish;
  total_deposits_normalized_x18: BigNumberish;
  total_borrows_normalized_x18: BigNumberish;
  last_update_time: BigNumberish;
}

export interface RedisSpotBalance {
  productId: number;
  amount_x18: BigNumberish;
  initial_x18: BigNumberish;
  maintenance_x18: BigNumberish;
  pnl_x18: BigNumberish;
}

export interface RedisPerpProduct {
  productId: number;
  price_x18: BigNumberish;
  ema_price_x18: BigNumberish;
  cumulative_funding_long_x18: BigNumberish;
  cumulative_funding_short_x18: BigNumberish;
  open_interest_x18: BigNumberish;
  funding_last_updated: BigNumberish;
  ema_price_last_updated: BigNumberish;
  available_settle_x18: BigNumberish;
}

export interface RedisPerpBalance {
  productId: number;
  amount_x18: BigNumberish;
  v_quote_balance_x18: BigNumberish;
  last_cumulative_funding_x18: BigNumberish;
  initial_x18: BigNumberish;
  maintenance_x18: BigNumberish;
  pnl_x18: BigNumberish;
}
