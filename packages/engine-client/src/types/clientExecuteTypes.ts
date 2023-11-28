import {
  BurnLpParams,
  LinkSignerParams,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  ProductOrdersCancellationParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import { EngineServerExecuteResult } from './serverExecuteTypes';
import { BigNumberish } from 'ethers';

/**
 * Either verifying address or signature must be provided;
 * If signature is not provided, the verifying address with the engine signer will be used to sign.
 */
export type SignatureParams =
  | {
      // Endpoint address for all executes except order placement
      verifyingAddr: string;
      chainId: BigNumberish;
    }
  | {
      signature: string;
    };

type WithoutNonce<T extends { nonce: unknown }> = Omit<T, 'nonce'>;

type WithSpotLeverage<T> = T & {
  spotLeverage?: boolean;
};

export type WithSignature<T> = T & {
  signature: string;
};

// Params associated with all engine executes
export type WithBaseEngineExecuteParams<T> = SignatureParams &
  Omit<T, 'nonce'> & {
    nonce?: string;
  };

export type EngineMintLpParams = WithSpotLeverage<MintLpParams>;

export type EngineOrderParams = WithoutNonce<OrderParams>;

export type EngineExecutePlaceOrderParams = WithBaseEngineExecuteParams<{
  productId: number;
  order: EngineOrderParams;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spotLeverage?: boolean;
}>;

export type EngineExecuteLiquidateSubaccountParams =
  WithBaseEngineExecuteParams<LiquidateSubaccountParams>;

export type EngineExecuteMintLpParams =
  WithBaseEngineExecuteParams<EngineMintLpParams>;

export type EngineExecuteBurnLpParams =
  WithBaseEngineExecuteParams<BurnLpParams>;

export type EngineExecuteWithdrawCollateralParams = WithBaseEngineExecuteParams<
  WithSpotLeverage<WithdrawCollateralParams>
>;

export type EngineExecuteCancelOrdersParams =
  WithBaseEngineExecuteParams<OrderCancellationParams>;

export type EngineExecuteCancelAndPlaceParams = {
  cancelOrders: EngineExecuteCancelOrdersParams;
  placeOrder: EngineExecutePlaceOrderParams;
};

export type EngineExecuteCancelProductOrdersParams =
  WithBaseEngineExecuteParams<ProductOrdersCancellationParams>;

export type EngineExecuteLinkSignerParams =
  WithBaseEngineExecuteParams<LinkSignerParams>;

export interface EngineExecuteRequestParamsByType {
  liquidate_subaccount: EngineExecuteLiquidateSubaccountParams;
  mint_lp: EngineExecuteMintLpParams;
  withdraw_collateral: EngineExecuteWithdrawCollateralParams;
  burn_lp: EngineExecuteBurnLpParams;
  place_order: EngineExecutePlaceOrderParams;
  cancel_orders: EngineExecuteCancelOrdersParams;
  cancel_and_place: EngineExecuteCancelAndPlaceParams;
  cancel_product_orders: EngineExecuteCancelProductOrdersParams;
  link_signer: EngineExecuteLinkSignerParams;
}

export type EngineExecutePlaceOrderResult = EngineServerExecuteResult & {
  orderParams: OrderParams;
};
