import { BigNumberish } from 'ethers';

export interface EngineServerSpotBalanceData {
  amount: BigNumberish;
  last_cumulative_multiplier_x18: BigNumberish;
}

export interface EngineServerSpotLpBalanceData {
  amount: BigNumberish;
}

export interface EngineServerPerpBalanceData {
  amount: BigNumberish;
  v_quote_balance: BigNumberish;
  last_cumulative_funding_x18: BigNumberish;
}

export interface EngineServerPerpLpBalanceData {
  amount: BigNumberish;
  last_cumulative_funding_x18: BigNumberish;
}

export interface EngineServerRisk {
  long_weight_initial_x18: BigNumberish;
  short_weight_initial_x18: BigNumberish;
  long_weight_maintenance_x18: BigNumberish;
  short_weight_maintenance_x18: BigNumberish;
  large_position_penalty_x18: BigNumberish;
}

export interface EngineServerBookInfo {
  size_increment: BigNumberish;
  price_increment_x18: BigNumberish;
  collected_fees: BigNumberish;
  lp_spread_x18: BigNumberish;
}

export interface EngineServerSpotConfig {
  token: string;
  interest_inflection_util_x18: BigNumberish;
  interest_floor_x18: BigNumberish;
  interest_small_cap_x18: BigNumberish;
  interest_large_cap_x18: BigNumberish;
}

export interface EngineServerSpotState {
  cumulative_deposits_multiplier_x18: BigNumberish;
  cumulative_borrows_multiplier_x18: BigNumberish;
  total_deposits_normalized: BigNumberish;
  total_borrows_normalized: BigNumberish;
  last_update_time: BigNumberish;
}

export interface EngineServerSpotLpState {
  supply: BigNumberish;
  quote: EngineServerSpotBalanceData;
  base: EngineServerSpotBalanceData;
  last_update_time: BigNumberish;
}

export interface EngineServerPerpState {
  cumulative_funding_long_x18: BigNumberish;
  cumulative_funding_short_x18: BigNumberish;
  open_interest: BigNumberish;
  available_settle: BigNumberish;
  last_update_time: BigNumberish;
}

export interface EngineServerPerpLpState {
  supply: BigNumberish;
  base: BigNumberish;
  quote: BigNumberish;
  last_cumulative_funding_x18: BigNumberish;
  cumulative_funding_per_lp_x18: BigNumberish;
  last_update_time: BigNumberish;
}

export interface EngineServerSpotProduct {
  product_id: number;
  oracle_price_x18: BigNumberish;
  risk: EngineServerRisk;
  config: EngineServerSpotConfig;
  state: EngineServerSpotState;
  lp_state: EngineServerSpotLpState;
  book_info: EngineServerBookInfo;
}

export interface EngineServerSpotBalance {
  product_id: number;
  balance: EngineServerSpotBalanceData;
  lp_balance: EngineServerSpotLpBalanceData;
  initial_x18: BigNumberish;
  maintenance_x18: BigNumberish;
  pnl_x18: BigNumberish;
}

export interface EngineServerPerpProduct {
  product_id: number;
  oracle_price_x18: BigNumberish;
  mark_price_x18: BigNumberish;
  risk: EngineServerRisk;
  state: EngineServerPerpState;
  lp_state: EngineServerPerpLpState;
  book_info: EngineServerBookInfo;
}

export interface EngineServerPerpBalance {
  product_id: number;
  balance: EngineServerPerpBalanceData;
  lp_balance: EngineServerPerpLpBalanceData;
  initial_x18: BigNumberish;
  maintenance_x18: BigNumberish;
  pnl_x18: BigNumberish;
}
