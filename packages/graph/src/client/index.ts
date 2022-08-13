import { Mixin } from 'ts-mixer';
import { SubaccountQueryClient } from './subaccount/SubaccountQueryClient';
import { OrdersQueryClient } from './orders/OrdersQueryClient';

export * from './subaccount/types';

export class VertexGraphClient extends Mixin(
  SubaccountQueryClient,
  OrdersQueryClient,
) {}
