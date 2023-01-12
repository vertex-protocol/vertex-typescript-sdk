import { BigNumberish } from 'ethers';
import {
  BalanceWithProduct,
  HealthStatusByType,
  WithContract,
} from '../common';
import { fromX18 } from '@vertex-protocol/utils';
import { mapEnginePerpProduct, mapEngineSpotProduct } from './utils';

/**
 * Encapsulates health for an account or an account balance
 */

export interface GetSubaccountSummaryParams {
  subaccountId: BigNumberish;
}

export interface SubaccountSummaryResponse {
  balances: BalanceWithProduct[];
  health: HealthStatusByType;
}

/**
 * Returns a comprehensive summary for a subaaccount, including its balances and health
 *
 * {@label CONTRACTS}
 */
export async function getSubaccountSummary({
  subaccountId,
  querier,
}: WithContract<
  'querier',
  GetSubaccountSummaryParams
>): Promise<SubaccountSummaryResponse> {
  const subaccountInfo = await querier.getSubaccountInfo(subaccountId);

  const balances: SubaccountSummaryResponse['balances'] = [];

  subaccountInfo.spotBalances.forEach((spotBalance) => {
    const product = subaccountInfo.spotProducts.find(
      (product) => product.productId === spotBalance.productId,
    );
    if (!product) {
      console.warn('Spot product not found for balance', spotBalance.productId);
      return;
    }

    balances.push({
      amount: fromX18(spotBalance.balance.amount),
      lpAmount: fromX18(spotBalance.lpBalance.amount),
      ...mapEngineSpotProduct(product),
    });
  });

  subaccountInfo.perpBalances.forEach((perpBalance) => {
    const product = subaccountInfo.perpProducts.find(
      (product) => product.productId === perpBalance.productId,
    );
    if (!product) {
      console.warn('Perp product not found for balance', perpBalance.productId);
      return;
    }

    balances.push({
      amount: fromX18(perpBalance.balance.amount),
      lpAmount: fromX18(perpBalance.lpBalance.amount),
      vQuoteBalance: fromX18(perpBalance.balance.vQuoteBalance),
      ...mapEnginePerpProduct(product),
    });
  });

  return {
    health: {
      initial: {
        health: fromX18(subaccountInfo.healths[0].health),
        assets: fromX18(subaccountInfo.healths[0].assets),
        liabilities: fromX18(subaccountInfo.healths[0].liabilities),
      },
      maintenance: {
        health: fromX18(subaccountInfo.healths[1].health),
        assets: fromX18(subaccountInfo.healths[1].assets),
        liabilities: fromX18(subaccountInfo.healths[1].liabilities),
      },
      unweighted: {
        health: fromX18(subaccountInfo.healths[2].health),
        assets: fromX18(subaccountInfo.healths[2].assets),
        liabilities: fromX18(subaccountInfo.healths[2].liabilities),
      },
    },
    balances,
  };
}
