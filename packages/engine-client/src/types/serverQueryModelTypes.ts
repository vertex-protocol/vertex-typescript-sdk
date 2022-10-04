import { BigNumberish } from 'ethers';

export interface EngineServerBookInfo {
  size_increment_x18: BigNumberish;
  price_increment_x18: BigNumberish;
  collected_fees_x18: BigNumberish;
  mark_price_x18: BigNumberish;
}

export interface EngineServerSpotConfig {
  token: string;
  long_weight_initial_x18: BigNumberish;
  short_weight_initial_x18: BigNumberish;
  long_weight_maintenance_x18: BigNumberish;
  short_weight_maintenance_x18: BigNumberish;
  interest_inflection_util_x18: BigNumberish;
  interest_floor_x18: BigNumberish;
  interest_small_cap_x18: BigNumberish;
  interest_large_cap_x18: BigNumberish;
  large_position_penalty_x18: BigNumberish;
}

export interface EngineServerPerpConfig {
  long_weight_initial_x18: BigNumberish;
  short_weight_initial_x18: BigNumberish;
  long_weight_maintenance_x18: BigNumberish;
  short_weight_maintenance_x18: BigNumberish;
  large_position_penalty_x18: BigNumberish;
}

export interface EngineServerSpotProduct {
  product_id: number;
  price_x18: BigNumberish;
  cumulative_deposits_multiplier_x18: BigNumberish;
  cumulative_borrows_multiplier_x18: BigNumberish;
  total_deposits_normalized_x18: BigNumberish;
  total_borrows_normalized_x18: BigNumberish;
  last_update_time: BigNumberish;
  config: EngineServerSpotConfig;
  book_info: EngineServerBookInfo;
}

export interface EngineServerSpotBalance {
  product_id: number;
  amount_x18: BigNumberish;
  initial_x18: BigNumberish;
  maintenance_x18: BigNumberish;
  pnl_x18: BigNumberish;
}

export interface EngineServerPerpProduct {
  product_id: number;
  price_x18: BigNumberish;
  ema_price_x18: BigNumberish;
  cumulative_funding_long_x18: BigNumberish;
  cumulative_funding_short_x18: BigNumberish;
  open_interest_x18: BigNumberish;
  funding_last_updated: BigNumberish;
  ema_price_last_updated: BigNumberish;
  available_settle_x18: BigNumberish;
  config: EngineServerPerpConfig;
  book_info: EngineServerBookInfo;
}

export interface EngineServerPerpBalance {
  product_id: number;
  amount_x18: BigNumberish;
  v_quote_balance_x18: BigNumberish;
  last_cumulative_funding_x18: BigNumberish;
  initial_x18: BigNumberish;
  maintenance_x18: BigNumberish;
  pnl_x18: BigNumberish;
}
