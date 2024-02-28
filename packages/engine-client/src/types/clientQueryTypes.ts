import {
  BalanceSide,
  EIP712OrderParams,
  GetAllMarketsResponse,
  GetSubaccountSummaryParams,
  HealthGroup,
  OrderExpirationType,
  ProductEngineType,
  SignedEIP712OrderParams,
  Subaccount,
  SubaccountSummaryResponse,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import { BigNumberish } from 'ethers';
import {
  EngineServerQueryNoncesParams,
  EngineServerQueryTimeResponse,
} from './serverQueryTypes';

/**
 * Base Types
 */

export type SubaccountTx =
  | {
      type: 'mint_lp';
      tx: SubaccountMintLpTx;
    }
  | {
      type: 'burn_lp';
      tx: SubaccountBurnLpTx;
    }
  | {
      type: 'apply_delta';
      tx: SubaccountProductDeltaTx;
    };

export interface SubaccountMintLpTx {
  productId: number;
  amountBase: BigDecimal;
  amountQuoteLow: BigDecimal;
  amountQuoteHigh: BigDecimal;
}

export interface SubaccountBurnLpTx {
  productId: number;
  amountLp: BigDecimal;
}

export interface SubaccountProductDeltaTx {
  productId: number;
  amountDelta: BigDecimal;
  vQuoteDelta: BigDecimal;
}

/**
 * Contracts
 */

export interface EngineQueryContractsResponse {
  chainId: BigNumberish;
  endpointAddr: string;
  orderbookAddrs: string[];
}

/**
 * Subaccount summary + estimation
 */
export type EngineQuerySubaccountSummaryParams = GetSubaccountSummaryParams;

export type EngineQueryEstimatedSubaccountSummaryParams =
  GetSubaccountSummaryParams & {
    txs: SubaccountTx[];
  };

export type EngineQuerySubaccountSummaryResponse = SubaccountSummaryResponse;

/**
 * Nonces
 */

export type EngineQueryNoncesParams = EngineServerQueryNoncesParams;

export interface EngineQueryNoncesResponse {
  orderNonce: string;
  txNonce: string;
}

/**
 * Symbols
 */

export interface EngineQuerySymbolsParams {
  productType?: ProductEngineType;
  productIds?: number[];
}

export interface EngineSymbol {
  type: ProductEngineType;
  productId: number;
  symbol: string;
  priceIncrement: BigDecimal;
  sizeIncrement: BigDecimal;
  minSize: BigDecimal;
  minDepth: BigDecimal;
  maxSpreadRate: BigDecimal;
  makerFeeRate: BigDecimal;
  takerFeeRate: BigDecimal;
  longWeightInitial: BigDecimal;
  longWeightMaintenance: BigDecimal;
}

export interface EngineQuerySymbolsResponse {
  // mapping of product symbol to symbols info
  symbols: Record<string, EngineSymbol>;
}

/**
 * All Markets
 */

export type EngineQueryAllMarketsResponse = GetAllMarketsResponse;

/**
 * Health Groups
 */

export interface EngineQueryHealthGroupsResponse {
  healthGroups: HealthGroup[];
}

/**
 * Orders
 */

export interface EngineQueryOrderParams {
  productId: number;
  digest: string;
}

export interface EngineOrder extends Subaccount {
  productId: number;
  price: BigDecimal;
  // Amount initially requested
  totalAmount: BigDecimal;
  // Amount still unfilled
  unfilledAmount: BigDecimal;
  expiration: BigDecimal;
  nonce: string;
  digest: string;
  orderParams: EIP712OrderParams;
  placementTime: number;
  orderType: OrderExpirationType;
}

export type EngineQueryOrderResponse = EngineOrder;

export interface EngineQuerySubaccountOrdersParams extends Subaccount {
  productId: number;
}

export interface EngineSubaccountOrders {
  productId: number;
  orders: EngineOrder[];
}

export type EngineQuerySubaccountOrdersResponse = EngineSubaccountOrders;

export interface EngineQuerySubaccountProductOrdersParams extends Subaccount {
  productIds: number[];
}

export interface EngineQuerySubaccountProductOrdersResponse {
  productOrders: EngineSubaccountOrders[];
}

/**
 * Order validation
 */

export interface EngineQueryValidateSignedOrderParams {
  productId: number;
  signedOrder: SignedEIP712OrderParams;
}

export interface EngineQueryValidateOrderParams {
  productId: number;
  orderbookAddr: string;
  chainId: BigNumberish;
  order: EIP712OrderParams;
}

export interface EngineQueryValidateOrderResponse {
  productId: number;
  valid: boolean;
}

/**
 * Fee rates
 */

export type EngineQuerySubaccountFeeRatesParams = Subaccount;

export interface SubaccountOrderFeeRates {
  maker: BigDecimal;
  taker: BigDecimal;
}

export interface EngineQuerySubaccountFeeRatesResponse {
  // By Product ID
  orders: Record<number, SubaccountOrderFeeRates>;
  withdrawal: Record<number, BigDecimal>;
  liquidationSequencerFee: BigDecimal;
  healthCheckSequencerFee: BigDecimal;
  takerSequencerFee: BigDecimal;
}

/**
 * Market liquidity
 */

export interface EnginePriceTickLiquidity {
  price: BigDecimal;
  liquidity: BigDecimal;
}

export interface EngineQueryMarketLiquidityParams {
  productId: number;
  // The minimum depth in base price ticks (i.e. per side
  depth: number;
}

export interface EngineQueryMarketLiquidityResponse {
  bids: EnginePriceTickLiquidity[];
  asks: EnginePriceTickLiquidity[];
}

/**
 * Market prices
 */

export interface EngineQueryMarketPriceParams {
  productId: number;
}

export interface EngineMarketPrice {
  productId: number;
  bid: BigDecimal;
  ask: BigDecimal;
}

export type EngineQueryMarketPriceResponse = EngineMarketPrice;

export interface EngineQueryMarketPricesParams {
  productIds: number[];
}

export interface EngineQueryMarketPricesResponse {
  marketPrices: EngineMarketPrice[];
}

/**
 * Max order size
 */

export interface EngineQueryMaxOrderSizeParams extends Subaccount {
  price: BigDecimal;
  productId: number;
  side: BalanceSide;
  // If not given, engine defaults to true (leverage/borrow enabled) for spot
  // Do not pass this for perp products
  spotLeverage?: boolean;
}

export type EngineQueryMaxOrderSizeResponse = BigDecimal;

/**
 * Max withdrawable
 */

export interface EngineQueryMaxWithdrawableParams extends Subaccount {
  productId: number;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spotLeverage?: boolean;
}

export type EngineQueryMaxWithdrawableResponse = BigDecimal;

/**
 * Max mint LP
 */

export interface EngineQueryMaxMintLpAmountParams extends Subaccount {
  productId: number;
  // If not given, engine defaults to true (leverage/borrow enabled) for spot
  // Do not pass this for perp products
  spotLeverage?: boolean;
}

export interface EngineQueryMaxMintLpAmountResponse {
  maxBaseAmount: BigDecimal;
  maxQuoteAmount: BigDecimal;
}

/**
 * Time
 */

export type EngineQueryTimeResponse = EngineServerQueryTimeResponse;

/**
 * Linked Signer
 */

export type EngineQueryLinkedSignerParams = Subaccount;

export interface EngineQueryLinkedSignerResponse {
  signer: string;
}
