import {
  RedisExecuteRequestByType,
  RedisExecuteRequestType,
  RedisQueryRequestByType,
  RedisQueryRequestType,
  RedisQueryResponseByType,
} from '@vertex-protocol/engine-server';
import {
  EngineClientOpts,
  ExecuteRequestBody,
  ExecuteRequestResponse,
  ExecuteResultKey,
  GetExecuteResultQueryParams,
  GetExecuteResultResponse,
  QueryRequestResponse,
} from './types';
import {
  getSignedTransactionRequest,
  SignableRequestType,
  SignableRequestTypeToParams,
} from '@vertex-protocol/contracts';
import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';

export class EngineBaseClient {
  readonly opts: EngineClientOpts;

  constructor(opts: EngineClientOpts) {
    this.opts = opts;
  }

  async getExecuteResult(resultKey: string): Promise<GetExecuteResultResponse> {
    const queryParams: GetExecuteResultQueryParams = {
      result_key: resultKey,
    };

    const requestUrl = `${this.opts.url}/execute-result?${new URLSearchParams(
      queryParams as Record<string, any>,
    ).toString()}`;
    const response = await axios.get<GetExecuteResultResponse>(requestUrl);

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    return response.data;
  }

  protected async query<TRequestType extends RedisQueryRequestType>(
    requestType: TRequestType,
    params: RedisQueryRequestByType[TRequestType],
  ): Promise<RedisQueryResponseByType[TRequestType]> {
    const requestUrl = `${this.opts.url}/query?${new URLSearchParams({
      ...params,
      type: requestType,
    } as Record<string, any>).toString()}`;
    const response = await axios.get<QueryRequestResponse>(requestUrl);

    this.checkResponseStatus(response);
    this.checkServerStatus(response);

    return response.data.data as RedisQueryResponseByType[TRequestType];
  }

  protected async execute<TRequestType extends RedisExecuteRequestType>(
    requestType: TRequestType,
    params: RedisExecuteRequestByType[TRequestType],
  ): Promise<ExecuteResultKey> {
    const reqBody: ExecuteRequestBody = {
      type: requestType,
      params,
    };
    const response = await axios.post<ExecuteRequestResponse>(
      `${this.opts.url}/execute`,
      reqBody,
    );

    this.checkResponseStatus(response);

    return response.data.result_key;
  }

  protected async getSigningChainId(): Promise<number> {
    return (
      this.opts.signingChainId ?? (await this.opts.signer?.getChainId()) ?? -1
    );
  }

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
    response: AxiosResponse<GetExecuteResultResponse | QueryRequestResponse>,
  ) {
    if (response.data.status !== 'success') {
      throw Error(`Error from server: ${JSON.stringify(response.data)}`);
    }
  }
}
