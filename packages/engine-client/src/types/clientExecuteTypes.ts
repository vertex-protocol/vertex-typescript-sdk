import {
  MintLpParams,
  OrderParams,
  WithdrawCollateralParams,
} from '@vertex-protocol/contracts';

export type WithoutNonce<T extends { nonce: unknown }> = Omit<T, 'nonce'>;

type WithSpotLeverage<T> = T & {
  spotLeverage?: boolean;
};

// Either verifying address or signature must be provided
// If signature is not provided, the verifying address with the engine signer will be used to sign
type SignatureParams =
  | {
      // Endpoint address for all executes except order placement
      verifyingAddr: string;
    }
  | {
      signature: string;
    };

export type WithBaseEngineExecuteParams<T> = T &
  SignatureParams & {
    nonce?: string;
  };

export type EngineWithdrawCollateralParams =
  WithSpotLeverage<WithdrawCollateralParams>;

export type EngineMintLpParams = WithSpotLeverage<MintLpParams>;

export type OrderParamsWithoutNonce = WithoutNonce<OrderParams>;

export interface BaseEnginePlaceOrderParams {
  productId: number;
  order: OrderParamsWithoutNonce;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spotLeverage?: boolean;
}

export interface EngineExecuteRequestParamsByType {
  // TODO
  liquidate_subaccount: never;
  mint_lp: never;
  withdraw_collateral: WithBaseEngineExecuteParams<
    WithSpotLeverage<EngineWithdrawCollateralParams>
  >;
  burn_lp: never;
  place_order: WithBaseEngineExecuteParams<BaseEnginePlaceOrderParams>;
  cancel_orders: never;
}
