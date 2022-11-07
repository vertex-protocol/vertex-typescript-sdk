import { BigNumberish } from 'ethers';
import { BalanceWithProduct, HealthStatus, WithContract } from '../common';
import { fromX18 } from '@vertex-protocol/utils';
import { mapEnginePerpProduct, mapEngineSpotProduct } from './utils';

/**
 * Encapsulates health for an account or an account balance
 */

export interface GetSubaccountSummaryParams {
  subaccountId: BigNumberish;
}

export interface SubaccountSummaryResponse {
  balances: (BalanceWithProduct & {
    health: HealthStatus;
  })[];
  health: HealthStatus;
}

function healthInfoToStatus(
  healthInfo: IVertexQuerier.HealthInfoStructOutput,
): HealthStatus {
  return {
    initial: fromX18(healthInfo.initialX18),
    maintenance: fromX18(healthInfo.maintenanceX18),
    unweighted: fromX18(healthInfo.pnlX18),
  };
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
    const product = subaccountInfo.allProducts.spotProducts.find(
      (product) => product.productId === spotBalance.productId,
    );
    if (!product) {
      console.warn('Spot product not found for balance', spotBalance.productId);
      return;
    }

    balances.push({
      amount: fromX18(spotBalance.balance.amountX18),
      health: healthInfoToStatus(spotBalance.healthInfo),
      ...mapEngineSpotProduct(product),
    });
  });

  subaccountInfo.perpBalances.forEach((perpBalance) => {
    const product = subaccountInfo.allProducts.perpProducts.find(
      (product) => product.productId === perpBalance.productId,
    );
    if (!product) {
      console.warn('Perp product not found for balance', perpBalance.productId);
      return;
    }

    balances.push({
      amount: fromX18(perpBalance.balance.amountX18),
      vQuoteBalance: fromX18(perpBalance.balance.vQuoteBalanceX18),
      health: healthInfoToStatus(perpBalance.healthInfo),
      ...mapEnginePerpProduct(product),
    });
  });

  return {
    health: healthInfoToStatus(healthInfo),
    balances,
  };
}
