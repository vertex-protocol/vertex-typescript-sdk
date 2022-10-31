// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import AutoPaginationTransform from "@graphprotocol/client-auto-pagination";
import BlockTrackingTransform from "@graphprotocol/client-block-tracking";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { ClearinghouseTypes } from './sources/Clearinghouse/types';
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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CancelOrderEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  reason: OrderValidationResult;
  order: Order;
  subaccount: Subaccount;
};

export type CancelOrderEvent_filter = {
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
  reason?: InputMaybe<OrderValidationResult>;
  reason_not?: InputMaybe<OrderValidationResult>;
  reason_in?: InputMaybe<Array<OrderValidationResult>>;
  reason_not_in?: InputMaybe<Array<OrderValidationResult>>;
  order?: InputMaybe<Scalars['String']>;
  order_not?: InputMaybe<Scalars['String']>;
  order_gt?: InputMaybe<Scalars['String']>;
  order_lt?: InputMaybe<Scalars['String']>;
  order_gte?: InputMaybe<Scalars['String']>;
  order_lte?: InputMaybe<Scalars['String']>;
  order_in?: InputMaybe<Array<Scalars['String']>>;
  order_not_in?: InputMaybe<Array<Scalars['String']>>;
  order_contains?: InputMaybe<Scalars['String']>;
  order_contains_nocase?: InputMaybe<Scalars['String']>;
  order_not_contains?: InputMaybe<Scalars['String']>;
  order_not_contains_nocase?: InputMaybe<Scalars['String']>;
  order_starts_with?: InputMaybe<Scalars['String']>;
  order_starts_with_nocase?: InputMaybe<Scalars['String']>;
  order_not_starts_with?: InputMaybe<Scalars['String']>;
  order_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  order_ends_with?: InputMaybe<Scalars['String']>;
  order_ends_with_nocase?: InputMaybe<Scalars['String']>;
  order_not_ends_with?: InputMaybe<Scalars['String']>;
  order_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  order_?: InputMaybe<Order_filter>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type CancelOrderEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'reason'
  | 'order'
  | 'subaccount';

export type Candlestick = {
  id: Scalars['ID'];
  market: Market;
  time: Scalars['BigInt'];
  period: Scalars['Int'];
  openX18: Scalars['BigInt'];
  closeX18: Scalars['BigInt'];
  lowX18: Scalars['BigInt'];
  highX18: Scalars['BigInt'];
  volumeBase: Scalars['BigInt'];
  volumeQuote: Scalars['BigInt'];
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
  openX18?: InputMaybe<Scalars['BigInt']>;
  openX18_not?: InputMaybe<Scalars['BigInt']>;
  openX18_gt?: InputMaybe<Scalars['BigInt']>;
  openX18_lt?: InputMaybe<Scalars['BigInt']>;
  openX18_gte?: InputMaybe<Scalars['BigInt']>;
  openX18_lte?: InputMaybe<Scalars['BigInt']>;
  openX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closeX18?: InputMaybe<Scalars['BigInt']>;
  closeX18_not?: InputMaybe<Scalars['BigInt']>;
  closeX18_gt?: InputMaybe<Scalars['BigInt']>;
  closeX18_lt?: InputMaybe<Scalars['BigInt']>;
  closeX18_gte?: InputMaybe<Scalars['BigInt']>;
  closeX18_lte?: InputMaybe<Scalars['BigInt']>;
  closeX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closeX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lowX18?: InputMaybe<Scalars['BigInt']>;
  lowX18_not?: InputMaybe<Scalars['BigInt']>;
  lowX18_gt?: InputMaybe<Scalars['BigInt']>;
  lowX18_lt?: InputMaybe<Scalars['BigInt']>;
  lowX18_gte?: InputMaybe<Scalars['BigInt']>;
  lowX18_lte?: InputMaybe<Scalars['BigInt']>;
  lowX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lowX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  highX18?: InputMaybe<Scalars['BigInt']>;
  highX18_not?: InputMaybe<Scalars['BigInt']>;
  highX18_gt?: InputMaybe<Scalars['BigInt']>;
  highX18_lt?: InputMaybe<Scalars['BigInt']>;
  highX18_gte?: InputMaybe<Scalars['BigInt']>;
  highX18_lte?: InputMaybe<Scalars['BigInt']>;
  highX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  highX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase?: InputMaybe<Scalars['BigInt']>;
  volumeBase_not?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeQuote?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_not?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_gt?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_lt?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_gte?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_lte?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeQuote_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Candlestick_orderBy =
  | 'id'
  | 'market'
  | 'time'
  | 'period'
  | 'openX18'
  | 'closeX18'
  | 'lowX18'
  | 'highX18'
  | 'volumeBase'
  | 'volumeQuote';

export type Clearinghouse = {
  id: Scalars['ID'];
  quoteProduct: Scalars['Bytes'];
  spotEngine: SpotEngine;
  perpEngine: PerpEngine;
  numSubaccounts: Scalars['BigInt'];
  numProducts: Scalars['BigInt'];
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
  | 'subaccounts';

export type ClosedPerpBalance = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  subaccount: Subaccount;
  balance: PerpBalanceSummary;
  timeOpened: Scalars['BigInt'];
  timeClosed: Scalars['BigInt'];
  netFunding: Scalars['BigInt'];
};

export type ClosedPerpBalance_filter = {
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
  balance?: InputMaybe<Scalars['String']>;
  balance_not?: InputMaybe<Scalars['String']>;
  balance_gt?: InputMaybe<Scalars['String']>;
  balance_lt?: InputMaybe<Scalars['String']>;
  balance_gte?: InputMaybe<Scalars['String']>;
  balance_lte?: InputMaybe<Scalars['String']>;
  balance_in?: InputMaybe<Array<Scalars['String']>>;
  balance_not_in?: InputMaybe<Array<Scalars['String']>>;
  balance_contains?: InputMaybe<Scalars['String']>;
  balance_contains_nocase?: InputMaybe<Scalars['String']>;
  balance_not_contains?: InputMaybe<Scalars['String']>;
  balance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  balance_starts_with?: InputMaybe<Scalars['String']>;
  balance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  balance_not_starts_with?: InputMaybe<Scalars['String']>;
  balance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  balance_ends_with?: InputMaybe<Scalars['String']>;
  balance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  balance_not_ends_with?: InputMaybe<Scalars['String']>;
  balance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  balance_?: InputMaybe<PerpBalanceSummary_filter>;
  timeOpened?: InputMaybe<Scalars['BigInt']>;
  timeOpened_not?: InputMaybe<Scalars['BigInt']>;
  timeOpened_gt?: InputMaybe<Scalars['BigInt']>;
  timeOpened_lt?: InputMaybe<Scalars['BigInt']>;
  timeOpened_gte?: InputMaybe<Scalars['BigInt']>;
  timeOpened_lte?: InputMaybe<Scalars['BigInt']>;
  timeOpened_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeOpened_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeClosed?: InputMaybe<Scalars['BigInt']>;
  timeClosed_not?: InputMaybe<Scalars['BigInt']>;
  timeClosed_gt?: InputMaybe<Scalars['BigInt']>;
  timeClosed_lt?: InputMaybe<Scalars['BigInt']>;
  timeClosed_gte?: InputMaybe<Scalars['BigInt']>;
  timeClosed_lte?: InputMaybe<Scalars['BigInt']>;
  timeClosed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeClosed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netFunding?: InputMaybe<Scalars['BigInt']>;
  netFunding_not?: InputMaybe<Scalars['BigInt']>;
  netFunding_gt?: InputMaybe<Scalars['BigInt']>;
  netFunding_lt?: InputMaybe<Scalars['BigInt']>;
  netFunding_gte?: InputMaybe<Scalars['BigInt']>;
  netFunding_lte?: InputMaybe<Scalars['BigInt']>;
  netFunding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netFunding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ClosedPerpBalance_orderBy =
  | 'id'
  | 'productId'
  | 'subaccount'
  | 'balance'
  | 'timeOpened'
  | 'timeClosed'
  | 'netFunding';

export type ClosedSpotBalance = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  subaccount: Subaccount;
  balance: SpotBalanceSummary;
  timeOpened: Scalars['BigInt'];
  timeClosed: Scalars['BigInt'];
  netInterest: Scalars['BigInt'];
};

export type ClosedSpotBalance_filter = {
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
  balance?: InputMaybe<Scalars['String']>;
  balance_not?: InputMaybe<Scalars['String']>;
  balance_gt?: InputMaybe<Scalars['String']>;
  balance_lt?: InputMaybe<Scalars['String']>;
  balance_gte?: InputMaybe<Scalars['String']>;
  balance_lte?: InputMaybe<Scalars['String']>;
  balance_in?: InputMaybe<Array<Scalars['String']>>;
  balance_not_in?: InputMaybe<Array<Scalars['String']>>;
  balance_contains?: InputMaybe<Scalars['String']>;
  balance_contains_nocase?: InputMaybe<Scalars['String']>;
  balance_not_contains?: InputMaybe<Scalars['String']>;
  balance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  balance_starts_with?: InputMaybe<Scalars['String']>;
  balance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  balance_not_starts_with?: InputMaybe<Scalars['String']>;
  balance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  balance_ends_with?: InputMaybe<Scalars['String']>;
  balance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  balance_not_ends_with?: InputMaybe<Scalars['String']>;
  balance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  balance_?: InputMaybe<SpotBalanceSummary_filter>;
  timeOpened?: InputMaybe<Scalars['BigInt']>;
  timeOpened_not?: InputMaybe<Scalars['BigInt']>;
  timeOpened_gt?: InputMaybe<Scalars['BigInt']>;
  timeOpened_lt?: InputMaybe<Scalars['BigInt']>;
  timeOpened_gte?: InputMaybe<Scalars['BigInt']>;
  timeOpened_lte?: InputMaybe<Scalars['BigInt']>;
  timeOpened_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeOpened_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeClosed?: InputMaybe<Scalars['BigInt']>;
  timeClosed_not?: InputMaybe<Scalars['BigInt']>;
  timeClosed_gt?: InputMaybe<Scalars['BigInt']>;
  timeClosed_lt?: InputMaybe<Scalars['BigInt']>;
  timeClosed_gte?: InputMaybe<Scalars['BigInt']>;
  timeClosed_lte?: InputMaybe<Scalars['BigInt']>;
  timeClosed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeClosed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netInterest?: InputMaybe<Scalars['BigInt']>;
  netInterest_not?: InputMaybe<Scalars['BigInt']>;
  netInterest_gt?: InputMaybe<Scalars['BigInt']>;
  netInterest_lt?: InputMaybe<Scalars['BigInt']>;
  netInterest_gte?: InputMaybe<Scalars['BigInt']>;
  netInterest_lte?: InputMaybe<Scalars['BigInt']>;
  netInterest_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netInterest_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ClosedSpotBalance_orderBy =
  | 'id'
  | 'productId'
  | 'subaccount'
  | 'balance'
  | 'timeOpened'
  | 'timeClosed'
  | 'netInterest';

export type FillOrderEvent = {
  id: Scalars['ID'];
  market: Market;
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  maker: Subaccount;
  makerOrder: Order;
  taker: Subaccount;
  takerOrder: Order;
  takerAmountDelta: Scalars['BigInt'];
  takerFee: Scalars['BigInt'];
  makerFee: Scalars['BigInt'];
};

export type FillOrderEvent_filter = {
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
  maker?: InputMaybe<Scalars['String']>;
  maker_not?: InputMaybe<Scalars['String']>;
  maker_gt?: InputMaybe<Scalars['String']>;
  maker_lt?: InputMaybe<Scalars['String']>;
  maker_gte?: InputMaybe<Scalars['String']>;
  maker_lte?: InputMaybe<Scalars['String']>;
  maker_in?: InputMaybe<Array<Scalars['String']>>;
  maker_not_in?: InputMaybe<Array<Scalars['String']>>;
  maker_contains?: InputMaybe<Scalars['String']>;
  maker_contains_nocase?: InputMaybe<Scalars['String']>;
  maker_not_contains?: InputMaybe<Scalars['String']>;
  maker_not_contains_nocase?: InputMaybe<Scalars['String']>;
  maker_starts_with?: InputMaybe<Scalars['String']>;
  maker_starts_with_nocase?: InputMaybe<Scalars['String']>;
  maker_not_starts_with?: InputMaybe<Scalars['String']>;
  maker_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  maker_ends_with?: InputMaybe<Scalars['String']>;
  maker_ends_with_nocase?: InputMaybe<Scalars['String']>;
  maker_not_ends_with?: InputMaybe<Scalars['String']>;
  maker_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  maker_?: InputMaybe<Subaccount_filter>;
  makerOrder?: InputMaybe<Scalars['String']>;
  makerOrder_not?: InputMaybe<Scalars['String']>;
  makerOrder_gt?: InputMaybe<Scalars['String']>;
  makerOrder_lt?: InputMaybe<Scalars['String']>;
  makerOrder_gte?: InputMaybe<Scalars['String']>;
  makerOrder_lte?: InputMaybe<Scalars['String']>;
  makerOrder_in?: InputMaybe<Array<Scalars['String']>>;
  makerOrder_not_in?: InputMaybe<Array<Scalars['String']>>;
  makerOrder_contains?: InputMaybe<Scalars['String']>;
  makerOrder_contains_nocase?: InputMaybe<Scalars['String']>;
  makerOrder_not_contains?: InputMaybe<Scalars['String']>;
  makerOrder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  makerOrder_starts_with?: InputMaybe<Scalars['String']>;
  makerOrder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  makerOrder_not_starts_with?: InputMaybe<Scalars['String']>;
  makerOrder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  makerOrder_ends_with?: InputMaybe<Scalars['String']>;
  makerOrder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  makerOrder_not_ends_with?: InputMaybe<Scalars['String']>;
  makerOrder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  makerOrder_?: InputMaybe<Order_filter>;
  taker?: InputMaybe<Scalars['String']>;
  taker_not?: InputMaybe<Scalars['String']>;
  taker_gt?: InputMaybe<Scalars['String']>;
  taker_lt?: InputMaybe<Scalars['String']>;
  taker_gte?: InputMaybe<Scalars['String']>;
  taker_lte?: InputMaybe<Scalars['String']>;
  taker_in?: InputMaybe<Array<Scalars['String']>>;
  taker_not_in?: InputMaybe<Array<Scalars['String']>>;
  taker_contains?: InputMaybe<Scalars['String']>;
  taker_contains_nocase?: InputMaybe<Scalars['String']>;
  taker_not_contains?: InputMaybe<Scalars['String']>;
  taker_not_contains_nocase?: InputMaybe<Scalars['String']>;
  taker_starts_with?: InputMaybe<Scalars['String']>;
  taker_starts_with_nocase?: InputMaybe<Scalars['String']>;
  taker_not_starts_with?: InputMaybe<Scalars['String']>;
  taker_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  taker_ends_with?: InputMaybe<Scalars['String']>;
  taker_ends_with_nocase?: InputMaybe<Scalars['String']>;
  taker_not_ends_with?: InputMaybe<Scalars['String']>;
  taker_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  taker_?: InputMaybe<Subaccount_filter>;
  takerOrder?: InputMaybe<Scalars['String']>;
  takerOrder_not?: InputMaybe<Scalars['String']>;
  takerOrder_gt?: InputMaybe<Scalars['String']>;
  takerOrder_lt?: InputMaybe<Scalars['String']>;
  takerOrder_gte?: InputMaybe<Scalars['String']>;
  takerOrder_lte?: InputMaybe<Scalars['String']>;
  takerOrder_in?: InputMaybe<Array<Scalars['String']>>;
  takerOrder_not_in?: InputMaybe<Array<Scalars['String']>>;
  takerOrder_contains?: InputMaybe<Scalars['String']>;
  takerOrder_contains_nocase?: InputMaybe<Scalars['String']>;
  takerOrder_not_contains?: InputMaybe<Scalars['String']>;
  takerOrder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  takerOrder_starts_with?: InputMaybe<Scalars['String']>;
  takerOrder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  takerOrder_not_starts_with?: InputMaybe<Scalars['String']>;
  takerOrder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  takerOrder_ends_with?: InputMaybe<Scalars['String']>;
  takerOrder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  takerOrder_not_ends_with?: InputMaybe<Scalars['String']>;
  takerOrder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  takerOrder_?: InputMaybe<Order_filter>;
  takerAmountDelta?: InputMaybe<Scalars['BigInt']>;
  takerAmountDelta_not?: InputMaybe<Scalars['BigInt']>;
  takerAmountDelta_gt?: InputMaybe<Scalars['BigInt']>;
  takerAmountDelta_lt?: InputMaybe<Scalars['BigInt']>;
  takerAmountDelta_gte?: InputMaybe<Scalars['BigInt']>;
  takerAmountDelta_lte?: InputMaybe<Scalars['BigInt']>;
  takerAmountDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  takerAmountDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  takerFee?: InputMaybe<Scalars['BigInt']>;
  takerFee_not?: InputMaybe<Scalars['BigInt']>;
  takerFee_gt?: InputMaybe<Scalars['BigInt']>;
  takerFee_lt?: InputMaybe<Scalars['BigInt']>;
  takerFee_gte?: InputMaybe<Scalars['BigInt']>;
  takerFee_lte?: InputMaybe<Scalars['BigInt']>;
  takerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  takerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  makerFee?: InputMaybe<Scalars['BigInt']>;
  makerFee_not?: InputMaybe<Scalars['BigInt']>;
  makerFee_gt?: InputMaybe<Scalars['BigInt']>;
  makerFee_lt?: InputMaybe<Scalars['BigInt']>;
  makerFee_gte?: InputMaybe<Scalars['BigInt']>;
  makerFee_lte?: InputMaybe<Scalars['BigInt']>;
  makerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  makerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type FillOrderEvent_orderBy =
  | 'id'
  | 'market'
  | 'block'
  | 'blockTime'
  | 'maker'
  | 'makerOrder'
  | 'taker'
  | 'takerOrder'
  | 'takerAmountDelta'
  | 'takerFee'
  | 'makerFee';

export type LiquidationEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  liquidator: Subaccount;
  liquidatee: Subaccount;
  productId: Scalars['BigInt'];
  liquidatorBaseDelta: Scalars['BigInt'];
  liquidatorQuoteDelta: Scalars['BigInt'];
  insuranceCoverage: Scalars['BigInt'];
};

export type LiquidationEvent_filter = {
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
  liquidator?: InputMaybe<Scalars['String']>;
  liquidator_not?: InputMaybe<Scalars['String']>;
  liquidator_gt?: InputMaybe<Scalars['String']>;
  liquidator_lt?: InputMaybe<Scalars['String']>;
  liquidator_gte?: InputMaybe<Scalars['String']>;
  liquidator_lte?: InputMaybe<Scalars['String']>;
  liquidator_in?: InputMaybe<Array<Scalars['String']>>;
  liquidator_not_in?: InputMaybe<Array<Scalars['String']>>;
  liquidator_contains?: InputMaybe<Scalars['String']>;
  liquidator_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidator_not_contains?: InputMaybe<Scalars['String']>;
  liquidator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidator_starts_with?: InputMaybe<Scalars['String']>;
  liquidator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidator_not_starts_with?: InputMaybe<Scalars['String']>;
  liquidator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidator_ends_with?: InputMaybe<Scalars['String']>;
  liquidator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidator_not_ends_with?: InputMaybe<Scalars['String']>;
  liquidator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidator_?: InputMaybe<Subaccount_filter>;
  liquidatee?: InputMaybe<Scalars['String']>;
  liquidatee_not?: InputMaybe<Scalars['String']>;
  liquidatee_gt?: InputMaybe<Scalars['String']>;
  liquidatee_lt?: InputMaybe<Scalars['String']>;
  liquidatee_gte?: InputMaybe<Scalars['String']>;
  liquidatee_lte?: InputMaybe<Scalars['String']>;
  liquidatee_in?: InputMaybe<Array<Scalars['String']>>;
  liquidatee_not_in?: InputMaybe<Array<Scalars['String']>>;
  liquidatee_contains?: InputMaybe<Scalars['String']>;
  liquidatee_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidatee_not_contains?: InputMaybe<Scalars['String']>;
  liquidatee_not_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidatee_starts_with?: InputMaybe<Scalars['String']>;
  liquidatee_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidatee_not_starts_with?: InputMaybe<Scalars['String']>;
  liquidatee_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidatee_ends_with?: InputMaybe<Scalars['String']>;
  liquidatee_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidatee_not_ends_with?: InputMaybe<Scalars['String']>;
  liquidatee_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidatee_?: InputMaybe<Subaccount_filter>;
  productId?: InputMaybe<Scalars['BigInt']>;
  productId_not?: InputMaybe<Scalars['BigInt']>;
  productId_gt?: InputMaybe<Scalars['BigInt']>;
  productId_lt?: InputMaybe<Scalars['BigInt']>;
  productId_gte?: InputMaybe<Scalars['BigInt']>;
  productId_lte?: InputMaybe<Scalars['BigInt']>;
  productId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  productId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidatorBaseDelta?: InputMaybe<Scalars['BigInt']>;
  liquidatorBaseDelta_not?: InputMaybe<Scalars['BigInt']>;
  liquidatorBaseDelta_gt?: InputMaybe<Scalars['BigInt']>;
  liquidatorBaseDelta_lt?: InputMaybe<Scalars['BigInt']>;
  liquidatorBaseDelta_gte?: InputMaybe<Scalars['BigInt']>;
  liquidatorBaseDelta_lte?: InputMaybe<Scalars['BigInt']>;
  liquidatorBaseDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidatorBaseDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidatorQuoteDelta?: InputMaybe<Scalars['BigInt']>;
  liquidatorQuoteDelta_not?: InputMaybe<Scalars['BigInt']>;
  liquidatorQuoteDelta_gt?: InputMaybe<Scalars['BigInt']>;
  liquidatorQuoteDelta_lt?: InputMaybe<Scalars['BigInt']>;
  liquidatorQuoteDelta_gte?: InputMaybe<Scalars['BigInt']>;
  liquidatorQuoteDelta_lte?: InputMaybe<Scalars['BigInt']>;
  liquidatorQuoteDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidatorQuoteDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  insuranceCoverage?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_not?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_gt?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_lt?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_gte?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_lte?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  insuranceCoverage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type LiquidationEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'liquidator'
  | 'liquidatee'
  | 'productId'
  | 'liquidatorBaseDelta'
  | 'liquidatorQuoteDelta'
  | 'insuranceCoverage';

export type Market = {
  id: Scalars['ID'];
  clearinghouse: Clearinghouse;
  productId: Scalars['BigInt'];
  orderbook: Scalars['Bytes'];
  sizeIncrementX18: Scalars['BigInt'];
  priceIncrementX18: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
  createdAtBlock: Scalars['BigInt'];
  markPriceX18: Scalars['BigInt'];
  lastFillPriceX18: Scalars['BigInt'];
  volumeBase: Scalars['BigInt'];
  volumeQuote: Scalars['BigInt'];
  volumeNumOrders: Scalars['BigInt'];
  candlesticks: Array<Candlestick>;
  orders: Array<Order>;
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
  markPriceX18: Scalars['BigInt'];
  lastFillPriceX18: Scalars['BigInt'];
  volumeBase: Scalars['BigInt'];
  volumeQuote: Scalars['BigInt'];
  volumeNumOrders: Scalars['BigInt'];
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
  markPriceX18?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastFillPriceX18?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastFillPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase?: InputMaybe<Scalars['BigInt']>;
  volumeBase_not?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeQuote?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_not?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_gt?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_lt?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_gte?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_lte?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeQuote_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeNumOrders?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_not?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_gt?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_lt?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_gte?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_lte?: InputMaybe<Scalars['BigInt']>;
  volumeNumOrders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeNumOrders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type MarketHourlySnapshot_orderBy =
  | 'id'
  | 'hour'
  | 'market'
  | 'markPriceX18'
  | 'lastFillPriceX18'
  | 'volumeBase'
  | 'volumeQuote'
  | 'volumeNumOrders';

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
  markPriceX18?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  markPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastFillPriceX18?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  lastFillPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastFillPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase?: InputMaybe<Scalars['BigInt']>;
  volumeBase_not?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lt?: InputMaybe<Scalars['BigInt']>;
  volumeBase_gte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_lte?: InputMaybe<Scalars['BigInt']>;
  volumeBase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeBase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeQuote?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_not?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_gt?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_lt?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_gte?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_lte?: InputMaybe<Scalars['BigInt']>;
  volumeQuote_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volumeQuote_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | 'markPriceX18'
  | 'lastFillPriceX18'
  | 'volumeBase'
  | 'volumeQuote'
  | 'volumeNumOrders'
  | 'candlesticks'
  | 'orders'
  | 'snapshots';

export type ModifyCollateralEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  subaccount: Subaccount;
  amount: Scalars['BigInt'];
  productId: Scalars['BigInt'];
  newBalanceAmount: Scalars['BigInt'];
};

export type ModifyCollateralEvent_filter = {
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
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  productId?: InputMaybe<Scalars['BigInt']>;
  productId_not?: InputMaybe<Scalars['BigInt']>;
  productId_gt?: InputMaybe<Scalars['BigInt']>;
  productId_lt?: InputMaybe<Scalars['BigInt']>;
  productId_gte?: InputMaybe<Scalars['BigInt']>;
  productId_lte?: InputMaybe<Scalars['BigInt']>;
  productId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  productId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newBalanceAmount?: InputMaybe<Scalars['BigInt']>;
  newBalanceAmount_not?: InputMaybe<Scalars['BigInt']>;
  newBalanceAmount_gt?: InputMaybe<Scalars['BigInt']>;
  newBalanceAmount_lt?: InputMaybe<Scalars['BigInt']>;
  newBalanceAmount_gte?: InputMaybe<Scalars['BigInt']>;
  newBalanceAmount_lte?: InputMaybe<Scalars['BigInt']>;
  newBalanceAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newBalanceAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ModifyCollateralEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'subaccount'
  | 'amount'
  | 'productId'
  | 'newBalanceAmount';

export type Order = {
  id: Scalars['ID'];
  type: OrderType;
  sender: Scalars['Bytes'];
  digest: Scalars['Bytes'];
  validationResult: OrderValidationResult;
  priceX18: Scalars['BigInt'];
  subaccount: Subaccount;
  market: Market;
  reportedAt: Scalars['BigInt'];
  reportedAtBlock: Scalars['BigInt'];
  totalAmount: Scalars['BigInt'];
  filledAmount: Scalars['BigInt'];
  quoteAmount: Scalars['BigInt'];
  collectedFee: Scalars['BigInt'];
  expiration: Scalars['BigInt'];
  realExpiration: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type OrderType =
  | 'DEFAULT'
  | 'IOC'
  | 'FOK'
  | 'POST_ONLY'
  | 'UNKNOWN';

export type OrderValidationResult =
  | 'PENDING'
  | 'VALID'
  | 'PRE_VALID'
  | 'INVALID_PRICE'
  | 'INVALID_SIZE'
  | 'INVALID_SIGNATURE'
  | 'RISK_CHECK_FAILED'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'FILLED';

export type Order_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<OrderType>;
  type_not?: InputMaybe<OrderType>;
  type_in?: InputMaybe<Array<OrderType>>;
  type_not_in?: InputMaybe<Array<OrderType>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  digest?: InputMaybe<Scalars['Bytes']>;
  digest_not?: InputMaybe<Scalars['Bytes']>;
  digest_in?: InputMaybe<Array<Scalars['Bytes']>>;
  digest_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  digest_contains?: InputMaybe<Scalars['Bytes']>;
  digest_not_contains?: InputMaybe<Scalars['Bytes']>;
  validationResult?: InputMaybe<OrderValidationResult>;
  validationResult_not?: InputMaybe<OrderValidationResult>;
  validationResult_in?: InputMaybe<Array<OrderValidationResult>>;
  validationResult_not_in?: InputMaybe<Array<OrderValidationResult>>;
  priceX18?: InputMaybe<Scalars['BigInt']>;
  priceX18_not?: InputMaybe<Scalars['BigInt']>;
  priceX18_gt?: InputMaybe<Scalars['BigInt']>;
  priceX18_lt?: InputMaybe<Scalars['BigInt']>;
  priceX18_gte?: InputMaybe<Scalars['BigInt']>;
  priceX18_lte?: InputMaybe<Scalars['BigInt']>;
  priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  reportedAt?: InputMaybe<Scalars['BigInt']>;
  reportedAt_not?: InputMaybe<Scalars['BigInt']>;
  reportedAt_gt?: InputMaybe<Scalars['BigInt']>;
  reportedAt_lt?: InputMaybe<Scalars['BigInt']>;
  reportedAt_gte?: InputMaybe<Scalars['BigInt']>;
  reportedAt_lte?: InputMaybe<Scalars['BigInt']>;
  reportedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reportedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reportedAtBlock?: InputMaybe<Scalars['BigInt']>;
  reportedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  reportedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  reportedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  reportedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  reportedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  reportedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reportedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmount?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  filledAmount?: InputMaybe<Scalars['BigInt']>;
  filledAmount_not?: InputMaybe<Scalars['BigInt']>;
  filledAmount_gt?: InputMaybe<Scalars['BigInt']>;
  filledAmount_lt?: InputMaybe<Scalars['BigInt']>;
  filledAmount_gte?: InputMaybe<Scalars['BigInt']>;
  filledAmount_lte?: InputMaybe<Scalars['BigInt']>;
  filledAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  filledAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteAmount?: InputMaybe<Scalars['BigInt']>;
  quoteAmount_not?: InputMaybe<Scalars['BigInt']>;
  quoteAmount_gt?: InputMaybe<Scalars['BigInt']>;
  quoteAmount_lt?: InputMaybe<Scalars['BigInt']>;
  quoteAmount_gte?: InputMaybe<Scalars['BigInt']>;
  quoteAmount_lte?: InputMaybe<Scalars['BigInt']>;
  quoteAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collectedFee?: InputMaybe<Scalars['BigInt']>;
  collectedFee_not?: InputMaybe<Scalars['BigInt']>;
  collectedFee_gt?: InputMaybe<Scalars['BigInt']>;
  collectedFee_lt?: InputMaybe<Scalars['BigInt']>;
  collectedFee_gte?: InputMaybe<Scalars['BigInt']>;
  collectedFee_lte?: InputMaybe<Scalars['BigInt']>;
  collectedFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collectedFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration?: InputMaybe<Scalars['BigInt']>;
  expiration_not?: InputMaybe<Scalars['BigInt']>;
  expiration_gt?: InputMaybe<Scalars['BigInt']>;
  expiration_lt?: InputMaybe<Scalars['BigInt']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']>;
  expiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realExpiration?: InputMaybe<Scalars['BigInt']>;
  realExpiration_not?: InputMaybe<Scalars['BigInt']>;
  realExpiration_gt?: InputMaybe<Scalars['BigInt']>;
  realExpiration_lt?: InputMaybe<Scalars['BigInt']>;
  realExpiration_gte?: InputMaybe<Scalars['BigInt']>;
  realExpiration_lte?: InputMaybe<Scalars['BigInt']>;
  realExpiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realExpiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Order_orderBy =
  | 'id'
  | 'type'
  | 'sender'
  | 'digest'
  | 'validationResult'
  | 'priceX18'
  | 'subaccount'
  | 'market'
  | 'reportedAt'
  | 'reportedAtBlock'
  | 'totalAmount'
  | 'filledAmount'
  | 'quoteAmount'
  | 'collectedFee'
  | 'expiration'
  | 'realExpiration'
  | 'nonce';

export type PerpBalanceSummary = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  subaccount: Subaccount;
  timeOpened: Scalars['BigInt'];
  vQuoteWithoutFunding: Scalars['BigInt'];
  totalNetFunding: Scalars['BigInt'];
  closedBalances: Array<ClosedPerpBalance>;
};


export type PerpBalanceSummaryclosedBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClosedPerpBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClosedPerpBalance_filter>;
};

export type PerpBalanceSummary_filter = {
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
  timeOpened?: InputMaybe<Scalars['BigInt']>;
  timeOpened_not?: InputMaybe<Scalars['BigInt']>;
  timeOpened_gt?: InputMaybe<Scalars['BigInt']>;
  timeOpened_lt?: InputMaybe<Scalars['BigInt']>;
  timeOpened_gte?: InputMaybe<Scalars['BigInt']>;
  timeOpened_lte?: InputMaybe<Scalars['BigInt']>;
  timeOpened_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeOpened_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vQuoteWithoutFunding?: InputMaybe<Scalars['BigInt']>;
  vQuoteWithoutFunding_not?: InputMaybe<Scalars['BigInt']>;
  vQuoteWithoutFunding_gt?: InputMaybe<Scalars['BigInt']>;
  vQuoteWithoutFunding_lt?: InputMaybe<Scalars['BigInt']>;
  vQuoteWithoutFunding_gte?: InputMaybe<Scalars['BigInt']>;
  vQuoteWithoutFunding_lte?: InputMaybe<Scalars['BigInt']>;
  vQuoteWithoutFunding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vQuoteWithoutFunding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNetFunding?: InputMaybe<Scalars['BigInt']>;
  totalNetFunding_not?: InputMaybe<Scalars['BigInt']>;
  totalNetFunding_gt?: InputMaybe<Scalars['BigInt']>;
  totalNetFunding_lt?: InputMaybe<Scalars['BigInt']>;
  totalNetFunding_gte?: InputMaybe<Scalars['BigInt']>;
  totalNetFunding_lte?: InputMaybe<Scalars['BigInt']>;
  totalNetFunding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNetFunding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closedBalances_?: InputMaybe<ClosedPerpBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PerpBalanceSummary_orderBy =
  | 'id'
  | 'productId'
  | 'subaccount'
  | 'timeOpened'
  | 'vQuoteWithoutFunding'
  | 'totalNetFunding'
  | 'closedBalances';

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
  emaPriceX18: Scalars['BigInt'];
  cumulativeFundingLongX18: Scalars['BigInt'];
  cumulativeFundingShortX18: Scalars['BigInt'];
  openInterestX18: Scalars['BigInt'];
  availableSettleX18: Scalars['BigInt'];
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
  priceX18: Scalars['BigInt'];
  emaPriceX18: Scalars['BigInt'];
  cumulativeFundingLongX18: Scalars['BigInt'];
  cumulativeFundingShortX18: Scalars['BigInt'];
  openInterestX18: Scalars['BigInt'];
  availableSettleX18: Scalars['BigInt'];
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
  priceX18?: InputMaybe<Scalars['BigInt']>;
  priceX18_not?: InputMaybe<Scalars['BigInt']>;
  priceX18_gt?: InputMaybe<Scalars['BigInt']>;
  priceX18_lt?: InputMaybe<Scalars['BigInt']>;
  priceX18_gte?: InputMaybe<Scalars['BigInt']>;
  priceX18_lte?: InputMaybe<Scalars['BigInt']>;
  priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  emaPriceX18?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  emaPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PerpProductHourlySnapshot_orderBy =
  | 'id'
  | 'hour'
  | 'product'
  | 'priceX18'
  | 'emaPriceX18'
  | 'cumulativeFundingLongX18'
  | 'cumulativeFundingShortX18'
  | 'openInterestX18'
  | 'availableSettleX18';

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
  emaPriceX18?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  emaPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  emaPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | 'emaPriceX18'
  | 'cumulativeFundingLongX18'
  | 'cumulativeFundingShortX18'
  | 'openInterestX18'
  | 'availableSettleX18'
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
  order?: Maybe<Order>;
  orders: Array<Order>;
  modifyCollateralEvent?: Maybe<ModifyCollateralEvent>;
  modifyCollateralEvents: Array<ModifyCollateralEvent>;
  settlePnlEvent?: Maybe<SettlePnlEvent>;
  settlePnlEvents: Array<SettlePnlEvent>;
  liquidationEvent?: Maybe<LiquidationEvent>;
  liquidationEvents: Array<LiquidationEvent>;
  socializeProductEvent?: Maybe<SocializeProductEvent>;
  socializeProductEvents: Array<SocializeProductEvent>;
  reportOrderEvent?: Maybe<ReportOrderEvent>;
  reportOrderEvents: Array<ReportOrderEvent>;
  fillOrderEvent?: Maybe<FillOrderEvent>;
  fillOrderEvents: Array<FillOrderEvent>;
  cancelOrderEvent?: Maybe<CancelOrderEvent>;
  cancelOrderEvents: Array<CancelOrderEvent>;
  subaccount?: Maybe<Subaccount>;
  subaccounts: Array<Subaccount>;
  tradeSummary?: Maybe<TradeSummary>;
  tradeSummaries: Array<TradeSummary>;
  spotBalanceSummary?: Maybe<SpotBalanceSummary>;
  spotBalanceSummaries: Array<SpotBalanceSummary>;
  closedSpotBalance?: Maybe<ClosedSpotBalance>;
  closedSpotBalances: Array<ClosedSpotBalance>;
  perpBalanceSummary?: Maybe<PerpBalanceSummary>;
  perpBalanceSummaries: Array<PerpBalanceSummary>;
  closedPerpBalance?: Maybe<ClosedPerpBalance>;
  closedPerpBalances: Array<ClosedPerpBalance>;
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


export type QuerymodifyCollateralEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymodifyCollateralEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ModifyCollateralEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ModifyCollateralEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysettlePnlEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysettlePnlEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SettlePnlEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SettlePnlEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidationEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidationEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidationEvent_filter>;
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


export type QueryreportOrderEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreportOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReportOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReportOrderEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfillOrderEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfillOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FillOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FillOrderEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelOrderEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CancelOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelOrderEvent_filter>;
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


export type QuerytradeSummaryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytradeSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradeSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TradeSummary_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryspotBalanceSummaryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryspotBalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpotBalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SpotBalanceSummary_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclosedSpotBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclosedSpotBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClosedSpotBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClosedSpotBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryperpBalanceSummaryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryperpBalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PerpBalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PerpBalanceSummary_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclosedPerpBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclosedPerpBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClosedPerpBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClosedPerpBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type ReportOrderEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  priceX18: Scalars['BigInt'];
  order: Order;
  subaccount: Subaccount;
};

export type ReportOrderEvent_filter = {
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
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceX18?: InputMaybe<Scalars['BigInt']>;
  priceX18_not?: InputMaybe<Scalars['BigInt']>;
  priceX18_gt?: InputMaybe<Scalars['BigInt']>;
  priceX18_lt?: InputMaybe<Scalars['BigInt']>;
  priceX18_gte?: InputMaybe<Scalars['BigInt']>;
  priceX18_lte?: InputMaybe<Scalars['BigInt']>;
  priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  order?: InputMaybe<Scalars['String']>;
  order_not?: InputMaybe<Scalars['String']>;
  order_gt?: InputMaybe<Scalars['String']>;
  order_lt?: InputMaybe<Scalars['String']>;
  order_gte?: InputMaybe<Scalars['String']>;
  order_lte?: InputMaybe<Scalars['String']>;
  order_in?: InputMaybe<Array<Scalars['String']>>;
  order_not_in?: InputMaybe<Array<Scalars['String']>>;
  order_contains?: InputMaybe<Scalars['String']>;
  order_contains_nocase?: InputMaybe<Scalars['String']>;
  order_not_contains?: InputMaybe<Scalars['String']>;
  order_not_contains_nocase?: InputMaybe<Scalars['String']>;
  order_starts_with?: InputMaybe<Scalars['String']>;
  order_starts_with_nocase?: InputMaybe<Scalars['String']>;
  order_not_starts_with?: InputMaybe<Scalars['String']>;
  order_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  order_ends_with?: InputMaybe<Scalars['String']>;
  order_ends_with_nocase?: InputMaybe<Scalars['String']>;
  order_not_ends_with?: InputMaybe<Scalars['String']>;
  order_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  order_?: InputMaybe<Order_filter>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ReportOrderEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'amount'
  | 'priceX18'
  | 'order'
  | 'subaccount';

export type SettlePnlEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  subaccount: Subaccount;
  productId: Scalars['BigInt'];
  amount: Scalars['BigInt'];
};

export type SettlePnlEvent_filter = {
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
  productId?: InputMaybe<Scalars['BigInt']>;
  productId_not?: InputMaybe<Scalars['BigInt']>;
  productId_gt?: InputMaybe<Scalars['BigInt']>;
  productId_lt?: InputMaybe<Scalars['BigInt']>;
  productId_gte?: InputMaybe<Scalars['BigInt']>;
  productId_lte?: InputMaybe<Scalars['BigInt']>;
  productId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  productId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SettlePnlEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'subaccount'
  | 'productId'
  | 'amount';

export type SocializeProductEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  productId: Scalars['BigInt'];
  socializedQuote: Scalars['BigInt'];
  socializedBase: Scalars['BigInt'];
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
  socializedQuote?: InputMaybe<Scalars['BigInt']>;
  socializedQuote_not?: InputMaybe<Scalars['BigInt']>;
  socializedQuote_gt?: InputMaybe<Scalars['BigInt']>;
  socializedQuote_lt?: InputMaybe<Scalars['BigInt']>;
  socializedQuote_gte?: InputMaybe<Scalars['BigInt']>;
  socializedQuote_lte?: InputMaybe<Scalars['BigInt']>;
  socializedQuote_in?: InputMaybe<Array<Scalars['BigInt']>>;
  socializedQuote_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  socializedBase?: InputMaybe<Scalars['BigInt']>;
  socializedBase_not?: InputMaybe<Scalars['BigInt']>;
  socializedBase_gt?: InputMaybe<Scalars['BigInt']>;
  socializedBase_lt?: InputMaybe<Scalars['BigInt']>;
  socializedBase_gte?: InputMaybe<Scalars['BigInt']>;
  socializedBase_lte?: InputMaybe<Scalars['BigInt']>;
  socializedBase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  socializedBase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SocializeProductEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'productId'
  | 'socializedQuote'
  | 'socializedBase';

export type SpotBalanceSummary = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  subaccount: Subaccount;
  timeOpened: Scalars['BigInt'];
  netRealAmount: Scalars['BigInt'];
  totalNetInterest: Scalars['BigInt'];
  closedBalances: Array<ClosedSpotBalance>;
};


export type SpotBalanceSummaryclosedBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClosedSpotBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClosedSpotBalance_filter>;
};

export type SpotBalanceSummary_filter = {
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
  timeOpened?: InputMaybe<Scalars['BigInt']>;
  timeOpened_not?: InputMaybe<Scalars['BigInt']>;
  timeOpened_gt?: InputMaybe<Scalars['BigInt']>;
  timeOpened_lt?: InputMaybe<Scalars['BigInt']>;
  timeOpened_gte?: InputMaybe<Scalars['BigInt']>;
  timeOpened_lte?: InputMaybe<Scalars['BigInt']>;
  timeOpened_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeOpened_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netRealAmount?: InputMaybe<Scalars['BigInt']>;
  netRealAmount_not?: InputMaybe<Scalars['BigInt']>;
  netRealAmount_gt?: InputMaybe<Scalars['BigInt']>;
  netRealAmount_lt?: InputMaybe<Scalars['BigInt']>;
  netRealAmount_gte?: InputMaybe<Scalars['BigInt']>;
  netRealAmount_lte?: InputMaybe<Scalars['BigInt']>;
  netRealAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  netRealAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNetInterest?: InputMaybe<Scalars['BigInt']>;
  totalNetInterest_not?: InputMaybe<Scalars['BigInt']>;
  totalNetInterest_gt?: InputMaybe<Scalars['BigInt']>;
  totalNetInterest_lt?: InputMaybe<Scalars['BigInt']>;
  totalNetInterest_gte?: InputMaybe<Scalars['BigInt']>;
  totalNetInterest_lte?: InputMaybe<Scalars['BigInt']>;
  totalNetInterest_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNetInterest_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closedBalances_?: InputMaybe<ClosedSpotBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SpotBalanceSummary_orderBy =
  | 'id'
  | 'productId'
  | 'subaccount'
  | 'timeOpened'
  | 'netRealAmount'
  | 'totalNetInterest'
  | 'closedBalances';

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
  priceX18: Scalars['BigInt'];
  cumulativeDepositsMultiplierX18: Scalars['BigInt'];
  cumulativeBorrowsMultiplierX18: Scalars['BigInt'];
  totalDepositsNormalizedX18: Scalars['BigInt'];
  totalBorrowsNormalizedX18: Scalars['BigInt'];
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SpotProductHourlySnapshot_orderBy =
  | 'id'
  | 'hour'
  | 'product'
  | 'priceX18'
  | 'cumulativeDepositsMultiplierX18'
  | 'cumulativeBorrowsMultiplierX18'
  | 'totalDepositsNormalizedX18'
  | 'totalBorrowsNormalizedX18';

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
  tradeSummaries: Array<TradeSummary>;
  spotBalanceSummaries: Array<SpotBalanceSummary>;
  perpBalanceSummaries: Array<PerpBalanceSummary>;
  modifyCollateralEvents: Array<ModifyCollateralEvent>;
  settlePnlEvents: Array<SettlePnlEvent>;
  liquidateeEvents: Array<LiquidationEvent>;
  liquidatorEvents: Array<LiquidationEvent>;
  reportOrderEvents: Array<ReportOrderEvent>;
  takerFillOrderEvents: Array<FillOrderEvent>;
  makerFillOrderEvents: Array<FillOrderEvent>;
  cancelOrderEvents: Array<CancelOrderEvent>;
};


export type SubaccountordersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Order_filter>;
};


export type SubaccounttradeSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradeSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TradeSummary_filter>;
};


export type SubaccountspotBalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpotBalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SpotBalanceSummary_filter>;
};


export type SubaccountperpBalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PerpBalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PerpBalanceSummary_filter>;
};


export type SubaccountmodifyCollateralEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ModifyCollateralEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ModifyCollateralEvent_filter>;
};


export type SubaccountsettlePnlEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SettlePnlEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SettlePnlEvent_filter>;
};


export type SubaccountliquidateeEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidationEvent_filter>;
};


export type SubaccountliquidatorEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidationEvent_filter>;
};


export type SubaccountreportOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReportOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReportOrderEvent_filter>;
};


export type SubaccounttakerFillOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FillOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FillOrderEvent_filter>;
};


export type SubaccountmakerFillOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FillOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FillOrderEvent_filter>;
};


export type SubaccountcancelOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CancelOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelOrderEvent_filter>;
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
  tradeSummaries_?: InputMaybe<TradeSummary_filter>;
  spotBalanceSummaries_?: InputMaybe<SpotBalanceSummary_filter>;
  perpBalanceSummaries_?: InputMaybe<PerpBalanceSummary_filter>;
  modifyCollateralEvents_?: InputMaybe<ModifyCollateralEvent_filter>;
  settlePnlEvents_?: InputMaybe<SettlePnlEvent_filter>;
  liquidateeEvents_?: InputMaybe<LiquidationEvent_filter>;
  liquidatorEvents_?: InputMaybe<LiquidationEvent_filter>;
  reportOrderEvents_?: InputMaybe<ReportOrderEvent_filter>;
  takerFillOrderEvents_?: InputMaybe<FillOrderEvent_filter>;
  makerFillOrderEvents_?: InputMaybe<FillOrderEvent_filter>;
  cancelOrderEvents_?: InputMaybe<CancelOrderEvent_filter>;
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
  | 'tradeSummaries'
  | 'spotBalanceSummaries'
  | 'perpBalanceSummaries'
  | 'modifyCollateralEvents'
  | 'settlePnlEvents'
  | 'liquidateeEvents'
  | 'liquidatorEvents'
  | 'reportOrderEvents'
  | 'takerFillOrderEvents'
  | 'makerFillOrderEvents'
  | 'cancelOrderEvents';

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
  order?: Maybe<Order>;
  orders: Array<Order>;
  modifyCollateralEvent?: Maybe<ModifyCollateralEvent>;
  modifyCollateralEvents: Array<ModifyCollateralEvent>;
  settlePnlEvent?: Maybe<SettlePnlEvent>;
  settlePnlEvents: Array<SettlePnlEvent>;
  liquidationEvent?: Maybe<LiquidationEvent>;
  liquidationEvents: Array<LiquidationEvent>;
  socializeProductEvent?: Maybe<SocializeProductEvent>;
  socializeProductEvents: Array<SocializeProductEvent>;
  reportOrderEvent?: Maybe<ReportOrderEvent>;
  reportOrderEvents: Array<ReportOrderEvent>;
  fillOrderEvent?: Maybe<FillOrderEvent>;
  fillOrderEvents: Array<FillOrderEvent>;
  cancelOrderEvent?: Maybe<CancelOrderEvent>;
  cancelOrderEvents: Array<CancelOrderEvent>;
  subaccount?: Maybe<Subaccount>;
  subaccounts: Array<Subaccount>;
  tradeSummary?: Maybe<TradeSummary>;
  tradeSummaries: Array<TradeSummary>;
  spotBalanceSummary?: Maybe<SpotBalanceSummary>;
  spotBalanceSummaries: Array<SpotBalanceSummary>;
  closedSpotBalance?: Maybe<ClosedSpotBalance>;
  closedSpotBalances: Array<ClosedSpotBalance>;
  perpBalanceSummary?: Maybe<PerpBalanceSummary>;
  perpBalanceSummaries: Array<PerpBalanceSummary>;
  closedPerpBalance?: Maybe<ClosedPerpBalance>;
  closedPerpBalances: Array<ClosedPerpBalance>;
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


export type SubscriptionmodifyCollateralEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmodifyCollateralEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ModifyCollateralEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ModifyCollateralEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsettlePnlEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsettlePnlEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SettlePnlEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SettlePnlEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidationEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidationEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidationEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidationEvent_filter>;
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


export type SubscriptionreportOrderEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreportOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReportOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReportOrderEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfillOrderEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfillOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FillOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FillOrderEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelOrderEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CancelOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelOrderEvent_filter>;
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


export type SubscriptiontradeSummaryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontradeSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradeSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TradeSummary_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionspotBalanceSummaryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionspotBalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpotBalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SpotBalanceSummary_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclosedSpotBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclosedSpotBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClosedSpotBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClosedSpotBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionperpBalanceSummaryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionperpBalanceSummariesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PerpBalanceSummary_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PerpBalanceSummary_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclosedPerpBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclosedPerpBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClosedPerpBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClosedPerpBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TradeSummary = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  subaccount: Subaccount;
  totalEntryQuoteAmountAbs: Scalars['BigInt'];
  totalEntryAmountAbs: Scalars['BigInt'];
  totalCloseQuoteAmountAbs: Scalars['BigInt'];
  totalCloseAmountAbs: Scalars['BigInt'];
};

export type TradeSummary_filter = {
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
  totalEntryQuoteAmountAbs?: InputMaybe<Scalars['BigInt']>;
  totalEntryQuoteAmountAbs_not?: InputMaybe<Scalars['BigInt']>;
  totalEntryQuoteAmountAbs_gt?: InputMaybe<Scalars['BigInt']>;
  totalEntryQuoteAmountAbs_lt?: InputMaybe<Scalars['BigInt']>;
  totalEntryQuoteAmountAbs_gte?: InputMaybe<Scalars['BigInt']>;
  totalEntryQuoteAmountAbs_lte?: InputMaybe<Scalars['BigInt']>;
  totalEntryQuoteAmountAbs_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalEntryQuoteAmountAbs_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalEntryAmountAbs?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmountAbs_not?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmountAbs_gt?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmountAbs_lt?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmountAbs_gte?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmountAbs_lte?: InputMaybe<Scalars['BigInt']>;
  totalEntryAmountAbs_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalEntryAmountAbs_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalCloseQuoteAmountAbs?: InputMaybe<Scalars['BigInt']>;
  totalCloseQuoteAmountAbs_not?: InputMaybe<Scalars['BigInt']>;
  totalCloseQuoteAmountAbs_gt?: InputMaybe<Scalars['BigInt']>;
  totalCloseQuoteAmountAbs_lt?: InputMaybe<Scalars['BigInt']>;
  totalCloseQuoteAmountAbs_gte?: InputMaybe<Scalars['BigInt']>;
  totalCloseQuoteAmountAbs_lte?: InputMaybe<Scalars['BigInt']>;
  totalCloseQuoteAmountAbs_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalCloseQuoteAmountAbs_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalCloseAmountAbs?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmountAbs_not?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmountAbs_gt?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmountAbs_lt?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmountAbs_gte?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmountAbs_lte?: InputMaybe<Scalars['BigInt']>;
  totalCloseAmountAbs_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalCloseAmountAbs_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TradeSummary_orderBy =
  | 'id'
  | 'productId'
  | 'subaccount'
  | 'totalEntryQuoteAmountAbs'
  | 'totalEntryAmountAbs'
  | 'totalCloseQuoteAmountAbs'
  | 'totalCloseAmountAbs';

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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  CancelOrderEvent: ResolverTypeWrapper<CancelOrderEvent>;
  CancelOrderEvent_filter: CancelOrderEvent_filter;
  CancelOrderEvent_orderBy: CancelOrderEvent_orderBy;
  Candlestick: ResolverTypeWrapper<Candlestick>;
  Candlestick_filter: Candlestick_filter;
  Candlestick_orderBy: Candlestick_orderBy;
  Clearinghouse: ResolverTypeWrapper<Clearinghouse>;
  Clearinghouse_filter: Clearinghouse_filter;
  Clearinghouse_orderBy: Clearinghouse_orderBy;
  ClosedPerpBalance: ResolverTypeWrapper<ClosedPerpBalance>;
  ClosedPerpBalance_filter: ClosedPerpBalance_filter;
  ClosedPerpBalance_orderBy: ClosedPerpBalance_orderBy;
  ClosedSpotBalance: ResolverTypeWrapper<ClosedSpotBalance>;
  ClosedSpotBalance_filter: ClosedSpotBalance_filter;
  ClosedSpotBalance_orderBy: ClosedSpotBalance_orderBy;
  FillOrderEvent: ResolverTypeWrapper<FillOrderEvent>;
  FillOrderEvent_filter: FillOrderEvent_filter;
  FillOrderEvent_orderBy: FillOrderEvent_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LiquidationEvent: ResolverTypeWrapper<LiquidationEvent>;
  LiquidationEvent_filter: LiquidationEvent_filter;
  LiquidationEvent_orderBy: LiquidationEvent_orderBy;
  Market: ResolverTypeWrapper<Market>;
  MarketHourlySnapshot: ResolverTypeWrapper<MarketHourlySnapshot>;
  MarketHourlySnapshot_filter: MarketHourlySnapshot_filter;
  MarketHourlySnapshot_orderBy: MarketHourlySnapshot_orderBy;
  Market_filter: Market_filter;
  Market_orderBy: Market_orderBy;
  ModifyCollateralEvent: ResolverTypeWrapper<ModifyCollateralEvent>;
  ModifyCollateralEvent_filter: ModifyCollateralEvent_filter;
  ModifyCollateralEvent_orderBy: ModifyCollateralEvent_orderBy;
  Order: ResolverTypeWrapper<Order>;
  OrderDirection: OrderDirection;
  OrderType: OrderType;
  OrderValidationResult: OrderValidationResult;
  Order_filter: Order_filter;
  Order_orderBy: Order_orderBy;
  PerpBalanceSummary: ResolverTypeWrapper<PerpBalanceSummary>;
  PerpBalanceSummary_filter: PerpBalanceSummary_filter;
  PerpBalanceSummary_orderBy: PerpBalanceSummary_orderBy;
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
  ReportOrderEvent: ResolverTypeWrapper<ReportOrderEvent>;
  ReportOrderEvent_filter: ReportOrderEvent_filter;
  ReportOrderEvent_orderBy: ReportOrderEvent_orderBy;
  SettlePnlEvent: ResolverTypeWrapper<SettlePnlEvent>;
  SettlePnlEvent_filter: SettlePnlEvent_filter;
  SettlePnlEvent_orderBy: SettlePnlEvent_orderBy;
  SocializeProductEvent: ResolverTypeWrapper<SocializeProductEvent>;
  SocializeProductEvent_filter: SocializeProductEvent_filter;
  SocializeProductEvent_orderBy: SocializeProductEvent_orderBy;
  SpotBalanceSummary: ResolverTypeWrapper<SpotBalanceSummary>;
  SpotBalanceSummary_filter: SpotBalanceSummary_filter;
  SpotBalanceSummary_orderBy: SpotBalanceSummary_orderBy;
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
  TradeSummary: ResolverTypeWrapper<TradeSummary>;
  TradeSummary_filter: TradeSummary_filter;
  TradeSummary_orderBy: TradeSummary_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  CancelOrderEvent: CancelOrderEvent;
  CancelOrderEvent_filter: CancelOrderEvent_filter;
  Candlestick: Candlestick;
  Candlestick_filter: Candlestick_filter;
  Clearinghouse: Clearinghouse;
  Clearinghouse_filter: Clearinghouse_filter;
  ClosedPerpBalance: ClosedPerpBalance;
  ClosedPerpBalance_filter: ClosedPerpBalance_filter;
  ClosedSpotBalance: ClosedSpotBalance;
  ClosedSpotBalance_filter: ClosedSpotBalance_filter;
  FillOrderEvent: FillOrderEvent;
  FillOrderEvent_filter: FillOrderEvent_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LiquidationEvent: LiquidationEvent;
  LiquidationEvent_filter: LiquidationEvent_filter;
  Market: Market;
  MarketHourlySnapshot: MarketHourlySnapshot;
  MarketHourlySnapshot_filter: MarketHourlySnapshot_filter;
  Market_filter: Market_filter;
  ModifyCollateralEvent: ModifyCollateralEvent;
  ModifyCollateralEvent_filter: ModifyCollateralEvent_filter;
  Order: Order;
  Order_filter: Order_filter;
  PerpBalanceSummary: PerpBalanceSummary;
  PerpBalanceSummary_filter: PerpBalanceSummary_filter;
  PerpEngine: PerpEngine;
  PerpEngine_filter: PerpEngine_filter;
  PerpProduct: PerpProduct;
  PerpProductHourlySnapshot: PerpProductHourlySnapshot;
  PerpProductHourlySnapshot_filter: PerpProductHourlySnapshot_filter;
  PerpProduct_filter: PerpProduct_filter;
  Query: {};
  ReportOrderEvent: ReportOrderEvent;
  ReportOrderEvent_filter: ReportOrderEvent_filter;
  SettlePnlEvent: SettlePnlEvent;
  SettlePnlEvent_filter: SettlePnlEvent_filter;
  SocializeProductEvent: SocializeProductEvent;
  SocializeProductEvent_filter: SocializeProductEvent_filter;
  SpotBalanceSummary: SpotBalanceSummary;
  SpotBalanceSummary_filter: SpotBalanceSummary_filter;
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
  TradeSummary: TradeSummary;
  TradeSummary_filter: TradeSummary_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext & { endpoint: string }, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext & { endpoint: string }, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext & { endpoint: string }, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CancelOrderEventResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['CancelOrderEvent'] = ResolversParentTypes['CancelOrderEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['OrderValidationResult'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CandlestickResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Candlestick'] = ResolversParentTypes['Candlestick']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  openX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  closeX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lowX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  highX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeBase?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeQuote?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClearinghouseResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Clearinghouse'] = ResolversParentTypes['Clearinghouse']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quoteProduct?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  spotEngine?: Resolver<ResolversTypes['SpotEngine'], ParentType, ContextType>;
  perpEngine?: Resolver<ResolversTypes['PerpEngine'], ParentType, ContextType>;
  numSubaccounts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numProducts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccounts?: Resolver<Array<ResolversTypes['Subaccount']>, ParentType, ContextType, RequireFields<ClearinghousesubaccountsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClosedPerpBalanceResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['ClosedPerpBalance'] = ResolversParentTypes['ClosedPerpBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['PerpBalanceSummary'], ParentType, ContextType>;
  timeOpened?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timeClosed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  netFunding?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClosedSpotBalanceResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['ClosedSpotBalance'] = ResolversParentTypes['ClosedSpotBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['SpotBalanceSummary'], ParentType, ContextType>;
  timeOpened?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timeClosed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  netInterest?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FillOrderEventResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['FillOrderEvent'] = ResolversParentTypes['FillOrderEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  maker?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  makerOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  taker?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  takerOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  takerAmountDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  takerFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  makerFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LiquidationEventResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['LiquidationEvent'] = ResolversParentTypes['LiquidationEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidator?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  liquidatee?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidatorBaseDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidatorQuoteDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  insuranceCoverage?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
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
  markPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastFillPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeBase?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeQuote?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeNumOrders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  candlesticks?: Resolver<Array<ResolversTypes['Candlestick']>, ParentType, ContextType, RequireFields<MarketcandlesticksArgs, 'skip' | 'first'>>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MarketordersArgs, 'skip' | 'first'>>;
  snapshots?: Resolver<Array<ResolversTypes['MarketHourlySnapshot']>, ParentType, ContextType, RequireFields<MarketsnapshotsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketHourlySnapshotResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['MarketHourlySnapshot'] = ResolversParentTypes['MarketHourlySnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hour?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  markPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastFillPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeBase?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeQuote?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeNumOrders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModifyCollateralEventResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['ModifyCollateralEvent'] = ResolversParentTypes['ModifyCollateralEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  newBalanceAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['OrderType'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  digest?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  validationResult?: Resolver<ResolversTypes['OrderValidationResult'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  reportedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reportedAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  filledAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quoteAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collectedFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  expiration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realExpiration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpBalanceSummaryResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['PerpBalanceSummary'] = ResolversParentTypes['PerpBalanceSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  timeOpened?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  vQuoteWithoutFunding?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNetFunding?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  closedBalances?: Resolver<Array<ResolversTypes['ClosedPerpBalance']>, ParentType, ContextType, RequireFields<PerpBalanceSummaryclosedBalancesArgs, 'skip' | 'first'>>;
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
  emaPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingLongX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingShortX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openInterestX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  availableSettleX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<Array<ResolversTypes['PerpProductHourlySnapshot']>, ParentType, ContextType, RequireFields<PerpProductsnapshotsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpProductHourlySnapshotResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['PerpProductHourlySnapshot'] = ResolversParentTypes['PerpProductHourlySnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  hour?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['PerpProduct'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  emaPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingLongX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingShortX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openInterestX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  availableSettleX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
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
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryorderArgs, 'id' | 'subgraphError'>>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryordersArgs, 'skip' | 'first' | 'subgraphError'>>;
  modifyCollateralEvent?: Resolver<Maybe<ResolversTypes['ModifyCollateralEvent']>, ParentType, ContextType, RequireFields<QuerymodifyCollateralEventArgs, 'id' | 'subgraphError'>>;
  modifyCollateralEvents?: Resolver<Array<ResolversTypes['ModifyCollateralEvent']>, ParentType, ContextType, RequireFields<QuerymodifyCollateralEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  settlePnlEvent?: Resolver<Maybe<ResolversTypes['SettlePnlEvent']>, ParentType, ContextType, RequireFields<QuerysettlePnlEventArgs, 'id' | 'subgraphError'>>;
  settlePnlEvents?: Resolver<Array<ResolversTypes['SettlePnlEvent']>, ParentType, ContextType, RequireFields<QuerysettlePnlEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidationEvent?: Resolver<Maybe<ResolversTypes['LiquidationEvent']>, ParentType, ContextType, RequireFields<QueryliquidationEventArgs, 'id' | 'subgraphError'>>;
  liquidationEvents?: Resolver<Array<ResolversTypes['LiquidationEvent']>, ParentType, ContextType, RequireFields<QueryliquidationEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  socializeProductEvent?: Resolver<Maybe<ResolversTypes['SocializeProductEvent']>, ParentType, ContextType, RequireFields<QuerysocializeProductEventArgs, 'id' | 'subgraphError'>>;
  socializeProductEvents?: Resolver<Array<ResolversTypes['SocializeProductEvent']>, ParentType, ContextType, RequireFields<QuerysocializeProductEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  reportOrderEvent?: Resolver<Maybe<ResolversTypes['ReportOrderEvent']>, ParentType, ContextType, RequireFields<QueryreportOrderEventArgs, 'id' | 'subgraphError'>>;
  reportOrderEvents?: Resolver<Array<ResolversTypes['ReportOrderEvent']>, ParentType, ContextType, RequireFields<QueryreportOrderEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  fillOrderEvent?: Resolver<Maybe<ResolversTypes['FillOrderEvent']>, ParentType, ContextType, RequireFields<QueryfillOrderEventArgs, 'id' | 'subgraphError'>>;
  fillOrderEvents?: Resolver<Array<ResolversTypes['FillOrderEvent']>, ParentType, ContextType, RequireFields<QueryfillOrderEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelOrderEvent?: Resolver<Maybe<ResolversTypes['CancelOrderEvent']>, ParentType, ContextType, RequireFields<QuerycancelOrderEventArgs, 'id' | 'subgraphError'>>;
  cancelOrderEvents?: Resolver<Array<ResolversTypes['CancelOrderEvent']>, ParentType, ContextType, RequireFields<QuerycancelOrderEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subaccount?: Resolver<Maybe<ResolversTypes['Subaccount']>, ParentType, ContextType, RequireFields<QuerysubaccountArgs, 'id' | 'subgraphError'>>;
  subaccounts?: Resolver<Array<ResolversTypes['Subaccount']>, ParentType, ContextType, RequireFields<QuerysubaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tradeSummary?: Resolver<Maybe<ResolversTypes['TradeSummary']>, ParentType, ContextType, RequireFields<QuerytradeSummaryArgs, 'id' | 'subgraphError'>>;
  tradeSummaries?: Resolver<Array<ResolversTypes['TradeSummary']>, ParentType, ContextType, RequireFields<QuerytradeSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotBalanceSummary?: Resolver<Maybe<ResolversTypes['SpotBalanceSummary']>, ParentType, ContextType, RequireFields<QueryspotBalanceSummaryArgs, 'id' | 'subgraphError'>>;
  spotBalanceSummaries?: Resolver<Array<ResolversTypes['SpotBalanceSummary']>, ParentType, ContextType, RequireFields<QueryspotBalanceSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  closedSpotBalance?: Resolver<Maybe<ResolversTypes['ClosedSpotBalance']>, ParentType, ContextType, RequireFields<QueryclosedSpotBalanceArgs, 'id' | 'subgraphError'>>;
  closedSpotBalances?: Resolver<Array<ResolversTypes['ClosedSpotBalance']>, ParentType, ContextType, RequireFields<QueryclosedSpotBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpBalanceSummary?: Resolver<Maybe<ResolversTypes['PerpBalanceSummary']>, ParentType, ContextType, RequireFields<QueryperpBalanceSummaryArgs, 'id' | 'subgraphError'>>;
  perpBalanceSummaries?: Resolver<Array<ResolversTypes['PerpBalanceSummary']>, ParentType, ContextType, RequireFields<QueryperpBalanceSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  closedPerpBalance?: Resolver<Maybe<ResolversTypes['ClosedPerpBalance']>, ParentType, ContextType, RequireFields<QueryclosedPerpBalanceArgs, 'id' | 'subgraphError'>>;
  closedPerpBalances?: Resolver<Array<ResolversTypes['ClosedPerpBalance']>, ParentType, ContextType, RequireFields<QueryclosedPerpBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type ReportOrderEventResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['ReportOrderEvent'] = ResolversParentTypes['ReportOrderEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SettlePnlEventResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['SettlePnlEvent'] = ResolversParentTypes['SettlePnlEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocializeProductEventResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['SocializeProductEvent'] = ResolversParentTypes['SocializeProductEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  socializedQuote?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  socializedBase?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotBalanceSummaryResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['SpotBalanceSummary'] = ResolversParentTypes['SpotBalanceSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  timeOpened?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  netRealAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNetInterest?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  closedBalances?: Resolver<Array<ResolversTypes['ClosedSpotBalance']>, ParentType, ContextType, RequireFields<SpotBalanceSummaryclosedBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeDepositsMultiplierX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeBorrowsMultiplierX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDepositsNormalizedX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalBorrowsNormalizedX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
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
  tradeSummaries?: Resolver<Array<ResolversTypes['TradeSummary']>, ParentType, ContextType, RequireFields<SubaccounttradeSummariesArgs, 'skip' | 'first'>>;
  spotBalanceSummaries?: Resolver<Array<ResolversTypes['SpotBalanceSummary']>, ParentType, ContextType, RequireFields<SubaccountspotBalanceSummariesArgs, 'skip' | 'first'>>;
  perpBalanceSummaries?: Resolver<Array<ResolversTypes['PerpBalanceSummary']>, ParentType, ContextType, RequireFields<SubaccountperpBalanceSummariesArgs, 'skip' | 'first'>>;
  modifyCollateralEvents?: Resolver<Array<ResolversTypes['ModifyCollateralEvent']>, ParentType, ContextType, RequireFields<SubaccountmodifyCollateralEventsArgs, 'skip' | 'first'>>;
  settlePnlEvents?: Resolver<Array<ResolversTypes['SettlePnlEvent']>, ParentType, ContextType, RequireFields<SubaccountsettlePnlEventsArgs, 'skip' | 'first'>>;
  liquidateeEvents?: Resolver<Array<ResolversTypes['LiquidationEvent']>, ParentType, ContextType, RequireFields<SubaccountliquidateeEventsArgs, 'skip' | 'first'>>;
  liquidatorEvents?: Resolver<Array<ResolversTypes['LiquidationEvent']>, ParentType, ContextType, RequireFields<SubaccountliquidatorEventsArgs, 'skip' | 'first'>>;
  reportOrderEvents?: Resolver<Array<ResolversTypes['ReportOrderEvent']>, ParentType, ContextType, RequireFields<SubaccountreportOrderEventsArgs, 'skip' | 'first'>>;
  takerFillOrderEvents?: Resolver<Array<ResolversTypes['FillOrderEvent']>, ParentType, ContextType, RequireFields<SubaccounttakerFillOrderEventsArgs, 'skip' | 'first'>>;
  makerFillOrderEvents?: Resolver<Array<ResolversTypes['FillOrderEvent']>, ParentType, ContextType, RequireFields<SubaccountmakerFillOrderEventsArgs, 'skip' | 'first'>>;
  cancelOrderEvents?: Resolver<Array<ResolversTypes['CancelOrderEvent']>, ParentType, ContextType, RequireFields<SubaccountcancelOrderEventsArgs, 'skip' | 'first'>>;
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
  order?: SubscriptionResolver<Maybe<ResolversTypes['Order']>, "order", ParentType, ContextType, RequireFields<SubscriptionorderArgs, 'id' | 'subgraphError'>>;
  orders?: SubscriptionResolver<Array<ResolversTypes['Order']>, "orders", ParentType, ContextType, RequireFields<SubscriptionordersArgs, 'skip' | 'first' | 'subgraphError'>>;
  modifyCollateralEvent?: SubscriptionResolver<Maybe<ResolversTypes['ModifyCollateralEvent']>, "modifyCollateralEvent", ParentType, ContextType, RequireFields<SubscriptionmodifyCollateralEventArgs, 'id' | 'subgraphError'>>;
  modifyCollateralEvents?: SubscriptionResolver<Array<ResolversTypes['ModifyCollateralEvent']>, "modifyCollateralEvents", ParentType, ContextType, RequireFields<SubscriptionmodifyCollateralEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  settlePnlEvent?: SubscriptionResolver<Maybe<ResolversTypes['SettlePnlEvent']>, "settlePnlEvent", ParentType, ContextType, RequireFields<SubscriptionsettlePnlEventArgs, 'id' | 'subgraphError'>>;
  settlePnlEvents?: SubscriptionResolver<Array<ResolversTypes['SettlePnlEvent']>, "settlePnlEvents", ParentType, ContextType, RequireFields<SubscriptionsettlePnlEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidationEvent?: SubscriptionResolver<Maybe<ResolversTypes['LiquidationEvent']>, "liquidationEvent", ParentType, ContextType, RequireFields<SubscriptionliquidationEventArgs, 'id' | 'subgraphError'>>;
  liquidationEvents?: SubscriptionResolver<Array<ResolversTypes['LiquidationEvent']>, "liquidationEvents", ParentType, ContextType, RequireFields<SubscriptionliquidationEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  socializeProductEvent?: SubscriptionResolver<Maybe<ResolversTypes['SocializeProductEvent']>, "socializeProductEvent", ParentType, ContextType, RequireFields<SubscriptionsocializeProductEventArgs, 'id' | 'subgraphError'>>;
  socializeProductEvents?: SubscriptionResolver<Array<ResolversTypes['SocializeProductEvent']>, "socializeProductEvents", ParentType, ContextType, RequireFields<SubscriptionsocializeProductEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  reportOrderEvent?: SubscriptionResolver<Maybe<ResolversTypes['ReportOrderEvent']>, "reportOrderEvent", ParentType, ContextType, RequireFields<SubscriptionreportOrderEventArgs, 'id' | 'subgraphError'>>;
  reportOrderEvents?: SubscriptionResolver<Array<ResolversTypes['ReportOrderEvent']>, "reportOrderEvents", ParentType, ContextType, RequireFields<SubscriptionreportOrderEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  fillOrderEvent?: SubscriptionResolver<Maybe<ResolversTypes['FillOrderEvent']>, "fillOrderEvent", ParentType, ContextType, RequireFields<SubscriptionfillOrderEventArgs, 'id' | 'subgraphError'>>;
  fillOrderEvents?: SubscriptionResolver<Array<ResolversTypes['FillOrderEvent']>, "fillOrderEvents", ParentType, ContextType, RequireFields<SubscriptionfillOrderEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelOrderEvent?: SubscriptionResolver<Maybe<ResolversTypes['CancelOrderEvent']>, "cancelOrderEvent", ParentType, ContextType, RequireFields<SubscriptioncancelOrderEventArgs, 'id' | 'subgraphError'>>;
  cancelOrderEvents?: SubscriptionResolver<Array<ResolversTypes['CancelOrderEvent']>, "cancelOrderEvents", ParentType, ContextType, RequireFields<SubscriptioncancelOrderEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  subaccount?: SubscriptionResolver<Maybe<ResolversTypes['Subaccount']>, "subaccount", ParentType, ContextType, RequireFields<SubscriptionsubaccountArgs, 'id' | 'subgraphError'>>;
  subaccounts?: SubscriptionResolver<Array<ResolversTypes['Subaccount']>, "subaccounts", ParentType, ContextType, RequireFields<SubscriptionsubaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tradeSummary?: SubscriptionResolver<Maybe<ResolversTypes['TradeSummary']>, "tradeSummary", ParentType, ContextType, RequireFields<SubscriptiontradeSummaryArgs, 'id' | 'subgraphError'>>;
  tradeSummaries?: SubscriptionResolver<Array<ResolversTypes['TradeSummary']>, "tradeSummaries", ParentType, ContextType, RequireFields<SubscriptiontradeSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotBalanceSummary?: SubscriptionResolver<Maybe<ResolversTypes['SpotBalanceSummary']>, "spotBalanceSummary", ParentType, ContextType, RequireFields<SubscriptionspotBalanceSummaryArgs, 'id' | 'subgraphError'>>;
  spotBalanceSummaries?: SubscriptionResolver<Array<ResolversTypes['SpotBalanceSummary']>, "spotBalanceSummaries", ParentType, ContextType, RequireFields<SubscriptionspotBalanceSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  closedSpotBalance?: SubscriptionResolver<Maybe<ResolversTypes['ClosedSpotBalance']>, "closedSpotBalance", ParentType, ContextType, RequireFields<SubscriptionclosedSpotBalanceArgs, 'id' | 'subgraphError'>>;
  closedSpotBalances?: SubscriptionResolver<Array<ResolversTypes['ClosedSpotBalance']>, "closedSpotBalances", ParentType, ContextType, RequireFields<SubscriptionclosedSpotBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpBalanceSummary?: SubscriptionResolver<Maybe<ResolversTypes['PerpBalanceSummary']>, "perpBalanceSummary", ParentType, ContextType, RequireFields<SubscriptionperpBalanceSummaryArgs, 'id' | 'subgraphError'>>;
  perpBalanceSummaries?: SubscriptionResolver<Array<ResolversTypes['PerpBalanceSummary']>, "perpBalanceSummaries", ParentType, ContextType, RequireFields<SubscriptionperpBalanceSummariesArgs, 'skip' | 'first' | 'subgraphError'>>;
  closedPerpBalance?: SubscriptionResolver<Maybe<ResolversTypes['ClosedPerpBalance']>, "closedPerpBalance", ParentType, ContextType, RequireFields<SubscriptionclosedPerpBalanceArgs, 'id' | 'subgraphError'>>;
  closedPerpBalances?: SubscriptionResolver<Array<ResolversTypes['ClosedPerpBalance']>, "closedPerpBalances", ParentType, ContextType, RequireFields<SubscriptionclosedPerpBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TradeSummaryResolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['TradeSummary'] = ResolversParentTypes['TradeSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  totalEntryQuoteAmountAbs?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalEntryAmountAbs?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalCloseQuoteAmountAbs?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalCloseAmountAbs?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext & { endpoint: string }, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext & { endpoint: string }> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  CancelOrderEvent?: CancelOrderEventResolvers<ContextType>;
  Candlestick?: CandlestickResolvers<ContextType>;
  Clearinghouse?: ClearinghouseResolvers<ContextType>;
  ClosedPerpBalance?: ClosedPerpBalanceResolvers<ContextType>;
  ClosedSpotBalance?: ClosedSpotBalanceResolvers<ContextType>;
  FillOrderEvent?: FillOrderEventResolvers<ContextType>;
  LiquidationEvent?: LiquidationEventResolvers<ContextType>;
  Market?: MarketResolvers<ContextType>;
  MarketHourlySnapshot?: MarketHourlySnapshotResolvers<ContextType>;
  ModifyCollateralEvent?: ModifyCollateralEventResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  PerpBalanceSummary?: PerpBalanceSummaryResolvers<ContextType>;
  PerpEngine?: PerpEngineResolvers<ContextType>;
  PerpProduct?: PerpProductResolvers<ContextType>;
  PerpProductHourlySnapshot?: PerpProductHourlySnapshotResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReportOrderEvent?: ReportOrderEventResolvers<ContextType>;
  SettlePnlEvent?: SettlePnlEventResolvers<ContextType>;
  SocializeProductEvent?: SocializeProductEventResolvers<ContextType>;
  SpotBalanceSummary?: SpotBalanceSummaryResolvers<ContextType>;
  SpotEngine?: SpotEngineResolvers<ContextType>;
  SpotProduct?: SpotProductResolvers<ContextType>;
  SpotProductHourlySnapshot?: SpotProductHourlySnapshotResolvers<ContextType>;
  Subaccount?: SubaccountResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TradeSummary?: TradeSummaryResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext & { endpoint: string }> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = ClearinghouseTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/Clearinghouse/introspectionSchema":
      return import("./sources/Clearinghouse/introspectionSchema") as T;
    
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

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const clearinghouseTransforms = [];
const additionalTypeDefs = [] as any[];
const clearinghouseHandler = new GraphqlHandler({
              name: "Clearinghouse",
              config: {"endpoint":"{context.endpoint:https://api.thegraph.com/subgraphs/name/vertex-protocol/vertex-goerli}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("Clearinghouse"),
              logger: logger.child("Clearinghouse"),
              importFn,
            });
clearinghouseTransforms[0] = new AutoPaginationTransform({
                  apiName: "Clearinghouse",
                  config: {"validateSchema":true},
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
clearinghouseTransforms[1] = new BlockTrackingTransform({
                  apiName: "Clearinghouse",
                  config: {"validateSchema":true,"ignoreFieldNames":[],"ignoreOperationNames":[]},
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
const merger = new(BareMerger as any)({
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
        document: CandlesticksQueryDocument,
        get rawSDL() {
          return printWithCache(CandlesticksQueryDocument);
        },
        location: 'CandlesticksQueryDocument.graphql'
      },{
        document: HourlyHistoricalMarketDataQueryDocument,
        get rawSDL() {
          return printWithCache(HourlyHistoricalMarketDataQueryDocument);
        },
        location: 'HourlyHistoricalMarketDataQueryDocument.graphql'
      },{
        document: HourlyHistoricalProductDataQueryDocument,
        get rawSDL() {
          return printWithCache(HourlyHistoricalProductDataQueryDocument);
        },
        location: 'HourlyHistoricalProductDataQueryDocument.graphql'
      },{
        document: LatestOrderFillsQueryDocument,
        get rawSDL() {
          return printWithCache(LatestOrderFillsQueryDocument);
        },
        location: 'LatestOrderFillsQueryDocument.graphql'
      },{
        document: PaginatedAllMarketOrdersQueryDocument,
        get rawSDL() {
          return printWithCache(PaginatedAllMarketOrdersQueryDocument);
        },
        location: 'PaginatedAllMarketOrdersQueryDocument.graphql'
      },{
        document: PaginatedSubaccountOrdersQueryDocument,
        get rawSDL() {
          return printWithCache(PaginatedSubaccountOrdersQueryDocument);
        },
        location: 'PaginatedSubaccountOrdersQueryDocument.graphql'
      },{
        document: PaginatedSubaccountOrdersForProductsQueryDocument,
        get rawSDL() {
          return printWithCache(PaginatedSubaccountOrdersForProductsQueryDocument);
        },
        location: 'PaginatedSubaccountOrdersForProductsQueryDocument.graphql'
      },{
        document: OrderByDigestQueryDocument,
        get rawSDL() {
          return printWithCache(OrderByDigestQueryDocument);
        },
        location: 'OrderByDigestQueryDocument.graphql'
      },{
        document: SubaccountModifyCollateralEventHistoryQueryDocument,
        get rawSDL() {
          return printWithCache(SubaccountModifyCollateralEventHistoryQueryDocument);
        },
        location: 'SubaccountModifyCollateralEventHistoryQueryDocument.graphql'
      },{
        document: SubaccountLiquidationEventHistoryQueryDocument,
        get rawSDL() {
          return printWithCache(SubaccountLiquidationEventHistoryQueryDocument);
        },
        location: 'SubaccountLiquidationEventHistoryQueryDocument.graphql'
      },{
        document: SubaccountSettlementEventHistoryQueryDocument,
        get rawSDL() {
          return printWithCache(SubaccountSettlementEventHistoryQueryDocument);
        },
        location: 'SubaccountSettlementEventHistoryQueryDocument.graphql'
      },{
        document: SubaccountStateQueryDocument,
        get rawSDL() {
          return printWithCache(SubaccountStateQueryDocument);
        },
        location: 'SubaccountStateQueryDocument.graphql'
      },{
        document: SubaccountsForAddressDocument,
        get rawSDL() {
          return printWithCache(SubaccountsForAddressDocument);
        },
        location: 'SubaccountsForAddressDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler() {
  return createMeshHTTPHandler({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type CandlesticksQueryQueryVariables = Exact<{
  marketEntityId: Scalars['String'];
  maxTimeExclusive: Scalars['BigInt'];
  limit: Scalars['Int'];
}>;


export type CandlesticksQueryQuery = { candlesticks: Array<Pick<Candlestick, 'id' | 'time' | 'openX18' | 'closeX18' | 'highX18' | 'lowX18' | 'volumeQuote'>> };

export type HourlyHistoricalMarketDataQueryQueryVariables = Exact<{
  marketEntityId: Scalars['String'];
  maxHourExclusive: Scalars['BigInt'];
  minHourInclusive: Scalars['BigInt'];
}>;


export type HourlyHistoricalMarketDataQueryQuery = { marketHourlySnapshots: Array<Pick<MarketHourlySnapshot, 'id' | 'hour' | 'volumeNumOrders' | 'volumeQuote' | 'lastFillPriceX18'>> };

export type HourlyHistoricalProductDataQueryQueryVariables = Exact<{
  productEntityId: Scalars['String'];
  minHourInclusive: Scalars['BigInt'];
  maxHourExclusive: Scalars['BigInt'];
}>;


export type HourlyHistoricalProductDataQueryQuery = { spotProductHourlySnapshots: Array<Pick<SpotProductHourlySnapshot, 'id' | 'hour' | 'priceX18'>>, perpProductHourlySnapshots: Array<Pick<PerpProductHourlySnapshot, 'id' | 'hour' | 'priceX18' | 'openInterestX18'>> };

export type LatestOrderFillsQueryQueryVariables = Exact<{
  marketEntityId: Scalars['String'];
}>;


export type LatestOrderFillsQueryQuery = { fillOrderEvents: Array<(
    Pick<FillOrderEvent, 'blockTime' | 'takerAmountDelta'>
    & { makerOrder: Pick<Order, 'priceX18'> }
  )> };

export type PaginatedAllMarketOrdersQueryQueryVariables = Exact<{
  marketEntityId: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type PaginatedAllMarketOrdersQueryQuery = { orders: Array<(
    Pick<Order, 'id' | 'digest' | 'validationResult' | 'priceX18' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
    & { subaccount: Pick<Subaccount, 'subaccountId'>, market: Pick<Market, 'productId'> }
  )> };

export type PaginatedSubaccountOrdersQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type PaginatedSubaccountOrdersQueryQuery = { orders: Array<(
    Pick<Order, 'id' | 'digest' | 'validationResult' | 'priceX18' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
    & { subaccount: Pick<Subaccount, 'subaccountId'>, market: Pick<Market, 'productId'> }
  )> };

export type PaginatedSubaccountOrdersForProductsQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  allowedMarkets: Array<Scalars['String']> | Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type PaginatedSubaccountOrdersForProductsQueryQuery = { orders: Array<(
    Pick<Order, 'id' | 'digest' | 'validationResult' | 'priceX18' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
    & { subaccount: Pick<Subaccount, 'subaccountId'>, market: Pick<Market, 'productId'> }
  )> };

export type OrderByDigestQueryQueryVariables = Exact<{
  digest: Scalars['Bytes'];
  marketEntityId: Scalars['String'];
}>;


export type OrderByDigestQueryQuery = { orders: Array<(
    Pick<Order, 'id' | 'digest' | 'validationResult' | 'priceX18' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
    & { subaccount: Pick<Subaccount, 'subaccountId'>, market: Pick<Market, 'productId'> }
  )> };

export type OrderEntityFieldsFragmentFragment = (
  Pick<Order, 'id' | 'digest' | 'validationResult' | 'priceX18' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
  & { subaccount: Pick<Subaccount, 'subaccountId'>, market: Pick<Market, 'productId'> }
);

export type SubaccountModifyCollateralEventHistoryQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  maxTimeExclusive: Scalars['BigInt'];
  minTimeInclusive: Scalars['BigInt'];
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type SubaccountModifyCollateralEventHistoryQueryQuery = { modifyCollateralEvents: Array<Pick<ModifyCollateralEvent, 'id' | 'blockTime' | 'amount' | 'productId'>> };

export type SubaccountLiquidationEventHistoryQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  maxTimeExclusive: Scalars['BigInt'];
  minTimeInclusive: Scalars['BigInt'];
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type SubaccountLiquidationEventHistoryQueryQuery = { liquidationEvents: Array<Pick<LiquidationEvent, 'id' | 'blockTime' | 'productId' | 'liquidatorBaseDelta' | 'liquidatorQuoteDelta' | 'insuranceCoverage'>> };

export type SubaccountSettlementEventHistoryQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  maxTimeExclusive: Scalars['BigInt'];
  minTimeInclusive: Scalars['BigInt'];
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type SubaccountSettlementEventHistoryQueryQuery = { settlePnlEvents: Array<Pick<SettlePnlEvent, 'id' | 'blockTime' | 'productId' | 'amount'>> };

export type SubaccountStateQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['ID'];
}>;


export type SubaccountStateQueryQuery = { subaccount?: Maybe<(
    Pick<Subaccount, 'id' | 'owner' | 'name' | 'createdAt' | 'createdAtBlock'>
    & { spotBalanceSummaries: Array<Pick<SpotBalanceSummary, 'id' | 'productId' | 'timeOpened' | 'netRealAmount' | 'totalNetInterest'>>, perpBalanceSummaries: Array<Pick<PerpBalanceSummary, 'id' | 'productId' | 'timeOpened' | 'vQuoteWithoutFunding' | 'totalNetFunding'>>, tradeSummaries: Array<Pick<TradeSummary, 'id' | 'productId' | 'totalEntryQuoteAmountAbs' | 'totalEntryAmountAbs' | 'totalCloseQuoteAmountAbs' | 'totalCloseAmountAbs'>> }
  )> };

export type SubaccountsForAddressQueryVariables = Exact<{
  address: Scalars['Bytes'];
}>;


export type SubaccountsForAddressQuery = { subaccounts: Array<Pick<Subaccount, 'id' | 'name' | 'subaccountId' | 'owner'>> };

export const OrderEntityFieldsFragmentFragmentDoc = gql`
    fragment OrderEntityFieldsFragment on Order {
  id
  digest
  validationResult
  priceX18
  subaccount {
    subaccountId
  }
  market {
    productId
  }
  reportedAt
  reportedAtBlock
  filledAmount
  totalAmount
  quoteAmount
  collectedFee
}
    ` as unknown as DocumentNode<OrderEntityFieldsFragmentFragment, unknown>;
export const CandlesticksQueryDocument = gql`
    query CandlesticksQuery($marketEntityId: String!, $maxTimeExclusive: BigInt!, $limit: Int!) {
  candlesticks(
    where: {market: $marketEntityId, time_lt: $maxTimeExclusive}
    orderBy: time
    orderDirection: desc
    first: $limit
  ) {
    id
    time
    openX18
    closeX18
    highX18
    lowX18
    volumeQuote
  }
}
    ` as unknown as DocumentNode<CandlesticksQueryQuery, CandlesticksQueryQueryVariables>;
export const HourlyHistoricalMarketDataQueryDocument = gql`
    query HourlyHistoricalMarketDataQuery($marketEntityId: String!, $maxHourExclusive: BigInt!, $minHourInclusive: BigInt!) {
  marketHourlySnapshots(
    where: {market: $marketEntityId, hour_gte: $minHourInclusive, hour_lt: $maxHourExclusive}
    orderBy: hour
    orderDirection: desc
  ) {
    id
    hour
    volumeNumOrders
    volumeQuote
    lastFillPriceX18
  }
}
    ` as unknown as DocumentNode<HourlyHistoricalMarketDataQueryQuery, HourlyHistoricalMarketDataQueryQueryVariables>;
export const HourlyHistoricalProductDataQueryDocument = gql`
    query HourlyHistoricalProductDataQuery($productEntityId: String!, $minHourInclusive: BigInt!, $maxHourExclusive: BigInt!) {
  spotProductHourlySnapshots(
    where: {product: $productEntityId, hour_gte: $minHourInclusive, hour_lt: $maxHourExclusive}
  ) {
    id
    hour
    priceX18
  }
  perpProductHourlySnapshots(
    where: {product: $productEntityId, hour_gte: $minHourInclusive, hour_lt: $maxHourExclusive}
  ) {
    id
    hour
    priceX18
    openInterestX18
  }
}
    ` as unknown as DocumentNode<HourlyHistoricalProductDataQueryQuery, HourlyHistoricalProductDataQueryQueryVariables>;
export const LatestOrderFillsQueryDocument = gql`
    query LatestOrderFillsQuery($marketEntityId: String!) {
  fillOrderEvents(
    where: {market: $marketEntityId}
    orderBy: blockTime
    orderDirection: desc
    first: 100
  ) {
    blockTime
    takerAmountDelta
    makerOrder {
      priceX18
    }
  }
}
    ` as unknown as DocumentNode<LatestOrderFillsQueryQuery, LatestOrderFillsQueryQueryVariables>;
export const PaginatedAllMarketOrdersQueryDocument = gql`
    query PaginatedAllMarketOrdersQuery($marketEntityId: String!, $first: Int, $skip: Int) {
  orders(
    where: {market: $marketEntityId}
    first: $first
    skip: $skip
    orderDirection: desc
    orderBy: reportedAt
  ) {
    ...OrderEntityFieldsFragment
  }
}
    ${OrderEntityFieldsFragmentFragmentDoc}` as unknown as DocumentNode<PaginatedAllMarketOrdersQueryQuery, PaginatedAllMarketOrdersQueryQueryVariables>;
export const PaginatedSubaccountOrdersQueryDocument = gql`
    query PaginatedSubaccountOrdersQuery($subaccountEntityId: String!, $first: Int, $skip: Int) {
  orders(
    where: {subaccount: $subaccountEntityId}
    first: $first
    skip: $skip
    orderDirection: desc
    orderBy: reportedAt
  ) {
    ...OrderEntityFieldsFragment
  }
}
    ${OrderEntityFieldsFragmentFragmentDoc}` as unknown as DocumentNode<PaginatedSubaccountOrdersQueryQuery, PaginatedSubaccountOrdersQueryQueryVariables>;
export const PaginatedSubaccountOrdersForProductsQueryDocument = gql`
    query PaginatedSubaccountOrdersForProductsQuery($subaccountEntityId: String!, $allowedMarkets: [String!]!, $first: Int, $skip: Int) {
  orders(
    where: {subaccount: $subaccountEntityId, market_in: $allowedMarkets}
    first: $first
    skip: $skip
    orderDirection: desc
    orderBy: reportedAt
  ) {
    ...OrderEntityFieldsFragment
  }
}
    ${OrderEntityFieldsFragmentFragmentDoc}` as unknown as DocumentNode<PaginatedSubaccountOrdersForProductsQueryQuery, PaginatedSubaccountOrdersForProductsQueryQueryVariables>;
export const OrderByDigestQueryDocument = gql`
    query OrderByDigestQuery($digest: Bytes!, $marketEntityId: String!) {
  orders(where: {digest: $digest, market: $marketEntityId}) {
    ...OrderEntityFieldsFragment
  }
}
    ${OrderEntityFieldsFragmentFragmentDoc}` as unknown as DocumentNode<OrderByDigestQueryQuery, OrderByDigestQueryQueryVariables>;
export const SubaccountModifyCollateralEventHistoryQueryDocument = gql`
    query SubaccountModifyCollateralEventHistoryQuery($subaccountEntityId: String!, $maxTimeExclusive: BigInt!, $minTimeInclusive: BigInt!, $skip: Int, $first: Int) {
  modifyCollateralEvents(
    where: {subaccount: $subaccountEntityId, blockTime_lt: $maxTimeExclusive, blockTime_gt: $minTimeInclusive}
    orderBy: blockTime
    orderDirection: desc
    first: $first
    skip: $skip
  ) {
    id
    blockTime
    amount
    productId
  }
}
    ` as unknown as DocumentNode<SubaccountModifyCollateralEventHistoryQueryQuery, SubaccountModifyCollateralEventHistoryQueryQueryVariables>;
export const SubaccountLiquidationEventHistoryQueryDocument = gql`
    query SubaccountLiquidationEventHistoryQuery($subaccountEntityId: String!, $maxTimeExclusive: BigInt!, $minTimeInclusive: BigInt!, $skip: Int, $first: Int) {
  liquidationEvents(
    where: {liquidatee: $subaccountEntityId, blockTime_lt: $maxTimeExclusive, blockTime_gt: $minTimeInclusive}
    orderBy: blockTime
    orderDirection: desc
    first: $first
    skip: $skip
  ) {
    id
    blockTime
    productId
    liquidatorBaseDelta
    liquidatorQuoteDelta
    insuranceCoverage
  }
}
    ` as unknown as DocumentNode<SubaccountLiquidationEventHistoryQueryQuery, SubaccountLiquidationEventHistoryQueryQueryVariables>;
export const SubaccountSettlementEventHistoryQueryDocument = gql`
    query SubaccountSettlementEventHistoryQuery($subaccountEntityId: String!, $maxTimeExclusive: BigInt!, $minTimeInclusive: BigInt!, $skip: Int, $first: Int) {
  settlePnlEvents(
    where: {subaccount: $subaccountEntityId, blockTime_lt: $maxTimeExclusive, blockTime_gt: $minTimeInclusive}
    orderBy: blockTime
    orderDirection: desc
    first: $first
    skip: $skip
  ) {
    id
    blockTime
    productId
    amount
  }
}
    ` as unknown as DocumentNode<SubaccountSettlementEventHistoryQueryQuery, SubaccountSettlementEventHistoryQueryQueryVariables>;
export const SubaccountStateQueryDocument = gql`
    query SubaccountStateQuery($subaccountEntityId: ID!) {
  subaccount(id: $subaccountEntityId) {
    id
    owner
    name
    createdAt
    createdAtBlock
    spotBalanceSummaries {
      id
      productId
      timeOpened
      netRealAmount
      totalNetInterest
    }
    perpBalanceSummaries {
      id
      productId
      timeOpened
      vQuoteWithoutFunding
      totalNetFunding
    }
    tradeSummaries {
      id
      productId
      totalEntryQuoteAmountAbs
      totalEntryAmountAbs
      totalCloseQuoteAmountAbs
      totalCloseAmountAbs
    }
  }
}
    ` as unknown as DocumentNode<SubaccountStateQueryQuery, SubaccountStateQueryQueryVariables>;
export const SubaccountsForAddressDocument = gql`
    query SubaccountsForAddress($address: Bytes!) {
  subaccounts(where: {owner: $address}) {
    id
    name
    subaccountId
    owner
  }
}
    ` as unknown as DocumentNode<SubaccountsForAddressQuery, SubaccountsForAddressQueryVariables>;














export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    CandlesticksQuery(variables: CandlesticksQueryQueryVariables, options?: C): Promise<CandlesticksQueryQuery> {
      return requester<CandlesticksQueryQuery, CandlesticksQueryQueryVariables>(CandlesticksQueryDocument, variables, options) as Promise<CandlesticksQueryQuery>;
    },
    HourlyHistoricalMarketDataQuery(variables: HourlyHistoricalMarketDataQueryQueryVariables, options?: C): Promise<HourlyHistoricalMarketDataQueryQuery> {
      return requester<HourlyHistoricalMarketDataQueryQuery, HourlyHistoricalMarketDataQueryQueryVariables>(HourlyHistoricalMarketDataQueryDocument, variables, options) as Promise<HourlyHistoricalMarketDataQueryQuery>;
    },
    HourlyHistoricalProductDataQuery(variables: HourlyHistoricalProductDataQueryQueryVariables, options?: C): Promise<HourlyHistoricalProductDataQueryQuery> {
      return requester<HourlyHistoricalProductDataQueryQuery, HourlyHistoricalProductDataQueryQueryVariables>(HourlyHistoricalProductDataQueryDocument, variables, options) as Promise<HourlyHistoricalProductDataQueryQuery>;
    },
    LatestOrderFillsQuery(variables: LatestOrderFillsQueryQueryVariables, options?: C): Promise<LatestOrderFillsQueryQuery> {
      return requester<LatestOrderFillsQueryQuery, LatestOrderFillsQueryQueryVariables>(LatestOrderFillsQueryDocument, variables, options) as Promise<LatestOrderFillsQueryQuery>;
    },
    PaginatedAllMarketOrdersQuery(variables: PaginatedAllMarketOrdersQueryQueryVariables, options?: C): Promise<PaginatedAllMarketOrdersQueryQuery> {
      return requester<PaginatedAllMarketOrdersQueryQuery, PaginatedAllMarketOrdersQueryQueryVariables>(PaginatedAllMarketOrdersQueryDocument, variables, options) as Promise<PaginatedAllMarketOrdersQueryQuery>;
    },
    PaginatedSubaccountOrdersQuery(variables: PaginatedSubaccountOrdersQueryQueryVariables, options?: C): Promise<PaginatedSubaccountOrdersQueryQuery> {
      return requester<PaginatedSubaccountOrdersQueryQuery, PaginatedSubaccountOrdersQueryQueryVariables>(PaginatedSubaccountOrdersQueryDocument, variables, options) as Promise<PaginatedSubaccountOrdersQueryQuery>;
    },
    PaginatedSubaccountOrdersForProductsQuery(variables: PaginatedSubaccountOrdersForProductsQueryQueryVariables, options?: C): Promise<PaginatedSubaccountOrdersForProductsQueryQuery> {
      return requester<PaginatedSubaccountOrdersForProductsQueryQuery, PaginatedSubaccountOrdersForProductsQueryQueryVariables>(PaginatedSubaccountOrdersForProductsQueryDocument, variables, options) as Promise<PaginatedSubaccountOrdersForProductsQueryQuery>;
    },
    OrderByDigestQuery(variables: OrderByDigestQueryQueryVariables, options?: C): Promise<OrderByDigestQueryQuery> {
      return requester<OrderByDigestQueryQuery, OrderByDigestQueryQueryVariables>(OrderByDigestQueryDocument, variables, options) as Promise<OrderByDigestQueryQuery>;
    },
    SubaccountModifyCollateralEventHistoryQuery(variables: SubaccountModifyCollateralEventHistoryQueryQueryVariables, options?: C): Promise<SubaccountModifyCollateralEventHistoryQueryQuery> {
      return requester<SubaccountModifyCollateralEventHistoryQueryQuery, SubaccountModifyCollateralEventHistoryQueryQueryVariables>(SubaccountModifyCollateralEventHistoryQueryDocument, variables, options) as Promise<SubaccountModifyCollateralEventHistoryQueryQuery>;
    },
    SubaccountLiquidationEventHistoryQuery(variables: SubaccountLiquidationEventHistoryQueryQueryVariables, options?: C): Promise<SubaccountLiquidationEventHistoryQueryQuery> {
      return requester<SubaccountLiquidationEventHistoryQueryQuery, SubaccountLiquidationEventHistoryQueryQueryVariables>(SubaccountLiquidationEventHistoryQueryDocument, variables, options) as Promise<SubaccountLiquidationEventHistoryQueryQuery>;
    },
    SubaccountSettlementEventHistoryQuery(variables: SubaccountSettlementEventHistoryQueryQueryVariables, options?: C): Promise<SubaccountSettlementEventHistoryQueryQuery> {
      return requester<SubaccountSettlementEventHistoryQueryQuery, SubaccountSettlementEventHistoryQueryQueryVariables>(SubaccountSettlementEventHistoryQueryDocument, variables, options) as Promise<SubaccountSettlementEventHistoryQueryQuery>;
    },
    SubaccountStateQuery(variables: SubaccountStateQueryQueryVariables, options?: C): Promise<SubaccountStateQueryQuery> {
      return requester<SubaccountStateQueryQuery, SubaccountStateQueryQueryVariables>(SubaccountStateQueryDocument, variables, options) as Promise<SubaccountStateQueryQuery>;
    },
    SubaccountsForAddress(variables: SubaccountsForAddressQueryVariables, options?: C): Promise<SubaccountsForAddressQuery> {
      return requester<SubaccountsForAddressQuery, SubaccountsForAddressQueryVariables>(SubaccountsForAddressDocument, variables, options) as Promise<SubaccountsForAddressQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;