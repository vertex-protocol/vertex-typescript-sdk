export interface EngineServerExecutionResult {
  status: 'success' | 'failure';
  error?: {
    message: string; // Revert message, defaulting to "" if none
  };
}

export interface EngineServerPlaceOrderParams {
  product_id: number;
  // Bytes
  digest: string;
  // Bytes
  signed_order: string;
}

export interface EngineServerCancelOrderParams {
  product_id: number;
  // Bytes
  digest: string;
  // Bytes
  signed_order: string;
}

export interface EngineServerExecuteRequestByType {
  // String types are bytes
  liquidate_subaccount: string;
  deposit_collateral: string;
  withdraw_collateral: string;
  update_time: string;
  update_price: string;
  settle_pnl: string;
  place_order: EngineServerPlaceOrderParams;
  cancel_order: EngineServerCancelOrderParams;
}

export type EngineServerExecuteRequestType =
  keyof EngineServerExecuteRequestByType;
