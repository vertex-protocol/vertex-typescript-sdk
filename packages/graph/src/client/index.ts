import { Mixin } from 'ts-mixer';
import { SubaccountQueryClient } from './subaccount';
import { OrdersQueryClient } from './orders';
import { execute } from '../generated';
import { MarketQueryClient } from './market';

export * from './subaccount';
export * from './orders';
export * from './market';

/**
 * Client for common Clearinghouse Subgraph queries
 */
export class VertexGraphClient extends Mixin(
  SubaccountQueryClient,
  OrdersQueryClient,
  MarketQueryClient,
) {
  /**
   * This exposes the raw `execute` function of the underlying GraphQL client
   */
  executeRaw = execute;
}
