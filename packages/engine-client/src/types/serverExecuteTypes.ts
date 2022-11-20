import {
  BurnLpParams,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  SignedTx,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';

export interface EngineServerExecutionResult {
  status: 'success' | 'failure';
  error?: {
    message: string; // Revert message, defaulting to "" if none
  };
}

export type EngineServerOrderParams = Omit<OrderParams, 'price'> & {
  priceX18: string;
};

export interface EngineServerPlaceOrderParams {
  product_id: number;
  order: EngineServerOrderParams;
  // Bytes
  signature: string;
}

export interface EngineServerExecuteRequestByType {
  liquidate_subaccount: SignedTx<LiquidateSubaccountParams>;
  withdraw_collateral: SignedTx<WithdrawCollateralParams>;
  mint_lp: SignedTx<MintLpParams>;
  burn_lp: SignedTx<BurnLpParams>;
  place_order: EngineServerPlaceOrderParams;
  cancel_orders: SignedTx<OrderCancellationParams>;
}

export type EngineServerExecuteRequestType =
  keyof EngineServerExecuteRequestByType;
