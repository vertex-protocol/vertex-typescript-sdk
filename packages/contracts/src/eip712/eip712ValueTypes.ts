import {
  BurnLpParams,
  LiquidateSubaccountParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';
import { Bytes } from 'ethers/lib/utils';

type WithEIP712Sender<T extends { sender: string; subaccountName: string }> =
  Omit<T, 'sender' | 'subaccountName'> & {
    sender: Bytes;
  };

export type EIP712WithdrawCollateralValues =
  WithEIP712Sender<WithdrawCollateralParams>;

export type EIP712MintLpValues = WithEIP712Sender<MintLpParams>;

export type EIP712BurnLpValues = WithEIP712Sender<BurnLpParams>;

export type EIP712LiquidateSubaccountValues = Omit<
  WithEIP712Sender<LiquidateSubaccountParams>,
  'liquidateeOwner' | 'liquidateeName'
> & {
  liquidatee: Bytes;
};

export type EIP712OrderValues = Omit<WithEIP712Sender<OrderParams>, 'price'> & {
  priceX18: string;
};

export type EIP712OrderCancellationValues =
  WithEIP712Sender<OrderCancellationParams>;

/**
 * All possible requests to be signed, to the EIP712 value interface
 */
export interface SignableRequestTypeToEIP712Values {
  withdraw_collateral: EIP712WithdrawCollateralValues;
  mint_lp: EIP712MintLpValues;
  burn_lp: EIP712BurnLpValues;
  place_order: EIP712OrderValues;
  cancel_orders: EIP712OrderCancellationValues;
  liquidate_subaccount: EIP712LiquidateSubaccountValues;
}
