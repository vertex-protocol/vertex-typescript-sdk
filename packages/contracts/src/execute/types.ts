import { BigNumberish, Overrides } from 'ethers';
import { PromiseOrValue } from '../typechain-types/common';
import { OrderbookID } from '../common/orderTypes';

export type ExecuteOverrides = Overrides & { from?: PromiseOrValue<string> };

export interface ApproveAllowanceParams {
  productId: BigNumberish;
  amount: BigNumberish;
}

export type MintMockERC20Params = ApproveAllowanceParams;

export interface ModifyCollateralParams {
  subaccountName: string;
  operations: {
    productId: BigNumberish;
    amount: BigNumberish;
  }[];
}

export type OrderbookRequest =
  | {
      type: 'new_order';
      // IOC -> Fill as much as possible, don't place rest on book
      // FOK -> Revert if not completely filled
      // Number -> Expiration time in seconds
      expiration: 'ioc' | 'fok' | number;
      price: 'market' | BigNumberish;
      // Positive for buy, negative for sell
      amount: BigNumberish;
    }
  | {
      type: 'cancel_order';
      id: OrderbookID;
    };

export interface SendOrdersParams {
  subaccountName: string;
  productId: BigNumberish;
  requests: OrderbookRequest[];
}

export interface LiquidateSubaccountParams {
  subaccountName: string;
  liquidateeSubaccountId: BigNumberish;
  productId: BigNumberish;
  amount: BigNumberish;
}

export interface SettlePnlParams {
  subaccountIds: BigNumberish[];
}
