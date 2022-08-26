import { BigNumberish } from 'ethers';
import { BalanceWithProduct, WithContracts } from '../common';
import { BigDecimal, fromX18 } from '@vertex-protocol/utils';
import { IVertexQuerier } from '../typechain-types';
import { mapEnginePerpProduct, mapEngineSpotProduct } from './utils';

/**
 * Encapsulates health for an account or an account balnace
 */
export interface HealthStatus {
  initialHealth: BigDecimal;
  maintenanceHealth: BigDecimal;
  // This is the same as PnL
  unweightedHealth: BigDecimal;
}

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
    initialHealth: fromX18(healthInfo.initialX18),
    maintenanceHealth: fromX18(healthInfo.maintenanceX18),
    unweightedHealth: fromX18(healthInfo.pnlX18),
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
}: WithContracts<GetSubaccountSummaryParams>): Promise<SubaccountSummaryResponse> {
  const healthInfo = await querier.getHealthInfo(subaccountId);
  const allBalances = await querier.getAllBalances(subaccountId);

  const balances: SubaccountSummaryResponse['balances'] = [];

  allBalances.spotBalances.forEach((spotBalance) => {
    balances.push({
      amount: fromX18(spotBalance.balance.amountX18),
      health: healthInfoToStatus(spotBalance.healthInfo),
      productId: spotBalance.product.productId,
      ...mapEngineSpotProduct(spotBalance.product.product),
    });
  });

  allBalances.perpBalances.forEach((perpBalance) => {
    balances.push({
      amount: fromX18(perpBalance.balance.amountX18),
      vQuoteBalance: fromX18(perpBalance.balance.vQuoteBalanceX18),
      health: healthInfoToStatus(perpBalance.healthInfo),
      productId: perpBalance.product.productId,
      ...mapEnginePerpProduct(perpBalance.product.product),
    });
  });

  return {
    health: healthInfoToStatus(healthInfo),
    balances,
  };
}
