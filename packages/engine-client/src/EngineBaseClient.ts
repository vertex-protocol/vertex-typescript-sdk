import {
  EngineServerExecuteRequestByType,
  EngineServerExecuteRequestType,
  EngineServerExecutionResult,
  EngineServerQueryRequest,
  EngineServerQueryRequestByType,
  EngineServerQueryRequestType,
  EngineServerQueryResponse,
  EngineServerQueryResponseByType,
  GetEngineNoncesParams,
  GetEngineNoncesResponse,
} from './types';
import {
  getSignedTransactionRequest,
  SignableRequestType,
  SignableRequestTypeToParams,
} from '@vertex-protocol/contracts';
import axios, { AxiosResponse } from 'axios';
import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { Signer } from 'ethers';

export interface EngineClientOpts {
  // Server URL
  url: string;
  // Signer for EIP712 signing, if not provided, execute requests will error
  signer?: TypedDataSigner & Signer;
  // Chain ID override for EIP712 signing
  signingChainId?: number;
}

// Only 1 key can be defined per execute request
type EngineExecuteRequestBody = Partial<EngineServerExecuteRequestByType>;

type EngineExecuteRequestResponse = EngineServerExecutionResult;

type EngineQueryRequestResponse<
  T extends EngineServerQueryRequestType = EngineServerQueryRequestType,
> = EngineServerQueryResponse<T>;

/**
 * Base client for all engine requests
 */
export class EngineBaseClient {
  readonly opts: EngineClientOpts;

  constructor(opts: EngineClientOpts) {
    this.opts = opts;
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
    const queryParams: Record<string, string | number> = {};
    Object.keys(request).forEach((key) => {
      const value = request[key as keyof typeof request];
      // Remove null values and stringify
      if (value != null) {
        queryParams[key] = String(value);
      }
    });

    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');
    const requestUrl = `${this.opts.url}/query?${queryString}`;
    const response = await axios.get<EngineQueryRequestResponse>(requestUrl);

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    return response.data.data as EngineServerQueryResponseByType[TRequestType];
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
   * POSTs an execute message to the engine
   *
   * @param requestType
   * @param params
   * @public
   */
  public async execute<TRequestType extends EngineServerExecuteRequestType>(
    requestType: TRequestType,
    params: EngineServerExecuteRequestByType[TRequestType],
  ): Promise<EngineExecuteRequestResponse> {
    const reqBody = this.getExecuteRequest(requestType, params);
    const response = await axios.post<EngineExecuteRequestResponse>(
      `${this.opts.url}/execute`,
      reqBody,
    );

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    return response.data;
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

  public async getSigningChainId(): Promise<number> {
    return (
      this.opts.signingChainId ?? (await this.opts.signer?.getChainId()) ?? -1
    );
  }

  /**
   * Signs a given request with the signer provided to the engine
   *
   * @param requestType
   * @param verifyingContract
   * @param params
   * @public
   */
  public async sign<T extends SignableRequestType>(
    requestType: T,
    verifyingContract: string,
    params: SignableRequestTypeToParams[T],
  ) {
    if (this.opts.signer == null) {
      throw Error('No signer provided');
    }
    return getSignedTransactionRequest({
      chainId: await this.getSigningChainId(),
      requestParams: params,
      requestType,
      signer: this.opts.signer,
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
      EngineExecuteRequestResponse | EngineQueryRequestResponse
    >,
  ) {
    if (response.data.status !== 'success') {
      throw response.data;
    }
  }
}
