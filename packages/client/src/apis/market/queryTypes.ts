import { BigNumberish } from 'ethers';
import { EngineOrder } from '@vertex-protocol/engine-client';

export interface GetOrdersForSubaccountParams {
  productId: number;
  subaccountId: BigNumberish;
}

// TODO: This needs consolidation with graph data
export interface GetOrdersForSubaccountResponse {
  engineOrders: EngineOrder[];
}
