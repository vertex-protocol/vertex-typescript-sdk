export interface VertexMatchOrdersTx {
  match_orders: {
    product_id: number;
  };
}

export interface VertexMatchOrdersRfqTx {
  match_orders_r_f_q: {
    product_id: number;
  };
}

export interface VertexLiquidateSubaccountTx {
  liquidate_subaccount: {
    sender: string;
    liquidatee: string;
    mode: number;
    // On V2 - should encode health group
    product_id: number | undefined;
    // On V1
    health_group: number | undefined;
    amount: string;
    nonce: number;
  };
}

export interface VertexWithdrawCollateralTx {
  withdraw_collateral: {
    sender: string;
    product_id: number;
    amount: string;
    nonce: number;
  };
}

export interface VertexDepositCollateralTx {
  deposit_collateral: {
    sender: string;
    product_id: number;
    amount: string;
  };
}

export interface VertexTransferQuoteTx {
  transfer_quote: {
    sender: string;
    recipient: string;
    amount: string;
    nonce: number;
  };
}

export type VertexTx =
  | VertexMatchOrdersTx
  | VertexMatchOrdersRfqTx
  | VertexLiquidateSubaccountTx
  | VertexDepositCollateralTx
  | VertexTransferQuoteTx
  | VertexWithdrawCollateralTx
  | {
      // TODO: Populate all types
      [key: string]: never;
    };
