import {
  GetAllMarketsResponse,
  GetSubaccountSummaryParams,
  OrderParams,
  SignedOrderParams,
  SubaccountSummaryResponse,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import { BigNumberish } from 'ethers';

export type GetEngineSubaccountSummaryParams = GetSubaccountSummaryParams;

export type GetEngineSubaccountSummaryResponse = SubaccountSummaryResponse;

export type GetEngineAllMarketsResponse = GetAllMarketsResponse;

export interface GetEngineOrderParams {
  productId: number;
  digest: string;
}

export interface EngineOrder {
  productId: number;
  subaccountId: number;
  price: BigDecimal;
  // Amount initially requested
  totalAmount: BigDecimal;
  // Amount still unfilled
  unfilledAmount: BigDecimal;
  expiration: BigDecimal;
  nonce: BigDecimal;
  digest: string;
  // Raw order params for cancellation
  orderParams: OrderParams;
}

export type GetEngineOrderResponse = EngineOrder;

export interface ValidateSignedEngineOrderParams {
  productId: number;
  signedOrder: SignedOrderParams;
}

export interface ValidateEngineOrderParams {
  productId: number;
  orderbookAddr: string;
  order: OrderParams;
}

export interface ValidateEngineOrderResponse {
  productId: number;
  valid: boolean;
}

export interface GetEngineSubaccountOrdersParams {
  subaccountId: BigNumberish;
  productId: number;
}

export interface GetEngineSubaccountOrdersResponse {
  subaccountId: BigNumberish;
  productId: number;
  orders: EngineOrder[];
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

export interface GetEngineMarketPriceResponse {
  productId: number;
  bid: BigDecimal;
  ask: BigDecimal;
}
