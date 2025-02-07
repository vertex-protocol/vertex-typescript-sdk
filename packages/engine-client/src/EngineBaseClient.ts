import {
  getSignedTransactionRequest,
  SignableRequestType,
  SignableRequestTypeToParams,
} from '@vertex-protocol/contracts';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Signer } from 'ethers';
import {
  EngineServerExecuteRequestByType,
  EngineServerExecuteRequestType,
  EngineServerExecuteResult,
  EngineServerExecuteSuccessResult,
  EngineServerQueryRequest,
  EngineServerQueryRequestByType,
  EngineServerQueryRequestType,
  EngineServerQueryResponse,
  EngineServerQueryResponseByType,
  EngineServerQuerySuccessResponse,
  GetEngineNoncesParams,
  GetEngineNoncesResponse,
} from './types';
import { EngineServerFailureError } from './types/EngineServerFailureError';
import { BigDecimalish } from '@vertex-protocol/utils';

export interface EngineClientOpts {
  // Server URL
  url: string;
  // Signer for EIP712 signing, if not provided, execute requests will error
  signer?: Signer;
  // Linked signer registered through the engine, if provided, execute requests will use this signer
  linkedSigner?: Signer;
}

// Only 1 key can be defined per execute request
type EngineExecuteRequestBody = Partial<EngineServerExecuteRequestByType>;

type EngineQueryRequestResponse<
  T extends EngineServerQueryRequestType = EngineServerQueryRequestType,
> = EngineServerQueryResponse<T>;

/**
 * Base client for all engine requests
 */
export class EngineBaseClient {
  readonly opts: EngineClientOpts;
  readonly axiosInstance: AxiosInstance;

  constructor(opts: EngineClientOpts) {
    this.opts = opts;
    this.axiosInstance = axios.create({
      withCredentials: true,
    });
  }

  /**
   * Sets the linked signer for execute requests
   *
   * @param linkedSigner The linkedSigner to use for all signatures. Set to null to revert to the chain signer
   */
  public setLinkedSigner(linkedSigner: Signer | null) {
    this.opts.linkedSigner = linkedSigner ?? undefined;
  }

  public async getTxNonce(address?: string): Promise<string> {
    const addr = address ?? (await this.opts.signer?.getAddress());
    if (!addr) {
      throw Error('No current signer in opts and no address provided');
    }
    return (
      await this.getNonces({
        address: addr,
      })
    ).txNonce;
  }

  public async getNonces(
    params: GetEngineNoncesParams,
  ): Promise<GetEngineNoncesResponse> {
    const baseResp = await this.query('nonces', params);

    return {
      orderNonce: baseResp.order_nonce,
      txNonce: baseResp.tx_nonce,
    };
  }

  /**
   * Queries the engine, all query params are stringified into the query string
   *
   * @param requestType
   * @param params
   * @public
   */
  public async query<TRequestType extends EngineServerQueryRequestType>(
    requestType: TRequestType,
    params: EngineServerQueryRequestByType[TRequestType],
  ): Promise<EngineServerQueryResponseByType[TRequestType]> {
    const request = this.getQueryRequest(requestType, params);
    const response = await this.axiosInstance.post<EngineQueryRequestResponse>(
      `${this.opts.url}/query`,
      request,
    );

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    // checkServerStatus throws on failure responses so the cast to the success response is acceptable here
    const successResponse = response as AxiosResponse<
      EngineServerQuerySuccessResponse<TRequestType>
    >;

    return successResponse.data.data;
  }

  /**
   * A simple, typechecked fn for constructing a query request in the format expected by the server.
   *
   * @param requestType
   * @param params
   */
  public getQueryRequest<TRequestType extends EngineServerQueryRequestType>(
    requestType: TRequestType,
    params: EngineServerQueryRequestByType[TRequestType],
  ): EngineServerQueryRequest<TRequestType> {
    return {
      type: requestType,
      ...params,
    };
  }

  /**
   * POSTs an execute message to the engine and returns the successful response. Throws the failure response wrapped
   * in an EngineServerFailureError on failure.
   *
   * @param requestType
   * @param params
   * @public
   */
  public async execute<TRequestType extends EngineServerExecuteRequestType>(
    requestType: TRequestType,
    params: EngineServerExecuteRequestByType[TRequestType],
  ): Promise<EngineServerExecuteSuccessResult<TRequestType>> {
    const reqBody = this.getExecuteRequest(requestType, params);
    const response = await this.axiosInstance.post<
      EngineServerExecuteResult<TRequestType>
    >(`${this.opts.url}/execute`, reqBody);

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    // checkServerStatus catches the failure result and throws the error, so the cast to the success response is acceptable here
    return response.data as EngineServerExecuteSuccessResult<TRequestType>;
  }

  /**
   * A simple, typechecked fn for constructing an execute request in the format expected by the server.
   *
   * @param requestType
   * @param params
   */
  public getExecuteRequest<TRequestType extends EngineServerExecuteRequestType>(
    requestType: TRequestType,
    params: EngineServerExecuteRequestByType[TRequestType],
  ): EngineExecuteRequestBody {
    return {
      [requestType]: params,
    };
  }

  /**
   * Signs a given request with the signer provided to the engine
   *
   * @param requestType
   * @param verifyingContract
   * @param chainId
   * @param params
   * @public
   */
  public async sign<T extends SignableRequestType>(
    requestType: T,
    verifyingContract: string,
    chainId: BigDecimalish,
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

  private checkResponseStatus(response: AxiosResponse) {
    if (response.status !== 200 || !response.data) {
      throw Error(
        `Unexpected response from server: ${response.status} ${response.statusText}`,
      );
    }
  }

  private checkServerStatus(
    response: AxiosResponse<
      EngineServerExecuteResult | EngineQueryRequestResponse
    >,
  ) {
    if (response.data.status !== 'success') {
      throw new EngineServerFailureError(response.data);
    }
  }
}
