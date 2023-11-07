// TODO: Populate all types

export interface VertexMatchOrdersTx {
  match_orders: {
    product_id: number;
  };
}

export interface VertexLiquidateSubaccountTx {
  liquidate_subaccount: {
    sender: string;
    liquidatee: string;
    mode: number;
    health_group: number;
    amount: string;
    nonce: number;
  };
}

export type VertexTx = VertexMatchOrdersTx | VertexLiquidateSubaccountTx | any;
