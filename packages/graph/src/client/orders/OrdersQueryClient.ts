import { BaseVertexGraphClient } from '../base';
import {
  AllMarketOrdersResponse,
  OrdersByIdParams,
  OrdersByIdResponse,
  SubaccountOrdersParams,
  SubaccountOrdersResponse,
} from './types';
import {
  OnBookOrdersByIDQueryQueryVariables,
  OrderStatus,
} from '../../generated';
import {
  getMarketEntityId,
  getOnBookOrderEntityId,
  getSubaccountEntityId,
} from '../../utils';
import { PaginationParams } from '../types';

const ALL_STATUSES: OrderStatus[] = [
  'ON_BOOK',
  'INSTANT_FILL',
  'CANCELLED',
  'FILLED',
];

interface AllMarketOrdersParams extends PaginationParams {
  productId: number;
  // Allowed order statuses, if not given, defaults to all
  statuses?: OrderStatus[];
}

/**
 * @internal
 */
export class OrdersQueryClient extends BaseVertexGraphClient {
  /**
   * Get all orders for a given product with pagination.
   *
   * @param params Filtering parameters
   */
  async getAllMarketOrders(
    params: AllMarketOrdersParams,
  ): Promise<AllMarketOrdersResponse> {
    const data = await this.graph.PaginatedAllMarketOrdersQuery({
      filteredStatuses: params.statuses ?? ALL_STATUSES,
      marketEntityId: getMarketEntityId(params.productId),
      first: params.first,
      skip: params.skip,
    });
    return data.orders;
  }

  async getSubaccountOrders(
    params: SubaccountOrdersParams,
  ): Promise<SubaccountOrdersResponse> {
    const data = await this.graph.PaginatedSubaccountOrdersQuery({
      filteredStatuses: params.statuses ?? ALL_STATUSES,
      subaccountEntityId: getSubaccountEntityId(params.subaccountId),
      first: params.first,
      skip: params.skip,
    });
    return data.orders;
  }

  async getOnBookOrdersByIds(
    params: OrdersByIdParams,
  ): Promise<OrdersByIdResponse> {
    const orderEntityIds: OnBookOrdersByIDQueryQueryVariables['orderEntityIds'] =
      params.ids.map((id) => {
        return getOnBookOrderEntityId(id.productId, id.orderbookId);
      });
    const data = await this.graph.OnBookOrdersByIDQuery({
      orderEntityIds,
    });
    return data.orders;
  }
}
