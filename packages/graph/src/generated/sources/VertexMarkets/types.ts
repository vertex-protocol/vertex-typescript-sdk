// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace VertexMarketsTypes {
  export type Maybe<T> = T | null;
  export type InputMaybe<T> = Maybe<T>;
  export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
  };
  export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
  };
  export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
  };
  /** All built-in and custom scalars, mapped to their actual values */
  export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: any;
    BigInt: any;
    Bytes: any;
  };

  export type BlockChangedFilter = {
    number_gte: Scalars['Int'];
  };

  export type Block_height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
  };

  export type Market = {
    id: Scalars['ID'];
    clearinghouse: Scalars['Bytes'];
    productId: Scalars['BigInt'];
    orderbook: Scalars['Bytes'];
    sizeIncrement: Scalars['BigInt'];
    priceIncrementX18: Scalars['BigInt'];
    createdAt: Scalars['BigInt'];
    createdAtBlock: Scalars['BigInt'];
    lastFillPriceX18: Scalars['BigInt'];
    volumeBaseX18: Scalars['BigInt'];
    volumeQuoteX18: Scalars['BigInt'];
    snapshots: Array<MarketSnapshot>;
  };

  export type MarketsnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MarketSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MarketSnapshot_filter>;
  };

  export type MarketSnapshot = {
    id: Scalars['ID'];
    period: Scalars['BigInt'];
    periodIndex: Scalars['BigInt'];
    market: Market;
    lastFillPriceX18: Scalars['BigInt'];
    volumeBaseX18: Scalars['BigInt'];
    volumeQuoteX18: Scalars['BigInt'];
  };

  export type MarketSnapshot_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    period?: InputMaybe<Scalars['BigInt']>;
    period_not?: InputMaybe<Scalars['BigInt']>;
    period_gt?: InputMaybe<Scalars['BigInt']>;
    period_lt?: InputMaybe<Scalars['BigInt']>;
    period_gte?: InputMaybe<Scalars['BigInt']>;
    period_lte?: InputMaybe<Scalars['BigInt']>;
    period_in?: InputMaybe<Array<Scalars['BigInt']>>;
    period_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    periodIndex?: InputMaybe<Scalars['BigInt']>;
    periodIndex_not?: InputMaybe<Scalars['BigInt']>;
    periodIndex_gt?: InputMaybe<Scalars['BigInt']>;
    periodIndex_lt?: InputMaybe<Scalars['BigInt']>;
    periodIndex_gte?: InputMaybe<Scalars['BigInt']>;
    periodIndex_lte?: InputMaybe<Scalars['BigInt']>;
    periodIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
    periodIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    market?: InputMaybe<Scalars['String']>;
    market_not?: InputMaybe<Scalars['String']>;
    market_gt?: InputMaybe<Scalars['String']>;
    market_lt?: InputMaybe<Scalars['String']>;
    market_gte?: InputMaybe<Scalars['String']>;
    market_lte?: InputMaybe<Scalars['String']>;
    market_in?: InputMaybe<Array<Scalars['String']>>;
    market_not_in?: InputMaybe<Array<Scalars['String']>>;
    market_contains?: InputMaybe<Scalars['String']>;
    market_contains_nocase?: InputMaybe<Scalars['String']>;
    market_not_contains?: InputMaybe<Scalars['String']>;
    market_not_contains_nocase?: InputMaybe<Scalars['String']>;
    market_starts_with?: InputMaybe<Scalars['String']>;
    market_starts_with_nocase?: InputMaybe<Scalars['String']>;
    market_not_starts_with?: InputMaybe<Scalars['String']>;
    market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    market_ends_with?: InputMaybe<Scalars['String']>;
    market_ends_with_nocase?: InputMaybe<Scalars['String']>;
    market_not_ends_with?: InputMaybe<Scalars['String']>;
    market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    market_?: InputMaybe<Market_filter>;
    lastFillPriceX18?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_not?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lastFillPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeBaseX18?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_not?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_gt?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_lt?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_gte?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_lte?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeBaseX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeQuoteX18?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_not?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_gt?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_lt?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_gte?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_lte?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeQuoteX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type MarketSnapshot_orderBy =
    | 'id'
    | 'period'
    | 'periodIndex'
    | 'market'
    | 'lastFillPriceX18'
    | 'volumeBaseX18'
    | 'volumeQuoteX18';

  export type Market_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    clearinghouse?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_not?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_gt?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_lt?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_gte?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_lte?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_in?: InputMaybe<Array<Scalars['Bytes']>>;
    clearinghouse_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    clearinghouse_contains?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_not_contains?: InputMaybe<Scalars['Bytes']>;
    productId?: InputMaybe<Scalars['BigInt']>;
    productId_not?: InputMaybe<Scalars['BigInt']>;
    productId_gt?: InputMaybe<Scalars['BigInt']>;
    productId_lt?: InputMaybe<Scalars['BigInt']>;
    productId_gte?: InputMaybe<Scalars['BigInt']>;
    productId_lte?: InputMaybe<Scalars['BigInt']>;
    productId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    productId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    orderbook?: InputMaybe<Scalars['Bytes']>;
    orderbook_not?: InputMaybe<Scalars['Bytes']>;
    orderbook_gt?: InputMaybe<Scalars['Bytes']>;
    orderbook_lt?: InputMaybe<Scalars['Bytes']>;
    orderbook_gte?: InputMaybe<Scalars['Bytes']>;
    orderbook_lte?: InputMaybe<Scalars['Bytes']>;
    orderbook_in?: InputMaybe<Array<Scalars['Bytes']>>;
    orderbook_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    orderbook_contains?: InputMaybe<Scalars['Bytes']>;
    orderbook_not_contains?: InputMaybe<Scalars['Bytes']>;
    sizeIncrement?: InputMaybe<Scalars['BigInt']>;
    sizeIncrement_not?: InputMaybe<Scalars['BigInt']>;
    sizeIncrement_gt?: InputMaybe<Scalars['BigInt']>;
    sizeIncrement_lt?: InputMaybe<Scalars['BigInt']>;
    sizeIncrement_gte?: InputMaybe<Scalars['BigInt']>;
    sizeIncrement_lte?: InputMaybe<Scalars['BigInt']>;
    sizeIncrement_in?: InputMaybe<Array<Scalars['BigInt']>>;
    sizeIncrement_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    priceIncrementX18?: InputMaybe<Scalars['BigInt']>;
    priceIncrementX18_not?: InputMaybe<Scalars['BigInt']>;
    priceIncrementX18_gt?: InputMaybe<Scalars['BigInt']>;
    priceIncrementX18_lt?: InputMaybe<Scalars['BigInt']>;
    priceIncrementX18_gte?: InputMaybe<Scalars['BigInt']>;
    priceIncrementX18_lte?: InputMaybe<Scalars['BigInt']>;
    priceIncrementX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    priceIncrementX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    createdAt?: InputMaybe<Scalars['BigInt']>;
    createdAt_not?: InputMaybe<Scalars['BigInt']>;
    createdAt_gt?: InputMaybe<Scalars['BigInt']>;
    createdAt_lt?: InputMaybe<Scalars['BigInt']>;
    createdAt_gte?: InputMaybe<Scalars['BigInt']>;
    createdAt_lte?: InputMaybe<Scalars['BigInt']>;
    createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
    createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    createdAtBlock?: InputMaybe<Scalars['BigInt']>;
    createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
    createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
    createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
    createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
    createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
    createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
    createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lastFillPriceX18?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_not?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
    lastFillPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lastFillPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeBaseX18?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_not?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_gt?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_lt?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_gte?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_lte?: InputMaybe<Scalars['BigInt']>;
    volumeBaseX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeBaseX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeQuoteX18?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_not?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_gt?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_lt?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_gte?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_lte?: InputMaybe<Scalars['BigInt']>;
    volumeQuoteX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeQuoteX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    snapshots_?: InputMaybe<MarketSnapshot_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Market_orderBy =
    | 'id'
    | 'clearinghouse'
    | 'productId'
    | 'orderbook'
    | 'sizeIncrement'
    | 'priceIncrementX18'
    | 'createdAt'
    | 'createdAtBlock'
    | 'lastFillPriceX18'
    | 'volumeBaseX18'
    | 'volumeQuoteX18'
    | 'snapshots';

  /** Defines the order direction, either ascending or descending */
  export type OrderDirection = 'asc' | 'desc';

  export type PerpEngine = {
    id: Scalars['ID'];
    clearinghouse: Scalars['Bytes'];
    products: Array<PerpProduct>;
  };

  export type PerpEngineproductsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProduct_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProduct_filter>;
  };

  export type PerpEngine_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    clearinghouse?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_not?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_gt?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_lt?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_gte?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_lte?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_in?: InputMaybe<Array<Scalars['Bytes']>>;
    clearinghouse_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    clearinghouse_contains?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_not_contains?: InputMaybe<Scalars['Bytes']>;
    products_?: InputMaybe<PerpProduct_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type PerpEngine_orderBy = 'id' | 'clearinghouse' | 'products';

  export type PerpProduct = {
    id: Scalars['ID'];
    productId: Scalars['BigInt'];
    market: Market;
    engine: PerpEngine;
    priceX18: Scalars['BigInt'];
    markPriceX18: Scalars['BigInt'];
    cumulativeFundingLongX18: Scalars['BigInt'];
    cumulativeFundingShortX18: Scalars['BigInt'];
    openInterestX18: Scalars['BigInt'];
    availableSettleX18: Scalars['BigInt'];
    lpSupply: Scalars['BigInt'];
    lpQuoteAmount: Scalars['BigInt'];
    lpBaseAmount: Scalars['BigInt'];
    lpCumulativeFundingPerLpX18: Scalars['BigInt'];
    snapshots: Array<PerpProductSnapshot>;
  };

  export type PerpProductsnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProductSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProductSnapshot_filter>;
  };

  export type PerpProductSnapshot = {
    id: Scalars['ID'];
    period: Scalars['BigInt'];
    periodIndex: Scalars['BigInt'];
    product: PerpProduct;
    priceX18: Scalars['BigInt'];
    markPriceX18: Scalars['BigInt'];
    cumulativeFundingLongX18: Scalars['BigInt'];
    cumulativeFundingShortX18: Scalars['BigInt'];
    openInterestX18: Scalars['BigInt'];
    availableSettleX18: Scalars['BigInt'];
    lpSupply: Scalars['BigInt'];
    lpQuoteAmount: Scalars['BigInt'];
    lpBaseAmount: Scalars['BigInt'];
    lpCumulativeFundingPerLpX18: Scalars['BigInt'];
  };

  export type PerpProductSnapshot_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    period?: InputMaybe<Scalars['BigInt']>;
    period_not?: InputMaybe<Scalars['BigInt']>;
    period_gt?: InputMaybe<Scalars['BigInt']>;
    period_lt?: InputMaybe<Scalars['BigInt']>;
    period_gte?: InputMaybe<Scalars['BigInt']>;
    period_lte?: InputMaybe<Scalars['BigInt']>;
    period_in?: InputMaybe<Array<Scalars['BigInt']>>;
    period_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    periodIndex?: InputMaybe<Scalars['BigInt']>;
    periodIndex_not?: InputMaybe<Scalars['BigInt']>;
    periodIndex_gt?: InputMaybe<Scalars['BigInt']>;
    periodIndex_lt?: InputMaybe<Scalars['BigInt']>;
    periodIndex_gte?: InputMaybe<Scalars['BigInt']>;
    periodIndex_lte?: InputMaybe<Scalars['BigInt']>;
    periodIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
    periodIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    product?: InputMaybe<Scalars['String']>;
    product_not?: InputMaybe<Scalars['String']>;
    product_gt?: InputMaybe<Scalars['String']>;
    product_lt?: InputMaybe<Scalars['String']>;
    product_gte?: InputMaybe<Scalars['String']>;
    product_lte?: InputMaybe<Scalars['String']>;
    product_in?: InputMaybe<Array<Scalars['String']>>;
    product_not_in?: InputMaybe<Array<Scalars['String']>>;
    product_contains?: InputMaybe<Scalars['String']>;
    product_contains_nocase?: InputMaybe<Scalars['String']>;
    product_not_contains?: InputMaybe<Scalars['String']>;
    product_not_contains_nocase?: InputMaybe<Scalars['String']>;
    product_starts_with?: InputMaybe<Scalars['String']>;
    product_starts_with_nocase?: InputMaybe<Scalars['String']>;
    product_not_starts_with?: InputMaybe<Scalars['String']>;
    product_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    product_ends_with?: InputMaybe<Scalars['String']>;
    product_ends_with_nocase?: InputMaybe<Scalars['String']>;
    product_not_ends_with?: InputMaybe<Scalars['String']>;
    product_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    product_?: InputMaybe<PerpProduct_filter>;
    priceX18?: InputMaybe<Scalars['BigInt']>;
    priceX18_not?: InputMaybe<Scalars['BigInt']>;
    priceX18_gt?: InputMaybe<Scalars['BigInt']>;
    priceX18_lt?: InputMaybe<Scalars['BigInt']>;
    priceX18_gte?: InputMaybe<Scalars['BigInt']>;
    priceX18_lte?: InputMaybe<Scalars['BigInt']>;
    priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    markPriceX18?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_not?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    markPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeFundingLongX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeFundingLongX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeFundingShortX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeFundingShortX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    openInterestX18?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_not?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_gt?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_lt?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_gte?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_lte?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    openInterestX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    availableSettleX18?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_not?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_gt?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_lt?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_gte?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_lte?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    availableSettleX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpSupply?: InputMaybe<Scalars['BigInt']>;
    lpSupply_not?: InputMaybe<Scalars['BigInt']>;
    lpSupply_gt?: InputMaybe<Scalars['BigInt']>;
    lpSupply_lt?: InputMaybe<Scalars['BigInt']>;
    lpSupply_gte?: InputMaybe<Scalars['BigInt']>;
    lpSupply_lte?: InputMaybe<Scalars['BigInt']>;
    lpSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpQuoteAmount?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_not?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_gt?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_lt?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_gte?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_lte?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpQuoteAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpBaseAmount?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_not?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_gt?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_lt?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_gte?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_lte?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpBaseAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpCumulativeFundingPerLpX18?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_not?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_gt?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_lt?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_gte?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_lte?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpCumulativeFundingPerLpX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type PerpProductSnapshot_orderBy =
    | 'id'
    | 'period'
    | 'periodIndex'
    | 'product'
    | 'priceX18'
    | 'markPriceX18'
    | 'cumulativeFundingLongX18'
    | 'cumulativeFundingShortX18'
    | 'openInterestX18'
    | 'availableSettleX18'
    | 'lpSupply'
    | 'lpQuoteAmount'
    | 'lpBaseAmount'
    | 'lpCumulativeFundingPerLpX18';

  export type PerpProduct_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    productId?: InputMaybe<Scalars['BigInt']>;
    productId_not?: InputMaybe<Scalars['BigInt']>;
    productId_gt?: InputMaybe<Scalars['BigInt']>;
    productId_lt?: InputMaybe<Scalars['BigInt']>;
    productId_gte?: InputMaybe<Scalars['BigInt']>;
    productId_lte?: InputMaybe<Scalars['BigInt']>;
    productId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    productId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    market?: InputMaybe<Scalars['String']>;
    market_not?: InputMaybe<Scalars['String']>;
    market_gt?: InputMaybe<Scalars['String']>;
    market_lt?: InputMaybe<Scalars['String']>;
    market_gte?: InputMaybe<Scalars['String']>;
    market_lte?: InputMaybe<Scalars['String']>;
    market_in?: InputMaybe<Array<Scalars['String']>>;
    market_not_in?: InputMaybe<Array<Scalars['String']>>;
    market_contains?: InputMaybe<Scalars['String']>;
    market_contains_nocase?: InputMaybe<Scalars['String']>;
    market_not_contains?: InputMaybe<Scalars['String']>;
    market_not_contains_nocase?: InputMaybe<Scalars['String']>;
    market_starts_with?: InputMaybe<Scalars['String']>;
    market_starts_with_nocase?: InputMaybe<Scalars['String']>;
    market_not_starts_with?: InputMaybe<Scalars['String']>;
    market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    market_ends_with?: InputMaybe<Scalars['String']>;
    market_ends_with_nocase?: InputMaybe<Scalars['String']>;
    market_not_ends_with?: InputMaybe<Scalars['String']>;
    market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    market_?: InputMaybe<Market_filter>;
    engine?: InputMaybe<Scalars['String']>;
    engine_not?: InputMaybe<Scalars['String']>;
    engine_gt?: InputMaybe<Scalars['String']>;
    engine_lt?: InputMaybe<Scalars['String']>;
    engine_gte?: InputMaybe<Scalars['String']>;
    engine_lte?: InputMaybe<Scalars['String']>;
    engine_in?: InputMaybe<Array<Scalars['String']>>;
    engine_not_in?: InputMaybe<Array<Scalars['String']>>;
    engine_contains?: InputMaybe<Scalars['String']>;
    engine_contains_nocase?: InputMaybe<Scalars['String']>;
    engine_not_contains?: InputMaybe<Scalars['String']>;
    engine_not_contains_nocase?: InputMaybe<Scalars['String']>;
    engine_starts_with?: InputMaybe<Scalars['String']>;
    engine_starts_with_nocase?: InputMaybe<Scalars['String']>;
    engine_not_starts_with?: InputMaybe<Scalars['String']>;
    engine_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    engine_ends_with?: InputMaybe<Scalars['String']>;
    engine_ends_with_nocase?: InputMaybe<Scalars['String']>;
    engine_not_ends_with?: InputMaybe<Scalars['String']>;
    engine_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    engine_?: InputMaybe<PerpEngine_filter>;
    priceX18?: InputMaybe<Scalars['BigInt']>;
    priceX18_not?: InputMaybe<Scalars['BigInt']>;
    priceX18_gt?: InputMaybe<Scalars['BigInt']>;
    priceX18_lt?: InputMaybe<Scalars['BigInt']>;
    priceX18_gte?: InputMaybe<Scalars['BigInt']>;
    priceX18_lte?: InputMaybe<Scalars['BigInt']>;
    priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    markPriceX18?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_not?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
    markPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    markPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeFundingLongX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingLongX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeFundingLongX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeFundingShortX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeFundingShortX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeFundingShortX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    openInterestX18?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_not?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_gt?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_lt?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_gte?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_lte?: InputMaybe<Scalars['BigInt']>;
    openInterestX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    openInterestX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    availableSettleX18?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_not?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_gt?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_lt?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_gte?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_lte?: InputMaybe<Scalars['BigInt']>;
    availableSettleX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    availableSettleX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpSupply?: InputMaybe<Scalars['BigInt']>;
    lpSupply_not?: InputMaybe<Scalars['BigInt']>;
    lpSupply_gt?: InputMaybe<Scalars['BigInt']>;
    lpSupply_lt?: InputMaybe<Scalars['BigInt']>;
    lpSupply_gte?: InputMaybe<Scalars['BigInt']>;
    lpSupply_lte?: InputMaybe<Scalars['BigInt']>;
    lpSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpQuoteAmount?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_not?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_gt?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_lt?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_gte?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_lte?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpQuoteAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpBaseAmount?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_not?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_gt?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_lt?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_gte?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_lte?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpBaseAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpCumulativeFundingPerLpX18?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_not?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_gt?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_lt?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_gte?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_lte?: InputMaybe<Scalars['BigInt']>;
    lpCumulativeFundingPerLpX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpCumulativeFundingPerLpX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    snapshots_?: InputMaybe<PerpProductSnapshot_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type PerpProduct_orderBy =
    | 'id'
    | 'productId'
    | 'market'
    | 'engine'
    | 'priceX18'
    | 'markPriceX18'
    | 'cumulativeFundingLongX18'
    | 'cumulativeFundingShortX18'
    | 'openInterestX18'
    | 'availableSettleX18'
    | 'lpSupply'
    | 'lpQuoteAmount'
    | 'lpBaseAmount'
    | 'lpCumulativeFundingPerLpX18'
    | 'snapshots';

  export type Query = {
    spotEngine?: Maybe<SpotEngine>;
    spotEngines: Array<SpotEngine>;
    perpEngine?: Maybe<PerpEngine>;
    perpEngines: Array<PerpEngine>;
    spotProduct?: Maybe<SpotProduct>;
    spotProducts: Array<SpotProduct>;
    spotProductSnapshot?: Maybe<SpotProductSnapshot>;
    spotProductSnapshots: Array<SpotProductSnapshot>;
    perpProduct?: Maybe<PerpProduct>;
    perpProducts: Array<PerpProduct>;
    perpProductSnapshot?: Maybe<PerpProductSnapshot>;
    perpProductSnapshots: Array<PerpProductSnapshot>;
    market?: Maybe<Market>;
    markets: Array<Market>;
    marketSnapshot?: Maybe<MarketSnapshot>;
    marketSnapshots: Array<MarketSnapshot>;
    socializeProductEvent?: Maybe<SocializeProductEvent>;
    socializeProductEvents: Array<SocializeProductEvent>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
  };

  export type QueryspotEngineArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryspotEnginesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotEngine_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotEngine_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryperpEngineArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryperpEnginesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpEngine_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpEngine_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryspotProductArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryspotProductsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProduct_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProduct_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryspotProductSnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryspotProductSnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProductSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProductSnapshot_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryperpProductArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryperpProductsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProduct_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProduct_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryperpProductSnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryperpProductSnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProductSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProductSnapshot_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymarketArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymarketsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Market_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Market_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymarketSnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymarketSnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MarketSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MarketSnapshot_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerysocializeProductEventArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerysocializeProductEventsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SocializeProductEvent_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SocializeProductEvent_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type Query_metaArgs = {
    block?: InputMaybe<Block_height>;
  };

  export type SocializeProductEvent = {
    id: Scalars['ID'];
    block: Scalars['BigInt'];
    blockTime: Scalars['BigInt'];
    productId: Scalars['BigInt'];
    amountSocialized: Scalars['BigInt'];
  };

  export type SocializeProductEvent_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    block?: InputMaybe<Scalars['BigInt']>;
    block_not?: InputMaybe<Scalars['BigInt']>;
    block_gt?: InputMaybe<Scalars['BigInt']>;
    block_lt?: InputMaybe<Scalars['BigInt']>;
    block_gte?: InputMaybe<Scalars['BigInt']>;
    block_lte?: InputMaybe<Scalars['BigInt']>;
    block_in?: InputMaybe<Array<Scalars['BigInt']>>;
    block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTime?: InputMaybe<Scalars['BigInt']>;
    blockTime_not?: InputMaybe<Scalars['BigInt']>;
    blockTime_gt?: InputMaybe<Scalars['BigInt']>;
    blockTime_lt?: InputMaybe<Scalars['BigInt']>;
    blockTime_gte?: InputMaybe<Scalars['BigInt']>;
    blockTime_lte?: InputMaybe<Scalars['BigInt']>;
    blockTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    productId?: InputMaybe<Scalars['BigInt']>;
    productId_not?: InputMaybe<Scalars['BigInt']>;
    productId_gt?: InputMaybe<Scalars['BigInt']>;
    productId_lt?: InputMaybe<Scalars['BigInt']>;
    productId_gte?: InputMaybe<Scalars['BigInt']>;
    productId_lte?: InputMaybe<Scalars['BigInt']>;
    productId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    productId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    amountSocialized?: InputMaybe<Scalars['BigInt']>;
    amountSocialized_not?: InputMaybe<Scalars['BigInt']>;
    amountSocialized_gt?: InputMaybe<Scalars['BigInt']>;
    amountSocialized_lt?: InputMaybe<Scalars['BigInt']>;
    amountSocialized_gte?: InputMaybe<Scalars['BigInt']>;
    amountSocialized_lte?: InputMaybe<Scalars['BigInt']>;
    amountSocialized_in?: InputMaybe<Array<Scalars['BigInt']>>;
    amountSocialized_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type SocializeProductEvent_orderBy =
    | 'id'
    | 'block'
    | 'blockTime'
    | 'productId'
    | 'amountSocialized';

  export type SpotEngine = {
    id: Scalars['ID'];
    clearinghouse: Scalars['Bytes'];
    products: Array<SpotProduct>;
  };

  export type SpotEngineproductsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProduct_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProduct_filter>;
  };

  export type SpotEngine_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    clearinghouse?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_not?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_gt?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_lt?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_gte?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_lte?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_in?: InputMaybe<Array<Scalars['Bytes']>>;
    clearinghouse_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    clearinghouse_contains?: InputMaybe<Scalars['Bytes']>;
    clearinghouse_not_contains?: InputMaybe<Scalars['Bytes']>;
    products_?: InputMaybe<SpotProduct_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type SpotEngine_orderBy = 'id' | 'clearinghouse' | 'products';

  export type SpotProduct = {
    id: Scalars['ID'];
    productId: Scalars['BigInt'];
    market: Market;
    engine: SpotEngine;
    priceX18: Scalars['BigInt'];
    cumulativeDepositsMultiplierX18: Scalars['BigInt'];
    cumulativeBorrowsMultiplierX18: Scalars['BigInt'];
    totalDepositsNormalizedX18: Scalars['BigInt'];
    totalBorrowsNormalizedX18: Scalars['BigInt'];
    lpSupply: Scalars['BigInt'];
    lpQuoteAmountX18: Scalars['BigInt'];
    lpBaseAmountX18: Scalars['BigInt'];
    snapshots: Array<SpotProductSnapshot>;
  };

  export type SpotProductsnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProductSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProductSnapshot_filter>;
  };

  export type SpotProductSnapshot = {
    id: Scalars['ID'];
    period: Scalars['BigInt'];
    periodIndex: Scalars['BigInt'];
    product: SpotProduct;
    priceX18: Scalars['BigInt'];
    cumulativeDepositsMultiplierX18: Scalars['BigInt'];
    cumulativeBorrowsMultiplierX18: Scalars['BigInt'];
    totalDepositsNormalizedX18: Scalars['BigInt'];
    totalBorrowsNormalizedX18: Scalars['BigInt'];
    lpSupply: Scalars['BigInt'];
    lpQuoteAmountX18: Scalars['BigInt'];
    lpBaseAmountX18: Scalars['BigInt'];
  };

  export type SpotProductSnapshot_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    period?: InputMaybe<Scalars['BigInt']>;
    period_not?: InputMaybe<Scalars['BigInt']>;
    period_gt?: InputMaybe<Scalars['BigInt']>;
    period_lt?: InputMaybe<Scalars['BigInt']>;
    period_gte?: InputMaybe<Scalars['BigInt']>;
    period_lte?: InputMaybe<Scalars['BigInt']>;
    period_in?: InputMaybe<Array<Scalars['BigInt']>>;
    period_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    periodIndex?: InputMaybe<Scalars['BigInt']>;
    periodIndex_not?: InputMaybe<Scalars['BigInt']>;
    periodIndex_gt?: InputMaybe<Scalars['BigInt']>;
    periodIndex_lt?: InputMaybe<Scalars['BigInt']>;
    periodIndex_gte?: InputMaybe<Scalars['BigInt']>;
    periodIndex_lte?: InputMaybe<Scalars['BigInt']>;
    periodIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
    periodIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    product?: InputMaybe<Scalars['String']>;
    product_not?: InputMaybe<Scalars['String']>;
    product_gt?: InputMaybe<Scalars['String']>;
    product_lt?: InputMaybe<Scalars['String']>;
    product_gte?: InputMaybe<Scalars['String']>;
    product_lte?: InputMaybe<Scalars['String']>;
    product_in?: InputMaybe<Array<Scalars['String']>>;
    product_not_in?: InputMaybe<Array<Scalars['String']>>;
    product_contains?: InputMaybe<Scalars['String']>;
    product_contains_nocase?: InputMaybe<Scalars['String']>;
    product_not_contains?: InputMaybe<Scalars['String']>;
    product_not_contains_nocase?: InputMaybe<Scalars['String']>;
    product_starts_with?: InputMaybe<Scalars['String']>;
    product_starts_with_nocase?: InputMaybe<Scalars['String']>;
    product_not_starts_with?: InputMaybe<Scalars['String']>;
    product_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    product_ends_with?: InputMaybe<Scalars['String']>;
    product_ends_with_nocase?: InputMaybe<Scalars['String']>;
    product_not_ends_with?: InputMaybe<Scalars['String']>;
    product_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    product_?: InputMaybe<SpotProduct_filter>;
    priceX18?: InputMaybe<Scalars['BigInt']>;
    priceX18_not?: InputMaybe<Scalars['BigInt']>;
    priceX18_gt?: InputMaybe<Scalars['BigInt']>;
    priceX18_lt?: InputMaybe<Scalars['BigInt']>;
    priceX18_gte?: InputMaybe<Scalars['BigInt']>;
    priceX18_lte?: InputMaybe<Scalars['BigInt']>;
    priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeDepositsMultiplierX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeDepositsMultiplierX18_not_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    cumulativeBorrowsMultiplierX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeBorrowsMultiplierX18_not_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    totalDepositsNormalizedX18?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_not?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_gt?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_lt?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_gte?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_lte?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalDepositsNormalizedX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalBorrowsNormalizedX18?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_not?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_gt?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_lt?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_gte?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_lte?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalBorrowsNormalizedX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpSupply?: InputMaybe<Scalars['BigInt']>;
    lpSupply_not?: InputMaybe<Scalars['BigInt']>;
    lpSupply_gt?: InputMaybe<Scalars['BigInt']>;
    lpSupply_lt?: InputMaybe<Scalars['BigInt']>;
    lpSupply_gte?: InputMaybe<Scalars['BigInt']>;
    lpSupply_lte?: InputMaybe<Scalars['BigInt']>;
    lpSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpQuoteAmountX18?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_not?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_gt?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_lt?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_gte?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_lte?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpQuoteAmountX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpBaseAmountX18?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_not?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_gt?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_lt?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_gte?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_lte?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpBaseAmountX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type SpotProductSnapshot_orderBy =
    | 'id'
    | 'period'
    | 'periodIndex'
    | 'product'
    | 'priceX18'
    | 'cumulativeDepositsMultiplierX18'
    | 'cumulativeBorrowsMultiplierX18'
    | 'totalDepositsNormalizedX18'
    | 'totalBorrowsNormalizedX18'
    | 'lpSupply'
    | 'lpQuoteAmountX18'
    | 'lpBaseAmountX18';

  export type SpotProduct_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    productId?: InputMaybe<Scalars['BigInt']>;
    productId_not?: InputMaybe<Scalars['BigInt']>;
    productId_gt?: InputMaybe<Scalars['BigInt']>;
    productId_lt?: InputMaybe<Scalars['BigInt']>;
    productId_gte?: InputMaybe<Scalars['BigInt']>;
    productId_lte?: InputMaybe<Scalars['BigInt']>;
    productId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    productId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    market?: InputMaybe<Scalars['String']>;
    market_not?: InputMaybe<Scalars['String']>;
    market_gt?: InputMaybe<Scalars['String']>;
    market_lt?: InputMaybe<Scalars['String']>;
    market_gte?: InputMaybe<Scalars['String']>;
    market_lte?: InputMaybe<Scalars['String']>;
    market_in?: InputMaybe<Array<Scalars['String']>>;
    market_not_in?: InputMaybe<Array<Scalars['String']>>;
    market_contains?: InputMaybe<Scalars['String']>;
    market_contains_nocase?: InputMaybe<Scalars['String']>;
    market_not_contains?: InputMaybe<Scalars['String']>;
    market_not_contains_nocase?: InputMaybe<Scalars['String']>;
    market_starts_with?: InputMaybe<Scalars['String']>;
    market_starts_with_nocase?: InputMaybe<Scalars['String']>;
    market_not_starts_with?: InputMaybe<Scalars['String']>;
    market_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    market_ends_with?: InputMaybe<Scalars['String']>;
    market_ends_with_nocase?: InputMaybe<Scalars['String']>;
    market_not_ends_with?: InputMaybe<Scalars['String']>;
    market_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    market_?: InputMaybe<Market_filter>;
    engine?: InputMaybe<Scalars['String']>;
    engine_not?: InputMaybe<Scalars['String']>;
    engine_gt?: InputMaybe<Scalars['String']>;
    engine_lt?: InputMaybe<Scalars['String']>;
    engine_gte?: InputMaybe<Scalars['String']>;
    engine_lte?: InputMaybe<Scalars['String']>;
    engine_in?: InputMaybe<Array<Scalars['String']>>;
    engine_not_in?: InputMaybe<Array<Scalars['String']>>;
    engine_contains?: InputMaybe<Scalars['String']>;
    engine_contains_nocase?: InputMaybe<Scalars['String']>;
    engine_not_contains?: InputMaybe<Scalars['String']>;
    engine_not_contains_nocase?: InputMaybe<Scalars['String']>;
    engine_starts_with?: InputMaybe<Scalars['String']>;
    engine_starts_with_nocase?: InputMaybe<Scalars['String']>;
    engine_not_starts_with?: InputMaybe<Scalars['String']>;
    engine_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    engine_ends_with?: InputMaybe<Scalars['String']>;
    engine_ends_with_nocase?: InputMaybe<Scalars['String']>;
    engine_not_ends_with?: InputMaybe<Scalars['String']>;
    engine_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    engine_?: InputMaybe<SpotEngine_filter>;
    priceX18?: InputMaybe<Scalars['BigInt']>;
    priceX18_not?: InputMaybe<Scalars['BigInt']>;
    priceX18_gt?: InputMaybe<Scalars['BigInt']>;
    priceX18_lt?: InputMaybe<Scalars['BigInt']>;
    priceX18_gte?: InputMaybe<Scalars['BigInt']>;
    priceX18_lte?: InputMaybe<Scalars['BigInt']>;
    priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeDepositsMultiplierX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeDepositsMultiplierX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeDepositsMultiplierX18_not_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    cumulativeBorrowsMultiplierX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeBorrowsMultiplierX18_not_in?: InputMaybe<
      Array<Scalars['BigInt']>
    >;
    totalDepositsNormalizedX18?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_not?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_gt?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_lt?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_gte?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_lte?: InputMaybe<Scalars['BigInt']>;
    totalDepositsNormalizedX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalDepositsNormalizedX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalBorrowsNormalizedX18?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_not?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_gt?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_lt?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_gte?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_lte?: InputMaybe<Scalars['BigInt']>;
    totalBorrowsNormalizedX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalBorrowsNormalizedX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpSupply?: InputMaybe<Scalars['BigInt']>;
    lpSupply_not?: InputMaybe<Scalars['BigInt']>;
    lpSupply_gt?: InputMaybe<Scalars['BigInt']>;
    lpSupply_lt?: InputMaybe<Scalars['BigInt']>;
    lpSupply_gte?: InputMaybe<Scalars['BigInt']>;
    lpSupply_lte?: InputMaybe<Scalars['BigInt']>;
    lpSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpQuoteAmountX18?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_not?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_gt?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_lt?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_gte?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_lte?: InputMaybe<Scalars['BigInt']>;
    lpQuoteAmountX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpQuoteAmountX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpBaseAmountX18?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_not?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_gt?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_lt?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_gte?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_lte?: InputMaybe<Scalars['BigInt']>;
    lpBaseAmountX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    lpBaseAmountX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    snapshots_?: InputMaybe<SpotProductSnapshot_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type SpotProduct_orderBy =
    | 'id'
    | 'productId'
    | 'market'
    | 'engine'
    | 'priceX18'
    | 'cumulativeDepositsMultiplierX18'
    | 'cumulativeBorrowsMultiplierX18'
    | 'totalDepositsNormalizedX18'
    | 'totalBorrowsNormalizedX18'
    | 'lpSupply'
    | 'lpQuoteAmountX18'
    | 'lpBaseAmountX18'
    | 'snapshots';

  export type Subscription = {
    spotEngine?: Maybe<SpotEngine>;
    spotEngines: Array<SpotEngine>;
    perpEngine?: Maybe<PerpEngine>;
    perpEngines: Array<PerpEngine>;
    spotProduct?: Maybe<SpotProduct>;
    spotProducts: Array<SpotProduct>;
    spotProductSnapshot?: Maybe<SpotProductSnapshot>;
    spotProductSnapshots: Array<SpotProductSnapshot>;
    perpProduct?: Maybe<PerpProduct>;
    perpProducts: Array<PerpProduct>;
    perpProductSnapshot?: Maybe<PerpProductSnapshot>;
    perpProductSnapshots: Array<PerpProductSnapshot>;
    market?: Maybe<Market>;
    markets: Array<Market>;
    marketSnapshot?: Maybe<MarketSnapshot>;
    marketSnapshots: Array<MarketSnapshot>;
    socializeProductEvent?: Maybe<SocializeProductEvent>;
    socializeProductEvents: Array<SocializeProductEvent>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
  };

  export type SubscriptionspotEngineArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionspotEnginesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotEngine_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotEngine_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionperpEngineArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionperpEnginesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpEngine_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpEngine_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionspotProductArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionspotProductsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProduct_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProduct_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionspotProductSnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionspotProductSnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProductSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProductSnapshot_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionperpProductArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionperpProductsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProduct_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProduct_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionperpProductSnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionperpProductSnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProductSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProductSnapshot_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionmarketArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionmarketsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Market_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Market_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionmarketSnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionmarketSnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MarketSnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MarketSnapshot_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionsocializeProductEventArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionsocializeProductEventsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SocializeProductEvent_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SocializeProductEvent_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type Subscription_metaArgs = {
    block?: InputMaybe<Block_height>;
  };

  export type _Block_ = {
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
    /** Integer representation of the timestamp stored in blocks for the chain */
    timestamp?: Maybe<Scalars['Int']>;
  };

  /** The type for the top-level _meta field */
  export type _Meta_ = {
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
  };

  export type _SubgraphErrorPolicy_ =
    /** Data will be returned even if the subgraph has indexing errors */
    | 'allow'
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    | 'deny';

  export type QuerySdk = {
    /** null **/
    spotEngine: InContextSdkMethod<
      Query['spotEngine'],
      QueryspotEngineArgs,
      MeshContext
    >;
    /** null **/
    spotEngines: InContextSdkMethod<
      Query['spotEngines'],
      QueryspotEnginesArgs,
      MeshContext
    >;
    /** null **/
    perpEngine: InContextSdkMethod<
      Query['perpEngine'],
      QueryperpEngineArgs,
      MeshContext
    >;
    /** null **/
    perpEngines: InContextSdkMethod<
      Query['perpEngines'],
      QueryperpEnginesArgs,
      MeshContext
    >;
    /** null **/
    spotProduct: InContextSdkMethod<
      Query['spotProduct'],
      QueryspotProductArgs,
      MeshContext
    >;
    /** null **/
    spotProducts: InContextSdkMethod<
      Query['spotProducts'],
      QueryspotProductsArgs,
      MeshContext
    >;
    /** null **/
    spotProductSnapshot: InContextSdkMethod<
      Query['spotProductSnapshot'],
      QueryspotProductSnapshotArgs,
      MeshContext
    >;
    /** null **/
    spotProductSnapshots: InContextSdkMethod<
      Query['spotProductSnapshots'],
      QueryspotProductSnapshotsArgs,
      MeshContext
    >;
    /** null **/
    perpProduct: InContextSdkMethod<
      Query['perpProduct'],
      QueryperpProductArgs,
      MeshContext
    >;
    /** null **/
    perpProducts: InContextSdkMethod<
      Query['perpProducts'],
      QueryperpProductsArgs,
      MeshContext
    >;
    /** null **/
    perpProductSnapshot: InContextSdkMethod<
      Query['perpProductSnapshot'],
      QueryperpProductSnapshotArgs,
      MeshContext
    >;
    /** null **/
    perpProductSnapshots: InContextSdkMethod<
      Query['perpProductSnapshots'],
      QueryperpProductSnapshotsArgs,
      MeshContext
    >;
    /** null **/
    market: InContextSdkMethod<Query['market'], QuerymarketArgs, MeshContext>;
    /** null **/
    markets: InContextSdkMethod<
      Query['markets'],
      QuerymarketsArgs,
      MeshContext
    >;
    /** null **/
    marketSnapshot: InContextSdkMethod<
      Query['marketSnapshot'],
      QuerymarketSnapshotArgs,
      MeshContext
    >;
    /** null **/
    marketSnapshots: InContextSdkMethod<
      Query['marketSnapshots'],
      QuerymarketSnapshotsArgs,
      MeshContext
    >;
    /** null **/
    socializeProductEvent: InContextSdkMethod<
      Query['socializeProductEvent'],
      QuerysocializeProductEventArgs,
      MeshContext
    >;
    /** null **/
    socializeProductEvents: InContextSdkMethod<
      Query['socializeProductEvents'],
      QuerysocializeProductEventsArgs,
      MeshContext
    >;
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>;
  };

  export type MutationSdk = {};

  export type SubscriptionSdk = {
    /** null **/
    spotEngine: InContextSdkMethod<
      Subscription['spotEngine'],
      SubscriptionspotEngineArgs,
      MeshContext
    >;
    /** null **/
    spotEngines: InContextSdkMethod<
      Subscription['spotEngines'],
      SubscriptionspotEnginesArgs,
      MeshContext
    >;
    /** null **/
    perpEngine: InContextSdkMethod<
      Subscription['perpEngine'],
      SubscriptionperpEngineArgs,
      MeshContext
    >;
    /** null **/
    perpEngines: InContextSdkMethod<
      Subscription['perpEngines'],
      SubscriptionperpEnginesArgs,
      MeshContext
    >;
    /** null **/
    spotProduct: InContextSdkMethod<
      Subscription['spotProduct'],
      SubscriptionspotProductArgs,
      MeshContext
    >;
    /** null **/
    spotProducts: InContextSdkMethod<
      Subscription['spotProducts'],
      SubscriptionspotProductsArgs,
      MeshContext
    >;
    /** null **/
    spotProductSnapshot: InContextSdkMethod<
      Subscription['spotProductSnapshot'],
      SubscriptionspotProductSnapshotArgs,
      MeshContext
    >;
    /** null **/
    spotProductSnapshots: InContextSdkMethod<
      Subscription['spotProductSnapshots'],
      SubscriptionspotProductSnapshotsArgs,
      MeshContext
    >;
    /** null **/
    perpProduct: InContextSdkMethod<
      Subscription['perpProduct'],
      SubscriptionperpProductArgs,
      MeshContext
    >;
    /** null **/
    perpProducts: InContextSdkMethod<
      Subscription['perpProducts'],
      SubscriptionperpProductsArgs,
      MeshContext
    >;
    /** null **/
    perpProductSnapshot: InContextSdkMethod<
      Subscription['perpProductSnapshot'],
      SubscriptionperpProductSnapshotArgs,
      MeshContext
    >;
    /** null **/
    perpProductSnapshots: InContextSdkMethod<
      Subscription['perpProductSnapshots'],
      SubscriptionperpProductSnapshotsArgs,
      MeshContext
    >;
    /** null **/
    market: InContextSdkMethod<
      Subscription['market'],
      SubscriptionmarketArgs,
      MeshContext
    >;
    /** null **/
    markets: InContextSdkMethod<
      Subscription['markets'],
      SubscriptionmarketsArgs,
      MeshContext
    >;
    /** null **/
    marketSnapshot: InContextSdkMethod<
      Subscription['marketSnapshot'],
      SubscriptionmarketSnapshotArgs,
      MeshContext
    >;
    /** null **/
    marketSnapshots: InContextSdkMethod<
      Subscription['marketSnapshots'],
      SubscriptionmarketSnapshotsArgs,
      MeshContext
    >;
    /** null **/
    socializeProductEvent: InContextSdkMethod<
      Subscription['socializeProductEvent'],
      SubscriptionsocializeProductEventArgs,
      MeshContext
    >;
    /** null **/
    socializeProductEvents: InContextSdkMethod<
      Subscription['socializeProductEvents'],
      SubscriptionsocializeProductEventsArgs,
      MeshContext
    >;
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<
      Subscription['_meta'],
      Subscription_metaArgs,
      MeshContext
    >;
  };

  export type Context = {
    ['VertexMarkets']: {
      Query: QuerySdk;
      Mutation: MutationSdk;
      Subscription: SubscriptionSdk;
    };
    ['marketsEndpoint']: Scalars['ID'];
  };
}
