import {
  EIP712BurnLpParams,
  EIP712CancelOrdersParams,
  EIP712CancelProductOrdersParams,
  EIP712LinkSignerParams,
  EIP712LiquidateSubaccountParams,
  EIP712MintLpParams,
  EIP712OrderParams,
  EIP712WithdrawCollateralParams,
} from '@vertex-protocol/contracts';
import { BigNumberish } from 'ethers';
import { EngineServerExecuteResult } from './serverExecuteTypes';

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

export type EngineOrderParams = WithoutNonce<EIP712OrderParams>;

export type EnginePlaceOrderParams = WithBaseEngineExecuteParams<{
  id?: number;
  productId: number;
  order: EngineOrderParams;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spotLeverage?: boolean;
}>;

export type EngineLiquidateSubaccountParams =
  WithBaseEngineExecuteParams<EIP712LiquidateSubaccountParams>;

export type EngineMintLpParams = WithBaseEngineExecuteParams<
  WithSpotLeverage<EIP712MintLpParams>
>;

export type EngineBurnLpParams =
  WithBaseEngineExecuteParams<EIP712BurnLpParams>;

export type EngineWithdrawCollateralParams = WithBaseEngineExecuteParams<
  WithSpotLeverage<EIP712WithdrawCollateralParams>
>;

export type EngineCancelOrdersParams =
  WithBaseEngineExecuteParams<EIP712CancelOrdersParams>;

export type EngineCancelAndPlaceParams = {
  cancelOrders: EngineCancelOrdersParams;
  placeOrder: EnginePlaceOrderParams;
};

export type EngineCancelProductOrdersParams =
  WithBaseEngineExecuteParams<EIP712CancelProductOrdersParams>;

export type EngineLinkSignerParams =
  WithBaseEngineExecuteParams<EIP712LinkSignerParams>;

export interface EngineExecuteRequestParamsByType {
  liquidate_subaccount: EngineLiquidateSubaccountParams;
  mint_lp: EngineMintLpParams;
  withdraw_collateral: EngineWithdrawCollateralParams;
  burn_lp: EngineBurnLpParams;
  place_order: EnginePlaceOrderParams;
  cancel_orders: EngineCancelOrdersParams;
  cancel_and_place: EngineCancelAndPlaceParams;
  cancel_product_orders: EngineCancelProductOrdersParams;
  link_signer: EngineLinkSignerParams;
}

export type EnginePlaceOrderResult = EngineServerExecuteResult & {
  orderParams: EIP712OrderParams;
};
