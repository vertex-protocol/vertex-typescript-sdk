import { BigNumber } from 'ethers';

interface BaseProduct {
  product: number;
  oraclePrice: BigNumber;
}

export interface PerpProduct extends BaseProduct {
  type: 'perp';
  longWeightInitial: BigNumber;
  shortWeightInitial: BigNumber;
  longWeightMaintenance: BigNumber;
  shortWeightMaintenance: BigNumber;
}

export interface SpotProduct extends BaseProduct {
  type: 'spot';
  longWeightInitial: BigNumber;
  shortWeightInitial: BigNumber;
  longWeightMaintenance: BigNumber;
  shortWeightMaintenance: BigNumber;
  interestFloor: BigNumber;
  interestCeil: BigNumber;
  interestGrowth: BigNumber;

  totalDeposited: BigNumber;
  totalBorrowed: BigNumber;
}

export type Product = PerpProduct | SpotProduct;
export type ProductType = Product['type'];

interface BaseBalance {
  type: ProductType;
  product: number;
  amount: BigNumber;
}

export interface PerpBalance extends BaseBalance {
  type: 'perp';
  vQuoteBalance: BigNumber;
}

export interface SpotBalance extends BaseBalance {
  type: 'spot';
}

export type Balance = PerpBalance | SpotBalance;

export interface HealthStatus {
  initialHealth: BigNumber;
  maintenanceHealth: BigNumber;
}

export interface SubaccountSummaryResponse {
  perpProducts: PerpProduct[];
  perpBalances: PerpBalance[];
  spotProducts: SpotProduct[];
  spotBalances: SpotBalance[];
  healthStatus: HealthStatus;
}
