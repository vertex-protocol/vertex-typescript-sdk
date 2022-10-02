// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ModifyCollateralEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'subaccount'
  | 'amount'
  | 'productId';

export type Order = {
  id: Scalars['ID'];
  digest: Scalars['Bytes'];
  validationResult: OrderValidationResult;
  priceX18: Scalars['BigInt'];
  subaccount: Subaccount;
  market: Market;
  reportedAt: Scalars['BigInt'];
  reportedAtBlock: Scalars['BigInt'];
  totalAmount: Scalars['BigInt'];
  filledAmount: Scalars['BigInt'];
  collectedFee: Scalars['BigInt'];
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

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
  | 'digest'
  | 'validationResult'
  | 'priceX18'
  | 'subaccount'
  | 'market'
  | 'reportedAt'
  | 'reportedAtBlock'
  | 'totalAmount'
  | 'filledAmount'
  | 'collectedFee';

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

  export type QuerySdk = {
      /** null **/
  clearinghouse: InContextSdkMethod<Query['clearinghouse'], QueryclearinghouseArgs, MeshContext>,
  /** null **/
  clearinghouses: InContextSdkMethod<Query['clearinghouses'], QueryclearinghousesArgs, MeshContext>,
  /** null **/
  spotEngine: InContextSdkMethod<Query['spotEngine'], QueryspotEngineArgs, MeshContext>,
  /** null **/
  spotEngines: InContextSdkMethod<Query['spotEngines'], QueryspotEnginesArgs, MeshContext>,
  /** null **/
  perpEngine: InContextSdkMethod<Query['perpEngine'], QueryperpEngineArgs, MeshContext>,
  /** null **/
  perpEngines: InContextSdkMethod<Query['perpEngines'], QueryperpEnginesArgs, MeshContext>,
  /** null **/
  spotProduct: InContextSdkMethod<Query['spotProduct'], QueryspotProductArgs, MeshContext>,
  /** null **/
  spotProducts: InContextSdkMethod<Query['spotProducts'], QueryspotProductsArgs, MeshContext>,
  /** null **/
  spotProductHourlySnapshot: InContextSdkMethod<Query['spotProductHourlySnapshot'], QueryspotProductHourlySnapshotArgs, MeshContext>,
  /** null **/
  spotProductHourlySnapshots: InContextSdkMethod<Query['spotProductHourlySnapshots'], QueryspotProductHourlySnapshotsArgs, MeshContext>,
  /** null **/
  perpProduct: InContextSdkMethod<Query['perpProduct'], QueryperpProductArgs, MeshContext>,
  /** null **/
  perpProducts: InContextSdkMethod<Query['perpProducts'], QueryperpProductsArgs, MeshContext>,
  /** null **/
  perpProductHourlySnapshot: InContextSdkMethod<Query['perpProductHourlySnapshot'], QueryperpProductHourlySnapshotArgs, MeshContext>,
  /** null **/
  perpProductHourlySnapshots: InContextSdkMethod<Query['perpProductHourlySnapshots'], QueryperpProductHourlySnapshotsArgs, MeshContext>,
  /** null **/
  market: InContextSdkMethod<Query['market'], QuerymarketArgs, MeshContext>,
  /** null **/
  markets: InContextSdkMethod<Query['markets'], QuerymarketsArgs, MeshContext>,
  /** null **/
  marketHourlySnapshot: InContextSdkMethod<Query['marketHourlySnapshot'], QuerymarketHourlySnapshotArgs, MeshContext>,
  /** null **/
  marketHourlySnapshots: InContextSdkMethod<Query['marketHourlySnapshots'], QuerymarketHourlySnapshotsArgs, MeshContext>,
  /** null **/
  candlestick: InContextSdkMethod<Query['candlestick'], QuerycandlestickArgs, MeshContext>,
  /** null **/
  candlesticks: InContextSdkMethod<Query['candlesticks'], QuerycandlesticksArgs, MeshContext>,
  /** null **/
  order: InContextSdkMethod<Query['order'], QueryorderArgs, MeshContext>,
  /** null **/
  orders: InContextSdkMethod<Query['orders'], QueryordersArgs, MeshContext>,
  /** null **/
  modifyCollateralEvent: InContextSdkMethod<Query['modifyCollateralEvent'], QuerymodifyCollateralEventArgs, MeshContext>,
  /** null **/
  modifyCollateralEvents: InContextSdkMethod<Query['modifyCollateralEvents'], QuerymodifyCollateralEventsArgs, MeshContext>,
  /** null **/
  settlePnlEvent: InContextSdkMethod<Query['settlePnlEvent'], QuerysettlePnlEventArgs, MeshContext>,
  /** null **/
  settlePnlEvents: InContextSdkMethod<Query['settlePnlEvents'], QuerysettlePnlEventsArgs, MeshContext>,
  /** null **/
  liquidationEvent: InContextSdkMethod<Query['liquidationEvent'], QueryliquidationEventArgs, MeshContext>,
  /** null **/
  liquidationEvents: InContextSdkMethod<Query['liquidationEvents'], QueryliquidationEventsArgs, MeshContext>,
  /** null **/
  socializeProductEvent: InContextSdkMethod<Query['socializeProductEvent'], QuerysocializeProductEventArgs, MeshContext>,
  /** null **/
  socializeProductEvents: InContextSdkMethod<Query['socializeProductEvents'], QuerysocializeProductEventsArgs, MeshContext>,
  /** null **/
  reportOrderEvent: InContextSdkMethod<Query['reportOrderEvent'], QueryreportOrderEventArgs, MeshContext>,
  /** null **/
  reportOrderEvents: InContextSdkMethod<Query['reportOrderEvents'], QueryreportOrderEventsArgs, MeshContext>,
  /** null **/
  fillOrderEvent: InContextSdkMethod<Query['fillOrderEvent'], QueryfillOrderEventArgs, MeshContext>,
  /** null **/
  fillOrderEvents: InContextSdkMethod<Query['fillOrderEvents'], QueryfillOrderEventsArgs, MeshContext>,
  /** null **/
  cancelOrderEvent: InContextSdkMethod<Query['cancelOrderEvent'], QuerycancelOrderEventArgs, MeshContext>,
  /** null **/
  cancelOrderEvents: InContextSdkMethod<Query['cancelOrderEvents'], QuerycancelOrderEventsArgs, MeshContext>,
  /** null **/
  subaccount: InContextSdkMethod<Query['subaccount'], QuerysubaccountArgs, MeshContext>,
  /** null **/
  subaccounts: InContextSdkMethod<Query['subaccounts'], QuerysubaccountsArgs, MeshContext>,
  /** null **/
  tradeSummary: InContextSdkMethod<Query['tradeSummary'], QuerytradeSummaryArgs, MeshContext>,
  /** null **/
  tradeSummaries: InContextSdkMethod<Query['tradeSummaries'], QuerytradeSummariesArgs, MeshContext>,
  /** null **/
  spotBalanceSummary: InContextSdkMethod<Query['spotBalanceSummary'], QueryspotBalanceSummaryArgs, MeshContext>,
  /** null **/
  spotBalanceSummaries: InContextSdkMethod<Query['spotBalanceSummaries'], QueryspotBalanceSummariesArgs, MeshContext>,
  /** null **/
  closedSpotBalance: InContextSdkMethod<Query['closedSpotBalance'], QueryclosedSpotBalanceArgs, MeshContext>,
  /** null **/
  closedSpotBalances: InContextSdkMethod<Query['closedSpotBalances'], QueryclosedSpotBalancesArgs, MeshContext>,
  /** null **/
  perpBalanceSummary: InContextSdkMethod<Query['perpBalanceSummary'], QueryperpBalanceSummaryArgs, MeshContext>,
  /** null **/
  perpBalanceSummaries: InContextSdkMethod<Query['perpBalanceSummaries'], QueryperpBalanceSummariesArgs, MeshContext>,
  /** null **/
  closedPerpBalance: InContextSdkMethod<Query['closedPerpBalance'], QueryclosedPerpBalanceArgs, MeshContext>,
  /** null **/
  closedPerpBalances: InContextSdkMethod<Query['closedPerpBalances'], QueryclosedPerpBalancesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  clearinghouse: InContextSdkMethod<Subscription['clearinghouse'], SubscriptionclearinghouseArgs, MeshContext>,
  /** null **/
  clearinghouses: InContextSdkMethod<Subscription['clearinghouses'], SubscriptionclearinghousesArgs, MeshContext>,
  /** null **/
  spotEngine: InContextSdkMethod<Subscription['spotEngine'], SubscriptionspotEngineArgs, MeshContext>,
  /** null **/
  spotEngines: InContextSdkMethod<Subscription['spotEngines'], SubscriptionspotEnginesArgs, MeshContext>,
  /** null **/
  perpEngine: InContextSdkMethod<Subscription['perpEngine'], SubscriptionperpEngineArgs, MeshContext>,
  /** null **/
  perpEngines: InContextSdkMethod<Subscription['perpEngines'], SubscriptionperpEnginesArgs, MeshContext>,
  /** null **/
  spotProduct: InContextSdkMethod<Subscription['spotProduct'], SubscriptionspotProductArgs, MeshContext>,
  /** null **/
  spotProducts: InContextSdkMethod<Subscription['spotProducts'], SubscriptionspotProductsArgs, MeshContext>,
  /** null **/
  spotProductHourlySnapshot: InContextSdkMethod<Subscription['spotProductHourlySnapshot'], SubscriptionspotProductHourlySnapshotArgs, MeshContext>,
  /** null **/
  spotProductHourlySnapshots: InContextSdkMethod<Subscription['spotProductHourlySnapshots'], SubscriptionspotProductHourlySnapshotsArgs, MeshContext>,
  /** null **/
  perpProduct: InContextSdkMethod<Subscription['perpProduct'], SubscriptionperpProductArgs, MeshContext>,
  /** null **/
  perpProducts: InContextSdkMethod<Subscription['perpProducts'], SubscriptionperpProductsArgs, MeshContext>,
  /** null **/
  perpProductHourlySnapshot: InContextSdkMethod<Subscription['perpProductHourlySnapshot'], SubscriptionperpProductHourlySnapshotArgs, MeshContext>,
  /** null **/
  perpProductHourlySnapshots: InContextSdkMethod<Subscription['perpProductHourlySnapshots'], SubscriptionperpProductHourlySnapshotsArgs, MeshContext>,
  /** null **/
  market: InContextSdkMethod<Subscription['market'], SubscriptionmarketArgs, MeshContext>,
  /** null **/
  markets: InContextSdkMethod<Subscription['markets'], SubscriptionmarketsArgs, MeshContext>,
  /** null **/
  marketHourlySnapshot: InContextSdkMethod<Subscription['marketHourlySnapshot'], SubscriptionmarketHourlySnapshotArgs, MeshContext>,
  /** null **/
  marketHourlySnapshots: InContextSdkMethod<Subscription['marketHourlySnapshots'], SubscriptionmarketHourlySnapshotsArgs, MeshContext>,
  /** null **/
  candlestick: InContextSdkMethod<Subscription['candlestick'], SubscriptioncandlestickArgs, MeshContext>,
  /** null **/
  candlesticks: InContextSdkMethod<Subscription['candlesticks'], SubscriptioncandlesticksArgs, MeshContext>,
  /** null **/
  order: InContextSdkMethod<Subscription['order'], SubscriptionorderArgs, MeshContext>,
  /** null **/
  orders: InContextSdkMethod<Subscription['orders'], SubscriptionordersArgs, MeshContext>,
  /** null **/
  modifyCollateralEvent: InContextSdkMethod<Subscription['modifyCollateralEvent'], SubscriptionmodifyCollateralEventArgs, MeshContext>,
  /** null **/
  modifyCollateralEvents: InContextSdkMethod<Subscription['modifyCollateralEvents'], SubscriptionmodifyCollateralEventsArgs, MeshContext>,
  /** null **/
  settlePnlEvent: InContextSdkMethod<Subscription['settlePnlEvent'], SubscriptionsettlePnlEventArgs, MeshContext>,
  /** null **/
  settlePnlEvents: InContextSdkMethod<Subscription['settlePnlEvents'], SubscriptionsettlePnlEventsArgs, MeshContext>,
  /** null **/
  liquidationEvent: InContextSdkMethod<Subscription['liquidationEvent'], SubscriptionliquidationEventArgs, MeshContext>,
  /** null **/
  liquidationEvents: InContextSdkMethod<Subscription['liquidationEvents'], SubscriptionliquidationEventsArgs, MeshContext>,
  /** null **/
  socializeProductEvent: InContextSdkMethod<Subscription['socializeProductEvent'], SubscriptionsocializeProductEventArgs, MeshContext>,
  /** null **/
  socializeProductEvents: InContextSdkMethod<Subscription['socializeProductEvents'], SubscriptionsocializeProductEventsArgs, MeshContext>,
  /** null **/
  reportOrderEvent: InContextSdkMethod<Subscription['reportOrderEvent'], SubscriptionreportOrderEventArgs, MeshContext>,
  /** null **/
  reportOrderEvents: InContextSdkMethod<Subscription['reportOrderEvents'], SubscriptionreportOrderEventsArgs, MeshContext>,
  /** null **/
  fillOrderEvent: InContextSdkMethod<Subscription['fillOrderEvent'], SubscriptionfillOrderEventArgs, MeshContext>,
  /** null **/
  fillOrderEvents: InContextSdkMethod<Subscription['fillOrderEvents'], SubscriptionfillOrderEventsArgs, MeshContext>,
  /** null **/
  cancelOrderEvent: InContextSdkMethod<Subscription['cancelOrderEvent'], SubscriptioncancelOrderEventArgs, MeshContext>,
  /** null **/
  cancelOrderEvents: InContextSdkMethod<Subscription['cancelOrderEvents'], SubscriptioncancelOrderEventsArgs, MeshContext>,
  /** null **/
  subaccount: InContextSdkMethod<Subscription['subaccount'], SubscriptionsubaccountArgs, MeshContext>,
  /** null **/
  subaccounts: InContextSdkMethod<Subscription['subaccounts'], SubscriptionsubaccountsArgs, MeshContext>,
  /** null **/
  tradeSummary: InContextSdkMethod<Subscription['tradeSummary'], SubscriptiontradeSummaryArgs, MeshContext>,
  /** null **/
  tradeSummaries: InContextSdkMethod<Subscription['tradeSummaries'], SubscriptiontradeSummariesArgs, MeshContext>,
  /** null **/
  spotBalanceSummary: InContextSdkMethod<Subscription['spotBalanceSummary'], SubscriptionspotBalanceSummaryArgs, MeshContext>,
  /** null **/
  spotBalanceSummaries: InContextSdkMethod<Subscription['spotBalanceSummaries'], SubscriptionspotBalanceSummariesArgs, MeshContext>,
  /** null **/
  closedSpotBalance: InContextSdkMethod<Subscription['closedSpotBalance'], SubscriptionclosedSpotBalanceArgs, MeshContext>,
  /** null **/
  closedSpotBalances: InContextSdkMethod<Subscription['closedSpotBalances'], SubscriptionclosedSpotBalancesArgs, MeshContext>,
  /** null **/
  perpBalanceSummary: InContextSdkMethod<Subscription['perpBalanceSummary'], SubscriptionperpBalanceSummaryArgs, MeshContext>,
  /** null **/
  perpBalanceSummaries: InContextSdkMethod<Subscription['perpBalanceSummaries'], SubscriptionperpBalanceSummariesArgs, MeshContext>,
  /** null **/
  closedPerpBalance: InContextSdkMethod<Subscription['closedPerpBalance'], SubscriptionclosedPerpBalanceArgs, MeshContext>,
  /** null **/
  closedPerpBalances: InContextSdkMethod<Subscription['closedPerpBalances'], SubscriptionclosedPerpBalancesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["Clearinghouse"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      ["endpoint"]: Scalars['ID']
    };
}
