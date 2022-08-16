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
  // Includes effect of outstanding orders
  maintenanceHealthWithOrders: BigDecimal;
  // Excludes effect of outstanding orders
  maintenanceHealthNoOrders: BigDecimal;
}

export interface GetSubaccountSummaryParams {
  subaccountId: BigNumberish;
}

export interface SubaccountSummaryResponse {
  balances: (BalanceWithProduct & {
    health: HealthStatus;
    // Cumulative buy/sell amounts stored in the contracts
    cumulativeOrderAmounts: { buy: BigDecimal; sell: BigDecimal };
  })[];
  health: HealthStatus;
}

function healthInfoToStatus(
  healthInfo: IVertexQuerier.HealthInfoStructOutput,
): HealthStatus {
  return {
    initialHealth: fromX18(healthInfo.initialWithOrdersX18),
    maintenanceHealthNoOrders: fromX18(healthInfo.maintenanceNoOrdersX18),
    maintenanceHealthWithOrders: fromX18(healthInfo.maintenanceWithOrdersX18),
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
      cumulativeOrderAmounts: {
        buy: fromX18(spotBalance.cumulativeBuyAmountX18),
        sell: fromX18(spotBalance.cumulativeSellAmountX18),
      },
      health: healthInfoToStatus(spotBalance.healthInfo),
      productId: spotBalance.product.productId,
      ...mapEngineSpotProduct(spotBalance.product.product),
    });
  });

  allBalances.perpBalances.forEach((perpBalance) => {
    balances.push({
      amount: fromX18(perpBalance.balance.amountX18),
      cumulativeOrderAmounts: {
        buy: fromX18(perpBalance.cumulativeBuyAmountX18),
        sell: fromX18(perpBalance.cumulativeSellAmountX18),
      },
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
