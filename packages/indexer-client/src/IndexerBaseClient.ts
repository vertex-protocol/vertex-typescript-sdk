import {
  EIP712LeaderboardAuthenticationParams,
  EIP712LeaderboardAuthenticationValues,
  getDefaultRecvTime,
  getSignedTransactionRequest,
  getVertexEIP712Values,
  SignableRequestType,
  SignableRequestTypeToParams,
  SignedTx,
  subaccountFromHex,
  subaccountToHex,
} from '@vertex-protocol/contracts';
import {
  fromX18,
  mapValues,
  nowInSeconds,
  toBigDecimal,
} from '@vertex-protocol/utils';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  mapIndexerEvent,
  mapIndexerEventWithTx,
  mapIndexerFoundationTakerRewardsWeek,
  mapIndexerFundingRate,
  mapIndexerLeaderboardContest,
  mapIndexerLeaderboardPosition,
  mapIndexerLeaderboardRegistration,
  mapIndexerMakerStatistics,
  mapIndexerMatchEventBalances,
  mapIndexerOrder,
  mapIndexerPerpPrices,
  mapIndexerProductPayment,
  mapIndexerRewardsEpoch,
  mapIndexerServerProduct,
} from './dataMappers';
import {
  Candlestick,
  GetIndexerBlastPointsParams,
  GetIndexerBlastPointsResponse,
  GetIndexerBlitzInitialDropConditionsParams,
  GetIndexerBlitzInitialDropConditionsResponse,
  GetIndexerBlitzPointsLeaderboardParams,
  GetIndexerBlitzPointsLeaderboardResponse,
  GetIndexerBlitzPointsParams,
  GetIndexerBlitzPointsResponse,
  GetIndexerCandlesticksParams,
  GetIndexerCandlesticksResponse,
  GetIndexerClaimFoundationRewardsMerkleProofsParams,
  GetIndexerClaimFoundationRewardsMerkleProofsResponse,
  GetIndexerClaimVrtxMerkleProofsParams,
  GetIndexerClaimVrtxMerkleProofsResponse,
  GetIndexerEventsParams,
  GetIndexerEventsResponse,
  GetIndexerFastWithdrawalSignatureParams,
  GetIndexerFastWithdrawalSignatureResponse,
  GetIndexerFoundationTakerRewardsParams,
  GetIndexerFoundationTakerRewardsResponse,
  GetIndexerFundingRateParams,
  GetIndexerFundingRateResponse,
  GetIndexerInterestFundingPaymentsParams,
  GetIndexerInterestFundingPaymentsResponse,
  GetIndexerLeaderboardContestsParams,
  GetIndexerLeaderboardContestsResponse,
  GetIndexerLeaderboardParams,
  GetIndexerLeaderboardParticipantParams,
  GetIndexerLeaderboardParticipantResponse,
  GetIndexerLeaderboardRegistrationParams,
  GetIndexerLeaderboardRegistrationResponse,
  GetIndexerLeaderboardResponse,
  GetIndexerLinkedSignerParams,
  GetIndexerLinkedSignerResponse,
  GetIndexerMakerStatisticsParams,
  GetIndexerMakerStatisticsResponse,
  GetIndexerMarketSnapshotsParams,
  GetIndexerMarketSnapshotsResponse,
  GetIndexerMatchEventsParams,
  GetIndexerMatchEventsResponse,
  GetIndexerMultiProductFundingRatesParams,
  GetIndexerMultiProductFundingRatesResponse,
  GetIndexerMultiProductPerpPricesParams,
  GetIndexerMultiProductPerpPricesResponse,
  GetIndexerMultiProductSnapshotsParams,
  GetIndexerMultiProductSnapshotsResponse,
  GetIndexerMultiSubaccountSnapshotsParams,
  GetIndexerMultiSubaccountSnapshotsResponse,
  GetIndexerOraclePricesParams,
  GetIndexerOraclePricesResponse,
  GetIndexerOrdersParams,
  GetIndexerOrdersResponse,
  GetIndexerPerpPricesParams,
  GetIndexerPerpPricesResponse,
  GetIndexerProductSnapshotsParams,
  GetIndexerProductSnapshotsResponse,
  GetIndexerQuotePriceResponse,
  GetIndexerReferralCodeParams,
  GetIndexerReferralCodeResponse,
  GetIndexerRewardsParams,
  GetIndexerRewardsResponse,
  GetIndexerTakerRewardsParams,
  GetIndexerTakerRewardsResponse,
  GetIndexerVrtxTokenInfoParams,
  GetIndexerVrtxTokenInfoResponse,
  IndexerEventWithTx,
  IndexerMarketSnapshot,
  IndexerMatchEvent,
  IndexerOraclePrice,
  IndexerServerEventsParams,
  IndexerServerQueryRequestByType,
  IndexerServerQueryRequestType,
  IndexerServerQueryResponseByType,
  IndexerSnapshotBalance,
  IndexerSubaccountSnapshot,
  IndexerTakerRewardsEpoch,
  ListIndexerSubaccountsParams,
  ListIndexerSubaccountsResponse,
  UpdateIndexerLeaderboardRegistrationParams,
  UpdateIndexerLeaderboardRegistrationResponse,
} from './types';
import { BigNumberish, Signer } from 'ethers';

export interface IndexerClientOpts {
  // Server URLs
  url: string;
  v2Url?: string;
  // Signer for EIP712 signing, if not provided, requests that require signatures will error
  signer?: Signer;
}

type IndexerQueryRequestBody = Partial<IndexerServerQueryRequestByType>;

/**
 * Base client for all indexer requests
 */
export class IndexerBaseClient {
  readonly opts: IndexerClientOpts;
  readonly v2Url: string;
  readonly axiosInstance: AxiosInstance;

  constructor(opts: IndexerClientOpts) {
    this.opts = opts;
    this.axiosInstance = axios.create({
      withCredentials: true,
    });
    this.v2Url = opts.v2Url ? opts.v2Url : opts.url.replace('v1', 'v2');
  }

  /**
   * List all subaccounts
   *
   * @param params
   */
  async listSubaccounts(
    params: ListIndexerSubaccountsParams,
  ): Promise<ListIndexerSubaccountsResponse> {
    const baseResponse = await this.query('subaccounts', params);

    return baseResponse.subaccounts.map((item) => {
      const subaccount = subaccountFromHex(item.subaccount);
      return {
        hexId: item.subaccount,
        ...subaccount,
      };
    });
  }

  /**
   * Retrieve snapshots of multiple subaccounts at multiple points in time.
   * Each snapshot is a view of the subaccount's balances at this point in time, with tracked variables for interest, funding, etc.
   *
   * @param params
   */
  async getMultiSubaccountSnapshots(
    params: GetIndexerMultiSubaccountSnapshotsParams,
  ): Promise<GetIndexerMultiSubaccountSnapshotsResponse> {
    const subaccountHexIds = params.subaccounts.map(
      ({ subaccountOwner, subaccountName }) =>
        subaccountToHex({
          subaccountOwner,
          subaccountName,
        }),
    );

    const baseResponse = await this.query('account_snapshots', {
      subaccounts: subaccountHexIds,
      timestamps: params.timestamps,
    });

    const snapshotsBySubaccount = mapValues(
      baseResponse.snapshots,
      (balanceSnapshots) => {
        const snapshotByTimestamp: Record<string, IndexerSubaccountSnapshot> =
          {};

        Object.entries(balanceSnapshots).forEach(([timestamp, events]) => {
          const balances: IndexerSnapshotBalance[] = events.map(
            (event): IndexerSnapshotBalance => {
              const mappedEvent = mapIndexerEvent(event);
              return {
                productId: mappedEvent.productId,
                state: mappedEvent.state,
                trackedVars: mappedEvent.trackedVars,
              };
            },
          );

          snapshotByTimestamp[timestamp] = {
            timestamp: toBigDecimal(timestamp),
            balances,
          };
        });

        return snapshotByTimestamp;
      },
    );

    return {
      subaccountHexIds,
      snapshots: snapshotsBySubaccount,
    };
  }

  /**
   * Retrieves estimated / past rewards for an address
   *
   * @param params
   */
  async getRewards(
    params: GetIndexerRewardsParams,
  ): Promise<GetIndexerRewardsResponse> {
    const baseResponse = await this.query('rewards', {
      address: params.address,
      start: params.start,
      limit: params.limit,
    });

    return {
      epochs: baseResponse.rewards.map(mapIndexerRewardsEpoch),
      updateTime: toBigDecimal(baseResponse.update_time),
      totalReferrals: Number(baseResponse.total_referrals),
    };
  }

  /**
   * Retrieves estimated / past taker trading + referral rewards for an address
   *
   * @param params
   */
  async getTakerRewards(
    params: GetIndexerTakerRewardsParams,
  ): Promise<GetIndexerTakerRewardsResponse> {
    const baseResponse = await this.query('taker_rewards', {
      address: params.address,
      start: params.start,
      limit: params.limit,
    });

    return {
      epochs: baseResponse.taker_rewards.map(
        (epoch): IndexerTakerRewardsEpoch => {
          return {
            epoch: epoch.epoch,
            takerTokens: toBigDecimal(epoch.taker_tokens),
            takerReferralTokens: toBigDecimal(epoch.taker_referral_tokens),
          };
        },
      ),
      updateTime: toBigDecimal(baseResponse.update_time),
      totalReferrals: Number(baseResponse.total_referrals),
    };
  }

  /**
   * Retrieves referral code for an address
   *
   * @param params
   */
  async getReferralCode(
    params: GetIndexerReferralCodeParams,
  ): Promise<GetIndexerReferralCodeResponse> {
    const baseResponse = await this.query('referral_code', {
      subaccount: subaccountToHex({
        subaccountOwner: params.subaccount.subaccountOwner,
        subaccountName: params.subaccount.subaccountName,
      }),
    });

    return {
      referralCode: baseResponse.referral_code,
    };
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

    return mapIndexerFundingRate(baseResponse);
  }

  /**
   * Retrieves funding rate for multiple products, where 1 = 100%
   * @param params
   */
  async getMultiProductFundingRates(
    params: GetIndexerMultiProductFundingRatesParams,
  ): Promise<GetIndexerMultiProductFundingRatesResponse> {
    const baseResponse = await this.query('funding_rates', {
      product_ids: params.productIds,
    });

    return mapValues(baseResponse, mapIndexerFundingRate);
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

    return mapIndexerPerpPrices(baseResponse);
  }

  /**
   * Retrieves latest mark/index price for multiple perp products
   * @param params
   */
  async getMultiProductPerpPrices(
    params: GetIndexerMultiProductPerpPricesParams,
  ): Promise<GetIndexerMultiProductPerpPricesResponse> {
    const baseResponse = await this.query('perp_prices', {
      product_ids: params.productIds,
    });

    return mapValues(baseResponse, mapIndexerPerpPrices);
  }

  /**
   * Retrieves latest oracle prices for provided products
   * @param params
   */
  async getOraclePrices(
    params: GetIndexerOraclePricesParams,
  ): Promise<GetIndexerOraclePricesResponse> {
    const baseResponse = await this.query('oracle_price', {
      product_ids: params.productIds,
    });

    return baseResponse.prices.map((price): IndexerOraclePrice => {
      return {
        oraclePrice: fromX18(price.oracle_price_x18),
        updateTime: toBigDecimal(price.update_time),
        productId: price.product_id,
      };
    });
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

    return baseResponse.products.map((product) => {
      return {
        ...mapIndexerServerProduct(product.product),
        submissionIndex: product.submission_idx,
      };
    });
  }

  /**
   * Retrieves historical snapshots for multiple products
   * @param params
   */
  async getMultiProductSnapshots(
    params: GetIndexerMultiProductSnapshotsParams,
  ): Promise<GetIndexerMultiProductSnapshotsResponse> {
    const timestampToProductsMap = await this.query('product_snapshots', {
      product_ids: params.productIds,
      max_time: params.maxTimestampInclusive ?? [nowInSeconds()],
    });

    return mapValues(timestampToProductsMap, (productIdToProduct) => {
      return mapValues(productIdToProduct, (indexerProduct) => {
        return {
          ...mapIndexerServerProduct(indexerProduct.product),
          submissionIndex: indexerProduct.submission_idx,
        };
      });
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
      desc: params.desc,
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
    return baseResponse.matches.map((matchEvent): IndexerMatchEvent => {
      if (
        baseResponse.txs[lastTxIdx].submission_idx !== matchEvent.submission_idx
      ) {
        lastTxIdx += 1;
      }
      const { tx, timestamp } = baseResponse.txs[lastTxIdx];

      const productId = (() => {
        if ('match_orders' in tx) {
          return tx.match_orders.product_id;
        } else if ('match_orders_r_f_q' in tx) {
          return tx.match_orders_r_f_q.product_id;
        } else {
          throw new Error('Match Event Tx is not a valid match event');
        }
      })();

      return {
        productId,
        totalFee: toBigDecimal(matchEvent.fee),
        sequencerFee: toBigDecimal(matchEvent.sequencer_fee),
        baseFilled: toBigDecimal(matchEvent.base_filled),
        quoteFilled: toBigDecimal(matchEvent.quote_filled),
        cumulativeFee: toBigDecimal(matchEvent.cumulative_fee),
        cumulativeBaseFilled: toBigDecimal(matchEvent.cumulative_base_filled),
        cumulativeQuoteFilled: toBigDecimal(matchEvent.cumulative_quote_filled),
        digest: matchEvent.digest,
        order: matchEvent.order,
        submissionIndex: matchEvent.submission_idx,
        timestamp: toBigDecimal(timestamp),
        preEventTrackedVars: {
          netEntryUnrealized: toBigDecimal(matchEvent.net_entry_unrealized),
          netEntryCumulative: toBigDecimal(matchEvent.net_entry_cumulative),
        },
        preBalances: mapIndexerMatchEventBalances(matchEvent.pre_balance),
        postBalances: mapIndexerMatchEventBalances(matchEvent.post_balance),
        tx,
      };
    });
  }

  /**
   * Retrieves historical funding & interest payments.
   * NOTE: `limit` is an upperbound. If a user changes position size such that his position is 0 during each funding/interest tick,
   *        then the indexer will return fewer than `limit` results per page. However, all events are actually present,
   *        we'll just need to keep paginating until the next cursor is null.
   *
   * @param params
   */
  async getInterestFundingPayments(
    params: GetIndexerInterestFundingPaymentsParams,
  ): Promise<GetIndexerInterestFundingPaymentsResponse> {
    const baseResponse = await this.query('interest_and_funding', {
      subaccount: subaccountToHex({
        subaccountOwner: params.subaccount.subaccountOwner,
        subaccountName: params.subaccount.subaccountName,
      }),
      product_ids: params.productIds,
      limit: params.limit,
      max_idx: params.startCursor,
    });

    return {
      fundingPayments: baseResponse.funding_payments.map(
        mapIndexerProductPayment,
      ),
      interestPayments: baseResponse.interest_payments.map(
        mapIndexerProductPayment,
      ),
      nextCursor: baseResponse.next_idx,
    };
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

  /**
   * Fetches currently registered linked signer with the remaining txs allowed for the subaccount
   */
  async getLinkedSignerWithRateLimit(
    params: GetIndexerLinkedSignerParams,
  ): Promise<GetIndexerLinkedSignerResponse> {
    const baseResponse = await this.query('linked_signer_rate_limit', {
      subaccount: subaccountToHex(params.subaccount),
    });
    return {
      totalTxLimit: toBigDecimal(baseResponse.total_tx_limit),
      remainingTxs: toBigDecimal(baseResponse.remaining_tx),
      signer: baseResponse.signer,
      waitTimeUntilNextTx: toBigDecimal(baseResponse.wait_time),
    };
  }

  /**
   * Retrieve historical market snapshots
   * @param params
   */
  async getMarketSnapshots(
    params: GetIndexerMarketSnapshotsParams,
  ): Promise<GetIndexerMarketSnapshotsResponse> {
    const baseResponse = await this.query('market_snapshots', {
      interval: {
        granularity: params.granularity,
        max_time: params.maxTimeInclusive?.toString(),
        count: params.limit,
      },
      product_ids: params.productIds,
    });

    return baseResponse.snapshots.map((snapshot): IndexerMarketSnapshot => {
      return {
        timestamp: toBigDecimal(snapshot.timestamp),
        cumulativeUsers: toBigDecimal(snapshot.cumulative_users),
        dailyActiveUsers: toBigDecimal(snapshot.daily_active_users),
        tvl: toBigDecimal(snapshot.tvl),
        borrowRates: mapValues(snapshot.borrow_rates, fromX18),
        cumulativeLiquidationAmounts: mapValues(
          snapshot.cumulative_liquidation_amounts,
          toBigDecimal,
        ),
        cumulativeMakerFees: mapValues(
          snapshot.cumulative_maker_fees,
          toBigDecimal,
        ),
        cumulativeSequencerFees: mapValues(
          snapshot.cumulative_sequencer_fees,
          toBigDecimal,
        ),
        cumulativeTakerFees: mapValues(
          snapshot.cumulative_taker_fees,
          toBigDecimal,
        ),
        cumulativeTrades: mapValues(snapshot.cumulative_trades, toBigDecimal),
        cumulativeVolumes: mapValues(snapshot.cumulative_volumes, toBigDecimal),
        depositRates: mapValues(snapshot.deposit_rates, fromX18),
        fundingRates: mapValues(snapshot.funding_rates, fromX18),
        openInterests: mapValues(snapshot.open_interests, fromX18),
        totalBorrows: mapValues(snapshot.total_borrows, toBigDecimal),
        totalDeposits: mapValues(snapshot.total_deposits, toBigDecimal),
      };
    });
  }

  /**
   * Retrieve the merkle proofs & total amounts claimable for the address for all epochs
   *
   * @param params
   */
  async getClaimVrtxMerkleProofs(
    params: GetIndexerClaimVrtxMerkleProofsParams,
  ): Promise<GetIndexerClaimVrtxMerkleProofsResponse> {
    const baseResponse = await this.query('vrtx_merkle_proofs', params);

    return baseResponse.merkle_proofs.map((proof) => {
      return {
        proof: proof.proof,
        totalAmount: toBigDecimal(proof.total_amount),
      };
    });
  }

  /**
   * Retrieves estimated / past foundation taker rewards for an address
   * Example of foundation taker rewards: ARB rewards on Arbitrum
   *
   * @param params
   */
  async getFoundationTakerRewards(
    params: GetIndexerFoundationTakerRewardsParams,
  ): Promise<GetIndexerFoundationTakerRewardsResponse> {
    const baseResponse = await this.query('foundation_taker_rewards', {
      address: params.address,
    });

    return {
      weeks: baseResponse.foundation_taker_rewards.map(
        mapIndexerFoundationTakerRewardsWeek,
      ),
      updateTime: toBigDecimal(baseResponse.update_time),
    };
  }

  /**
   * Retrieve the merkle proofs & total amounts claimable for the address for all weeks
   *
   * @param params
   */
  async getClaimFoundationRewardsMerkleProofs(
    params: GetIndexerClaimFoundationRewardsMerkleProofsParams,
  ): Promise<GetIndexerClaimFoundationRewardsMerkleProofsResponse> {
    const baseResponse = await this.query(
      'foundation_rewards_merkle_proofs',
      params,
    );

    return baseResponse.merkle_proofs.map((proof) => {
      return {
        proof: proof.proof,
        totalAmount: toBigDecimal(proof.total_amount),
      };
    });
  }

  /**
   * Retrieve blitz points for the address
   */
  async getBlitzPoints(
    params: GetIndexerBlitzPointsParams,
  ): Promise<GetIndexerBlitzPointsResponse> {
    const baseResponse = await this.query('blitz_points', params);

    return {
      initialPoints: toBigDecimal(baseResponse.initial_points),
      referralPoints: toBigDecimal(baseResponse.referral_points),
      tradingPoints: toBigDecimal(baseResponse.trading_points),
      phase2Epochs: baseResponse.phase2_points.map(
        ({
          epoch,
          rank,
          period,
          referral_points,
          start_time,
          trading_points,
        }) => {
          return {
            epoch,
            rank: toBigDecimal(rank),
            startTime: toBigDecimal(start_time),
            period: toBigDecimal(period),
            tradingPoints: toBigDecimal(trading_points),
            referralPoints: toBigDecimal(referral_points),
          };
        },
      ),
    };
  }

  /**
   * Retrieve blast points for the address
   */
  async getBlastPoints(
    params: GetIndexerBlastPointsParams,
  ): Promise<GetIndexerBlastPointsResponse> {
    const baseResponse = await this.query('blast_points', params);

    return {
      points: toBigDecimal(baseResponse.points),
      gold: toBigDecimal(baseResponse.gold),
    };
  }

  /**
   * Retrieve blitz points leaderboard
   */
  async getBlitzPointsLeaderboard(
    params: GetIndexerBlitzPointsLeaderboardParams,
  ): Promise<GetIndexerBlitzPointsLeaderboardResponse> {
    const baseResponse = await this.query('blitz_points_leaderboard', {
      limit: params.limit,
      start: Number(params.startCursor),
      epoch: params.epoch,
    });

    return {
      positions: baseResponse.positions.map(
        ({ rank, trading_points, referral_points, address }) => {
          return {
            rank: toBigDecimal(rank),
            tradingPoints: toBigDecimal(trading_points),
            referralPoints: toBigDecimal(referral_points),
            address,
          };
        },
      ),
    };
  }

  /**
   * Retrieve status for initial claim process for Blitz
   */
  async getBlitzInitialDropConditions(
    params: GetIndexerBlitzInitialDropConditionsParams,
  ): Promise<GetIndexerBlitzInitialDropConditionsResponse> {
    const baseResponse = await this.query('initial_drop_conditions', params);

    return {
      accountValueReached: baseResponse.account_value_reached,
      amount: toBigDecimal(baseResponse.amount),
      deadline: toBigDecimal(baseResponse.deadline),
      perpTradesCompleted: baseResponse.perp_trades_done,
      tweeted: baseResponse.tweeted,
    };
  }

  /**
   * Retrieve maker statistics for a given epoch
   *
   * @param params
   */
  async getMakerStatistics(
    params: GetIndexerMakerStatisticsParams,
  ): Promise<GetIndexerMakerStatisticsResponse> {
    const baseResponse = await this.query('maker_statistics', {
      product_id: params.productId,
      epoch: params.epoch,
      interval: params.interval,
    });

    return {
      rewardCoefficient: toBigDecimal(baseResponse.reward_coefficient),
      makers: baseResponse.makers.map(mapIndexerMakerStatistics),
    };
  }

  /**
   * Retrieve leaderboard stats for a given contest
   *
   * @param params
   */
  async getLeaderboard(
    params: GetIndexerLeaderboardParams,
  ): Promise<GetIndexerLeaderboardResponse> {
    const baseResponse = await this.query('leaderboard', {
      contest_id: params.contestId,
      rank_type: params.rankType,
      start: params.startCursor,
      limit: params.limit,
    });

    return {
      participants: baseResponse.positions.map(mapIndexerLeaderboardPosition),
    };
  }

  /**
   * Retrieve leaderboard ranking of a subaccount on a given contest
   *
   * @param params
   */
  async getLeaderboardParticipant(
    params: GetIndexerLeaderboardParticipantParams,
  ): Promise<GetIndexerLeaderboardParticipantResponse> {
    const baseResponse = await this.query('leaderboard_rank', {
      subaccount: subaccountToHex(params.subaccount),
      contest_ids: params.contestIds,
    });

    return {
      participant: mapValues(baseResponse.positions, (position) =>
        mapIndexerLeaderboardPosition(position),
      ),
    };
  }

  /**
   * Attempts to update a user's registration to the provided `contestId`. This requires signing.
   * @param params
   */
  async updateLeaderboardRegistration(
    params: UpdateIndexerLeaderboardRegistrationParams,
  ): Promise<UpdateIndexerLeaderboardRegistrationResponse> {
    const signatureParams: EIP712LeaderboardAuthenticationParams = {
      // Default to 90 seconds from now if no recvTime is provided
      expiration: params.recvTime?.toFixed() ?? getDefaultRecvTime().toFixed(),
      subaccountName: params.subaccountName,
      subaccountOwner: params.subaccountOwner,
    };

    const tx = getVertexEIP712Values(
      'leaderboard_authentication',
      signatureParams,
    );
    const signature = await this.sign(
      'leaderboard_authentication',
      params.updateRegistration.verifyingAddr,
      params.updateRegistration.chainId,
      signatureParams,
    );

    const updateRegistrationTx: SignedTx<EIP712LeaderboardAuthenticationValues> =
      {
        tx,
        signature,
      };

    const baseResponse = await this.query('leaderboard_registration', {
      address: params.subaccountOwner,
      contest_id: params.contestId,
      update_registration: updateRegistrationTx,
    });
    return {
      registration: baseResponse.registration
        ? mapIndexerLeaderboardRegistration(baseResponse.registration)
        : null,
    };
  }

  /**
   * Retrieves the registration status for a leaderboard participant for provided `contestId`.
   * @param params
   */
  async getLeaderboardRegistration(
    params: GetIndexerLeaderboardRegistrationParams,
  ): Promise<GetIndexerLeaderboardRegistrationResponse> {
    const baseResponse = await this.query('leaderboard_registration', {
      address: params.subaccountOwner,
      contest_id: params.contestId,
      update_registration: null,
    });
    return {
      registration: baseResponse.registration
        ? mapIndexerLeaderboardRegistration(baseResponse.registration)
        : null,
    };
  }

  /**
   * Retrieve metadata of provided leaderboard contests
   *
   * @param params
   */
  async getLeaderboardContests(
    params: GetIndexerLeaderboardContestsParams,
  ): Promise<GetIndexerLeaderboardContestsResponse> {
    const baseResponse = await this.query('leaderboard_contests', {
      contest_ids: params.contestIds,
    });

    return {
      contests: baseResponse.contests.map(mapIndexerLeaderboardContest),
    };
  }

  /**
   * Retrieve signature and tx to submit a fast withdrawal
   *
   * @param params
   */
  async getFastWithdrawalSignature(
    params: GetIndexerFastWithdrawalSignatureParams,
  ): Promise<GetIndexerFastWithdrawalSignatureResponse> {
    const baseResponse = await this.query('fast_withdrawal_signature', params);
    return {
      idx: baseResponse.idx,
      tx: baseResponse.tx,
      txBytes: baseResponse.tx_bytes,
      signatures: baseResponse.signatures,
    };
  }

  /**
   * Retrieves VRTX total / circulating supply
   *
   * @param params
   */
  async getVrtxTokenInfo(
    params: GetIndexerVrtxTokenInfoParams,
  ): Promise<GetIndexerVrtxTokenInfoResponse> {
    const response = await this.axiosInstance.get(
      `${this.v2Url}/vrtx?q=${params.tokenInfoType}`,
    );

    this.checkResponseStatus(response);

    return response.data;
  }

  protected async query<TRequestType extends IndexerServerQueryRequestType>(
    requestType: TRequestType,
    params: IndexerServerQueryRequestByType[TRequestType],
  ): Promise<IndexerServerQueryResponseByType[TRequestType]> {
    const reqBody: IndexerQueryRequestBody = {
      [requestType]: params,
    };
    const response = await this.axiosInstance.post<
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

  protected async sign<T extends SignableRequestType>(
    requestType: T,
    verifyingContract: string,
    chainId: BigNumberish,
    params: SignableRequestTypeToParams[T],
  ) {
    const signer = this.opts.signer;
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
}
