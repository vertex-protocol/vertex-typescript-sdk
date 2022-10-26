import {
  EngineServerExecuteRequestByType,
  EngineServerExecuteRequestType,
  EngineServerExecutionResult,
  EngineServerQueryRequestByType,
  EngineServerQueryRequestType,
  EngineServerQueryResponse,
  EngineServerQueryResponseByType,
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

  /**
   * Queries the engine, all query params are stringified into the query string
   *
   * @param requestType
   * @param params
   * @protected
   */
  protected async query<TRequestType extends EngineServerQueryRequestType>(
    requestType: TRequestType,
    params: EngineServerQueryRequestByType[TRequestType],
  ): Promise<EngineServerQueryResponseByType[TRequestType]> {
    const queryParams: Record<string, string | number> = {
      ...params,
      type: requestType,
    };
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
   * POSTs an execute message to the engine
   *
   * @param requestType
   * @param params
   * @protected
   */
  protected async execute<TRequestType extends EngineServerExecuteRequestType>(
    requestType: TRequestType,
    params: EngineServerExecuteRequestByType[TRequestType],
  ): Promise<EngineExecuteRequestResponse> {
    const reqBody: EngineExecuteRequestBody = {
      [requestType]: params,
    };
    const response = await axios.post<EngineExecuteRequestResponse>(
      `${this.opts.url}/execute`,
      reqBody,
    );

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    return response.data;
  }

  protected async getSigningChainId(): Promise<number> {
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
   * @protected
   */
  protected async sign<T extends SignableRequestType>(
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
