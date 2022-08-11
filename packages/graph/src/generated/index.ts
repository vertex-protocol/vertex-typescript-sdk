// @ts-nocheck
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { DefaultLogger, gql, printWithCache, PubSub } from '@graphql-mesh/utils';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import {
  ExecuteMeshFn,
  getMesh,
  MeshContext as BaseMeshContext,
  MeshInstance,
  SubscribeMeshFn
} from '@graphql-mesh/runtime';

import type { YamlConfig } from '@graphql-mesh/types';
import { InContextSdkMethod } from '@graphql-mesh/types';
import { FsStoreStorageAdapter, MeshStore } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetchFactory } from 'fetchache';
import { fetch, Request, Response } from '@whatwg-node/fetch';

import GraphqlHandler from "@graphql-mesh/graphql"
import AutoPaginationTransform from "@graphprotocol/client-auto-pagination";
import BlockTrackingTransform from "@graphprotocol/client-block-tracking";
import BareMerger from "@graphql-mesh/merger-bare";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type BalanceSummary = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  subaccount: Subaccount;
  totalEntryQuoteAmount: Scalars['BigDecimal'];
  totalEntryAmount: Scalars['BigInt'];
  totalCloseQuoteAmount: Scalars['BigDecimal'];
  totalCloseAmount: Scalars['BigInt'];
};

export type BalanceSummary_filter = {
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
  subaccount?: InputMaybe<Scalars['String']>;
  subaccount_not?: InputMaybe<Scalars['String']>;
  subaccount_gt?: InputMaybe<Scalars['String']>;
  subaccount_lt?: InputMaybe<Scalars['String']>;
  subaccount_gte?: InputMaybe<Scalars['String']>;
  subaccount_lte?: InputMaybe<Scalars['String']>;
  subaccount_in?: InputMaybe<Array<Scalars['String']>>;
  subaccount_not_in?: InputMaybe<Array<Scalars['String']>>;
  subaccount_contains?: InputMaybe<Scalars['String']>;
  subaccount_contains_nocase?: InputMaybe<Scalars['String']>;
  subaccount_not_contains?: InputMaybe<Scalars['String']>;
  subaccount_not_contains_nocase?: InputMaybe<Scalars['String']>;
  subaccount_starts_with?: InputMaybe<Scalars['String']>;
  subaccount_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subaccount_not_starts_with?: InputMaybe<Scalars['String']>;
  subaccount_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subaccount_ends_with?: InputMaybe<Scalars['String']>;
  subaccount_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subaccount_not_ends_with?: InputMaybe<Scalars['String']>;
  subaccount_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subaccount_?: InputMaybe<Subaccount_filter>;
  totalEntryQuoteAmount?: InputMaybe<Scalars['BigDecimal']>;
  totalEntryQuoteAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  totalEntryQuoteAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalEntryQuoteAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalEntryQuoteAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalEntryQuoteAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalEntryQuoteAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalEntryQuoteAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalEntryAmount?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalEntryAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalCloseQuoteAmount?: InputMaybe<Scalars['BigDecimal']>;
  totalCloseQuoteAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  totalCloseQuoteAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalCloseQuoteAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalCloseQuoteAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalCloseQuoteAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalCloseQuoteAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalCloseQuoteAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalCloseAmount?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalCloseAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type BalanceSummary_orderBy =
  | 'id'
  | 'productId'
  | 'subaccount'
  | 'totalEntryQuoteAmount'
  | 'totalEntryAmount'
  | 'totalCloseQuoteAmount'
  | 'totalCloseAmount';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Candlestick = {
  id: Scalars['ID'];
  market: Market;
  time: Scalars['BigInt'];
  period: Scalars['Int'];
  open: Scalars['BigDecimal'];
  close: Scalars['BigDecimal'];
  low: Scalars['BigDecimal'];
  high: Scalars['BigDecimal'];
  volumeBase: Scalars['BigInt'];
  volumeQuote: Scalars['BigDecimal'];
};

export type Candlestick_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  time?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  period?: InputMaybe<Scalars['Int']>;
  period_not?: InputMaybe<Scalars['Int']>;
  period_gt?: InputMaybe<Scalars['Int']>;
  period_lt?: InputMaybe<Scalars['Int']>;
  period_gte?: InputMaybe<Scalars['Int']>;
  period_lte?: InputMaybe<Scalars['Int']>;
  period_in?: InputMaybe<Array<Scalars['Int']>>;
  period_not_in?: InputMaybe<Array<Scalars['Int']>>;
  open?: InputMaybe<Scalars['BigDecimal']>;
  open_not?: InputMaybe<Scalars['BigDecimal']>;
  open_gt?: InputMaybe<Scalars['BigDecimal']>;
  open_lt?: InputMaybe<Scalars['BigDecimal']>;
  open_gte?: InputMaybe<Scalars['BigDecimal']>;
  open_lte?: InputMaybe<Scalars['BigDecimal']>;
  open_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  close?: InputMaybe<Scalars['BigDecimal']>;
  close_not?: InputMaybe<Scalars['BigDecimal']>;
  close_gt?: InputMaybe<Scalars['BigDecimal']>;
  close_lt?: InputMaybe<Scalars['BigDecimal']>;
  close_gte?: InputMaybe<Scalars['BigDecimal']>;
  close_lte?: InputMaybe<Scalars['BigDecimal']>;
  close_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  low?: InputMaybe<Scalars['BigDecimal']>;
  low_not?: InputMaybe<Scalars['BigDecimal']>;
  low_gt?: InputMaybe<Scalars['BigDecimal']>;
  low_lt?: InputMaybe<Scalars['BigDecimal']>;
  low_gte?: InputMaybe<Scalars['BigDecimal']>;
  low_lte?: InputMaybe<Scalars['BigDecimal']>;
  low_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  high?: InputMaybe<Scalars['BigDecimal']>;
  high_not?: InputMaybe<Scalars['BigDecimal']>;
  high_gt?: InputMaybe<Scalars['BigDecimal']>;
  high_lt?: InputMaybe<Scalars['BigDecimal']>;
  high_gte?: InputMaybe<Scalars['BigDecimal']>;
  high_lte?: InputMaybe<Scalars['BigDecimal']>;
  high_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeBase?: InputMaybe<Scalars['BigInt']>;
  volumeBase_not?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeQuote?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeQuote_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Candlestick_orderBy =
  | 'id'
  | 'market'
  | 'time'
  | 'period'
  | 'open'
  | 'close'
  | 'low'
  | 'high'
  | 'volumeBase'
  | 'volumeQuote';

export type Clearinghouse = {
  id: Scalars['ID'];
  quoteProduct: Scalars['Bytes'];
  spotEngine: SpotEngine;
  perpEngine: PerpEngine;
  numSubaccounts: Scalars['BigInt'];
  numProducts: Scalars['BigInt'];
  insuranceBalance: Scalars['BigInt'];
  subaccounts: Array<Subaccount>;
};


export type ClearinghousesubaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Subaccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subaccount_filter>;
};

export type Clearinghouse_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  quoteProduct?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_not?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_in?: InputMaybe<Array<Scalars['Bytes']>>;
  quoteProduct_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  quoteProduct_contains?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_not_contains?: InputMaybe<Scalars['Bytes']>;
  spotEngine_?: InputMaybe<SpotEngine_filter>;
  perpEngine_?: InputMaybe<PerpEngine_filter>;
  numSubaccounts?: InputMaybe<Scalars['BigInt']>;
  numSubaccounts_not?: InputMaybe<Scalars['BigInt']>;
  numSubaccounts_gt?: InputMaybe<Scalars['BigInt']>;
  numSubaccounts_lt?: InputMaybe<Scalars['BigInt']>;
  numSubaccounts_gte?: InputMaybe<Scalars['BigInt']>;
  numSubaccounts_lte?: InputMaybe<Scalars['BigInt']>;
  numSubaccounts_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numSubaccounts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numProducts?: InputMaybe<Scalars['BigInt']>;
  numProducts_not?: InputMaybe<Scalars['BigInt']>;
  numProducts_gt?: InputMaybe<Scalars['BigInt']>;
  numProducts_lt?: InputMaybe<Scalars['BigInt']>;
  numProducts_gte?: InputMaybe<Scalars['BigInt']>;
  numProducts_lte?: InputMaybe<Scalars['BigInt']>;
  numProducts_in?: InputMaybe<Array<Scalars['BigInt']>>;
  numProducts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  insuranceBalance?: InputMaybe<Scalars['BigInt']>;
  insuranceBalance_not?: InputMaybe<Scalars['BigInt']>;
  insuranceBalance_gt?: InputMaybe<Scalars['BigInt']>;
  insuranceBalance_lt?: InputMaybe<Scalars['BigInt']>;
  insuranceBalance_gte?: InputMaybe<Scalars['BigInt']>;
  insuranceBalance_lte?: InputMaybe<Scalars['BigInt']>;
  insuranceBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  insuranceBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  subaccounts_?: InputMaybe<Subaccount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Clearinghouse_orderBy =
  | 'id'
  | 'quoteProduct'
  | 'spotEngine'
  | 'perpEngine'
  | 'numSubaccounts'
  | 'numProducts'
  | 'insuranceBalance'
  | 'subaccounts';

export type Market = {
  id: Scalars['ID'];
  clearinghouse: Clearinghouse;
  productId: Scalars['BigInt'];
  orderbook: Scalars['Bytes'];
  sizeIncrementX18: Scalars['BigInt'];
  priceIncrementX18: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  createdAtBlock: Scalars['BigInt'];
  bidX18: Scalars['BigInt'];
  askX18: Scalars['BigInt'];
  bidAskAvgX18: Scalars['BigInt'];
  volumeBase: Scalars['BigInt'];
  volumeQuote: Scalars['BigDecimal'];
  volumeNumOrders: Scalars['BigInt'];
  candlesticks: Array<Candlestick>;
  orders: Array<Order>;
  priceLevels: Array<OrderbookPriceLevel>;
  snapshots: Array<MarketHourlySnapshot>;
};


export type MarketcandlesticksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Candlestick_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Candlestick_filter>;
};


export type MarketordersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_filter>;
};


export type MarketpriceLevelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderbookPriceLevel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OrderbookPriceLevel_filter>;
};


export type MarketsnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketHourlySnapshot_filter>;
};

export type MarketHourlySnapshot = {
  id: Scalars['ID'];
  hour: Scalars['BigInt'];
  market: Market;
  volumeQuote: Scalars['BigDecimal'];
};

export type MarketHourlySnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  hour?: InputMaybe<Scalars['BigInt']>;
  hour_not?: InputMaybe<Scalars['BigInt']>;
  hour_gt?: InputMaybe<Scalars['BigInt']>;
  hour_lt?: InputMaybe<Scalars['BigInt']>;
  hour_gte?: InputMaybe<Scalars['BigInt']>;
  hour_lte?: InputMaybe<Scalars['BigInt']>;
  hour_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hour_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  volumeQuote?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeQuote_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type MarketHourlySnapshot_orderBy =
  | 'id'
  | 'hour'
  | 'market'
  | 'volumeQuote';

export type Market_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  clearinghouse?: InputMaybe<Scalars['String']>;
  clearinghouse_not?: InputMaybe<Scalars['String']>;
  clearinghouse_gt?: InputMaybe<Scalars['String']>;
  clearinghouse_lt?: InputMaybe<Scalars['String']>;
  clearinghouse_gte?: InputMaybe<Scalars['String']>;
  clearinghouse_lte?: InputMaybe<Scalars['String']>;
  clearinghouse_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouse_contains?: InputMaybe<Scalars['String']>;
  clearinghouse_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_contains?: InputMaybe<Scalars['String']>;
  clearinghouse_not_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouse_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouse_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouse_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouse_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_?: InputMaybe<Clearinghouse_filter>;
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
  orderbook_in?: InputMaybe<Array<Scalars['Bytes']>>;
  orderbook_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  orderbook_contains?: InputMaybe<Scalars['Bytes']>;
  orderbook_not_contains?: InputMaybe<Scalars['Bytes']>;
  sizeIncrementX18?: InputMaybe<Scalars['BigInt']>;
  sizeIncrementX18_not?: InputMaybe<Scalars['BigInt']>;
  sizeIncrementX18_gt?: InputMaybe<Scalars['BigInt']>;
  sizeIncrementX18_lt?: InputMaybe<Scalars['BigInt']>;
  sizeIncrementX18_gte?: InputMaybe<Scalars['BigInt']>;
  sizeIncrementX18_lte?: InputMaybe<Scalars['BigInt']>;
  sizeIncrementX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sizeIncrementX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  bidX18?: InputMaybe<Scalars['BigInt']>;
  bidX18_not?: InputMaybe<Scalars['BigInt']>;
  bidX18_gt?: InputMaybe<Scalars['BigInt']>;
  bidX18_lt?: InputMaybe<Scalars['BigInt']>;
  bidX18_gte?: InputMaybe<Scalars['BigInt']>;
  bidX18_lte?: InputMaybe<Scalars['BigInt']>;
  bidX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  askX18?: InputMaybe<Scalars['BigInt']>;
  askX18_not?: InputMaybe<Scalars['BigInt']>;
  askX18_gt?: InputMaybe<Scalars['BigInt']>;
  askX18_lt?: InputMaybe<Scalars['BigInt']>;
  askX18_gte?: InputMaybe<Scalars['BigInt']>;
  askX18_lte?: InputMaybe<Scalars['BigInt']>;
  askX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  askX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidAskAvgX18?: InputMaybe<Scalars['BigInt']>;
  bidAskAvgX18_not?: InputMaybe<Scalars['BigInt']>;
  bidAskAvgX18_gt?: InputMaybe<Scalars['BigInt']>;
  bidAskAvgX18_lt?: InputMaybe<Scalars['BigInt']>;
  bidAskAvgX18_gte?: InputMaybe<Scalars['BigInt']>;
  bidAskAvgX18_lte?: InputMaybe<Scalars['BigInt']>;
  bidAskAvgX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidAskAvgX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase?: InputMaybe<Scalars['BigInt']>;
  volumeBase_not?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeQuote?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeQuote_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeQuote_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeNumOrders?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_not?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_gt?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_lt?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_gte?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_lte?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeNumOrders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  candlesticks_?: InputMaybe<Candlestick_filter>;
  orders_?: InputMaybe<Order_filter>;
  priceLevels_?: InputMaybe<OrderbookPriceLevel_filter>;
  snapshots_?: InputMaybe<MarketHourlySnapshot_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Market_orderBy =
  | 'id'
  | 'clearinghouse'
  | 'productId'
  | 'orderbook'
  | 'sizeIncrementX18'
  | 'priceIncrementX18'
  | 'createdAt'
  | 'createdAtBlock'
  | 'bidX18'
  | 'askX18'
  | 'bidAskAvgX18'
  | 'volumeBase'
  | 'volumeQuote'
  | 'volumeNumOrders'
  | 'candlesticks'
  | 'orders'
  | 'priceLevels'
  | 'snapshots';

export type Order = {
  id: Scalars['ID'];
  status: OrderStatus;
  priceX18: Scalars['BigInt'];
  queuePos?: Maybe<Scalars['BigInt']>;
  subaccount: Subaccount;
  market: Market;
  expiration: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  createdAtBlock: Scalars['BigInt'];
  initialAmount: Scalars['BigInt'];
  filledAmount: Scalars['BigInt'];
  collectedFee: Scalars['BigInt'];
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type OrderStatus =
  | 'INSTANT_FILL'
  | 'ON_BOOK'
  | 'FILLED'
  | 'CANCELLED';

export type Order_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  status?: InputMaybe<OrderStatus>;
  status_not?: InputMaybe<OrderStatus>;
  status_in?: InputMaybe<Array<OrderStatus>>;
  status_not_in?: InputMaybe<Array<OrderStatus>>;
  priceX18?: InputMaybe<Scalars['BigInt']>;
  priceX18_not?: InputMaybe<Scalars['BigInt']>;
  priceX18_gt?: InputMaybe<Scalars['BigInt']>;
  priceX18_lt?: InputMaybe<Scalars['BigInt']>;
  priceX18_gte?: InputMaybe<Scalars['BigInt']>;
  priceX18_lte?: InputMaybe<Scalars['BigInt']>;
  priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  queuePos?: InputMaybe<Scalars['BigInt']>;
  queuePos_not?: InputMaybe<Scalars['BigInt']>;
  queuePos_gt?: InputMaybe<Scalars['BigInt']>;
  queuePos_lt?: InputMaybe<Scalars['BigInt']>;
  queuePos_gte?: InputMaybe<Scalars['BigInt']>;
  queuePos_lte?: InputMaybe<Scalars['BigInt']>;
  queuePos_in?: InputMaybe<Array<Scalars['BigInt']>>;
  queuePos_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  subaccount?: InputMaybe<Scalars['String']>;
  subaccount_not?: InputMaybe<Scalars['String']>;
  subaccount_gt?: InputMaybe<Scalars['String']>;
  subaccount_lt?: InputMaybe<Scalars['String']>;
  subaccount_gte?: InputMaybe<Scalars['String']>;
  subaccount_lte?: InputMaybe<Scalars['String']>;
  subaccount_in?: InputMaybe<Array<Scalars['String']>>;
  subaccount_not_in?: InputMaybe<Array<Scalars['String']>>;
  subaccount_contains?: InputMaybe<Scalars['String']>;
  subaccount_contains_nocase?: InputMaybe<Scalars['String']>;
  subaccount_not_contains?: InputMaybe<Scalars['String']>;
  subaccount_not_contains_nocase?: InputMaybe<Scalars['String']>;
  subaccount_starts_with?: InputMaybe<Scalars['String']>;
  subaccount_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subaccount_not_starts_with?: InputMaybe<Scalars['String']>;
  subaccount_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  subaccount_ends_with?: InputMaybe<Scalars['String']>;
  subaccount_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subaccount_not_ends_with?: InputMaybe<Scalars['String']>;
  subaccount_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  subaccount_?: InputMaybe<Subaccount_filter>;
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
  expiration?: InputMaybe<Scalars['BigInt']>;
  expiration_not?: InputMaybe<Scalars['BigInt']>;
  expiration_gt?: InputMaybe<Scalars['BigInt']>;
  expiration_lt?: InputMaybe<Scalars['BigInt']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']>;
  expiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  initialAmount?: InputMaybe<Scalars['BigInt']>;
  initialAmount_not?: InputMaybe<Scalars['BigInt']>;
  initialAmount_gt?: InputMaybe<Scalars['BigInt']>;
  initialAmount_lt?: InputMaybe<Scalars['BigInt']>;
  initialAmount_gte?: InputMaybe<Scalars['BigInt']>;
  initialAmount_lte?: InputMaybe<Scalars['BigInt']>;
  initialAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  filledAmount?: InputMaybe<Scalars['BigInt']>;
  filledAmount_not?: InputMaybe<Scalars['BigInt']>;
  filledAmount_gt?: InputMaybe<Scalars['BigInt']>;
  filledAmount_lt?: InputMaybe<Scalars['BigInt']>;
  filledAmount_gte?: InputMaybe<Scalars['BigInt']>;
  filledAmount_lte?: InputMaybe<Scalars['BigInt']>;
  filledAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  filledAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collectedFee?: InputMaybe<Scalars['BigInt']>;
  collectedFee_not?: InputMaybe<Scalars['BigInt']>;
  collectedFee_gt?: InputMaybe<Scalars['BigInt']>;
  collectedFee_lt?: InputMaybe<Scalars['BigInt']>;
  collectedFee_gte?: InputMaybe<Scalars['BigInt']>;
  collectedFee_lte?: InputMaybe<Scalars['BigInt']>;
  collectedFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collectedFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Order_orderBy =
  | 'id'
  | 'status'
  | 'priceX18'
  | 'queuePos'
  | 'subaccount'
  | 'market'
  | 'expiration'
  | 'createdAt'
  | 'createdAtBlock'
  | 'initialAmount'
  | 'filledAmount'
  | 'collectedFee';

export type OrderbookPriceLevel = {
  id: Scalars['ID'];
  priceX18: Scalars['BigInt'];
  market: Market;
  cumulativeSize: Scalars['BigInt'];
};

export type OrderbookPriceLevel_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  priceX18?: InputMaybe<Scalars['BigInt']>;
  priceX18_not?: InputMaybe<Scalars['BigInt']>;
  priceX18_gt?: InputMaybe<Scalars['BigInt']>;
  priceX18_lt?: InputMaybe<Scalars['BigInt']>;
  priceX18_gte?: InputMaybe<Scalars['BigInt']>;
  priceX18_lte?: InputMaybe<Scalars['BigInt']>;
  priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  cumulativeSize?: InputMaybe<Scalars['BigInt']>;
  cumulativeSize_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeSize_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeSize_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeSize_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeSize_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type OrderbookPriceLevel_orderBy =
  | 'id'
  | 'priceX18'
  | 'market'
  | 'cumulativeSize';

export type PerpEngine = {
  id: Scalars['ID'];
  clearinghouse: Clearinghouse;
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
  clearinghouse?: InputMaybe<Scalars['String']>;
  clearinghouse_not?: InputMaybe<Scalars['String']>;
  clearinghouse_gt?: InputMaybe<Scalars['String']>;
  clearinghouse_lt?: InputMaybe<Scalars['String']>;
  clearinghouse_gte?: InputMaybe<Scalars['String']>;
  clearinghouse_lte?: InputMaybe<Scalars['String']>;
  clearinghouse_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouse_contains?: InputMaybe<Scalars['String']>;
  clearinghouse_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_contains?: InputMaybe<Scalars['String']>;
  clearinghouse_not_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouse_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouse_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouse_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouse_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_?: InputMaybe<Clearinghouse_filter>;
  products_?: InputMaybe<PerpProduct_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PerpEngine_orderBy =
  | 'id'
  | 'clearinghouse'
  | 'products';

export type PerpProduct = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  market: Market;
  engine: PerpEngine;
  priceX18: Scalars['BigInt'];
  ammPriceX18: Scalars['BigInt'];
  cumulativeFundingLongX18: Scalars['BigInt'];
  cumulativeFundingShortX18: Scalars['BigInt'];
  openInterestX18: Scalars['BigInt'];
  snapshots: Array<PerpProductHourlySnapshot>;
};


export type PerpProductsnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PerpProductHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PerpProductHourlySnapshot_filter>;
};

export type PerpProductHourlySnapshot = {
  id: Scalars['ID'];
  hour: Scalars['BigInt'];
  product: PerpProduct;
};

export type PerpProductHourlySnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  hour?: InputMaybe<Scalars['BigInt']>;
  hour_not?: InputMaybe<Scalars['BigInt']>;
  hour_gt?: InputMaybe<Scalars['BigInt']>;
  hour_lt?: InputMaybe<Scalars['BigInt']>;
  hour_gte?: InputMaybe<Scalars['BigInt']>;
  hour_lte?: InputMaybe<Scalars['BigInt']>;
  hour_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hour_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PerpProductHourlySnapshot_orderBy =
  | 'id'
  | 'hour'
  | 'product';

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
  ammPriceX18?: InputMaybe<Scalars['BigInt']>;
  ammPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  ammPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  ammPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  ammPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  ammPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  ammPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ammPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  snapshots_?: InputMaybe<PerpProductHourlySnapshot_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PerpProduct_orderBy =
  | 'id'
  | 'productId'
  | 'market'
  | 'engine'
  | 'priceX18'
  | 'ammPriceX18'
  | 'cumulativeFundingLongX18'
  | 'cumulativeFundingShortX18'
  | 'openInterestX18'
  | 'snapshots';

export type Query = {
  clearinghouse?: Maybe<Clearinghouse>;
  clearinghouses: Array<Clearinghouse>;
  spotEngine?: Maybe<SpotEngine>;
  spotEngines: Array<SpotEngine>;
  perpEngine?: Maybe<PerpEngine>;
  perpEngines: Array<PerpEngine>;
  spotProduct?: Maybe<SpotProduct>;
  spotProducts: Array<SpotProduct>;
  spotProductHourlySnapshot?: Maybe<SpotProductHourlySnapshot>;
  spotProductHourlySnapshots: Array<SpotProductHourlySnapshot>;
  perpProduct?: Maybe<PerpProduct>;
  perpProducts: Array<PerpProduct>;
  perpProductHourlySnapshot?: Maybe<PerpProductHourlySnapshot>;
  perpProductHourlySnapshots: Array<PerpProductHourlySnapshot>;
  market?: Maybe<Market>;
  markets: Array<Market>;
  marketHourlySnapshot?: Maybe<MarketHourlySnapshot>;
  marketHourlySnapshots: Array<MarketHourlySnapshot>;
  candlestick?: Maybe<Candlestick>;
  candlesticks: Array<Candlestick>;
  orderbookPriceLevel?: Maybe<OrderbookPriceLevel>;
  orderbookPriceLevels: Array<OrderbookPriceLevel>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  subaccount?: Maybe<Subaccount>;
  subaccounts: Array<Subaccount>;
  balanceSummary?: Maybe<BalanceSummary>;
  balanceSummaries: Array<BalanceSummary>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryclearinghouseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclearinghousesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Clearinghouse_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Clearinghouse_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
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


export type QueryspotProductHourlySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryspotProductHourlySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpotProductHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SpotProductHourlySnapshot_filter>;
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


export type QueryperpProductHourlySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryperpProductHourlySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PerpProductHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PerpProductHourlySnapshot_filter>;
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


export type QuerymarketHourlySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketHourlySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketHourlySnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycandlestickArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycandlesticksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Candlestick_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Candlestick_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryorderbookPriceLevelArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryorderbookPriceLevelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderbookPriceLevel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OrderbookPriceLevel_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryorderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryordersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Subaccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subaccount_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybalanceSummaryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BalanceSummary_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type SpotEngine = {
  id: Scalars['ID'];
  clearinghouse: Clearinghouse;
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
  clearinghouse?: InputMaybe<Scalars['String']>;
  clearinghouse_not?: InputMaybe<Scalars['String']>;
  clearinghouse_gt?: InputMaybe<Scalars['String']>;
  clearinghouse_lt?: InputMaybe<Scalars['String']>;
  clearinghouse_gte?: InputMaybe<Scalars['String']>;
  clearinghouse_lte?: InputMaybe<Scalars['String']>;
  clearinghouse_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouse_contains?: InputMaybe<Scalars['String']>;
  clearinghouse_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_contains?: InputMaybe<Scalars['String']>;
  clearinghouse_not_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouse_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouse_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouse_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouse_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_?: InputMaybe<Clearinghouse_filter>;
  products_?: InputMaybe<SpotProduct_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SpotEngine_orderBy =
  | 'id'
  | 'clearinghouse'
  | 'products';

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
  snapshots: Array<SpotProductHourlySnapshot>;
};


export type SpotProductsnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpotProductHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SpotProductHourlySnapshot_filter>;
};

export type SpotProductHourlySnapshot = {
  id: Scalars['ID'];
  hour: Scalars['BigInt'];
  product: SpotProduct;
};

export type SpotProductHourlySnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  hour?: InputMaybe<Scalars['BigInt']>;
  hour_not?: InputMaybe<Scalars['BigInt']>;
  hour_gt?: InputMaybe<Scalars['BigInt']>;
  hour_lt?: InputMaybe<Scalars['BigInt']>;
  hour_gte?: InputMaybe<Scalars['BigInt']>;
  hour_lte?: InputMaybe<Scalars['BigInt']>;
  hour_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hour_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SpotProductHourlySnapshot_orderBy =
  | 'id'
  | 'hour'
  | 'product';

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
  cumulativeDepositsMultiplierX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeBorrowsMultiplierX18?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeBorrowsMultiplierX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  snapshots_?: InputMaybe<SpotProductHourlySnapshot_filter>;
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
  | 'snapshots';

export type Subaccount = {
  id: Scalars['ID'];
  clearinghouse: Clearinghouse;
  subaccountId: Scalars['BigInt'];
  owner: Scalars['Bytes'];
  name: Scalars['String'];
  createdAt: Scalars['BigInt'];
  createdAtBlock: Scalars['BigInt'];
  orders: Array<Order>;
  balanceSummaries: Array<BalanceSummary>;
};


export type SubaccountordersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_filter>;
};


export type SubaccountbalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BalanceSummary_filter>;
};

export type Subaccount_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  clearinghouse?: InputMaybe<Scalars['String']>;
  clearinghouse_not?: InputMaybe<Scalars['String']>;
  clearinghouse_gt?: InputMaybe<Scalars['String']>;
  clearinghouse_lt?: InputMaybe<Scalars['String']>;
  clearinghouse_gte?: InputMaybe<Scalars['String']>;
  clearinghouse_lte?: InputMaybe<Scalars['String']>;
  clearinghouse_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouse_not_in?: InputMaybe<Array<Scalars['String']>>;
  clearinghouse_contains?: InputMaybe<Scalars['String']>;
  clearinghouse_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_contains?: InputMaybe<Scalars['String']>;
  clearinghouse_not_contains_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouse_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_starts_with?: InputMaybe<Scalars['String']>;
  clearinghouse_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouse_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_not_ends_with?: InputMaybe<Scalars['String']>;
  clearinghouse_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  clearinghouse_?: InputMaybe<Clearinghouse_filter>;
  subaccountId?: InputMaybe<Scalars['BigInt']>;
  subaccountId_not?: InputMaybe<Scalars['BigInt']>;
  subaccountId_gt?: InputMaybe<Scalars['BigInt']>;
  subaccountId_lt?: InputMaybe<Scalars['BigInt']>;
  subaccountId_gte?: InputMaybe<Scalars['BigInt']>;
  subaccountId_lte?: InputMaybe<Scalars['BigInt']>;
  subaccountId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  subaccountId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
  orders_?: InputMaybe<Order_filter>;
  balanceSummaries_?: InputMaybe<BalanceSummary_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Subaccount_orderBy =
  | 'id'
  | 'clearinghouse'
  | 'subaccountId'
  | 'owner'
  | 'name'
  | 'createdAt'
  | 'createdAtBlock'
  | 'orders'
  | 'balanceSummaries';

export type Subscription = {
  clearinghouse?: Maybe<Clearinghouse>;
  clearinghouses: Array<Clearinghouse>;
  spotEngine?: Maybe<SpotEngine>;
  spotEngines: Array<SpotEngine>;
  perpEngine?: Maybe<PerpEngine>;
  perpEngines: Array<PerpEngine>;
  spotProduct?: Maybe<SpotProduct>;
  spotProducts: Array<SpotProduct>;
  spotProductHourlySnapshot?: Maybe<SpotProductHourlySnapshot>;
  spotProductHourlySnapshots: Array<SpotProductHourlySnapshot>;
  perpProduct?: Maybe<PerpProduct>;
  perpProducts: Array<PerpProduct>;
  perpProductHourlySnapshot?: Maybe<PerpProductHourlySnapshot>;
  perpProductHourlySnapshots: Array<PerpProductHourlySnapshot>;
  market?: Maybe<Market>;
  markets: Array<Market>;
  marketHourlySnapshot?: Maybe<MarketHourlySnapshot>;
  marketHourlySnapshots: Array<MarketHourlySnapshot>;
  candlestick?: Maybe<Candlestick>;
  candlesticks: Array<Candlestick>;
  orderbookPriceLevel?: Maybe<OrderbookPriceLevel>;
  orderbookPriceLevels: Array<OrderbookPriceLevel>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  subaccount?: Maybe<Subaccount>;
  subaccounts: Array<Subaccount>;
  balanceSummary?: Maybe<BalanceSummary>;
  balanceSummaries: Array<BalanceSummary>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionclearinghouseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclearinghousesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Clearinghouse_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Clearinghouse_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
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


export type SubscriptionspotProductHourlySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionspotProductHourlySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpotProductHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SpotProductHourlySnapshot_filter>;
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


export type SubscriptionperpProductHourlySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionperpProductHourlySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PerpProductHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PerpProductHourlySnapshot_filter>;
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


export type SubscriptionmarketHourlySnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketHourlySnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketHourlySnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketHourlySnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncandlestickArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncandlesticksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Candlestick_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Candlestick_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionorderbookPriceLevelArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionorderbookPriceLevelsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderbookPriceLevel_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OrderbookPriceLevel_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionorderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionordersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Subaccount_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Subaccount_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbalanceSummaryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BalanceSummary_filter>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BalanceSummary: ResolverTypeWrapper<BalanceSummary>;
  BalanceSummary_filter: BalanceSummary_filter;
  BalanceSummary_orderBy: BalanceSummary_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Candlestick: ResolverTypeWrapper<Candlestick>;
  Candlestick_filter: Candlestick_filter;
  Candlestick_orderBy: Candlestick_orderBy;
  Clearinghouse: ResolverTypeWrapper<Clearinghouse>;
  Clearinghouse_filter: Clearinghouse_filter;
  Clearinghouse_orderBy: Clearinghouse_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Market: ResolverTypeWrapper<Market>;
  MarketHourlySnapshot: ResolverTypeWrapper<MarketHourlySnapshot>;
  MarketHourlySnapshot_filter: MarketHourlySnapshot_filter;
  MarketHourlySnapshot_orderBy: MarketHourlySnapshot_orderBy;
  Market_filter: Market_filter;
  Market_orderBy: Market_orderBy;
  Order: ResolverTypeWrapper<Order>;
  OrderDirection: OrderDirection;
  OrderStatus: OrderStatus;
  Order_filter: Order_filter;
  Order_orderBy: Order_orderBy;
  OrderbookPriceLevel: ResolverTypeWrapper<OrderbookPriceLevel>;
  OrderbookPriceLevel_filter: OrderbookPriceLevel_filter;
  OrderbookPriceLevel_orderBy: OrderbookPriceLevel_orderBy;
  PerpEngine: ResolverTypeWrapper<PerpEngine>;
  PerpEngine_filter: PerpEngine_filter;
  PerpEngine_orderBy: PerpEngine_orderBy;
  PerpProduct: ResolverTypeWrapper<PerpProduct>;
  PerpProductHourlySnapshot: ResolverTypeWrapper<PerpProductHourlySnapshot>;
  PerpProductHourlySnapshot_filter: PerpProductHourlySnapshot_filter;
  PerpProductHourlySnapshot_orderBy: PerpProductHourlySnapshot_orderBy;
  PerpProduct_filter: PerpProduct_filter;
  PerpProduct_orderBy: PerpProduct_orderBy;
  Query: ResolverTypeWrapper<{}>;
  SpotEngine: ResolverTypeWrapper<SpotEngine>;
  SpotEngine_filter: SpotEngine_filter;
  SpotEngine_orderBy: SpotEngine_orderBy;
  SpotProduct: ResolverTypeWrapper<SpotProduct>;
  SpotProductHourlySnapshot: ResolverTypeWrapper<SpotProductHourlySnapshot>;
  SpotProductHourlySnapshot_filter: SpotProductHourlySnapshot_filter;
  SpotProductHourlySnapshot_orderBy: SpotProductHourlySnapshot_orderBy;
  SpotProduct_filter: SpotProduct_filter;
  SpotProduct_orderBy: SpotProduct_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subaccount: ResolverTypeWrapper<Subaccount>;
  Subaccount_filter: Subaccount_filter;
  Subaccount_orderBy: Subaccount_orderBy;
  Subscription: ResolverTypeWrapper<{}>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BalanceSummary: BalanceSummary;
  BalanceSummary_filter: BalanceSummary_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Candlestick: Candlestick;
  Candlestick_filter: Candlestick_filter;
  Clearinghouse: Clearinghouse;
  Clearinghouse_filter: Clearinghouse_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Market: Market;
  MarketHourlySnapshot: MarketHourlySnapshot;
  MarketHourlySnapshot_filter: MarketHourlySnapshot_filter;
  Market_filter: Market_filter;
  Order: Order;
  Order_filter: Order_filter;
  OrderbookPriceLevel: OrderbookPriceLevel;
  OrderbookPriceLevel_filter: OrderbookPriceLevel_filter;
  PerpEngine: PerpEngine;
  PerpEngine_filter: PerpEngine_filter;
  PerpProduct: PerpProduct;
  PerpProductHourlySnapshot: PerpProductHourlySnapshot;
  PerpProductHourlySnapshot_filter: PerpProductHourlySnapshot_filter;
  PerpProduct_filter: PerpProduct_filter;
  Query: {};
  SpotEngine: SpotEngine;
  SpotEngine_filter: SpotEngine_filter;
  SpotProduct: SpotProduct;
  SpotProductHourlySnapshot: SpotProductHourlySnapshot;
  SpotProductHourlySnapshot_filter: SpotProductHourlySnapshot_filter;
  SpotProduct_filter: SpotProduct_filter;
  String: Scalars['String'];
  Subaccount: Subaccount;
  Subaccount_filter: Subaccount_filter;
  Subscription: {};
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = {};

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext & { endpoint: string }, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext & { endpoint: string }, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext & { endpoint: string }, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BalanceSummaryResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['BalanceSummary'] = ResolversParentTypes['BalanceSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  totalEntryQuoteAmount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalEntryAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalCloseQuoteAmount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalCloseAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CandlestickResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Candlestick'] = ResolversParentTypes['Candlestick']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  close?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  low?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  high?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeBase?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeQuote?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClearinghouseResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Clearinghouse'] = ResolversParentTypes['Clearinghouse']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quoteProduct?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  spotEngine?: Resolver<ResolversTypes['SpotEngine'], ParentType, ContextType>;
  perpEngine?: Resolver<ResolversTypes['PerpEngine'], ParentType, ContextType>;
  numSubaccounts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numProducts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  insuranceBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccounts?: Resolver<Array<ResolversTypes['Subaccount']>, ParentType, ContextType, RequireFields<ClearinghousesubaccountsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Market'] = ResolversParentTypes['Market']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Clearinghouse'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  orderbook?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sizeIncrementX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  priceIncrementX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  askX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidAskAvgX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeBase?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeQuote?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeNumOrders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  candlesticks?: Resolver<Array<ResolversTypes['Candlestick']>, ParentType, ContextType, RequireFields<MarketcandlesticksArgs, 'skip' | 'first'>>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MarketordersArgs, 'skip' | 'first'>>;
  priceLevels?: Resolver<Array<ResolversTypes['OrderbookPriceLevel']>, ParentType, ContextType, RequireFields<MarketpriceLevelsArgs, 'skip' | 'first'>>;
  snapshots?: Resolver<Array<ResolversTypes['MarketHourlySnapshot']>, ParentType, ContextType, RequireFields<MarketsnapshotsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketHourlySnapshotResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['MarketHourlySnapshot'] = ResolversParentTypes['MarketHourlySnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hour?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  volumeQuote?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  queuePos?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  expiration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  initialAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  filledAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collectedFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderbookPriceLevelResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['OrderbookPriceLevel'] = ResolversParentTypes['OrderbookPriceLevel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  cumulativeSize?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpEngineResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['PerpEngine'] = ResolversParentTypes['PerpEngine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Clearinghouse'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['PerpProduct']>, ParentType, ContextType, RequireFields<PerpEngineproductsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpProductResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['PerpProduct'] = ResolversParentTypes['PerpProduct']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  engine?: Resolver<ResolversTypes['PerpEngine'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ammPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingLongX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingShortX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openInterestX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<Array<ResolversTypes['PerpProductHourlySnapshot']>, ParentType, ContextType, RequireFields<PerpProductsnapshotsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpProductHourlySnapshotResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['PerpProductHourlySnapshot'] = ResolversParentTypes['PerpProductHourlySnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hour?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['PerpProduct'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  clearinghouse?: Resolver<Maybe<ResolversTypes['Clearinghouse']>, ParentType, ContextType, RequireFields<QueryclearinghouseArgs, 'id' | 'subgraphError'>>;
  clearinghouses?: Resolver<Array<ResolversTypes['Clearinghouse']>, ParentType, ContextType, RequireFields<QueryclearinghousesArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotEngine?: Resolver<Maybe<ResolversTypes['SpotEngine']>, ParentType, ContextType, RequireFields<QueryspotEngineArgs, 'id' | 'subgraphError'>>;
  spotEngines?: Resolver<Array<ResolversTypes['SpotEngine']>, ParentType, ContextType, RequireFields<QueryspotEnginesArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpEngine?: Resolver<Maybe<ResolversTypes['PerpEngine']>, ParentType, ContextType, RequireFields<QueryperpEngineArgs, 'id' | 'subgraphError'>>;
  perpEngines?: Resolver<Array<ResolversTypes['PerpEngine']>, ParentType, ContextType, RequireFields<QueryperpEnginesArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotProduct?: Resolver<Maybe<ResolversTypes['SpotProduct']>, ParentType, ContextType, RequireFields<QueryspotProductArgs, 'id' | 'subgraphError'>>;
  spotProducts?: Resolver<Array<ResolversTypes['SpotProduct']>, ParentType, ContextType, RequireFields<QueryspotProductsArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotProductHourlySnapshot?: Resolver<Maybe<ResolversTypes['SpotProductHourlySnapshot']>, ParentType, ContextType, RequireFields<QueryspotProductHourlySnapshotArgs, 'id' | 'subgraphError'>>;
  spotProductHourlySnapshots?: Resolver<Array<ResolversTypes['SpotProductHourlySnapshot']>, ParentType, ContextType, RequireFields<QueryspotProductHourlySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpProduct?: Resolver<Maybe<ResolversTypes['PerpProduct']>, ParentType, ContextType, RequireFields<QueryperpProductArgs, 'id' | 'subgraphError'>>;
  perpProducts?: Resolver<Array<ResolversTypes['PerpProduct']>, ParentType, ContextType, RequireFields<QueryperpProductsArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpProductHourlySnapshot?: Resolver<Maybe<ResolversTypes['PerpProductHourlySnapshot']>, ParentType, ContextType, RequireFields<QueryperpProductHourlySnapshotArgs, 'id' | 'subgraphError'>>;
  perpProductHourlySnapshots?: Resolver<Array<ResolversTypes['PerpProductHourlySnapshot']>, ParentType, ContextType, RequireFields<QueryperpProductHourlySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  market?: Resolver<Maybe<ResolversTypes['Market']>, ParentType, ContextType, RequireFields<QuerymarketArgs, 'id' | 'subgraphError'>>;
  markets?: Resolver<Array<ResolversTypes['Market']>, ParentType, ContextType, RequireFields<QuerymarketsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketHourlySnapshot?: Resolver<Maybe<ResolversTypes['MarketHourlySnapshot']>, ParentType, ContextType, RequireFields<QuerymarketHourlySnapshotArgs, 'id' | 'subgraphError'>>;
  marketHourlySnapshots?: Resolver<Array<ResolversTypes['MarketHourlySnapshot']>, ParentType, ContextType, RequireFields<QuerymarketHourlySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  candlestick?: Resolver<Maybe<ResolversTypes['Candlestick']>, ParentType, ContextType, RequireFields<QuerycandlestickArgs, 'id' | 'subgraphError'>>;
  candlesticks?: Resolver<Array<ResolversTypes['Candlestick']>, ParentType, ContextType, RequireFields<QuerycandlesticksArgs, 'skip' | 'first' | 'subgraphError'>>;
  orderbookPriceLevel?: Resolver<Maybe<ResolversTypes['OrderbookPriceLevel']>, ParentType, ContextType, RequireFields<QueryorderbookPriceLevelArgs, 'id' | 'subgraphError'>>;
  orderbookPriceLevels?: Resolver<Array<ResolversTypes['OrderbookPriceLevel']>, ParentType, ContextType, RequireFields<QueryorderbookPriceLevelsArgs, 'skip' | 'first' | 'subgraphError'>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryorderArgs, 'id' | 'subgraphError'>>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryordersArgs, 'skip' | 'first' | 'subgraphError'>>;
  subaccount?: Resolver<Maybe<ResolversTypes['Subaccount']>, ParentType, ContextType, RequireFields<QuerysubaccountArgs, 'id' | 'subgraphError'>>;
  subaccounts?: Resolver<Array<ResolversTypes['Subaccount']>, ParentType, ContextType, RequireFields<QuerysubaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  balanceSummary?: Resolver<Maybe<ResolversTypes['BalanceSummary']>, ParentType, ContextType, RequireFields<QuerybalanceSummaryArgs, 'id' | 'subgraphError'>>;
  balanceSummaries?: Resolver<Array<ResolversTypes['BalanceSummary']>, ParentType, ContextType, RequireFields<QuerybalanceSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SpotEngineResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['SpotEngine'] = ResolversParentTypes['SpotEngine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Clearinghouse'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['SpotProduct']>, ParentType, ContextType, RequireFields<SpotEngineproductsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotProductResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['SpotProduct'] = ResolversParentTypes['SpotProduct']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  engine?: Resolver<ResolversTypes['SpotEngine'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeDepositsMultiplierX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeBorrowsMultiplierX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDepositsNormalizedX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalBorrowsNormalizedX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<Array<ResolversTypes['SpotProductHourlySnapshot']>, ParentType, ContextType, RequireFields<SpotProductsnapshotsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotProductHourlySnapshotResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['SpotProductHourlySnapshot'] = ResolversParentTypes['SpotProductHourlySnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hour?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['SpotProduct'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubaccountResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Subaccount'] = ResolversParentTypes['Subaccount']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Clearinghouse'], ParentType, ContextType>;
  subaccountId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<SubaccountordersArgs, 'skip' | 'first'>>;
  balanceSummaries?: Resolver<Array<ResolversTypes['BalanceSummary']>, ParentType, ContextType, RequireFields<SubaccountbalanceSummariesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  clearinghouse?: SubscriptionResolver<Maybe<ResolversTypes['Clearinghouse']>, "clearinghouse", ParentType, ContextType, RequireFields<SubscriptionclearinghouseArgs, 'id' | 'subgraphError'>>;
  clearinghouses?: SubscriptionResolver<Array<ResolversTypes['Clearinghouse']>, "clearinghouses", ParentType, ContextType, RequireFields<SubscriptionclearinghousesArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotEngine?: SubscriptionResolver<Maybe<ResolversTypes['SpotEngine']>, "spotEngine", ParentType, ContextType, RequireFields<SubscriptionspotEngineArgs, 'id' | 'subgraphError'>>;
  spotEngines?: SubscriptionResolver<Array<ResolversTypes['SpotEngine']>, "spotEngines", ParentType, ContextType, RequireFields<SubscriptionspotEnginesArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpEngine?: SubscriptionResolver<Maybe<ResolversTypes['PerpEngine']>, "perpEngine", ParentType, ContextType, RequireFields<SubscriptionperpEngineArgs, 'id' | 'subgraphError'>>;
  perpEngines?: SubscriptionResolver<Array<ResolversTypes['PerpEngine']>, "perpEngines", ParentType, ContextType, RequireFields<SubscriptionperpEnginesArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotProduct?: SubscriptionResolver<Maybe<ResolversTypes['SpotProduct']>, "spotProduct", ParentType, ContextType, RequireFields<SubscriptionspotProductArgs, 'id' | 'subgraphError'>>;
  spotProducts?: SubscriptionResolver<Array<ResolversTypes['SpotProduct']>, "spotProducts", ParentType, ContextType, RequireFields<SubscriptionspotProductsArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotProductHourlySnapshot?: SubscriptionResolver<Maybe<ResolversTypes['SpotProductHourlySnapshot']>, "spotProductHourlySnapshot", ParentType, ContextType, RequireFields<SubscriptionspotProductHourlySnapshotArgs, 'id' | 'subgraphError'>>;
  spotProductHourlySnapshots?: SubscriptionResolver<Array<ResolversTypes['SpotProductHourlySnapshot']>, "spotProductHourlySnapshots", ParentType, ContextType, RequireFields<SubscriptionspotProductHourlySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpProduct?: SubscriptionResolver<Maybe<ResolversTypes['PerpProduct']>, "perpProduct", ParentType, ContextType, RequireFields<SubscriptionperpProductArgs, 'id' | 'subgraphError'>>;
  perpProducts?: SubscriptionResolver<Array<ResolversTypes['PerpProduct']>, "perpProducts", ParentType, ContextType, RequireFields<SubscriptionperpProductsArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpProductHourlySnapshot?: SubscriptionResolver<Maybe<ResolversTypes['PerpProductHourlySnapshot']>, "perpProductHourlySnapshot", ParentType, ContextType, RequireFields<SubscriptionperpProductHourlySnapshotArgs, 'id' | 'subgraphError'>>;
  perpProductHourlySnapshots?: SubscriptionResolver<Array<ResolversTypes['PerpProductHourlySnapshot']>, "perpProductHourlySnapshots", ParentType, ContextType, RequireFields<SubscriptionperpProductHourlySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  market?: SubscriptionResolver<Maybe<ResolversTypes['Market']>, "market", ParentType, ContextType, RequireFields<SubscriptionmarketArgs, 'id' | 'subgraphError'>>;
  markets?: SubscriptionResolver<Array<ResolversTypes['Market']>, "markets", ParentType, ContextType, RequireFields<SubscriptionmarketsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketHourlySnapshot?: SubscriptionResolver<Maybe<ResolversTypes['MarketHourlySnapshot']>, "marketHourlySnapshot", ParentType, ContextType, RequireFields<SubscriptionmarketHourlySnapshotArgs, 'id' | 'subgraphError'>>;
  marketHourlySnapshots?: SubscriptionResolver<Array<ResolversTypes['MarketHourlySnapshot']>, "marketHourlySnapshots", ParentType, ContextType, RequireFields<SubscriptionmarketHourlySnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  candlestick?: SubscriptionResolver<Maybe<ResolversTypes['Candlestick']>, "candlestick", ParentType, ContextType, RequireFields<SubscriptioncandlestickArgs, 'id' | 'subgraphError'>>;
  candlesticks?: SubscriptionResolver<Array<ResolversTypes['Candlestick']>, "candlesticks", ParentType, ContextType, RequireFields<SubscriptioncandlesticksArgs, 'skip' | 'first' | 'subgraphError'>>;
  orderbookPriceLevel?: SubscriptionResolver<Maybe<ResolversTypes['OrderbookPriceLevel']>, "orderbookPriceLevel", ParentType, ContextType, RequireFields<SubscriptionorderbookPriceLevelArgs, 'id' | 'subgraphError'>>;
  orderbookPriceLevels?: SubscriptionResolver<Array<ResolversTypes['OrderbookPriceLevel']>, "orderbookPriceLevels", ParentType, ContextType, RequireFields<SubscriptionorderbookPriceLevelsArgs, 'skip' | 'first' | 'subgraphError'>>;
  order?: SubscriptionResolver<Maybe<ResolversTypes['Order']>, "order", ParentType, ContextType, RequireFields<SubscriptionorderArgs, 'id' | 'subgraphError'>>;
  orders?: SubscriptionResolver<Array<ResolversTypes['Order']>, "orders", ParentType, ContextType, RequireFields<SubscriptionordersArgs, 'skip' | 'first' | 'subgraphError'>>;
  subaccount?: SubscriptionResolver<Maybe<ResolversTypes['Subaccount']>, "subaccount", ParentType, ContextType, RequireFields<SubscriptionsubaccountArgs, 'id' | 'subgraphError'>>;
  subaccounts?: SubscriptionResolver<Array<ResolversTypes['Subaccount']>, "subaccounts", ParentType, ContextType, RequireFields<SubscriptionsubaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  balanceSummary?: SubscriptionResolver<Maybe<ResolversTypes['BalanceSummary']>, "balanceSummary", ParentType, ContextType, RequireFields<SubscriptionbalanceSummaryArgs, 'id' | 'subgraphError'>>;
  balanceSummaries?: SubscriptionResolver<Array<ResolversTypes['BalanceSummary']>, "balanceSummaries", ParentType, ContextType, RequireFields<SubscriptionbalanceSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type _Block_Resolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext & { endpoint: string }> = ResolversObject<{
  BalanceSummary?: BalanceSummaryResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Candlestick?: CandlestickResolvers<ContextType>;
  Clearinghouse?: ClearinghouseResolvers<ContextType>;
  Market?: MarketResolvers<ContextType>;
  MarketHourlySnapshot?: MarketHourlySnapshotResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderbookPriceLevel?: OrderbookPriceLevelResolvers<ContextType>;
  PerpEngine?: PerpEngineResolvers<ContextType>;
  PerpProduct?: PerpProductResolvers<ContextType>;
  PerpProductHourlySnapshot?: PerpProductHourlySnapshotResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SpotEngine?: SpotEngineResolvers<ContextType>;
  SpotProduct?: SpotProductResolvers<ContextType>;
  SpotProductHourlySnapshot?: SpotProductHourlySnapshotResolvers<ContextType>;
  Subaccount?: SubaccountResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext & { endpoint: string }> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;


export namespace ClearinghouseTypes {
  export type Maybe<T> = T | null;
  export type InputMaybe<T> = Maybe<T>;
  export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
  export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
  export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

  export type BalanceSummary = {
    id: Scalars['ID'];
    productId: Scalars['BigInt'];
    subaccount: Subaccount;
    totalEntryQuoteAmount: Scalars['BigDecimal'];
    totalEntryAmount: Scalars['BigInt'];
    totalCloseQuoteAmount: Scalars['BigDecimal'];
    totalCloseAmount: Scalars['BigInt'];
  };

  export type BalanceSummary_filter = {
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
    subaccount?: InputMaybe<Scalars['String']>;
    subaccount_not?: InputMaybe<Scalars['String']>;
    subaccount_gt?: InputMaybe<Scalars['String']>;
    subaccount_lt?: InputMaybe<Scalars['String']>;
    subaccount_gte?: InputMaybe<Scalars['String']>;
    subaccount_lte?: InputMaybe<Scalars['String']>;
    subaccount_in?: InputMaybe<Array<Scalars['String']>>;
    subaccount_not_in?: InputMaybe<Array<Scalars['String']>>;
    subaccount_contains?: InputMaybe<Scalars['String']>;
    subaccount_contains_nocase?: InputMaybe<Scalars['String']>;
    subaccount_not_contains?: InputMaybe<Scalars['String']>;
    subaccount_not_contains_nocase?: InputMaybe<Scalars['String']>;
    subaccount_starts_with?: InputMaybe<Scalars['String']>;
    subaccount_starts_with_nocase?: InputMaybe<Scalars['String']>;
    subaccount_not_starts_with?: InputMaybe<Scalars['String']>;
    subaccount_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    subaccount_ends_with?: InputMaybe<Scalars['String']>;
    subaccount_ends_with_nocase?: InputMaybe<Scalars['String']>;
    subaccount_not_ends_with?: InputMaybe<Scalars['String']>;
    subaccount_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    subaccount_?: InputMaybe<Subaccount_filter>;
    totalEntryQuoteAmount?: InputMaybe<Scalars['BigDecimal']>;
    totalEntryQuoteAmount_not?: InputMaybe<Scalars['BigDecimal']>;
    totalEntryQuoteAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalEntryQuoteAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalEntryQuoteAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalEntryQuoteAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalEntryQuoteAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalEntryQuoteAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalEntryAmount?: InputMaybe<Scalars['BigInt']>;
    totalEntryAmount_not?: InputMaybe<Scalars['BigInt']>;
    totalEntryAmount_gt?: InputMaybe<Scalars['BigInt']>;
    totalEntryAmount_lt?: InputMaybe<Scalars['BigInt']>;
    totalEntryAmount_gte?: InputMaybe<Scalars['BigInt']>;
    totalEntryAmount_lte?: InputMaybe<Scalars['BigInt']>;
    totalEntryAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalEntryAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalCloseQuoteAmount?: InputMaybe<Scalars['BigDecimal']>;
    totalCloseQuoteAmount_not?: InputMaybe<Scalars['BigDecimal']>;
    totalCloseQuoteAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalCloseQuoteAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalCloseQuoteAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalCloseQuoteAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalCloseQuoteAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalCloseQuoteAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalCloseAmount?: InputMaybe<Scalars['BigInt']>;
    totalCloseAmount_not?: InputMaybe<Scalars['BigInt']>;
    totalCloseAmount_gt?: InputMaybe<Scalars['BigInt']>;
    totalCloseAmount_lt?: InputMaybe<Scalars['BigInt']>;
    totalCloseAmount_gte?: InputMaybe<Scalars['BigInt']>;
    totalCloseAmount_lte?: InputMaybe<Scalars['BigInt']>;
    totalCloseAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalCloseAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type BalanceSummary_orderBy =
    | 'id'
    | 'productId'
    | 'subaccount'
    | 'totalEntryQuoteAmount'
    | 'totalEntryAmount'
    | 'totalCloseQuoteAmount'
    | 'totalCloseAmount';

  export type BlockChangedFilter = {
    number_gte: Scalars['Int'];
  };

  export type Block_height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
  };

  export type Candlestick = {
    id: Scalars['ID'];
    market: Market;
    time: Scalars['BigInt'];
    period: Scalars['Int'];
    open: Scalars['BigDecimal'];
    close: Scalars['BigDecimal'];
    low: Scalars['BigDecimal'];
    high: Scalars['BigDecimal'];
    volumeBase: Scalars['BigInt'];
    volumeQuote: Scalars['BigDecimal'];
  };

  export type Candlestick_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
    time?: InputMaybe<Scalars['BigInt']>;
    time_not?: InputMaybe<Scalars['BigInt']>;
    time_gt?: InputMaybe<Scalars['BigInt']>;
    time_lt?: InputMaybe<Scalars['BigInt']>;
    time_gte?: InputMaybe<Scalars['BigInt']>;
    time_lte?: InputMaybe<Scalars['BigInt']>;
    time_in?: InputMaybe<Array<Scalars['BigInt']>>;
    time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    period?: InputMaybe<Scalars['Int']>;
    period_not?: InputMaybe<Scalars['Int']>;
    period_gt?: InputMaybe<Scalars['Int']>;
    period_lt?: InputMaybe<Scalars['Int']>;
    period_gte?: InputMaybe<Scalars['Int']>;
    period_lte?: InputMaybe<Scalars['Int']>;
    period_in?: InputMaybe<Array<Scalars['Int']>>;
    period_not_in?: InputMaybe<Array<Scalars['Int']>>;
    open?: InputMaybe<Scalars['BigDecimal']>;
    open_not?: InputMaybe<Scalars['BigDecimal']>;
    open_gt?: InputMaybe<Scalars['BigDecimal']>;
    open_lt?: InputMaybe<Scalars['BigDecimal']>;
    open_gte?: InputMaybe<Scalars['BigDecimal']>;
    open_lte?: InputMaybe<Scalars['BigDecimal']>;
    open_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    open_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    close?: InputMaybe<Scalars['BigDecimal']>;
    close_not?: InputMaybe<Scalars['BigDecimal']>;
    close_gt?: InputMaybe<Scalars['BigDecimal']>;
    close_lt?: InputMaybe<Scalars['BigDecimal']>;
    close_gte?: InputMaybe<Scalars['BigDecimal']>;
    close_lte?: InputMaybe<Scalars['BigDecimal']>;
    close_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    close_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    low?: InputMaybe<Scalars['BigDecimal']>;
    low_not?: InputMaybe<Scalars['BigDecimal']>;
    low_gt?: InputMaybe<Scalars['BigDecimal']>;
    low_lt?: InputMaybe<Scalars['BigDecimal']>;
    low_gte?: InputMaybe<Scalars['BigDecimal']>;
    low_lte?: InputMaybe<Scalars['BigDecimal']>;
    low_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    low_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    high?: InputMaybe<Scalars['BigDecimal']>;
    high_not?: InputMaybe<Scalars['BigDecimal']>;
    high_gt?: InputMaybe<Scalars['BigDecimal']>;
    high_lt?: InputMaybe<Scalars['BigDecimal']>;
    high_gte?: InputMaybe<Scalars['BigDecimal']>;
    high_lte?: InputMaybe<Scalars['BigDecimal']>;
    high_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    high_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    volumeBase?: InputMaybe<Scalars['BigInt']>;
    volumeBase_not?: InputMaybe<Scalars['BigInt']>;
    volumeBase_gt?: InputMaybe<Scalars['BigInt']>;
    volumeBase_lt?: InputMaybe<Scalars['BigInt']>;
    volumeBase_gte?: InputMaybe<Scalars['BigInt']>;
    volumeBase_lte?: InputMaybe<Scalars['BigInt']>;
    volumeBase_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeBase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeQuote?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_not?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_gt?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_lt?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_gte?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_lte?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    volumeQuote_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Candlestick_orderBy =
    | 'id'
    | 'market'
    | 'time'
    | 'period'
    | 'open'
    | 'close'
    | 'low'
    | 'high'
    | 'volumeBase'
    | 'volumeQuote';

  export type Clearinghouse = {
    id: Scalars['ID'];
    quoteProduct: Scalars['Bytes'];
    spotEngine: SpotEngine;
    perpEngine: PerpEngine;
    numSubaccounts: Scalars['BigInt'];
    numProducts: Scalars['BigInt'];
    insuranceBalance: Scalars['BigInt'];
    subaccounts: Array<Subaccount>;
  };


  export type ClearinghousesubaccountsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Subaccount_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Subaccount_filter>;
  };

  export type Clearinghouse_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    quoteProduct?: InputMaybe<Scalars['Bytes']>;
    quoteProduct_not?: InputMaybe<Scalars['Bytes']>;
    quoteProduct_in?: InputMaybe<Array<Scalars['Bytes']>>;
    quoteProduct_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    quoteProduct_contains?: InputMaybe<Scalars['Bytes']>;
    quoteProduct_not_contains?: InputMaybe<Scalars['Bytes']>;
    spotEngine_?: InputMaybe<SpotEngine_filter>;
    perpEngine_?: InputMaybe<PerpEngine_filter>;
    numSubaccounts?: InputMaybe<Scalars['BigInt']>;
    numSubaccounts_not?: InputMaybe<Scalars['BigInt']>;
    numSubaccounts_gt?: InputMaybe<Scalars['BigInt']>;
    numSubaccounts_lt?: InputMaybe<Scalars['BigInt']>;
    numSubaccounts_gte?: InputMaybe<Scalars['BigInt']>;
    numSubaccounts_lte?: InputMaybe<Scalars['BigInt']>;
    numSubaccounts_in?: InputMaybe<Array<Scalars['BigInt']>>;
    numSubaccounts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    numProducts?: InputMaybe<Scalars['BigInt']>;
    numProducts_not?: InputMaybe<Scalars['BigInt']>;
    numProducts_gt?: InputMaybe<Scalars['BigInt']>;
    numProducts_lt?: InputMaybe<Scalars['BigInt']>;
    numProducts_gte?: InputMaybe<Scalars['BigInt']>;
    numProducts_lte?: InputMaybe<Scalars['BigInt']>;
    numProducts_in?: InputMaybe<Array<Scalars['BigInt']>>;
    numProducts_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    insuranceBalance?: InputMaybe<Scalars['BigInt']>;
    insuranceBalance_not?: InputMaybe<Scalars['BigInt']>;
    insuranceBalance_gt?: InputMaybe<Scalars['BigInt']>;
    insuranceBalance_lt?: InputMaybe<Scalars['BigInt']>;
    insuranceBalance_gte?: InputMaybe<Scalars['BigInt']>;
    insuranceBalance_lte?: InputMaybe<Scalars['BigInt']>;
    insuranceBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
    insuranceBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    subaccounts_?: InputMaybe<Subaccount_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Clearinghouse_orderBy =
    | 'id'
    | 'quoteProduct'
    | 'spotEngine'
    | 'perpEngine'
    | 'numSubaccounts'
    | 'numProducts'
    | 'insuranceBalance'
    | 'subaccounts';

  export type Market = {
    id: Scalars['ID'];
    clearinghouse: Clearinghouse;
    productId: Scalars['BigInt'];
    orderbook: Scalars['Bytes'];
    sizeIncrementX18: Scalars['BigInt'];
    priceIncrementX18: Scalars['BigInt'];
    createdAt: Scalars['BigInt'];
    createdAtBlock: Scalars['BigInt'];
    bidX18: Scalars['BigInt'];
    askX18: Scalars['BigInt'];
    bidAskAvgX18: Scalars['BigInt'];
    volumeBase: Scalars['BigInt'];
    volumeQuote: Scalars['BigDecimal'];
    volumeNumOrders: Scalars['BigInt'];
    candlesticks: Array<Candlestick>;
    orders: Array<Order>;
    priceLevels: Array<OrderbookPriceLevel>;
    snapshots: Array<MarketHourlySnapshot>;
  };


  export type MarketcandlesticksArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Candlestick_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Candlestick_filter>;
  };


  export type MarketordersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Order_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Order_filter>;
  };


  export type MarketpriceLevelsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<OrderbookPriceLevel_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<OrderbookPriceLevel_filter>;
  };


  export type MarketsnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MarketHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MarketHourlySnapshot_filter>;
  };

  export type MarketHourlySnapshot = {
    id: Scalars['ID'];
    hour: Scalars['BigInt'];
    market: Market;
    volumeQuote: Scalars['BigDecimal'];
  };

  export type MarketHourlySnapshot_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    hour?: InputMaybe<Scalars['BigInt']>;
    hour_not?: InputMaybe<Scalars['BigInt']>;
    hour_gt?: InputMaybe<Scalars['BigInt']>;
    hour_lt?: InputMaybe<Scalars['BigInt']>;
    hour_gte?: InputMaybe<Scalars['BigInt']>;
    hour_lte?: InputMaybe<Scalars['BigInt']>;
    hour_in?: InputMaybe<Array<Scalars['BigInt']>>;
    hour_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    volumeQuote?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_not?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_gt?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_lt?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_gte?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_lte?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    volumeQuote_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type MarketHourlySnapshot_orderBy =
    | 'id'
    | 'hour'
    | 'market'
    | 'volumeQuote';

  export type Market_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    clearinghouse?: InputMaybe<Scalars['String']>;
    clearinghouse_not?: InputMaybe<Scalars['String']>;
    clearinghouse_gt?: InputMaybe<Scalars['String']>;
    clearinghouse_lt?: InputMaybe<Scalars['String']>;
    clearinghouse_gte?: InputMaybe<Scalars['String']>;
    clearinghouse_lte?: InputMaybe<Scalars['String']>;
    clearinghouse_in?: InputMaybe<Array<Scalars['String']>>;
    clearinghouse_not_in?: InputMaybe<Array<Scalars['String']>>;
    clearinghouse_contains?: InputMaybe<Scalars['String']>;
    clearinghouse_contains_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_contains?: InputMaybe<Scalars['String']>;
    clearinghouse_not_contains_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_starts_with?: InputMaybe<Scalars['String']>;
    clearinghouse_starts_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_starts_with?: InputMaybe<Scalars['String']>;
    clearinghouse_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_ends_with?: InputMaybe<Scalars['String']>;
    clearinghouse_ends_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_ends_with?: InputMaybe<Scalars['String']>;
    clearinghouse_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_?: InputMaybe<Clearinghouse_filter>;
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
    orderbook_in?: InputMaybe<Array<Scalars['Bytes']>>;
    orderbook_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    orderbook_contains?: InputMaybe<Scalars['Bytes']>;
    orderbook_not_contains?: InputMaybe<Scalars['Bytes']>;
    sizeIncrementX18?: InputMaybe<Scalars['BigInt']>;
    sizeIncrementX18_not?: InputMaybe<Scalars['BigInt']>;
    sizeIncrementX18_gt?: InputMaybe<Scalars['BigInt']>;
    sizeIncrementX18_lt?: InputMaybe<Scalars['BigInt']>;
    sizeIncrementX18_gte?: InputMaybe<Scalars['BigInt']>;
    sizeIncrementX18_lte?: InputMaybe<Scalars['BigInt']>;
    sizeIncrementX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    sizeIncrementX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    bidX18?: InputMaybe<Scalars['BigInt']>;
    bidX18_not?: InputMaybe<Scalars['BigInt']>;
    bidX18_gt?: InputMaybe<Scalars['BigInt']>;
    bidX18_lt?: InputMaybe<Scalars['BigInt']>;
    bidX18_gte?: InputMaybe<Scalars['BigInt']>;
    bidX18_lte?: InputMaybe<Scalars['BigInt']>;
    bidX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    bidX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    askX18?: InputMaybe<Scalars['BigInt']>;
    askX18_not?: InputMaybe<Scalars['BigInt']>;
    askX18_gt?: InputMaybe<Scalars['BigInt']>;
    askX18_lt?: InputMaybe<Scalars['BigInt']>;
    askX18_gte?: InputMaybe<Scalars['BigInt']>;
    askX18_lte?: InputMaybe<Scalars['BigInt']>;
    askX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    askX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    bidAskAvgX18?: InputMaybe<Scalars['BigInt']>;
    bidAskAvgX18_not?: InputMaybe<Scalars['BigInt']>;
    bidAskAvgX18_gt?: InputMaybe<Scalars['BigInt']>;
    bidAskAvgX18_lt?: InputMaybe<Scalars['BigInt']>;
    bidAskAvgX18_gte?: InputMaybe<Scalars['BigInt']>;
    bidAskAvgX18_lte?: InputMaybe<Scalars['BigInt']>;
    bidAskAvgX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    bidAskAvgX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeBase?: InputMaybe<Scalars['BigInt']>;
    volumeBase_not?: InputMaybe<Scalars['BigInt']>;
    volumeBase_gt?: InputMaybe<Scalars['BigInt']>;
    volumeBase_lt?: InputMaybe<Scalars['BigInt']>;
    volumeBase_gte?: InputMaybe<Scalars['BigInt']>;
    volumeBase_lte?: InputMaybe<Scalars['BigInt']>;
    volumeBase_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeBase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeQuote?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_not?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_gt?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_lt?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_gte?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_lte?: InputMaybe<Scalars['BigDecimal']>;
    volumeQuote_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    volumeQuote_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    volumeNumOrders?: InputMaybe<Scalars['BigInt']>;
    volumeNumOrders_not?: InputMaybe<Scalars['BigInt']>;
    volumeNumOrders_gt?: InputMaybe<Scalars['BigInt']>;
    volumeNumOrders_lt?: InputMaybe<Scalars['BigInt']>;
    volumeNumOrders_gte?: InputMaybe<Scalars['BigInt']>;
    volumeNumOrders_lte?: InputMaybe<Scalars['BigInt']>;
    volumeNumOrders_in?: InputMaybe<Array<Scalars['BigInt']>>;
    volumeNumOrders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    candlesticks_?: InputMaybe<Candlestick_filter>;
    orders_?: InputMaybe<Order_filter>;
    priceLevels_?: InputMaybe<OrderbookPriceLevel_filter>;
    snapshots_?: InputMaybe<MarketHourlySnapshot_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Market_orderBy =
    | 'id'
    | 'clearinghouse'
    | 'productId'
    | 'orderbook'
    | 'sizeIncrementX18'
    | 'priceIncrementX18'
    | 'createdAt'
    | 'createdAtBlock'
    | 'bidX18'
    | 'askX18'
    | 'bidAskAvgX18'
    | 'volumeBase'
    | 'volumeQuote'
    | 'volumeNumOrders'
    | 'candlesticks'
    | 'orders'
    | 'priceLevels'
    | 'snapshots';

  export type Order = {
    id: Scalars['ID'];
    status: OrderStatus;
    priceX18: Scalars['BigInt'];
    queuePos?: Maybe<Scalars['BigInt']>;
    subaccount: Subaccount;
    market: Market;
    expiration: Scalars['BigInt'];
    createdAt: Scalars['BigInt'];
    createdAtBlock: Scalars['BigInt'];
    initialAmount: Scalars['BigInt'];
    filledAmount: Scalars['BigInt'];
    collectedFee: Scalars['BigInt'];
  };

  /** Defines the order direction, either ascending or descending */
  export type OrderDirection =
    | 'asc'
    | 'desc';

  export type OrderStatus =
    | 'INSTANT_FILL'
    | 'ON_BOOK'
    | 'FILLED'
    | 'CANCELLED';

  export type Order_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    status?: InputMaybe<OrderStatus>;
    status_not?: InputMaybe<OrderStatus>;
    status_in?: InputMaybe<Array<OrderStatus>>;
    status_not_in?: InputMaybe<Array<OrderStatus>>;
    priceX18?: InputMaybe<Scalars['BigInt']>;
    priceX18_not?: InputMaybe<Scalars['BigInt']>;
    priceX18_gt?: InputMaybe<Scalars['BigInt']>;
    priceX18_lt?: InputMaybe<Scalars['BigInt']>;
    priceX18_gte?: InputMaybe<Scalars['BigInt']>;
    priceX18_lte?: InputMaybe<Scalars['BigInt']>;
    priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    queuePos?: InputMaybe<Scalars['BigInt']>;
    queuePos_not?: InputMaybe<Scalars['BigInt']>;
    queuePos_gt?: InputMaybe<Scalars['BigInt']>;
    queuePos_lt?: InputMaybe<Scalars['BigInt']>;
    queuePos_gte?: InputMaybe<Scalars['BigInt']>;
    queuePos_lte?: InputMaybe<Scalars['BigInt']>;
    queuePos_in?: InputMaybe<Array<Scalars['BigInt']>>;
    queuePos_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    subaccount?: InputMaybe<Scalars['String']>;
    subaccount_not?: InputMaybe<Scalars['String']>;
    subaccount_gt?: InputMaybe<Scalars['String']>;
    subaccount_lt?: InputMaybe<Scalars['String']>;
    subaccount_gte?: InputMaybe<Scalars['String']>;
    subaccount_lte?: InputMaybe<Scalars['String']>;
    subaccount_in?: InputMaybe<Array<Scalars['String']>>;
    subaccount_not_in?: InputMaybe<Array<Scalars['String']>>;
    subaccount_contains?: InputMaybe<Scalars['String']>;
    subaccount_contains_nocase?: InputMaybe<Scalars['String']>;
    subaccount_not_contains?: InputMaybe<Scalars['String']>;
    subaccount_not_contains_nocase?: InputMaybe<Scalars['String']>;
    subaccount_starts_with?: InputMaybe<Scalars['String']>;
    subaccount_starts_with_nocase?: InputMaybe<Scalars['String']>;
    subaccount_not_starts_with?: InputMaybe<Scalars['String']>;
    subaccount_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    subaccount_ends_with?: InputMaybe<Scalars['String']>;
    subaccount_ends_with_nocase?: InputMaybe<Scalars['String']>;
    subaccount_not_ends_with?: InputMaybe<Scalars['String']>;
    subaccount_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    subaccount_?: InputMaybe<Subaccount_filter>;
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
    expiration?: InputMaybe<Scalars['BigInt']>;
    expiration_not?: InputMaybe<Scalars['BigInt']>;
    expiration_gt?: InputMaybe<Scalars['BigInt']>;
    expiration_lt?: InputMaybe<Scalars['BigInt']>;
    expiration_gte?: InputMaybe<Scalars['BigInt']>;
    expiration_lte?: InputMaybe<Scalars['BigInt']>;
    expiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
    expiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    initialAmount?: InputMaybe<Scalars['BigInt']>;
    initialAmount_not?: InputMaybe<Scalars['BigInt']>;
    initialAmount_gt?: InputMaybe<Scalars['BigInt']>;
    initialAmount_lt?: InputMaybe<Scalars['BigInt']>;
    initialAmount_gte?: InputMaybe<Scalars['BigInt']>;
    initialAmount_lte?: InputMaybe<Scalars['BigInt']>;
    initialAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    initialAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    filledAmount?: InputMaybe<Scalars['BigInt']>;
    filledAmount_not?: InputMaybe<Scalars['BigInt']>;
    filledAmount_gt?: InputMaybe<Scalars['BigInt']>;
    filledAmount_lt?: InputMaybe<Scalars['BigInt']>;
    filledAmount_gte?: InputMaybe<Scalars['BigInt']>;
    filledAmount_lte?: InputMaybe<Scalars['BigInt']>;
    filledAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    filledAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    collectedFee?: InputMaybe<Scalars['BigInt']>;
    collectedFee_not?: InputMaybe<Scalars['BigInt']>;
    collectedFee_gt?: InputMaybe<Scalars['BigInt']>;
    collectedFee_lt?: InputMaybe<Scalars['BigInt']>;
    collectedFee_gte?: InputMaybe<Scalars['BigInt']>;
    collectedFee_lte?: InputMaybe<Scalars['BigInt']>;
    collectedFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
    collectedFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Order_orderBy =
    | 'id'
    | 'status'
    | 'priceX18'
    | 'queuePos'
    | 'subaccount'
    | 'market'
    | 'expiration'
    | 'createdAt'
    | 'createdAtBlock'
    | 'initialAmount'
    | 'filledAmount'
    | 'collectedFee';

  export type OrderbookPriceLevel = {
    id: Scalars['ID'];
    priceX18: Scalars['BigInt'];
    market: Market;
    cumulativeSize: Scalars['BigInt'];
  };

  export type OrderbookPriceLevel_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    priceX18?: InputMaybe<Scalars['BigInt']>;
    priceX18_not?: InputMaybe<Scalars['BigInt']>;
    priceX18_gt?: InputMaybe<Scalars['BigInt']>;
    priceX18_lt?: InputMaybe<Scalars['BigInt']>;
    priceX18_gte?: InputMaybe<Scalars['BigInt']>;
    priceX18_lte?: InputMaybe<Scalars['BigInt']>;
    priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    cumulativeSize?: InputMaybe<Scalars['BigInt']>;
    cumulativeSize_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeSize_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeSize_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeSize_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeSize_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type OrderbookPriceLevel_orderBy =
    | 'id'
    | 'priceX18'
    | 'market'
    | 'cumulativeSize';

  export type PerpEngine = {
    id: Scalars['ID'];
    clearinghouse: Clearinghouse;
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
    clearinghouse?: InputMaybe<Scalars['String']>;
    clearinghouse_not?: InputMaybe<Scalars['String']>;
    clearinghouse_gt?: InputMaybe<Scalars['String']>;
    clearinghouse_lt?: InputMaybe<Scalars['String']>;
    clearinghouse_gte?: InputMaybe<Scalars['String']>;
    clearinghouse_lte?: InputMaybe<Scalars['String']>;
    clearinghouse_in?: InputMaybe<Array<Scalars['String']>>;
    clearinghouse_not_in?: InputMaybe<Array<Scalars['String']>>;
    clearinghouse_contains?: InputMaybe<Scalars['String']>;
    clearinghouse_contains_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_contains?: InputMaybe<Scalars['String']>;
    clearinghouse_not_contains_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_starts_with?: InputMaybe<Scalars['String']>;
    clearinghouse_starts_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_starts_with?: InputMaybe<Scalars['String']>;
    clearinghouse_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_ends_with?: InputMaybe<Scalars['String']>;
    clearinghouse_ends_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_ends_with?: InputMaybe<Scalars['String']>;
    clearinghouse_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_?: InputMaybe<Clearinghouse_filter>;
    products_?: InputMaybe<PerpProduct_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type PerpEngine_orderBy =
    | 'id'
    | 'clearinghouse'
    | 'products';

  export type PerpProduct = {
    id: Scalars['ID'];
    productId: Scalars['BigInt'];
    market: Market;
    engine: PerpEngine;
    priceX18: Scalars['BigInt'];
    ammPriceX18: Scalars['BigInt'];
    cumulativeFundingLongX18: Scalars['BigInt'];
    cumulativeFundingShortX18: Scalars['BigInt'];
    openInterestX18: Scalars['BigInt'];
    snapshots: Array<PerpProductHourlySnapshot>;
  };


  export type PerpProductsnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProductHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProductHourlySnapshot_filter>;
  };

  export type PerpProductHourlySnapshot = {
    id: Scalars['ID'];
    hour: Scalars['BigInt'];
    product: PerpProduct;
  };

  export type PerpProductHourlySnapshot_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    hour?: InputMaybe<Scalars['BigInt']>;
    hour_not?: InputMaybe<Scalars['BigInt']>;
    hour_gt?: InputMaybe<Scalars['BigInt']>;
    hour_lt?: InputMaybe<Scalars['BigInt']>;
    hour_gte?: InputMaybe<Scalars['BigInt']>;
    hour_lte?: InputMaybe<Scalars['BigInt']>;
    hour_in?: InputMaybe<Array<Scalars['BigInt']>>;
    hour_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type PerpProductHourlySnapshot_orderBy =
    | 'id'
    | 'hour'
    | 'product';

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
    ammPriceX18?: InputMaybe<Scalars['BigInt']>;
    ammPriceX18_not?: InputMaybe<Scalars['BigInt']>;
    ammPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
    ammPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
    ammPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
    ammPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
    ammPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    ammPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    snapshots_?: InputMaybe<PerpProductHourlySnapshot_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type PerpProduct_orderBy =
    | 'id'
    | 'productId'
    | 'market'
    | 'engine'
    | 'priceX18'
    | 'ammPriceX18'
    | 'cumulativeFundingLongX18'
    | 'cumulativeFundingShortX18'
    | 'openInterestX18'
    | 'snapshots';

  export type Query = {
    clearinghouse?: Maybe<Clearinghouse>;
    clearinghouses: Array<Clearinghouse>;
    spotEngine?: Maybe<SpotEngine>;
    spotEngines: Array<SpotEngine>;
    perpEngine?: Maybe<PerpEngine>;
    perpEngines: Array<PerpEngine>;
    spotProduct?: Maybe<SpotProduct>;
    spotProducts: Array<SpotProduct>;
    spotProductHourlySnapshot?: Maybe<SpotProductHourlySnapshot>;
    spotProductHourlySnapshots: Array<SpotProductHourlySnapshot>;
    perpProduct?: Maybe<PerpProduct>;
    perpProducts: Array<PerpProduct>;
    perpProductHourlySnapshot?: Maybe<PerpProductHourlySnapshot>;
    perpProductHourlySnapshots: Array<PerpProductHourlySnapshot>;
    market?: Maybe<Market>;
    markets: Array<Market>;
    marketHourlySnapshot?: Maybe<MarketHourlySnapshot>;
    marketHourlySnapshots: Array<MarketHourlySnapshot>;
    candlestick?: Maybe<Candlestick>;
    candlesticks: Array<Candlestick>;
    orderbookPriceLevel?: Maybe<OrderbookPriceLevel>;
    orderbookPriceLevels: Array<OrderbookPriceLevel>;
    order?: Maybe<Order>;
    orders: Array<Order>;
    subaccount?: Maybe<Subaccount>;
    subaccounts: Array<Subaccount>;
    balanceSummary?: Maybe<BalanceSummary>;
    balanceSummaries: Array<BalanceSummary>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
  };


  export type QueryclearinghouseArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QueryclearinghousesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Clearinghouse_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Clearinghouse_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
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


  export type QueryspotProductHourlySnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QueryspotProductHourlySnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProductHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProductHourlySnapshot_filter>;
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


  export type QueryperpProductHourlySnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QueryperpProductHourlySnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProductHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProductHourlySnapshot_filter>;
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


  export type QuerymarketHourlySnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QuerymarketHourlySnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MarketHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MarketHourlySnapshot_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QuerycandlestickArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QuerycandlesticksArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Candlestick_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Candlestick_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QueryorderbookPriceLevelArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QueryorderbookPriceLevelsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<OrderbookPriceLevel_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<OrderbookPriceLevel_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QueryorderArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QueryordersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Order_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Order_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QuerysubaccountArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QuerysubaccountsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Subaccount_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Subaccount_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QuerybalanceSummaryArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type QuerybalanceSummariesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<BalanceSummary_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<BalanceSummary_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type Query_metaArgs = {
    block?: InputMaybe<Block_height>;
  };

  export type SpotEngine = {
    id: Scalars['ID'];
    clearinghouse: Clearinghouse;
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
    clearinghouse?: InputMaybe<Scalars['String']>;
    clearinghouse_not?: InputMaybe<Scalars['String']>;
    clearinghouse_gt?: InputMaybe<Scalars['String']>;
    clearinghouse_lt?: InputMaybe<Scalars['String']>;
    clearinghouse_gte?: InputMaybe<Scalars['String']>;
    clearinghouse_lte?: InputMaybe<Scalars['String']>;
    clearinghouse_in?: InputMaybe<Array<Scalars['String']>>;
    clearinghouse_not_in?: InputMaybe<Array<Scalars['String']>>;
    clearinghouse_contains?: InputMaybe<Scalars['String']>;
    clearinghouse_contains_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_contains?: InputMaybe<Scalars['String']>;
    clearinghouse_not_contains_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_starts_with?: InputMaybe<Scalars['String']>;
    clearinghouse_starts_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_starts_with?: InputMaybe<Scalars['String']>;
    clearinghouse_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_ends_with?: InputMaybe<Scalars['String']>;
    clearinghouse_ends_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_ends_with?: InputMaybe<Scalars['String']>;
    clearinghouse_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_?: InputMaybe<Clearinghouse_filter>;
    products_?: InputMaybe<SpotProduct_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type SpotEngine_orderBy =
    | 'id'
    | 'clearinghouse'
    | 'products';

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
    snapshots: Array<SpotProductHourlySnapshot>;
  };


  export type SpotProductsnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProductHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProductHourlySnapshot_filter>;
  };

  export type SpotProductHourlySnapshot = {
    id: Scalars['ID'];
    hour: Scalars['BigInt'];
    product: SpotProduct;
  };

  export type SpotProductHourlySnapshot_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    hour?: InputMaybe<Scalars['BigInt']>;
    hour_not?: InputMaybe<Scalars['BigInt']>;
    hour_gt?: InputMaybe<Scalars['BigInt']>;
    hour_lt?: InputMaybe<Scalars['BigInt']>;
    hour_gte?: InputMaybe<Scalars['BigInt']>;
    hour_lte?: InputMaybe<Scalars['BigInt']>;
    hour_in?: InputMaybe<Array<Scalars['BigInt']>>;
    hour_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type SpotProductHourlySnapshot_orderBy =
    | 'id'
    | 'hour'
    | 'product';

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
    cumulativeDepositsMultiplierX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeBorrowsMultiplierX18?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_not?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_gt?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_lt?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_gte?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_lte?: InputMaybe<Scalars['BigInt']>;
    cumulativeBorrowsMultiplierX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cumulativeBorrowsMultiplierX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    snapshots_?: InputMaybe<SpotProductHourlySnapshot_filter>;
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
    | 'snapshots';

  export type Subaccount = {
    id: Scalars['ID'];
    clearinghouse: Clearinghouse;
    subaccountId: Scalars['BigInt'];
    owner: Scalars['Bytes'];
    name: Scalars['String'];
    createdAt: Scalars['BigInt'];
    createdAtBlock: Scalars['BigInt'];
    orders: Array<Order>;
    balanceSummaries: Array<BalanceSummary>;
  };


  export type SubaccountordersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Order_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Order_filter>;
  };


  export type SubaccountbalanceSummariesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<BalanceSummary_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<BalanceSummary_filter>;
  };

  export type Subaccount_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    clearinghouse?: InputMaybe<Scalars['String']>;
    clearinghouse_not?: InputMaybe<Scalars['String']>;
    clearinghouse_gt?: InputMaybe<Scalars['String']>;
    clearinghouse_lt?: InputMaybe<Scalars['String']>;
    clearinghouse_gte?: InputMaybe<Scalars['String']>;
    clearinghouse_lte?: InputMaybe<Scalars['String']>;
    clearinghouse_in?: InputMaybe<Array<Scalars['String']>>;
    clearinghouse_not_in?: InputMaybe<Array<Scalars['String']>>;
    clearinghouse_contains?: InputMaybe<Scalars['String']>;
    clearinghouse_contains_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_contains?: InputMaybe<Scalars['String']>;
    clearinghouse_not_contains_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_starts_with?: InputMaybe<Scalars['String']>;
    clearinghouse_starts_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_starts_with?: InputMaybe<Scalars['String']>;
    clearinghouse_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_ends_with?: InputMaybe<Scalars['String']>;
    clearinghouse_ends_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_not_ends_with?: InputMaybe<Scalars['String']>;
    clearinghouse_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    clearinghouse_?: InputMaybe<Clearinghouse_filter>;
    subaccountId?: InputMaybe<Scalars['BigInt']>;
    subaccountId_not?: InputMaybe<Scalars['BigInt']>;
    subaccountId_gt?: InputMaybe<Scalars['BigInt']>;
    subaccountId_lt?: InputMaybe<Scalars['BigInt']>;
    subaccountId_gte?: InputMaybe<Scalars['BigInt']>;
    subaccountId_lte?: InputMaybe<Scalars['BigInt']>;
    subaccountId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    subaccountId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    owner?: InputMaybe<Scalars['Bytes']>;
    owner_not?: InputMaybe<Scalars['Bytes']>;
    owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_contains?: InputMaybe<Scalars['Bytes']>;
    owner_not_contains?: InputMaybe<Scalars['Bytes']>;
    name?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_contains_nocase?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_contains_nocase?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
    orders_?: InputMaybe<Order_filter>;
    balanceSummaries_?: InputMaybe<BalanceSummary_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
  };

  export type Subaccount_orderBy =
    | 'id'
    | 'clearinghouse'
    | 'subaccountId'
    | 'owner'
    | 'name'
    | 'createdAt'
    | 'createdAtBlock'
    | 'orders'
    | 'balanceSummaries';

  export type Subscription = {
    clearinghouse?: Maybe<Clearinghouse>;
    clearinghouses: Array<Clearinghouse>;
    spotEngine?: Maybe<SpotEngine>;
    spotEngines: Array<SpotEngine>;
    perpEngine?: Maybe<PerpEngine>;
    perpEngines: Array<PerpEngine>;
    spotProduct?: Maybe<SpotProduct>;
    spotProducts: Array<SpotProduct>;
    spotProductHourlySnapshot?: Maybe<SpotProductHourlySnapshot>;
    spotProductHourlySnapshots: Array<SpotProductHourlySnapshot>;
    perpProduct?: Maybe<PerpProduct>;
    perpProducts: Array<PerpProduct>;
    perpProductHourlySnapshot?: Maybe<PerpProductHourlySnapshot>;
    perpProductHourlySnapshots: Array<PerpProductHourlySnapshot>;
    market?: Maybe<Market>;
    markets: Array<Market>;
    marketHourlySnapshot?: Maybe<MarketHourlySnapshot>;
    marketHourlySnapshots: Array<MarketHourlySnapshot>;
    candlestick?: Maybe<Candlestick>;
    candlesticks: Array<Candlestick>;
    orderbookPriceLevel?: Maybe<OrderbookPriceLevel>;
    orderbookPriceLevels: Array<OrderbookPriceLevel>;
    order?: Maybe<Order>;
    orders: Array<Order>;
    subaccount?: Maybe<Subaccount>;
    subaccounts: Array<Subaccount>;
    balanceSummary?: Maybe<BalanceSummary>;
    balanceSummaries: Array<BalanceSummary>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
  };


  export type SubscriptionclearinghouseArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionclearinghousesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Clearinghouse_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Clearinghouse_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
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


  export type SubscriptionspotProductHourlySnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionspotProductHourlySnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SpotProductHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SpotProductHourlySnapshot_filter>;
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


  export type SubscriptionperpProductHourlySnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionperpProductHourlySnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<PerpProductHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PerpProductHourlySnapshot_filter>;
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


  export type SubscriptionmarketHourlySnapshotArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionmarketHourlySnapshotsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MarketHourlySnapshot_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MarketHourlySnapshot_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptioncandlestickArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptioncandlesticksArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Candlestick_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Candlestick_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionorderbookPriceLevelArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionorderbookPriceLevelsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<OrderbookPriceLevel_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<OrderbookPriceLevel_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionorderArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionordersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Order_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Order_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionsubaccountArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionsubaccountsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Subaccount_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Subaccount_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionbalanceSummaryArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };


  export type SubscriptionbalanceSummariesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<BalanceSummary_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<BalanceSummary_filter>;
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

}
export type QueryClearinghouseSdk = {
  /** undefined **/
  clearinghouse: InContextSdkMethod<ClearinghouseTypes.Query['clearinghouse'], ClearinghouseTypes.QueryclearinghouseArgs, MeshContext>,
  /** undefined **/
  clearinghouses: InContextSdkMethod<ClearinghouseTypes.Query['clearinghouses'], ClearinghouseTypes.QueryclearinghousesArgs, MeshContext>,
  /** undefined **/
  spotEngine: InContextSdkMethod<ClearinghouseTypes.Query['spotEngine'], ClearinghouseTypes.QueryspotEngineArgs, MeshContext>,
  /** undefined **/
  spotEngines: InContextSdkMethod<ClearinghouseTypes.Query['spotEngines'], ClearinghouseTypes.QueryspotEnginesArgs, MeshContext>,
  /** undefined **/
  perpEngine: InContextSdkMethod<ClearinghouseTypes.Query['perpEngine'], ClearinghouseTypes.QueryperpEngineArgs, MeshContext>,
  /** undefined **/
  perpEngines: InContextSdkMethod<ClearinghouseTypes.Query['perpEngines'], ClearinghouseTypes.QueryperpEnginesArgs, MeshContext>,
  /** undefined **/
  spotProduct: InContextSdkMethod<ClearinghouseTypes.Query['spotProduct'], ClearinghouseTypes.QueryspotProductArgs, MeshContext>,
  /** undefined **/
  spotProducts: InContextSdkMethod<ClearinghouseTypes.Query['spotProducts'], ClearinghouseTypes.QueryspotProductsArgs, MeshContext>,
  /** undefined **/
  spotProductHourlySnapshot: InContextSdkMethod<ClearinghouseTypes.Query['spotProductHourlySnapshot'], ClearinghouseTypes.QueryspotProductHourlySnapshotArgs, MeshContext>,
  /** undefined **/
  spotProductHourlySnapshots: InContextSdkMethod<ClearinghouseTypes.Query['spotProductHourlySnapshots'], ClearinghouseTypes.QueryspotProductHourlySnapshotsArgs, MeshContext>,
  /** undefined **/
  perpProduct: InContextSdkMethod<ClearinghouseTypes.Query['perpProduct'], ClearinghouseTypes.QueryperpProductArgs, MeshContext>,
  /** undefined **/
  perpProducts: InContextSdkMethod<ClearinghouseTypes.Query['perpProducts'], ClearinghouseTypes.QueryperpProductsArgs, MeshContext>,
  /** undefined **/
  perpProductHourlySnapshot: InContextSdkMethod<ClearinghouseTypes.Query['perpProductHourlySnapshot'], ClearinghouseTypes.QueryperpProductHourlySnapshotArgs, MeshContext>,
  /** undefined **/
  perpProductHourlySnapshots: InContextSdkMethod<ClearinghouseTypes.Query['perpProductHourlySnapshots'], ClearinghouseTypes.QueryperpProductHourlySnapshotsArgs, MeshContext>,
  /** undefined **/
  market: InContextSdkMethod<ClearinghouseTypes.Query['market'], ClearinghouseTypes.QuerymarketArgs, MeshContext>,
  /** undefined **/
  markets: InContextSdkMethod<ClearinghouseTypes.Query['markets'], ClearinghouseTypes.QuerymarketsArgs, MeshContext>,
  /** undefined **/
  marketHourlySnapshot: InContextSdkMethod<ClearinghouseTypes.Query['marketHourlySnapshot'], ClearinghouseTypes.QuerymarketHourlySnapshotArgs, MeshContext>,
  /** undefined **/
  marketHourlySnapshots: InContextSdkMethod<ClearinghouseTypes.Query['marketHourlySnapshots'], ClearinghouseTypes.QuerymarketHourlySnapshotsArgs, MeshContext>,
  /** undefined **/
  candlestick: InContextSdkMethod<ClearinghouseTypes.Query['candlestick'], ClearinghouseTypes.QuerycandlestickArgs, MeshContext>,
  /** undefined **/
  candlesticks: InContextSdkMethod<ClearinghouseTypes.Query['candlesticks'], ClearinghouseTypes.QuerycandlesticksArgs, MeshContext>,
  /** undefined **/
  orderbookPriceLevel: InContextSdkMethod<ClearinghouseTypes.Query['orderbookPriceLevel'], ClearinghouseTypes.QueryorderbookPriceLevelArgs, MeshContext>,
  /** undefined **/
  orderbookPriceLevels: InContextSdkMethod<ClearinghouseTypes.Query['orderbookPriceLevels'], ClearinghouseTypes.QueryorderbookPriceLevelsArgs, MeshContext>,
  /** undefined **/
  order: InContextSdkMethod<ClearinghouseTypes.Query['order'], ClearinghouseTypes.QueryorderArgs, MeshContext>,
  /** undefined **/
  orders: InContextSdkMethod<ClearinghouseTypes.Query['orders'], ClearinghouseTypes.QueryordersArgs, MeshContext>,
  /** undefined **/
  subaccount: InContextSdkMethod<ClearinghouseTypes.Query['subaccount'], ClearinghouseTypes.QuerysubaccountArgs, MeshContext>,
  /** undefined **/
  subaccounts: InContextSdkMethod<ClearinghouseTypes.Query['subaccounts'], ClearinghouseTypes.QuerysubaccountsArgs, MeshContext>,
  /** undefined **/
  balanceSummary: InContextSdkMethod<ClearinghouseTypes.Query['balanceSummary'], ClearinghouseTypes.QuerybalanceSummaryArgs, MeshContext>,
  /** undefined **/
  balanceSummaries: InContextSdkMethod<ClearinghouseTypes.Query['balanceSummaries'], ClearinghouseTypes.QuerybalanceSummariesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<ClearinghouseTypes.Query['_meta'], ClearinghouseTypes.Query_metaArgs, MeshContext>
};

export type MutationClearinghouseSdk = {};

export type SubscriptionClearinghouseSdk = {
  /** undefined **/
  clearinghouse: InContextSdkMethod<ClearinghouseTypes.Subscription['clearinghouse'], ClearinghouseTypes.SubscriptionclearinghouseArgs, MeshContext>,
  /** undefined **/
  clearinghouses: InContextSdkMethod<ClearinghouseTypes.Subscription['clearinghouses'], ClearinghouseTypes.SubscriptionclearinghousesArgs, MeshContext>,
  /** undefined **/
  spotEngine: InContextSdkMethod<ClearinghouseTypes.Subscription['spotEngine'], ClearinghouseTypes.SubscriptionspotEngineArgs, MeshContext>,
  /** undefined **/
  spotEngines: InContextSdkMethod<ClearinghouseTypes.Subscription['spotEngines'], ClearinghouseTypes.SubscriptionspotEnginesArgs, MeshContext>,
  /** undefined **/
  perpEngine: InContextSdkMethod<ClearinghouseTypes.Subscription['perpEngine'], ClearinghouseTypes.SubscriptionperpEngineArgs, MeshContext>,
  /** undefined **/
  perpEngines: InContextSdkMethod<ClearinghouseTypes.Subscription['perpEngines'], ClearinghouseTypes.SubscriptionperpEnginesArgs, MeshContext>,
  /** undefined **/
  spotProduct: InContextSdkMethod<ClearinghouseTypes.Subscription['spotProduct'], ClearinghouseTypes.SubscriptionspotProductArgs, MeshContext>,
  /** undefined **/
  spotProducts: InContextSdkMethod<ClearinghouseTypes.Subscription['spotProducts'], ClearinghouseTypes.SubscriptionspotProductsArgs, MeshContext>,
  /** undefined **/
  spotProductHourlySnapshot: InContextSdkMethod<ClearinghouseTypes.Subscription['spotProductHourlySnapshot'], ClearinghouseTypes.SubscriptionspotProductHourlySnapshotArgs, MeshContext>,
  /** undefined **/
  spotProductHourlySnapshots: InContextSdkMethod<ClearinghouseTypes.Subscription['spotProductHourlySnapshots'], ClearinghouseTypes.SubscriptionspotProductHourlySnapshotsArgs, MeshContext>,
  /** undefined **/
  perpProduct: InContextSdkMethod<ClearinghouseTypes.Subscription['perpProduct'], ClearinghouseTypes.SubscriptionperpProductArgs, MeshContext>,
  /** undefined **/
  perpProducts: InContextSdkMethod<ClearinghouseTypes.Subscription['perpProducts'], ClearinghouseTypes.SubscriptionperpProductsArgs, MeshContext>,
  /** undefined **/
  perpProductHourlySnapshot: InContextSdkMethod<ClearinghouseTypes.Subscription['perpProductHourlySnapshot'], ClearinghouseTypes.SubscriptionperpProductHourlySnapshotArgs, MeshContext>,
  /** undefined **/
  perpProductHourlySnapshots: InContextSdkMethod<ClearinghouseTypes.Subscription['perpProductHourlySnapshots'], ClearinghouseTypes.SubscriptionperpProductHourlySnapshotsArgs, MeshContext>,
  /** undefined **/
  market: InContextSdkMethod<ClearinghouseTypes.Subscription['market'], ClearinghouseTypes.SubscriptionmarketArgs, MeshContext>,
  /** undefined **/
  markets: InContextSdkMethod<ClearinghouseTypes.Subscription['markets'], ClearinghouseTypes.SubscriptionmarketsArgs, MeshContext>,
  /** undefined **/
  marketHourlySnapshot: InContextSdkMethod<ClearinghouseTypes.Subscription['marketHourlySnapshot'], ClearinghouseTypes.SubscriptionmarketHourlySnapshotArgs, MeshContext>,
  /** undefined **/
  marketHourlySnapshots: InContextSdkMethod<ClearinghouseTypes.Subscription['marketHourlySnapshots'], ClearinghouseTypes.SubscriptionmarketHourlySnapshotsArgs, MeshContext>,
  /** undefined **/
  candlestick: InContextSdkMethod<ClearinghouseTypes.Subscription['candlestick'], ClearinghouseTypes.SubscriptioncandlestickArgs, MeshContext>,
  /** undefined **/
  candlesticks: InContextSdkMethod<ClearinghouseTypes.Subscription['candlesticks'], ClearinghouseTypes.SubscriptioncandlesticksArgs, MeshContext>,
  /** undefined **/
  orderbookPriceLevel: InContextSdkMethod<ClearinghouseTypes.Subscription['orderbookPriceLevel'], ClearinghouseTypes.SubscriptionorderbookPriceLevelArgs, MeshContext>,
  /** undefined **/
  orderbookPriceLevels: InContextSdkMethod<ClearinghouseTypes.Subscription['orderbookPriceLevels'], ClearinghouseTypes.SubscriptionorderbookPriceLevelsArgs, MeshContext>,
  /** undefined **/
  order: InContextSdkMethod<ClearinghouseTypes.Subscription['order'], ClearinghouseTypes.SubscriptionorderArgs, MeshContext>,
  /** undefined **/
  orders: InContextSdkMethod<ClearinghouseTypes.Subscription['orders'], ClearinghouseTypes.SubscriptionordersArgs, MeshContext>,
  /** undefined **/
  subaccount: InContextSdkMethod<ClearinghouseTypes.Subscription['subaccount'], ClearinghouseTypes.SubscriptionsubaccountArgs, MeshContext>,
  /** undefined **/
  subaccounts: InContextSdkMethod<ClearinghouseTypes.Subscription['subaccounts'], ClearinghouseTypes.SubscriptionsubaccountsArgs, MeshContext>,
  /** undefined **/
  balanceSummary: InContextSdkMethod<ClearinghouseTypes.Subscription['balanceSummary'], ClearinghouseTypes.SubscriptionbalanceSummaryArgs, MeshContext>,
  /** undefined **/
  balanceSummaries: InContextSdkMethod<ClearinghouseTypes.Subscription['balanceSummaries'], ClearinghouseTypes.SubscriptionbalanceSummariesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<ClearinghouseTypes.Subscription['_meta'], ClearinghouseTypes.Subscription_metaArgs, MeshContext>
};

export type ClearinghouseContext = {
  ["Clearinghouse"]: { Query: QueryClearinghouseSdk, Mutation: MutationClearinghouseSdk, Subscription: SubscriptionClearinghouseSdk },
  ["endpoint"]: Scalars['ID']
};

export type MeshContext = ClearinghouseContext & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn = (moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch (relativeModuleId) {
    case ".graphclient/sources/Clearinghouse/introspectionSchema":
      return import("./sources/Clearinghouse/introspectionSchema");

    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any

export async function getMeshOptions(): Promise<GetMeshOptions> {
  const pubsub = new PubSub();
  const sourcesStore = rootStore.child('sources');
  const logger = new DefaultLogger("GraphClient");
  const cache = new (MeshCache as any)({
    ...({} as any),
    importFn,
    store: rootStore.child('cache'),
    pubsub,
    logger,
  } as any)
  const fetchFn = fetchFactory({cache, fetch, Request, Response});
  const sources = [];
  const transforms = [];
  const additionalEnvelopPlugins = [];
  const clearinghouseTransforms = [];
  const additionalTypeDefs = [] as any[];
  const clearinghouseHandler = new GraphqlHandler({
    name: "Clearinghouse",
    config: {"endpoint": "{context.endpoint:https://api.thegraph.com/subgraphs/name/frankfka/vertex-clearinghouse-sandbox}"},
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child("Clearinghouse"),
    logger: logger.child("Clearinghouse"),
    importFn,
    fetchFn,
  });
  clearinghouseTransforms[0] = new AutoPaginationTransform({
    apiName: "Clearinghouse",
    config: {"validateSchema": true},
    baseDir,
    cache,
    pubsub,
    importFn
  });
  clearinghouseTransforms[1] = new BlockTrackingTransform({
    apiName: "Clearinghouse",
    config: {"validateSchema": true, "ignoreFieldNames": [], "ignoreOperationNames": []},
    baseDir,
    cache,
    pubsub,
    importFn
  });
  sources[0] = {
    name: 'Clearinghouse',
    handler: clearinghouseHandler,
    transforms: clearinghouseTransforms
  }
  const additionalResolvers = [] as any[]
  const merger = new (BareMerger as any)({
    cache,
    pubsub,
    logger: logger.child('bareMerger'),
    store: rootStore.child('bareMerger')
  })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
        {
          document: SubaccountsForAddressDocument,
          get rawSDL() {
            return printWithCache(SubaccountsForAddressDocument);
          },
          location: 'SubaccountsForAddressDocument.graphql'
        }
      ];
    },
  };
}

let meshInstance$: Promise<MeshInstance<MeshContext>>;

export function getBuiltGraphClient(): Promise<MeshInstance<MeshContext>> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh<MeshContext>(meshOptions)).then(mesh => {
      const id$ = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        id$.then(id => mesh.pubsub.unsubscribe(id)).catch(err => console.error(err));
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({execute}) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({subscribe}) => subscribe(...args));

export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({sdkRequesterFactory}) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}

export type SubaccountsForAddressQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type SubaccountsForAddressQuery = { subaccounts: Array<Pick<Subaccount, 'id'>> };


export const SubaccountsForAddressDocument = gql`
  query SubaccountsForAddress($address: String!) {
    subaccounts {
      id
    }
  }
` as unknown as DocumentNode<SubaccountsForAddressQuery, SubaccountsForAddressQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>

export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    SubaccountsForAddress(variables: SubaccountsForAddressQueryVariables, options?: C): Promise<SubaccountsForAddressQuery> {
      return requester<SubaccountsForAddressQuery, SubaccountsForAddressQueryVariables>(SubaccountsForAddressDocument, variables, options);
    }
  };
}

export type Sdk = ReturnType<typeof getSdk>;