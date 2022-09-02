import axios, { AxiosResponse } from 'axios';
import {
  CancelOrderParams,
  CancelOrderResponse,
  EngineAppResponse,
  GetBookLiquidityParams,
  GetBookLiquidityResponse,
  GetOrderByDigestParams,
  GetOrderByDigestResponse,
  GetSubaccountOrdersParams,
  GetSubaccountOrdersResponse,
  SignedEngineOrder,
  SubmitOrderParams,
  SubmitOrderResponse,
} from './types';
import {
  getVertexEIP712OrderValue,
  IOffchainBook,
} from '@vertex-protocol/contracts';

/**
 * Configuration options for Vertex orders client
 */
interface OrdersClientOpts {
  // Server endpoint
  endpoint: string;
}

export class OrdersClient {
  readonly endpoint: string;

  constructor({ endpoint }: OrdersClientOpts) {
    this.endpoint = endpoint;
  }

  private static async handleRequestPromise<TData>(
    responsePromise: Promise<AxiosResponse<EngineAppResponse<TData>>>,
  ): Promise<TData> {
    const response = await responsePromise;
    if (response.status !== 200) {
      throw Error(
        `Unexpected response status: ${response.status} ${response.statusText}`,
      );
    }
    if (response.data.status === 'failed') {
      throw Error(`Failed to process request: ${response.data.reason}`);
    }

    return response.data.result;
  }

  private static getSafeSignedOrder(
    order: IOffchainBook.SignedOrderStruct,
  ): SignedEngineOrder {
    return {
      signature: order.signature.toString(),
      order: getVertexEIP712OrderValue(order.order),
    };
  }

  /**
   * Submits an order to matching engine
   *
   * @param params
   */
  async submitOrder(params: SubmitOrderParams): Promise<SubmitOrderResponse> {
    return OrdersClient.handleRequestPromise(
      axios.post(
        this.getRequestPath('orders', params.orderbookAddress),
        OrdersClient.getSafeSignedOrder(params.order),
      ),
    );
  }

  /**
   * Submits an order cancellation to matching engine
   *
   * @param params
   */
  async cancelOrder(params: CancelOrderParams): Promise<CancelOrderResponse> {
    return OrdersClient.handleRequestPromise(
      axios.delete(this.getRequestPath('orders', params.orderbookAddress), {
        data: OrdersClient.getSafeSignedOrder(params.order),
      }),
    );
  }

  /**
   * Get orders for a subaccount that are currently within the context of the matching engine
   *
   * @param params
   */
  async getSubaccountOrders(
    params: GetSubaccountOrdersParams,
  ): Promise<GetSubaccountOrdersResponse> {
    const queryParams = new URLSearchParams({
      subaccount_id: params.subaccountId.toString(),
    });
    return OrdersClient.handleRequestPromise(
      axios.get(
        this.getRequestPath('orders', params.orderbookAddress, queryParams),
      ),
    );
  }

  /**
   * Retrieve a single order by its digest within the context of the matching engine. The return type
   * will specify the current condition of the order (either enqueued or placed on the book).
   *
   * @param params
   */
  async getOrderByDigest(
    params: GetOrderByDigestParams,
  ): Promise<GetOrderByDigestResponse> {
    const queryParams = new URLSearchParams({
      digest: params.digest.toString(),
    });
    return OrdersClient.handleRequestPromise(
      axios.get(
        this.getRequestPath('orders', params.orderbookAddress, queryParams),
      ),
    );
  }

  /**
   * Returns the available liquidity up to a specific depth on the orderbook. Only non-zero ticks are returned
   *
   * @param params
   */
  async getBookLiquidity(
    params: GetBookLiquidityParams,
  ): Promise<GetBookLiquidityResponse> {
    const queryParams = new URLSearchParams({
      depth: (params.depth ?? 20).toFixed(0),
    });
    return OrdersClient.handleRequestPromise(
      axios.get(
        this.getRequestPath('liquidity', params.orderbookAddress, queryParams),
      ),
    );
  }

  private getRequestPath(
    type: 'orders' | 'liquidity',
    orderbookAddress: string,
    searchParams?: URLSearchParams,
  ) {
    const basePaths = {
      orders: 'order',
      liquidity: 'levels',
    };
    const searchParamsStr = searchParams ? `?${searchParams.toString()}` : '';
    return `${this.endpoint}/${basePaths[type]}/${orderbookAddress}${searchParamsStr}`;
  }
}
