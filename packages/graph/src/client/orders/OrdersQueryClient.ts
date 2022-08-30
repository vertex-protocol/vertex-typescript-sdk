import { BaseVertexGraphClient } from '../base';
import {
  AllMarketOrdersParams,
  AllMarketOrdersResponse,
  OrdersByIdParams,
  OrdersByIdResponse,
  SubaccountOrdersParams,
  SubaccountOrdersResponse,
} from './types';
import { OnBookOrdersByIDQueryQueryVariables } from '../../generated';
import {
  getMarketEntityId,
  getOnBookOrderEntityId,
  getSubaccountEntityId,
} from '../../utils';

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
      marketEntityId: getMarketEntityId(params.productId),
      first: params.first,
      skip: params.skip,
    });
    return data.orders;
  }

  /**
   * Get orders for a given subaccount with pagination
   *
   * @param params
   */
  async getSubaccountOrders(
    params: SubaccountOrdersParams,
  ): Promise<SubaccountOrdersResponse> {
    const data = await this.graph.PaginatedSubaccountOrdersQuery({
      subaccountEntityId: getSubaccountEntityId(params.subaccountId),
      first: params.first,
      skip: params.skip,
    });
    return data.orders;
  }

  /**
   * Retrieve on-book orders corresponding to the given compound orderbook IDs
   *
   * @param params
   */
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
