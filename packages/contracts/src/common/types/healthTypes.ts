import { BigDecimal } from '@vertex-protocol/utils';

export type HealthType = 'maintenance' | 'initial' | 'unweighted';
export type HealthStatus = Record<HealthType, BigDecimal>;
