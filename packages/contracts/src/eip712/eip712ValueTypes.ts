import {
  EIP712BurnLpParams,
  EIP712LinkSignerParams,
  EIP712LiquidateSubaccountParams,
  EIP712ListTriggerOrdersParams,
  EIP712MintLpParams,
  EIP712CancelOrdersParams,
  EIP712OrderParams,
  EIP712CancelProductOrdersParams,
  EIP712WithdrawCollateralParams,
  EIP712TransferQuoteParams,
} from './signatureParamTypes';
import { BigNumberish } from 'ethers';

type WithEIP712Sender<
  T extends { subaccountOwner: string; subaccountName: string },
> = Omit<T, 'subaccountOwner' | 'subaccountName'> & {
  // Hex encoded bytes32
  sender: string;
};

export type EIP712WithdrawCollateralValues =
  WithEIP712Sender<EIP712WithdrawCollateralParams>;

export type EIP712MintLpValues = WithEIP712Sender<EIP712MintLpParams>;

export type EIP712BurnLpValues = WithEIP712Sender<EIP712BurnLpParams>;

export type EIP712LiquidateSubaccountValues = Omit<
  WithEIP712Sender<EIP712LiquidateSubaccountParams>,
  'liquidateeOwner' | 'liquidateeName'
> & {
  // Hex encoded bytes32
  liquidatee: string;
};

export type EIP712OrderValues = Omit<
  WithEIP712Sender<EIP712OrderParams>,
  'price'
> & {
  priceX18: BigNumberish;
};

export type EIP712ListTriggerOrdersValues =
  WithEIP712Sender<EIP712ListTriggerOrdersParams>;

export type EIP712OrderCancellationValues =
  WithEIP712Sender<EIP712CancelOrdersParams>;

export type EIP712ProductOrdersCancellationValues =
  WithEIP712Sender<EIP712CancelProductOrdersParams>;

export type EIP712LinkSignerValues = WithEIP712Sender<EIP712LinkSignerParams>;

export type EIP712TransferQuoteValues = Omit<
  WithEIP712Sender<EIP712TransferQuoteParams>,
  'recipientName'
> & {
  // Hex encoded bytes32
  recipient: string;
};

/**
 * All possible requests to be signed, to the EIP712 value interface
 */
export interface SignableRequestTypeToEIP712Values {
  withdraw_collateral: EIP712WithdrawCollateralValues;
  mint_lp: EIP712MintLpValues;
  burn_lp: EIP712BurnLpValues;
  place_order: EIP712OrderValues;
  list_trigger_orders: EIP712ListTriggerOrdersValues;
  cancel_orders: EIP712OrderCancellationValues;
  cancel_product_orders: EIP712ProductOrdersCancellationValues;
  liquidate_subaccount: EIP712LiquidateSubaccountValues;
  link_signer: EIP712LinkSignerValues;
  transfer_quote: EIP712TransferQuoteValues;
}
