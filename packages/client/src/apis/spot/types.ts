import { EngineExecuteWithdrawCollateralParams } from '@vertex-protocol/engine-client';
import { BigNumberish } from 'ethers';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';

export type ProductIdOrTokenAddress =
  | {
      productId: number;
    }
  | {
      tokenAddress: string;
    };

type TokenQueryParams = {
  address: string;
} & ProductIdOrTokenAddress;

export type ExecuteApproveAllowanceParams = ProductIdOrTokenAddress & {
  amount: BigNumberish;
};

export type QueryTokenWalletBalanceParams = TokenQueryParams;

export type QueryTokenAllowanceParams = TokenQueryParams;

export type ExecuteWithdrawCollateralParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteWithdrawCollateralParams>
>;
