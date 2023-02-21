import {
  IndexerServerQueryRequestByType,
  IndexerServerQueryRequestType,
  IndexerServerQueryResponse,
  IndexerServerQueryResponseByType,
} from './types';
import axios, { AxiosResponse } from 'axios';

export interface IndexerClientOpts {
  // Server URL
  url: string;
}

/**
 * Base client for all indexer requests
 */
export class IndexerBaseClient {
  readonly opts: IndexerClientOpts;

  constructor(opts: IndexerClientOpts) {
    this.opts = opts;
  }

  /**
   * Queries the indexer, all query params are stringified into the query string
   *
   * @param requestType
   * @param params
   * @protected
   */
  protected async query<TRequestType extends IndexerServerQueryRequestType>(
    requestType: TRequestType,
    params: IndexerServerQueryRequestByType[TRequestType],
  ): Promise<IndexerServerQueryResponseByType[TRequestType]> {
    const queryParams: Record<string, string | number> = {
      type: requestType,
    };
    Object.keys(params).forEach((key) => {
      const value = params[key as keyof typeof params];
      // Remove null values and stringify
      if (value != null) {
        queryParams[key] = String(value);
      }
    });

    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');
    const requestUrl = `${this.opts.url}?${queryString}`;
    const response = await axios.get<IndexerServerQueryResponse>(requestUrl);

    this.checkResponseStatus(response);

    return response.data as IndexerServerQueryResponseByType[TRequestType];
  }

  private checkResponseStatus(response: AxiosResponse) {
    if (response.status !== 200 || !response.data) {
      throw Error(
        `Unexpected response from server: ${response.status} ${response.statusText}`,
      );
    }
  }
}
