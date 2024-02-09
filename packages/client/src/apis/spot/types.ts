import { BigNumberish } from 'ethers';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';
import { EngineExecuteWithdrawCollateralParams } from '@vertex-protocol/engine-client';

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

export type ApproveAllowanceParams = ProductIdOrTokenAddress & {
  amount: BigNumberish;
};

export type GetTokenWalletBalanceParams = TokenQueryParams;

export type GetTokenAllowanceParams = TokenQueryParams;

export type WithdrawCollateralParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteWithdrawCollateralParams>
>;
