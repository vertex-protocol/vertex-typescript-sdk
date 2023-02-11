import {
  BalanceWithProduct,
  HealthStatusByType,
  WithContract,
} from '../common';
import { toBigDecimal } from '@vertex-protocol/utils';
import { mapEnginePerpProduct, mapEngineSpotProduct } from './utils';
import { subaccountToBytes32 } from '../utils/bytes32';

/**
 * Encapsulates health for an account or an account balance
 */

export interface GetSubaccountSummaryParams {
  sender: string;
  subaccountName: string;
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
  sender,
  subaccountName,
  querier,
}: WithContract<
  'querier',
  GetSubaccountSummaryParams
>): Promise<SubaccountSummaryResponse> {
  const subaccount = subaccountToBytes32({
    owner: sender,
    name: subaccountName,
  });
  const subaccountInfo = await querier.getSubaccountInfo(subaccount);

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
      amount: toBigDecimal(spotBalance.balance.amount),
      lpAmount: toBigDecimal(spotBalance.lpBalance.amount),
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
      amount: toBigDecimal(perpBalance.balance.amount),
      lpAmount: toBigDecimal(perpBalance.lpBalance.amount),
      vQuoteBalance: toBigDecimal(perpBalance.balance.vQuoteBalance),
      ...mapEnginePerpProduct(product),
    });
  });

  return {
    health: {
      initial: {
        health: toBigDecimal(subaccountInfo.healths[0].health),
        assets: toBigDecimal(subaccountInfo.healths[0].assets),
        liabilities: toBigDecimal(subaccountInfo.healths[0].liabilities),
      },
      maintenance: {
        health: toBigDecimal(subaccountInfo.healths[1].health),
        assets: toBigDecimal(subaccountInfo.healths[1].assets),
        liabilities: toBigDecimal(subaccountInfo.healths[1].liabilities),
      },
      unweighted: {
        health: toBigDecimal(subaccountInfo.healths[2].health),
        assets: toBigDecimal(subaccountInfo.healths[2].assets),
        liabilities: toBigDecimal(subaccountInfo.healths[2].liabilities),
      },
    },
    balances,
  };
}
