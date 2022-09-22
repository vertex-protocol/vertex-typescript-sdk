import { BigNumberish } from 'ethers';
import { BalanceWithProduct, HealthStatus, WithContract } from '../common';
import { fromX18 } from '@vertex-protocol/utils';
import { IVertexQuerier } from '../typechain-types';
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
  const healthInfo = await querier.getHealthInfo(subaccountId);
  const allBalances = await querier.getAllBalances(subaccountId);

  const balances: SubaccountSummaryResponse['balances'] = [];

  allBalances.spotBalances.forEach((spotBalance) => {
    balances.push({
      amount: fromX18(spotBalance.balance.amountX18),
      health: healthInfoToStatus(spotBalance.healthInfo),
      ...mapEngineSpotProduct(
        spotBalance.product.productId,
        spotBalance.product.product,
      ),
    });
  });

  allBalances.perpBalances.forEach((perpBalance) => {
    balances.push({
      amount: fromX18(perpBalance.balance.amountX18),
      vQuoteBalance: fromX18(perpBalance.balance.vQuoteBalanceX18),
      health: healthInfoToStatus(perpBalance.healthInfo),
      ...mapEnginePerpProduct(
        perpBalance.product.productId,
        perpBalance.product.product,
      ),
    });
  });

  return {
    health: healthInfoToStatus(healthInfo),
    balances,
  };
}
