import { Mixin } from 'ts-mixer';
import { SubaccountQueryClient } from './subaccount/SubaccountQueryClient';
import { OrdersQueryClient } from './orders/OrdersQueryClient';
import { execute } from '../generated';
import { MarketQueryClient } from './market/MarketQueryClient';

export * from './subaccount/types';

export class VertexGraphClient extends Mixin(
  SubaccountQueryClient,
  OrdersQueryClient,
  MarketQueryClient,
) {
  // Allow raw GraphQL execution
  executeRaw = execute;
}
