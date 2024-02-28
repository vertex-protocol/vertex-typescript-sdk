import {
  encodeSignedOrder,
  MarketWithProduct,
  subaccountToHex,
} from '@vertex-protocol/contracts';
import { fromX18, toBigDecimal, toX18 } from '@vertex-protocol/utils';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import { EngineBaseClient } from './EngineBaseClient';
import {
  EngineQueryAllMarketsResponse,
  EngineQueryContractsResponse,
  EngineQueryEstimatedSubaccountSummaryParams,
  EngineQueryHealthGroupsResponse,
  EngineQueryLinkedSignerParams,
  EngineQueryLinkedSignerResponse,
  EngineQueryMarketLiquidityParams,
  EngineQueryMarketLiquidityResponse,
  EngineQueryMarketPriceParams,
  EngineQueryMarketPriceResponse,
  EngineQueryMarketPricesParams,
  EngineQueryMarketPricesResponse,
  EngineQueryMaxMintLpAmountParams,
  EngineQueryMaxMintLpAmountResponse,
  EngineQueryMaxOrderSizeParams,
  EngineQueryMaxOrderSizeResponse,
  EngineQueryMaxWithdrawableParams,
  EngineQueryMaxWithdrawableResponse,
  EngineQueryOrderParams,
  EngineQueryOrderResponse,
  EngineQuerySubaccountFeeRatesParams,
  EngineQuerySubaccountFeeRatesResponse,
  EngineQuerySubaccountOrdersParams,
  EngineQuerySubaccountOrdersResponse,
  EngineQuerySubaccountProductOrdersParams,
  EngineQuerySubaccountProductOrdersResponse,
  EngineQuerySubaccountSummaryParams,
  EngineQuerySubaccountSummaryResponse,
  EngineQuerySymbolsParams,
  EngineQuerySymbolsResponse,
  EngineQueryValidateOrderParams,
  EngineQueryValidateOrderResponse,
  EngineQueryValidateSignedOrderParams,
  EngineServerQueryStatusResponse,
  EngineServerQuerySubaccountInfoParams,
  SubaccountOrderFeeRates,
} from './types';
import { mapProductEngineType } from './utils/productEngineTypeMappers';
import {
  mapEngineMarketPrice,
  mapEngineServerOrder,
  mapEngineServerPerpProduct,
  mapEngineServerSpotProduct,
  mapEngineServerSymbols,
  mapEngineServerTickLiquidity,
  mapSubaccountSummary,
} from './utils/queryDataMappers';

export class EngineQueryClient extends EngineBaseClient {
  /**
   * Retrieves the set of contracts that the engine is interfacing with
   */
  async getContracts(): Promise<EngineQueryContractsResponse> {
    const baseResponse = await this.query('contracts', {});
    return {
      chainId: baseResponse.chain_id,
      endpointAddr: baseResponse.endpoint_addr,
      orderbookAddrs: baseResponse.book_addrs,
    };
  }

  /**
   * Retrieves current engine status
   */
  async getStatus(): Promise<EngineServerQueryStatusResponse> {
    return this.query('status', {});
  }

  /**
   * Retrieves a subaccount summary reflective of the state within the offchain engine. This adheres to the
   * same return interface as the contract version
   *
   * @param params
   */
  async getSubaccountSummary(
    params: EngineQuerySubaccountSummaryParams,
  ): Promise<EngineQuerySubaccountSummaryResponse> {
    const subaccount = subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    });
    const baseResponse = await this.query('subaccount_info', {
      subaccount,
    });

    return mapSubaccountSummary(baseResponse);
  }

  /**
   * Retrieves an estimated subaccount summary with the applied transactions
   *
   * @param params
   */
  async getEstimatedSubaccountSummary(
    params: EngineQueryEstimatedSubaccountSummaryParams,
  ): Promise<EngineQuerySubaccountSummaryResponse> {
    const subaccount = subaccountToHex({
      subaccountOwner: params.subaccountOwner,
      subaccountName: params.subaccountName,
    });
    const queryParams: EngineServerQuerySubaccountInfoParams = {
      subaccount: subaccount,
      txns: params.txs.map(
        (
          tx,
        ): NonNullable<
          EngineServerQuerySubaccountInfoParams['txns']
        >[number] => {
          switch (tx.type) {
            case 'burn_lp':
              return {
                burn_lp: {
                  product_id: tx.tx.productId,
                  subaccount,
                  amount_lp: tx.tx.amountLp.toFixed(),
                },
              };
            case 'apply_delta':
              return {
                apply_delta: {
                  product_id: tx.tx.productId,
                  subaccount,
                  amount_delta: tx.tx.amountDelta.toFixed(),
                  v_quote_delta: tx.tx.vQuoteDelta.toFixed(),
                },
              };
            case 'mint_lp':
              return {
                mint_lp: {
                  product_id: tx.tx.productId,
                  subaccount,
                  amount_base: tx.tx.amountBase.toFixed(),
                  quote_amount_low: tx.tx.amountQuoteLow.toFixed(),
                  quote_amount_high: tx.tx.amountQuoteHigh.toFixed(),
                },
              };
          }
        },
      ),
    };
    const baseResponse = await this.query('subaccount_info', {
      subaccount: queryParams.subaccount,
      txns: JSON.stringify(queryParams.txns),
    });

    return mapSubaccountSummary(baseResponse);
  }

  /**
   * Retrieves symbols and product info
   *
   * @param params
   */
  async getSymbols(
    params: EngineQuerySymbolsParams,
  ): Promise<EngineQuerySymbolsResponse> {
    const baseResponse = await this.query('symbols', {
      product_ids: params.productIds,
      product_type: params.productType
        ? mapProductEngineType(params.productType)
        : undefined,
    });
    return mapEngineServerSymbols(baseResponse);
  }

  /**
   * Retrieves all market states as per the offchain engine. Same return interface as contracts
   */
  async getAllMarkets(): Promise<EngineQueryAllMarketsResponse> {
    const markets: MarketWithProduct[] = [];

    const baseResponse = await this.query('all_products', {});
    baseResponse.spot_products.forEach((spotProduct) => {
      markets.push(mapEngineServerSpotProduct(spotProduct));
    });
    baseResponse.perp_products.forEach((perpProduct) => {
      markets.push(mapEngineServerPerpProduct(perpProduct));
    });

    return markets;
  }

  /**
   * Retrieves all health groups (linked spot & perp products) from the engine
   */
  async getHealthGroups(): Promise<EngineQueryHealthGroupsResponse> {
    const baseResponse = await this.query('health_groups', {});

    return {
      healthGroups: baseResponse.health_groups.map(
        ([spotProductId, perpProductId]) => {
          return {
            spotProductId,
            perpProductId,
          };
        },
      ),
    };
  }

  /**
   * Retrieves an order from the offchain engine
   *
   * @param params
   */
  async getOrder(
    params: EngineQueryOrderParams,
  ): Promise<EngineQueryOrderResponse> {
    const baseResponse = await this.query('order', {
      digest: params.digest,
      product_id: params.productId,
    });

    return mapEngineServerOrder(baseResponse);
  }

  /**
   * Signs and validates with the engine that the order is valid to be submitted (i.e. does not violate health reqs)
   *
   * @param params
   */
  async validateOrderParams(
    params: EngineQueryValidateOrderParams,
  ): Promise<EngineQueryValidateOrderResponse> {
    const signedOrder = {
      order: params.order,
      signature: await this.sign(
        'place_order',
        params.orderbookAddr,
        params.chainId,
        params.order,
      ),
    };
    return this.validateSignedOrderParams({
      signedOrder,
      productId: params.productId,
    });
  }

  /**
   * Validates an existing signed order with the engine as a pre-check for health
   *
   * @param params
   */
  async validateSignedOrderParams(
    params: EngineQueryValidateSignedOrderParams,
  ): Promise<EngineQueryValidateOrderResponse> {
    const baseResponse = await this.query('validate_order', {
      product_id: params.productId,
      order: encodeSignedOrder(params.signedOrder),
    });

    return {
      productId: baseResponse.product_id,
      valid: baseResponse.valid,
    };
  }

  /**
   * Get all subaccount orders from the engine, per product ID
   * @param params
   */
  async getSubaccountOrders(
    params: EngineQuerySubaccountOrdersParams,
  ): Promise<EngineQuerySubaccountOrdersResponse> {
    const baseResponse = await this.query('subaccount_orders', {
      sender: subaccountToHex({
        subaccountOwner: params.subaccountOwner,
        subaccountName: params.subaccountName,
      }),
      product_id: params.productId,
    });

    return {
      orders: baseResponse.orders.map(mapEngineServerOrder),
      productId: params.productId,
    };
  }

  /**
   * Get all subaccount orders from the engine, for multiple products
   * @param params
   */
  async getSubaccountMultiProductOrders(
    params: EngineQuerySubaccountProductOrdersParams,
  ): Promise<EngineQuerySubaccountProductOrdersResponse> {
    const baseResponse = await this.query('orders', {
      sender: subaccountToHex({
        subaccountOwner: params.subaccountOwner,
        subaccountName: params.subaccountName,
      }),
      product_ids: params.productIds,
    });

    return {
      productOrders: baseResponse.product_orders.map((orders) => {
        return {
          orders: orders.orders.map(mapEngineServerOrder),
          productId: orders.product_id,
        };
      }),
    };
  }

  /**
   * Gets maker & taker fee rates for order fees
   * @params params
   */
  async getSubaccountFeeRates(
    params: EngineQuerySubaccountFeeRatesParams,
  ): Promise<EngineQuerySubaccountFeeRatesResponse> {
    const baseResponse = await this.query('fee_rates', {
      sender: subaccountToHex({
        subaccountOwner: params.subaccountOwner,
        subaccountName: params.subaccountName,
      }),
    });

    return {
      healthCheckSequencerFee: toBigDecimal(
        baseResponse.health_check_sequencer_fee,
      ),
      liquidationSequencerFee: toBigDecimal(
        baseResponse.liquidation_sequencer_fee,
      ),
      takerSequencerFee: toBigDecimal(baseResponse.taker_sequencer_fee),
      orders: baseResponse.taker_fee_rates_x18.reduce(
        (acc, takerRateX18, currIndex) => {
          acc[currIndex] = {
            taker: fromX18(takerRateX18),
            maker: fromX18(baseResponse.maker_fee_rates_x18[currIndex]),
          };
          return acc;
        },
        {} as Record<number, SubaccountOrderFeeRates>,
      ),
      withdrawal: baseResponse.withdraw_sequencer_fees.reduce(
        (acc, productFee, currIndex) => {
          acc[currIndex] = toBigDecimal(productFee);
          return acc;
        },
        {} as Record<number, BigDecimal>,
      ),
    };
  }

  /**
   * Gets "price ticks" for a given market, useful for constructing liquidity levels at each price
   * @param params
   */
  async getMarketLiquidity(
    params: EngineQueryMarketLiquidityParams,
  ): Promise<EngineQueryMarketLiquidityResponse> {
    const baseResponse = await this.query('market_liquidity', {
      product_id: params.productId,
      depth: params.depth,
    });
    return {
      asks: baseResponse.asks.map(mapEngineServerTickLiquidity),
      bids: baseResponse.bids.map(mapEngineServerTickLiquidity),
    };
  }

  /**
   * Retrieves the latest price for a given market
   * @param params
   */
  async getMarketPrice(
    params: EngineQueryMarketPriceParams,
  ): Promise<EngineQueryMarketPriceResponse> {
    const baseResponse = await this.query('market_price', {
      product_id: params.productId,
    });
    return mapEngineMarketPrice(baseResponse);
  }

  /**
   * Retrieves the latest prices for provided markets
   * @param params
   */
  async getMarketPrices(
    params: EngineQueryMarketPricesParams,
  ): Promise<EngineQueryMarketPricesResponse> {
    const baseResponse = await this.query('market_prices', {
      product_ids: params.productIds,
    });
    return {
      marketPrices: baseResponse.market_prices.map(mapEngineMarketPrice),
    };
  }

  /**
   * Retrieves the estimated max order size for a product
   * @param params
   */
  async getMaxOrderSize(
    params: EngineQueryMaxOrderSizeParams,
  ): Promise<EngineQueryMaxOrderSizeResponse> {
    const baseResponse = await this.query('max_order_size', {
      direction: params.side,
      price_x18: toX18(params.price).toString(),
      product_id: params.productId,
      sender: subaccountToHex({
        subaccountOwner: params.subaccountOwner,
        subaccountName: params.subaccountName,
      }),
      spot_leverage:
        params.spotLeverage != null ? String(params.spotLeverage) : null,
    });

    return toBigDecimal(baseResponse.max_order_size);
  }

  /**
   * Retrieves the estimated max withdrawal size for a product
   * @param params
   */
  async getMaxWithdrawable(
    params: EngineQueryMaxWithdrawableParams,
  ): Promise<EngineQueryMaxWithdrawableResponse> {
    const baseResponse = await this.query('max_withdrawable', {
      product_id: params.productId,
      sender: subaccountToHex({
        subaccountOwner: params.subaccountOwner,
        subaccountName: params.subaccountName,
      }),
      spot_leverage:
        params.spotLeverage != null ? String(params.spotLeverage) : null,
    });

    return toBigDecimal(baseResponse.max_withdrawable);
  }

  /**
   * Retrieves the estimated max base amount for minting LPs for a product
   *
   * @param params
   */
  async getMaxMintLpAmount(
    params: EngineQueryMaxMintLpAmountParams,
  ): Promise<EngineQueryMaxMintLpAmountResponse> {
    const baseResponse = await this.query('max_lp_mintable', {
      product_id: params.productId,
      sender: subaccountToHex({
        subaccountOwner: params.subaccountOwner,
        subaccountName: params.subaccountName,
      }),
      spot_leverage:
        params.spotLeverage != null ? String(params.spotLeverage) : null,
    });

    return {
      maxBaseAmount: toBigDecimal(baseResponse.max_base_amount),
      maxQuoteAmount: toBigDecimal(baseResponse.max_quote_amount),
    };
  }

  /**
   * Gets the currently linked signer for the subaccount
   * @param params
   * @returns
   */
  public async getLinkedSigner(
    params: EngineQueryLinkedSignerParams,
  ): Promise<EngineQueryLinkedSignerResponse> {
    const baseResponse = await this.query('linked_signer', {
      subaccount: subaccountToHex({
        subaccountOwner: params.subaccountOwner,
        subaccountName: params.subaccountName,
      }),
    });

    return {
      signer: baseResponse.linked_signer,
    };
  }

  /**
   * Gets the orderbook contract address for a given product
   * @param productId
   * @returns
   */
  public async getOrderbookAddress(productId: number): Promise<string> {
    const contracts = await this.getContracts();
    return contracts.orderbookAddrs[productId];
  }
}
