import { Mixin } from 'ts-mixer';
import { SubaccountQueryClient } from './subaccount';
import { OrdersQueryClient } from './orders';
import { execute } from '../generated';
import { MarketQueryClient } from './market';

export * from './subaccount';
export * from './orders';
export * from './market';

export class VertexGraphClient extends Mixin(
  SubaccountQueryClient,
  OrdersQueryClient,
  MarketQueryClient,
) {
  // Allow raw GraphQL execution
  executeRaw = execute;
}
