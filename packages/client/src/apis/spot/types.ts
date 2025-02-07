import { EngineWithdrawCollateralParams } from '@vertex-protocol/engine-client';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';
import { BigNumberish } from 'ethers';

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
  OptionalSubaccountOwner<EngineWithdrawCollateralParams>
>;
