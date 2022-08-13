import { BigNumberish } from 'ethers';
import { BalanceWithProduct, WithContracts } from '../common';
import { BigDecimal, fromX18 } from '@vertex/utils';
import { IVertexQuerier } from '../typechain-types';
import { calcTotalBorrowed, calcTotalDeposited } from '../utils/interest';

export interface HealthStatus {
  initialHealth: BigDecimal;
  maintenanceHealthWithOrders: BigDecimal;
  maintenanceHealthNoOrders: BigDecimal;
}

export interface GetSubaccountSummaryParams {
  subaccountId: BigNumberish;
}

export interface SubaccountSummaryResponse {
  balances: (BalanceWithProduct & {
    health: HealthStatus;
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

export async function getSubaccountSummary({
  subaccountId,
  querier,
}: WithContracts<GetSubaccountSummaryParams>): Promise<SubaccountSummaryResponse> {
  const healthInfo = await querier.getHealthInfo(subaccountId);
  const allBalances = await querier.getAllBalances(subaccountId);

  const balances: SubaccountSummaryResponse['balances'] = [];

  allBalances.spotBalances.forEach((spotBalance) => {
    balances.push({
      type: 'spot',

      amount: fromX18(spotBalance.balance.amountX18),
      cumulativeOrderAmounts: {
        buy: fromX18(spotBalance.cumulativeBuyAmountX18),
        sell: fromX18(spotBalance.cumulativeSellAmountX18),
      },
      health: healthInfoToStatus(spotBalance.healthInfo),
      interestSmallCap: fromX18(
        spotBalance.product.product.config.interestSmallCapX18,
      ),
      interestLargeCap: fromX18(
        spotBalance.product.product.config.interestLargeCapX18,
      ),
      interestFloor: fromX18(
        spotBalance.product.product.config.interestFloorX18,
      ),
      interestInflectionUtil: fromX18(
        spotBalance.product.product.config.interestInflectionUtilX18,
      ),
      totalBorrowed: calcTotalBorrowed(spotBalance.product.product.state),
      totalDeposited: calcTotalDeposited(spotBalance.product.product.state),
      shortWeightInitial: fromX18(
        spotBalance.product.product.config.shortWeightInitialX18,
      ),
      shortWeightMaintenance: fromX18(
        spotBalance.product.product.config.shortWeightMaintenanceX18,
      ),
      longWeightInitial: fromX18(
        spotBalance.product.product.config.longWeightInitialX18,
      ),
      longWeightMaintenance: fromX18(
        spotBalance.product.product.config.longWeightMaintenanceX18,
      ),
      oraclePrice: fromX18(spotBalance.product.product.state.priceX18),
      productId: spotBalance.product.productId,
    });
  });

  allBalances.perpBalances.forEach((perpBalance) => {
    balances.push({
      type: 'perp',
      amount: fromX18(perpBalance.balance.amountX18),
      vQuoteBalance: fromX18(perpBalance.balance.vQuoteBalanceX18),
      cumulativeOrderAmounts: {
        buy: fromX18(perpBalance.cumulativeBuyAmountX18),
        sell: fromX18(perpBalance.cumulativeSellAmountX18),
      },
      shortWeightInitial: fromX18(
        perpBalance.product.product.config.shortWeightInitialX18,
      ),
      shortWeightMaintenance: fromX18(
        perpBalance.product.product.config.shortWeightMaintenanceX18,
      ),
      longWeightInitial: fromX18(
        perpBalance.product.product.config.longWeightInitialX18,
      ),
      longWeightMaintenance: fromX18(
        perpBalance.product.product.config.longWeightMaintenanceX18,
      ),
      health: healthInfoToStatus(perpBalance.healthInfo),
      oraclePrice: fromX18(perpBalance.product.product.state.priceX18),
      productId: perpBalance.product.productId,
    });
  });

  return {
    health: healthInfoToStatus(healthInfo),
    balances,
  };
}
