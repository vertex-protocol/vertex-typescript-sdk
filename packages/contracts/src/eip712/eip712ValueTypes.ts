import {
  BurnLpParams,
  LinkSignerParams,
  LiquidateSubaccountParams,
  ListTriggerOrdersParams,
  MintLpParams,
  OrderCancellationParams,
  OrderParams,
  ProductOrdersCancellationParams,
  WithdrawCollateralParams,
} from './signatureParamTypes';

type WithEIP712Sender<
  T extends { subaccountOwner: string; subaccountName: string },
> = Omit<T, 'subaccountOwner' | 'subaccountName'> & {
  // Hex encoded bytes32
  sender: string;
};

export type EIP712WithdrawCollateralValues =
  WithEIP712Sender<WithdrawCollateralParams>;

export type EIP712MintLpValues = WithEIP712Sender<MintLpParams>;

export type EIP712BurnLpValues = WithEIP712Sender<BurnLpParams>;

export type EIP712LiquidateSubaccountValues = Omit<
  WithEIP712Sender<LiquidateSubaccountParams>,
  'liquidateeOwner' | 'liquidateeName'
> & {
  // Hex encoded bytes32
  liquidatee: string;
};

export type EIP712OrderValues = Omit<WithEIP712Sender<OrderParams>, 'price'> & {
  priceX18: string;
};

export type EIP712ListTriggerOrdersValues =
  WithEIP712Sender<ListTriggerOrdersParams>;

export type EIP712OrderCancellationValues =
  WithEIP712Sender<OrderCancellationParams>;

export type EIP712ProductOrdersCancellationValues =
  WithEIP712Sender<ProductOrdersCancellationParams>;

export type EIP712LinkSignerValues = WithEIP712Sender<LinkSignerParams>;

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
}
