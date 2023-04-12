import {
  Candlestick,
  GetIndexerCandlesticksParams,
  GetIndexerCandlesticksResponse,
  GetIndexerEventsParams,
  GetIndexerEventsResponse,
  GetIndexerFundingRateParams,
  GetIndexerFundingRateResponse,
  GetIndexerMatchEventsParams,
  GetIndexerMatchEventsResponse,
  GetIndexerOrdersParams,
  GetIndexerOrdersResponse,
  GetIndexerPerpPricesParams,
  GetIndexerPerpPricesResponse,
  GetIndexerProductSnapshotsParams,
  GetIndexerProductSnapshotsResponse,
  GetIndexerQuotePriceResponse,
  GetIndexerSubaccountRewardsParams,
  GetIndexerSummaryParams,
  GetIndexerSummaryResponse,
  GetSubaccountIndexerRewardsResponse,
  IndexerEventWithTx,
  IndexerMatchEvent,
  IndexerRewardEpoch,
  IndexerServerEventsParams,
  IndexerServerQueryRequestByType,
  IndexerServerQueryRequestType,
  IndexerServerQueryResponseByType,
  IndexerSummaryBalance,
} from './types';
import axios, { AxiosResponse } from 'axios';
import { subaccountToHex } from '@vertex-protocol/contracts';
import { fromX18, toBigDecimal } from '@vertex-protocol/utils';
import {
  mapIndexerEvent,
  mapIndexerEventWithTx,
  mapIndexerOrder,
  mapIndexerServerProduct,
} from './dataMappers';

export interface IndexerClientOpts {
  // Server URL
  url: string;
}

type IndexerQueryRequestBody = Partial<IndexerServerQueryRequestByType>;

/**
 * Base client for all indexer requests
 */
export class IndexerBaseClient {
  readonly opts: IndexerClientOpts;

  constructor(opts: IndexerClientOpts) {
    this.opts = opts;
  }

  /**
   * Retrieve a snapshot of the subaccount's balances at this point in time, with tracked variables for interest, funding, etc.
   *
   * @param params
   */
  async getSubaccountSummary(
    params: GetIndexerSummaryParams,
  ): Promise<GetIndexerSummaryResponse> {
    const baseResponse = await this.query('summary', {
      subaccount: subaccountToHex({
        subaccountOwner: params.subaccount.subaccountOwner,
        subaccountName: params.subaccount.subaccountName,
      }),
      timestamp: params.timestamp,
    });

    return baseResponse.events.map((event): IndexerSummaryBalance => {
      const mappedEvent = mapIndexerEvent(event);
      return {
        productId: mappedEvent.productId,
        state: mappedEvent.state,
        trackedVars: mappedEvent.trackedVars,
      };
    });
  }

  /**
   * Retrieves estimated / past trading rewards for a subaccount
   *
   * @param params
   */
  async getSubaccountRewards(
    params: GetIndexerSubaccountRewardsParams,
  ): Promise<GetSubaccountIndexerRewardsResponse> {
    const baseResponse = await this.query('rewards', {
      subaccount: subaccountToHex({
        subaccountOwner: params.subaccount.subaccountOwner,
        subaccountName: params.subaccount.subaccountName,
      }),
    });

    return baseResponse.rewards.map((rewardEpoch): IndexerRewardEpoch => {
      return {
        epoch: rewardEpoch.epoch,
        period: toBigDecimal(rewardEpoch.period),
        startTime: toBigDecimal(rewardEpoch.start_time),
        subaccountMakerTokens: fromX18(rewardEpoch.subaccount_maker_tokens),
        subaccountTakerTokens: fromX18(rewardEpoch.subaccount_taker_tokens),
        totalEpochMakerTokens: fromX18(rewardEpoch.epoch_maker_tokens),
        totalEpochTakerTokens: fromX18(rewardEpoch.epoch_maker_tokens),
        updateTime: toBigDecimal(rewardEpoch.update_time),
      };
    });
  }

  /**
   * Retrieves funding rate for a product, where 1 = 100%
   * @param params
   */
  async getFundingRate(
    params: GetIndexerFundingRateParams,
  ): Promise<GetIndexerFundingRateResponse> {
    const baseResponse = await this.query('funding_rate', {
      product_id: params.productId,
    });

    return {
      fundingRate: fromX18(baseResponse.funding_rate_x18),
      updateTime: toBigDecimal(baseResponse.update_time),
      productId: baseResponse.product_id,
    };
  }

  /**
   * Retrieves latest mark/index price for a perp product
   * @param params
   */
  async getPerpPrices(
    params: GetIndexerPerpPricesParams,
  ): Promise<GetIndexerPerpPricesResponse> {
    const baseResponse = await this.query('price', {
      product_id: params.productId,
    });

    return {
      indexPrice: fromX18(baseResponse.index_price_x18),
      markPrice: fromX18(baseResponse.mark_price_x18),
      updateTime: toBigDecimal(baseResponse.update_time),
      productId: baseResponse.product_id,
    };
  }

  /**
   * Retrieves candlesticks for a product
   * @param params
   */
  async getCandlesticks(
    params: GetIndexerCandlesticksParams,
  ): Promise<GetIndexerCandlesticksResponse> {
    const baseResponse = await this.query('candlesticks', {
      product_id: params.productId,
      max_time: params.maxTimeInclusive,
      limit: params.limit,
      granularity: params.period,
    });

    return baseResponse.candlesticks.map((candlestick): Candlestick => {
      return {
        close: fromX18(candlestick.close_x18),
        high: fromX18(candlestick.high_x18),
        low: fromX18(candlestick.low_x18),
        open: fromX18(candlestick.open_x18),
        time: toBigDecimal(candlestick.timestamp),
        volume: toBigDecimal(candlestick.volume),
      };
    });
  }

  /**
   * Retrieves historical snapshots for a product
   * @param params
   */
  async getProductSnapshots(
    params: GetIndexerProductSnapshotsParams,
  ): Promise<GetIndexerProductSnapshotsResponse> {
    const baseResponse = await this.query('products', {
      product_id: params.productId,
      max_time: params.maxTimestampInclusive,
      limit: params.limit,
      idx: params.startCursor,
    });

    return baseResponse.products.map((product, index) => {
      const tx = baseResponse.txs[index];
      return {
        ...mapIndexerServerProduct(product.product),
        submissionIndex: product.submission_idx,
        timestamp: toBigDecimal(tx.timestamp),
      };
    });
  }

  /**
   * Retrieves historical events
   *
   * @param params
   */
  async getEvents(
    params: GetIndexerEventsParams,
  ): Promise<GetIndexerEventsResponse> {
    const serverLimit = ((): IndexerServerEventsParams['limit'] | undefined => {
      if (!params.limit) {
        return;
      }

      if (params.limit.type === 'events') {
        return {
          raw: params.limit.value,
        };
      }
      return {
        txs: params.limit.value,
      };
    })();

    const baseResponse = await this.query('events', {
      subaccount: params.subaccount
        ? subaccountToHex({
            subaccountOwner: params.subaccount.subaccountOwner,
            subaccountName: params.subaccount.subaccountName,
          })
        : undefined,
      product_ids: params.productIds,
      event_types: params.eventTypes,
      max_time: params.maxTimestampInclusive,
      limit: serverLimit,
      idx: params.startCursor,
    });

    // Keep track of the last tx index, and go to the next one if the submission_idx for the currently processed event does not match
    // txs are ordered the same as events, so this should be correct
    let lastTxIdx = 0;
    return baseResponse.events.map((event): IndexerEventWithTx => {
      if (baseResponse.txs[lastTxIdx].submission_idx !== event.submission_idx) {
        lastTxIdx += 1;
      }
      const tx = baseResponse.txs[lastTxIdx];
      return mapIndexerEventWithTx(event, tx);
    });
  }

  /**
   * Retrieves historical orders
   * @param params
   */
  async getOrders(
    params: GetIndexerOrdersParams,
  ): Promise<GetIndexerOrdersResponse> {
    const baseResponse = await this.query('orders', {
      subaccount: params.subaccount
        ? subaccountToHex({
            subaccountOwner: params.subaccount.subaccountOwner,
            subaccountName: params.subaccount.subaccountName,
          })
        : undefined,
      product_ids: params.productIds,
      digests: params.digests,
      max_time: params.maxTimestampInclusive,
      limit: params.limit,
      idx: params.startCursor,
    });

    return baseResponse.orders.map(mapIndexerOrder);
  }

  /**
   * Gets match order events, this will return the same events as the events query, but with additional information
   * to identify the order that was matched
   *
   * @param params
   */
  async getMatchEvents(
    params: GetIndexerMatchEventsParams,
  ): Promise<GetIndexerMatchEventsResponse> {
    const baseResponse = await this.query('matches', {
      subaccount: params.subaccount
        ? subaccountToHex({
            subaccountOwner: params.subaccount.subaccountOwner,
            subaccountName: params.subaccount.subaccountName,
          })
        : undefined,
      product_ids: params.productIds,
      max_time: params.maxTimestampInclusive,
      limit: params.limit,
      idx: params.startCursor,
    });

    // Same as logic in `getEvents`
    let lastTxIdx = 0;
    return baseResponse.matches.map((matchEvent, index): IndexerMatchEvent => {
      if (
        baseResponse.txs[lastTxIdx].submission_idx !== matchEvent.submission_idx
      ) {
        lastTxIdx += 1;
      }
      const { tx, timestamp } = baseResponse.txs[lastTxIdx];

      const productId = (() => {
        if ('match_orders' in tx) {
          return tx.match_orders.product_id;
        } else {
          throw new Error('Match Event Tx is not a MatchOrders event');
        }
      })();

      return {
        productId,
        fee: toBigDecimal(matchEvent.fee),
        baseFilled: toBigDecimal(matchEvent.base_filled),
        quoteFilled: toBigDecimal(matchEvent.quote_filled),
        cumulativeFee: toBigDecimal(matchEvent.cumulative_fee),
        cumulativeBaseFilled: toBigDecimal(matchEvent.cumulative_base_filled),
        cumulativeQuoteFilled: toBigDecimal(matchEvent.cumulative_quote_filled),
        digest: matchEvent.digest,
        order: matchEvent.order,
        submissionIndex: matchEvent.submission_idx,
        timestamp: toBigDecimal(timestamp),
      };
    });
  }

  /**
   * Gets quote (USDC) price in terms of USD
   */
  async getQuotePrice(): Promise<GetIndexerQuotePriceResponse> {
    const baseResponse = await this.query('usdc_price', {});
    return {
      price: fromX18(baseResponse.price_x18),
    };
  }

  protected async query<TRequestType extends IndexerServerQueryRequestType>(
    requestType: TRequestType,
    params: IndexerServerQueryRequestByType[TRequestType],
  ): Promise<IndexerServerQueryResponseByType[TRequestType]> {
    const reqBody: IndexerQueryRequestBody = {
      [requestType]: params,
    };
    const response = await axios.post<
      IndexerServerQueryResponseByType[TRequestType]
    >(this.opts.url, reqBody);

    this.checkResponseStatus(response);

    return response.data;
  }

  private checkResponseStatus(response: AxiosResponse) {
    if (response.status !== 200 || !response.data) {
      throw Error(
        `Unexpected response from server: ${response.status} ${response.statusText}`,
      );
    }
  }
}
