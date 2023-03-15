// TODO: Populate all types

export type VertexMatchOrdersTx = {
  match_orders: {
    product_id: number;
  };
};

export type VertexTx = VertexMatchOrdersTx | any;
