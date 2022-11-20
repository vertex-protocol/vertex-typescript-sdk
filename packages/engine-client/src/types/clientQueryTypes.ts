import {
  GetAllMarketsResponse,
  GetSubaccountSummaryParams,
  OrderParams,
  SignedOrderParams,
  SubaccountSummaryResponse,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils/dist/math/bigDecimal';
import { EngineServerNoncesParams } from './serverQueryTypes';

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

export type GetEngineEstimatedSubaccountSummaryParams =
  GetSubaccountSummaryParams & {
    txs: SubaccountTx[];
  };

export type GetEngineNoncesParams = EngineServerNoncesParams;

export interface GetEngineNoncesResponse {
  orderNonce: number;
  txNonce: number;
}

export type GetEngineSubaccountSummaryResponse = SubaccountSummaryResponse;

export type GetEngineAllMarketsResponse = GetAllMarketsResponse;

export interface GetEngineOrderParams {
  productId: number;
  digest: string;
}

export interface EngineOrder {
  productId: number;
  sender: string;
  subaccountName: string;
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
  order: OrderParams;
}

export interface ValidateEngineOrderResponse {
  productId: number;
  valid: boolean;
}

export interface GetEngineSubaccountOrdersParams {
  sender: string;
  subaccountName: string;
  productId: number;
}

export interface GetEngineSubaccountOrdersResponse {
  sender: string;
  subaccountName: string;
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
