import {
  EIP712CancelOrdersParams,
  EIP712CancelProductOrdersParams,
  EIP712ListTriggerOrdersParams,
  EIP712OrderParams,
  getDefaultRecvTime,
  getOrderNonce,
  getSignedTransactionRequest,
  getTriggerOrderNonce,
  getVertexEIP712Values,
  SignableRequestType,
  SignableRequestTypeToParams,
} from '@vertex-protocol/contracts';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BigNumberish, Signer } from 'ethers';
import { mapServerOrderInfo, mapTriggerCriteria } from './dataMappers';
import {
  TriggerCancelOrdersParams,
  TriggerCancelProductOrdersParams,
  TriggerListOrdersParams,
  TriggerListOrdersResponse,
  TriggerOrderInfo,
  TriggerPlaceOrderParams,
  TriggerServerExecuteRequestByType,
  TriggerServerExecuteRequestType,
  TriggerServerExecuteResult,
  TriggerServerQueryRequestByType,
  TriggerServerQueryRequestType,
  TriggerServerQueryResponse,
  TriggerServerQueryResponseByType,
  TriggerServerQuerySuccessResponse,
} from './types';
import { TriggerServerFailureError } from './types/TriggerServerFailureError';

export interface TriggerClientOpts {
  // Server URL
  url: string;
  // Signer for EIP712 signing, if not provided, requests that require signatures will error
  signer?: Signer;
  // Linked signer registered through the engine, if provided, execute requests will use this signer
  linkedSigner?: Signer;
}

/**
 * Client for all trigger service requests
 */
export class TriggerClient {
  readonly opts: TriggerClientOpts;
  readonly axiosInstance: AxiosInstance;

  constructor(opts: TriggerClientOpts) {
    this.opts = opts;
    this.axiosInstance = axios.create({ withCredentials: true });
  }

  /**
   * Sets the linked signer for requests
   *
   * @param linkedSigner The linkedSigner to use for all signatures. Set to null to revert to the chain signer
   */
  public setLinkedSigner(linkedSigner: Signer | null) {
    this.opts.linkedSigner = linkedSigner ?? undefined;
  }

  /*
  Executes
   */

  async placeTriggerOrder(params: TriggerPlaceOrderParams) {
    const orderParams: EIP712OrderParams = {
      amount: params.order.amount,
      expiration: params.order.expiration,
      price: params.order.price,
      subaccountName: params.order.subaccountName,
      subaccountOwner: params.order.subaccountOwner,
      nonce: params.nonce ?? getTriggerOrderNonce(),
    };
    const signature = await this.sign(
      'place_order',
      params.verifyingAddr,
      params.chainId,
      orderParams,
    );

    const executeParams: TriggerServerExecuteRequestByType['place_order'] = {
      id: params.id ?? null,
      order: getVertexEIP712Values('place_order', orderParams),
      trigger: mapTriggerCriteria(params.triggerCriteria),
      signature,
      product_id: params.productId,
      spot_leverage: params.spotLeverage ?? null,
      digest: params.digest ?? null,
    };

    return this.execute('place_order', executeParams);
  }

  async cancelTriggerOrders(params: TriggerCancelOrdersParams) {
    const cancelOrdersParams: EIP712CancelOrdersParams = {
      digests: params.digests,
      nonce: params.nonce ?? getOrderNonce(),
      productIds: params.productIds,
      subaccountName: params.subaccountName,
      subaccountOwner: params.subaccountOwner,
    };
    const tx = getVertexEIP712Values('cancel_orders', cancelOrdersParams);

    const executeParams: TriggerServerExecuteRequestByType['cancel_orders'] = {
      signature: await this.sign(
        'cancel_orders',
        params.verifyingAddr,
        params.chainId,
        cancelOrdersParams,
      ),
      tx,
    };

    return this.execute('cancel_orders', executeParams);
  }

  async cancelProductOrders(params: TriggerCancelProductOrdersParams) {
    const cancelProductOrdersParams: EIP712CancelProductOrdersParams = {
      nonce: params.nonce ?? getOrderNonce(),
      productIds: params.productIds,
      subaccountName: params.subaccountName,
      subaccountOwner: params.subaccountOwner,
    };
    const tx = getVertexEIP712Values(
      'cancel_product_orders',
      cancelProductOrdersParams,
    );

    const executeParams: TriggerServerExecuteRequestByType['cancel_product_orders'] =
      {
        signature: await this.sign(
          'cancel_product_orders',
          params.verifyingAddr,
          params.chainId,
          cancelProductOrdersParams,
        ),
        tx,
      };

    return this.execute('cancel_product_orders', executeParams);
  }

  /*
  Queries
   */
  async listOrders(
    params: TriggerListOrdersParams,
  ): Promise<TriggerListOrdersResponse> {
    const signatureParams: EIP712ListTriggerOrdersParams = {
      // Default to 90 seconds from now if no recvTime is provided
      recvTime: params.recvTime?.toFixed() ?? getDefaultRecvTime().toFixed(),
      subaccountName: params.subaccountName,
      subaccountOwner: params.subaccountOwner,
    };

    const tx = getVertexEIP712Values('list_trigger_orders', signatureParams);
    const signature = await this.sign(
      'list_trigger_orders',
      params.verifyingAddr,
      params.chainId,
      signatureParams,
    );

    const queryParams: TriggerServerQueryRequestByType['list_trigger_orders'] =
      {
        limit: params.limit,
        max_update_time: params.maxUpdateTimeInclusive,
        pending: params.pending,
        product_id: params.productId,
        signature,
        tx,
      };

    const baseResponse = await this.query('list_trigger_orders', queryParams);

    const orders: TriggerOrderInfo[] =
      baseResponse.orders.map(mapServerOrderInfo);

    return {
      orders,
    };
  }

  /*
  Base Fns
   */
  protected async sign<T extends SignableRequestType>(
    requestType: T,
    verifyingContract: string,
    chainId: BigNumberish,
    params: SignableRequestTypeToParams[T],
  ) {
    // Use the linked signer if provided, otherwise use the default signer provided to the engine
    const signer = this.opts.linkedSigner ?? this.opts.signer;
    if (signer == null) {
      throw Error('No signer provided');
    }
    return getSignedTransactionRequest({
      chainId,
      requestParams: params,
      requestType,
      signer,
      verifyingContract,
    });
  }

  protected async execute<TRequestType extends TriggerServerExecuteRequestType>(
    requestType: TRequestType,
    params: TriggerServerExecuteRequestByType[TRequestType],
  ): Promise<TriggerServerExecuteResult> {
    const reqBody = {
      [requestType]: params,
    };
    const response = await this.axiosInstance.post<TriggerServerExecuteResult>(
      `${this.opts.url}/execute`,
      reqBody,
    );

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    return response.data;
  }

  protected async query<TRequestType extends TriggerServerQueryRequestType>(
    requestType: TRequestType,
    params: TriggerServerQueryRequestByType[TRequestType],
  ): Promise<TriggerServerQueryResponseByType[TRequestType]> {
    const reqBody = {
      type: requestType,
      ...params,
    };
    const response = await this.axiosInstance.post<
      TriggerServerQueryResponse<TRequestType>
    >(`${this.opts.url}/query`, reqBody);

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    // checkServerStatus throws on failure responses so the cast to the success response is acceptable here
    const successResponse = response as AxiosResponse<
      TriggerServerQuerySuccessResponse<TRequestType>
    >;

    return successResponse.data
      .data as TriggerServerQueryResponseByType[TRequestType];
  }

  private checkResponseStatus(response: AxiosResponse) {
    if (response.status !== 200 || !response.data) {
      throw Error(
        `Unexpected response from server: ${response.status} ${response.statusText}`,
      );
    }
  }

  private checkServerStatus(
    response: AxiosResponse<
      TriggerServerExecuteResult | TriggerServerQueryResponse
    >,
  ) {
    if (response.data.status !== 'success') {
      throw new TriggerServerFailureError(response.data);
    }
  }
}
