import { BigDecimal } from '@vertex-protocol/utils';

export type HealthType = 'maintenance' | 'initial' | 'unweighted';

export interface HealthStatus {
  health: BigDecimal;
  assets: BigDecimal;
  liabilities: BigDecimal;
}

export type HealthStatusByType = Record<HealthType, HealthStatus>;
