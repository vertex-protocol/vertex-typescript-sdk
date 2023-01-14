import { BaseVertexGraphClient } from '../base';
import {
  AllMarketOrdersParams,
  AllMarketOrdersResponse,
  LatestOrderFillsParams,
  OrderByDigestParams,
  OrderByDigestResponse,
  SubaccountOrdersForProductsParams,
  SubaccountOrdersForProductsResponse,
  SubaccountOrdersParams,
  SubaccountOrdersResponse,
} from './types';
import { getSubaccountEntityId } from '../../utils';
import { fromX18, toBigDecimal } from '@vertex-protocol/utils';

export class OrdersQueryClient extends BaseVertexGraphClient {
  async getLatestOrderFills(params: LatestOrderFillsParams) {
    const data = await this.graph.LatestOrderFillsQuery({
      productId: params.productId,
    });
    return data.fillOrderEvents.map((event) => {
      return {
        time: event.blockTime,
        takerAmountDelta: toBigDecimal(event.amountDelta).negated(),
        price: fromX18(event.order.priceX18),
      };
    });
  }

  /**
   * Get all orders for a given product with pagination.
   *
   * @param params Filtering parameters
   */
  async getAllMarketOrders(
    params: AllMarketOrdersParams,
  ): Promise<AllMarketOrdersResponse> {
    const data = await this.graph.PaginatedAllMarketOrdersQuery({
      productId: params.productId,
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
   * Get orders for a given subaccount for specific markets with pagination
   *
   * @param params
   */
  async getSubaccountOrdersForProducts(
    params: SubaccountOrdersForProductsParams,
  ): Promise<SubaccountOrdersForProductsResponse> {
    const data = await this.graph.PaginatedSubaccountOrdersForProductsQuery({
      subaccountEntityId: getSubaccountEntityId(params.subaccountId),
      allowedProductIds: params.productIds,
      first: params.first,
      skip: params.skip,
    });
    return data.orders;
  }

  /**
   * Retrieve an order by digest, returning an empty array if not found
   *
   * @param params
   */
  async getOrderByDigest(
    params: OrderByDigestParams,
  ): Promise<OrderByDigestResponse | undefined> {
    const data = await this.graph.OrderByDigestQuery({
      digest: params.digest,
      productId: params.productId,
    });
    return data.orders[0];
  }
}
