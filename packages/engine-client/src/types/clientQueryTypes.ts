import {
  BalanceSide,
  GetAllMarketsResponse,
  GetSubaccountSummaryParams,
  HealthGroup,
  OrderParams,
  ProductEngineType,
  SignedOrderParams,
  Subaccount,
  SubaccountSummaryResponse,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import {
  EngineServerCheckIpResponse,
  EngineServerNoncesParams,
  EngineServerSymbolsResponse,
  EngineServerTimeResponse,
} from './serverQueryTypes';
import { BigNumberish } from 'ethers';

export type GetEngineSubaccountSummaryParams = GetSubaccountSummaryParams;

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

export interface GetEngineContractsResponse {
  chainId: BigNumberish;
  endpointAddr: string;
  orderbookAddrs: string[];
}

export type GetEngineEstimatedSubaccountSummaryParams =
  GetSubaccountSummaryParams & {
    txs: SubaccountTx[];
  };

export type GetEngineNoncesParams = EngineServerNoncesParams;

export interface GetEngineNoncesResponse {
  orderNonce: string;
  txNonce: string;
}

export type GetEngineSubaccountSummaryResponse = SubaccountSummaryResponse;

export interface GetEngineSymbolsParams {
  productType?: 'spot' | 'perp';
  productIds?: number[];
}

export interface EngineSymbolsResponse {
  // mapping of product symbol to symbols info
  symbols: Record<string, EngineSymbol>;
}

export interface EngineSymbol {
  type: ProductEngineType;
  productId: number;
  symbol: string;
  priceIncrement: BigDecimal;
  sizeIncrement: BigDecimal;
  minSize: BigDecimal;
  initialMargin: BigDecimal;
  maintenanceMargin: BigDecimal;
  minDepth: BigDecimal;
  maxSpreadRate: BigDecimal;
  makerFeeRate: BigDecimal;
  takerFeeRate: BigDecimal;
}

export type GetEngineAllMarketsResponse = GetAllMarketsResponse;

export interface GetEngineHealthGroupsResponse {
  healthGroups: HealthGroup[];
}

export interface GetEngineOrderParams {
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
  orderParams: OrderParams;
  placementTime: number;
}

export type GetEngineOrderResponse = EngineOrder;

export interface ValidateSignedEngineOrderParams {
  productId: number;
  signedOrder: SignedOrderParams;
}

export interface ValidateEngineOrderParams {
  productId: number;
  orderbookAddr: string;
  chainId: BigNumberish;
  order: OrderParams;
}

export interface ValidateEngineOrderResponse {
  productId: number;
  valid: boolean;
}

export interface GetEngineSubaccountOrdersParams extends Subaccount {
  productId: number;
}

export interface EngineSubaccountOrders {
  productId: number;
  orders: EngineOrder[];
}

export type GetEngineSubaccountOrdersResponse = EngineSubaccountOrders;

export interface GetEngineSubaccountProductOrdersParams extends Subaccount {
  productIds: number[];
}

export interface GetEngineSubaccountProductOrdersResponse {
  productOrders: EngineSubaccountOrders[];
}

export type GetEngineSubaccountFeeRatesParams = Subaccount;

export interface SubaccountOrderFeeRates {
  maker: BigDecimal;
  taker: BigDecimal;
}

export interface GetEngineSubaccountFeeRatesResponse {
  // By Product ID
  orders: Record<number, SubaccountOrderFeeRates>;
  withdrawal: Record<number, BigDecimal>;
  liquidationSequencerFee: BigDecimal;
  healthCheckSequencerFee: BigDecimal;
  takerSequencerFee: BigDecimal;
}

export interface EnginePriceTickLiquidity {
  price: BigDecimal;
  liquidity: BigDecimal;
}

export interface GetEngineMarketLiquidityParams {
  productId: number;
  // The minimum depth in base price ticks (i.e. per side
  depth: number;
}

export interface GetEngineMarketLiquidityResponse {
  bids: EnginePriceTickLiquidity[];
  asks: EnginePriceTickLiquidity[];
}

export interface GetEngineMarketPriceParams {
  productId: number;
}

export interface EngineMarketPrice {
  productId: number;
  bid: BigDecimal;
  ask: BigDecimal;
}

export type GetEngineMarketPriceResponse = EngineMarketPrice;

export interface GetEngineMarketPricesParams {
  productIds: number[];
}

export interface GetEngineMarketPricesResponse {
  marketPrices: EngineMarketPrice[];
}

export interface GetEngineMaxOrderSizeParams extends Subaccount {
  price: BigDecimal;
  productId: number;
  side: BalanceSide;
  // If not given, engine defaults to true (leverage/borrow enabled) for spot
  // Do not pass this for perp products
  spotLeverage?: boolean;
}

export type GetEngineMaxOrderSizeResponse = BigDecimal;

export interface GetEngineMaxWithdrawableParams extends Subaccount {
  productId: number;
  // If not given, engine defaults to true (leverage/borrow enabled)
  spotLeverage?: boolean;
}

export type GetEngineMaxWithdrawableResponse = BigDecimal;

export interface GetEngineMaxMintLpAmountParams extends Subaccount {
  productId: number;
  // If not given, engine defaults to true (leverage/borrow enabled) for spot
  // Do not pass this for perp products
  spotLeverage?: boolean;
}

export interface GetEngineMaxMintLpAmountResponse {
  maxBaseAmount: BigDecimal;
  maxQuoteAmount: BigDecimal;
}

export type GetEngineIpCheckResponse = EngineServerCheckIpResponse;

export type GetEngineTimeResponse = EngineServerTimeResponse;

export type GetEngineLinkedSignerParams = Subaccount;

export interface GetEngineLinkedSignerResponse {
  signer: string;
}
