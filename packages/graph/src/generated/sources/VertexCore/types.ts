
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';
import { Scalars } from '../..';

export namespace VertexCoreTypes {
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

export type Clearinghouse = {
  id: Scalars['ID'];
  endpoint: Scalars['Bytes'];
  quoteProduct: Scalars['Bytes'];
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
  endpoint?: InputMaybe<Scalars['Bytes']>;
  endpoint_not?: InputMaybe<Scalars['Bytes']>;
  endpoint_gt?: InputMaybe<Scalars['Bytes']>;
  endpoint_lt?: InputMaybe<Scalars['Bytes']>;
  endpoint_gte?: InputMaybe<Scalars['Bytes']>;
  endpoint_lte?: InputMaybe<Scalars['Bytes']>;
  endpoint_in?: InputMaybe<Array<Scalars['Bytes']>>;
  endpoint_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  endpoint_contains?: InputMaybe<Scalars['Bytes']>;
  endpoint_not_contains?: InputMaybe<Scalars['Bytes']>;
  quoteProduct?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_not?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_gt?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_lt?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_gte?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_lte?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_in?: InputMaybe<Array<Scalars['Bytes']>>;
  quoteProduct_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  quoteProduct_contains?: InputMaybe<Scalars['Bytes']>;
  quoteProduct_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<Clearinghouse_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Clearinghouse_filter>>>;
};

export type Clearinghouse_orderBy =
  | 'id'
  | 'endpoint'
  | 'quoteProduct'
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
  and?: InputMaybe<Array<InputMaybe<ClosedPerpBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ClosedPerpBalance_filter>>>;
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
  and?: InputMaybe<Array<InputMaybe<ClosedSpotBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ClosedSpotBalance_filter>>>;
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
  productId: Scalars['BigInt'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  subaccount: Subaccount;
  order: Order;
  isTaker: Scalars['Boolean'];
  feeQuote: Scalars['BigInt'];
  amountDelta: Scalars['BigInt'];
  quoteDelta: Scalars['BigInt'];
  newOrderFilledAmount: Scalars['BigInt'];
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
  productId?: InputMaybe<Scalars['BigInt']>;
  productId_not?: InputMaybe<Scalars['BigInt']>;
  productId_gt?: InputMaybe<Scalars['BigInt']>;
  productId_lt?: InputMaybe<Scalars['BigInt']>;
  productId_gte?: InputMaybe<Scalars['BigInt']>;
  productId_lte?: InputMaybe<Scalars['BigInt']>;
  productId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  productId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  isTaker?: InputMaybe<Scalars['Boolean']>;
  isTaker_not?: InputMaybe<Scalars['Boolean']>;
  isTaker_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isTaker_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  feeQuote?: InputMaybe<Scalars['BigInt']>;
  feeQuote_not?: InputMaybe<Scalars['BigInt']>;
  feeQuote_gt?: InputMaybe<Scalars['BigInt']>;
  feeQuote_lt?: InputMaybe<Scalars['BigInt']>;
  feeQuote_gte?: InputMaybe<Scalars['BigInt']>;
  feeQuote_lte?: InputMaybe<Scalars['BigInt']>;
  feeQuote_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeQuote_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountDelta?: InputMaybe<Scalars['BigInt']>;
  amountDelta_not?: InputMaybe<Scalars['BigInt']>;
  amountDelta_gt?: InputMaybe<Scalars['BigInt']>;
  amountDelta_lt?: InputMaybe<Scalars['BigInt']>;
  amountDelta_gte?: InputMaybe<Scalars['BigInt']>;
  amountDelta_lte?: InputMaybe<Scalars['BigInt']>;
  amountDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteDelta?: InputMaybe<Scalars['BigInt']>;
  quoteDelta_not?: InputMaybe<Scalars['BigInt']>;
  quoteDelta_gt?: InputMaybe<Scalars['BigInt']>;
  quoteDelta_lt?: InputMaybe<Scalars['BigInt']>;
  quoteDelta_gte?: InputMaybe<Scalars['BigInt']>;
  quoteDelta_lte?: InputMaybe<Scalars['BigInt']>;
  quoteDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quoteDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newOrderFilledAmount?: InputMaybe<Scalars['BigInt']>;
  newOrderFilledAmount_not?: InputMaybe<Scalars['BigInt']>;
  newOrderFilledAmount_gt?: InputMaybe<Scalars['BigInt']>;
  newOrderFilledAmount_lt?: InputMaybe<Scalars['BigInt']>;
  newOrderFilledAmount_gte?: InputMaybe<Scalars['BigInt']>;
  newOrderFilledAmount_lte?: InputMaybe<Scalars['BigInt']>;
  newOrderFilledAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newOrderFilledAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FillOrderEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FillOrderEvent_filter>>>;
};

export type FillOrderEvent_orderBy =
  | 'id'
  | 'productId'
  | 'block'
  | 'blockTime'
  | 'subaccount'
  | 'order'
  | 'isTaker'
  | 'feeQuote'
  | 'amountDelta'
  | 'quoteDelta'
  | 'newOrderFilledAmount';

export type LiquidationEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  liquidator: Subaccount;
  liquidatee: Subaccount;
  mode: Scalars['Int'];
  healthGroup: Scalars['BigInt'];
  liquidationAmount: Scalars['BigInt'];
  liquidationPayment: Scalars['BigInt'];
  insuranceCoverage: Scalars['BigInt'];
  spotProductId: Scalars['BigInt'];
  spotAmount: Scalars['BigInt'];
  perpProductId: Scalars['BigInt'];
  perpAmount: Scalars['BigInt'];
  spotOraclePriceX18: Scalars['BigInt'];
  perpLiquidationPriceX18: Scalars['BigInt'];
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
  mode?: InputMaybe<Scalars['Int']>;
  mode_not?: InputMaybe<Scalars['Int']>;
  mode_gt?: InputMaybe<Scalars['Int']>;
  mode_lt?: InputMaybe<Scalars['Int']>;
  mode_gte?: InputMaybe<Scalars['Int']>;
  mode_lte?: InputMaybe<Scalars['Int']>;
  mode_in?: InputMaybe<Array<Scalars['Int']>>;
  mode_not_in?: InputMaybe<Array<Scalars['Int']>>;
  healthGroup?: InputMaybe<Scalars['BigInt']>;
  healthGroup_not?: InputMaybe<Scalars['BigInt']>;
  healthGroup_gt?: InputMaybe<Scalars['BigInt']>;
  healthGroup_lt?: InputMaybe<Scalars['BigInt']>;
  healthGroup_gte?: InputMaybe<Scalars['BigInt']>;
  healthGroup_lte?: InputMaybe<Scalars['BigInt']>;
  healthGroup_in?: InputMaybe<Array<Scalars['BigInt']>>;
  healthGroup_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationAmount?: InputMaybe<Scalars['BigInt']>;
  liquidationAmount_not?: InputMaybe<Scalars['BigInt']>;
  liquidationAmount_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationAmount_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationAmount_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationAmount_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPayment?: InputMaybe<Scalars['BigInt']>;
  liquidationPayment_not?: InputMaybe<Scalars['BigInt']>;
  liquidationPayment_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationPayment_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationPayment_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationPayment_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationPayment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPayment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  insuranceCoverage?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_not?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_gt?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_lt?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_gte?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_lte?: InputMaybe<Scalars['BigInt']>;
  insuranceCoverage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  insuranceCoverage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spotProductId?: InputMaybe<Scalars['BigInt']>;
  spotProductId_not?: InputMaybe<Scalars['BigInt']>;
  spotProductId_gt?: InputMaybe<Scalars['BigInt']>;
  spotProductId_lt?: InputMaybe<Scalars['BigInt']>;
  spotProductId_gte?: InputMaybe<Scalars['BigInt']>;
  spotProductId_lte?: InputMaybe<Scalars['BigInt']>;
  spotProductId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spotProductId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spotAmount?: InputMaybe<Scalars['BigInt']>;
  spotAmount_not?: InputMaybe<Scalars['BigInt']>;
  spotAmount_gt?: InputMaybe<Scalars['BigInt']>;
  spotAmount_lt?: InputMaybe<Scalars['BigInt']>;
  spotAmount_gte?: InputMaybe<Scalars['BigInt']>;
  spotAmount_lte?: InputMaybe<Scalars['BigInt']>;
  spotAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spotAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  perpProductId?: InputMaybe<Scalars['BigInt']>;
  perpProductId_not?: InputMaybe<Scalars['BigInt']>;
  perpProductId_gt?: InputMaybe<Scalars['BigInt']>;
  perpProductId_lt?: InputMaybe<Scalars['BigInt']>;
  perpProductId_gte?: InputMaybe<Scalars['BigInt']>;
  perpProductId_lte?: InputMaybe<Scalars['BigInt']>;
  perpProductId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  perpProductId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  perpAmount?: InputMaybe<Scalars['BigInt']>;
  perpAmount_not?: InputMaybe<Scalars['BigInt']>;
  perpAmount_gt?: InputMaybe<Scalars['BigInt']>;
  perpAmount_lt?: InputMaybe<Scalars['BigInt']>;
  perpAmount_gte?: InputMaybe<Scalars['BigInt']>;
  perpAmount_lte?: InputMaybe<Scalars['BigInt']>;
  perpAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  perpAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spotOraclePriceX18?: InputMaybe<Scalars['BigInt']>;
  spotOraclePriceX18_not?: InputMaybe<Scalars['BigInt']>;
  spotOraclePriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  spotOraclePriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  spotOraclePriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  spotOraclePriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  spotOraclePriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spotOraclePriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  perpLiquidationPriceX18?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  perpLiquidationPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LiquidationEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<LiquidationEvent_filter>>>;
};

export type LiquidationEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'liquidator'
  | 'liquidatee'
  | 'mode'
  | 'healthGroup'
  | 'liquidationAmount'
  | 'liquidationPayment'
  | 'insuranceCoverage'
  | 'spotProductId'
  | 'spotAmount'
  | 'perpProductId'
  | 'perpAmount'
  | 'spotOraclePriceX18'
  | 'perpLiquidationPriceX18';

export type ModifyCollateralEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  subaccount: Subaccount;
  amount: Scalars['BigInt'];
  productId: Scalars['BigInt'];
  newBalanceAmount: Scalars['BigInt'];
  oraclePriceX18: Scalars['BigInt'];
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
  oraclePriceX18?: InputMaybe<Scalars['BigInt']>;
  oraclePriceX18_not?: InputMaybe<Scalars['BigInt']>;
  oraclePriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  oraclePriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  oraclePriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  oraclePriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  oraclePriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  oraclePriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ModifyCollateralEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ModifyCollateralEvent_filter>>>;
};

export type ModifyCollateralEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'subaccount'
  | 'amount'
  | 'productId'
  | 'newBalanceAmount'
  | 'oraclePriceX18';

export type Order = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  type: OrderType;
  digest: Scalars['Bytes'];
  priceX18: Scalars['BigInt'];
  isTaker: Scalars['Boolean'];
  expiration: Scalars['BigInt'];
  realExpiration: Scalars['BigInt'];
  subaccount: Subaccount;
  reportedAt: Scalars['BigInt'];
  reportedAtBlock: Scalars['BigInt'];
  totalAmount: Scalars['BigInt'];
  filledAmount: Scalars['BigInt'];
  quoteAmount: Scalars['BigInt'];
  collectedFee: Scalars['BigInt'];
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

export type Order_filter = {
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
  type?: InputMaybe<OrderType>;
  type_not?: InputMaybe<OrderType>;
  type_in?: InputMaybe<Array<OrderType>>;
  type_not_in?: InputMaybe<Array<OrderType>>;
  digest?: InputMaybe<Scalars['Bytes']>;
  digest_not?: InputMaybe<Scalars['Bytes']>;
  digest_gt?: InputMaybe<Scalars['Bytes']>;
  digest_lt?: InputMaybe<Scalars['Bytes']>;
  digest_gte?: InputMaybe<Scalars['Bytes']>;
  digest_lte?: InputMaybe<Scalars['Bytes']>;
  digest_in?: InputMaybe<Array<Scalars['Bytes']>>;
  digest_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  digest_contains?: InputMaybe<Scalars['Bytes']>;
  digest_not_contains?: InputMaybe<Scalars['Bytes']>;
  priceX18?: InputMaybe<Scalars['BigInt']>;
  priceX18_not?: InputMaybe<Scalars['BigInt']>;
  priceX18_gt?: InputMaybe<Scalars['BigInt']>;
  priceX18_lt?: InputMaybe<Scalars['BigInt']>;
  priceX18_gte?: InputMaybe<Scalars['BigInt']>;
  priceX18_lte?: InputMaybe<Scalars['BigInt']>;
  priceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  isTaker?: InputMaybe<Scalars['Boolean']>;
  isTaker_not?: InputMaybe<Scalars['Boolean']>;
  isTaker_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isTaker_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Order_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Order_filter>>>;
};

export type Order_orderBy =
  | 'id'
  | 'productId'
  | 'type'
  | 'digest'
  | 'priceX18'
  | 'isTaker'
  | 'expiration'
  | 'realExpiration'
  | 'subaccount'
  | 'reportedAt'
  | 'reportedAtBlock'
  | 'totalAmount'
  | 'filledAmount'
  | 'quoteAmount'
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
  and?: InputMaybe<Array<InputMaybe<PerpBalanceSummary_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PerpBalanceSummary_filter>>>;
};

export type PerpBalanceSummary_orderBy =
  | 'id'
  | 'productId'
  | 'subaccount'
  | 'timeOpened'
  | 'vQuoteWithoutFunding'
  | 'totalNetFunding'
  | 'closedBalances';

export type Query = {
  clearinghouse?: Maybe<Clearinghouse>;
  clearinghouses: Array<Clearinghouse>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  modifyCollateralEvent?: Maybe<ModifyCollateralEvent>;
  modifyCollateralEvents: Array<ModifyCollateralEvent>;
  settlePnlEvent?: Maybe<SettlePnlEvent>;
  settlePnlEvents: Array<SettlePnlEvent>;
  liquidationEvent?: Maybe<LiquidationEvent>;
  liquidationEvents: Array<LiquidationEvent>;
  fillOrderEvent?: Maybe<FillOrderEvent>;
  fillOrderEvents: Array<FillOrderEvent>;
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
  submitTransactionsEvent?: Maybe<SubmitTransactionsEvent>;
  submitTransactionsEvents: Array<SubmitTransactionsEvent>;
  submitSlowModeTransactionEvent?: Maybe<SubmitSlowModeTransactionEvent>;
  submitSlowModeTransactionEvents: Array<SubmitSlowModeTransactionEvent>;
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


export type QuerysubmitTransactionsEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubmitTransactionsEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubmitTransactionsEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubmitTransactionsEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubmitSlowModeTransactionEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysubmitSlowModeTransactionEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubmitSlowModeTransactionEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubmitSlowModeTransactionEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type SettlePnlEvent = {
  id: Scalars['ID'];
  block: Scalars['BigInt'];
  blockTime: Scalars['BigInt'];
  subaccount: Subaccount;
  productId: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  positionAmount: Scalars['BigInt'];
  perpLiquidationPriceX18: Scalars['BigInt'];
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
  positionAmount?: InputMaybe<Scalars['BigInt']>;
  positionAmount_not?: InputMaybe<Scalars['BigInt']>;
  positionAmount_gt?: InputMaybe<Scalars['BigInt']>;
  positionAmount_lt?: InputMaybe<Scalars['BigInt']>;
  positionAmount_gte?: InputMaybe<Scalars['BigInt']>;
  positionAmount_lte?: InputMaybe<Scalars['BigInt']>;
  positionAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  perpLiquidationPriceX18?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  perpLiquidationPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  perpLiquidationPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SettlePnlEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SettlePnlEvent_filter>>>;
};

export type SettlePnlEvent_orderBy =
  | 'id'
  | 'block'
  | 'blockTime'
  | 'subaccount'
  | 'productId'
  | 'amount'
  | 'positionAmount'
  | 'perpLiquidationPriceX18';

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
  and?: InputMaybe<Array<InputMaybe<SpotBalanceSummary_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SpotBalanceSummary_filter>>>;
};

export type SpotBalanceSummary_orderBy =
  | 'id'
  | 'productId'
  | 'subaccount'
  | 'timeOpened'
  | 'netRealAmount'
  | 'totalNetInterest'
  | 'closedBalances';

export type Subaccount = {
  id: Scalars['ID'];
  clearinghouse: Clearinghouse;
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
  fillOrderEvents: Array<FillOrderEvent>;
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


export type SubaccountfillOrderEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FillOrderEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FillOrderEvent_filter>;
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
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
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
  fillOrderEvents_?: InputMaybe<FillOrderEvent_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Subaccount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Subaccount_filter>>>;
};

export type Subaccount_orderBy =
  | 'id'
  | 'clearinghouse'
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
  | 'fillOrderEvents';

export type SubmitSlowModeTransactionEvent = {
  id: Scalars['ID'];
  sender: Scalars['Bytes'];
  tx: Scalars['Bytes'];
  executableAt: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
};

export type SubmitSlowModeTransactionEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_gt?: InputMaybe<Scalars['Bytes']>;
  sender_lt?: InputMaybe<Scalars['Bytes']>;
  sender_gte?: InputMaybe<Scalars['Bytes']>;
  sender_lte?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  tx?: InputMaybe<Scalars['Bytes']>;
  tx_not?: InputMaybe<Scalars['Bytes']>;
  tx_gt?: InputMaybe<Scalars['Bytes']>;
  tx_lt?: InputMaybe<Scalars['Bytes']>;
  tx_gte?: InputMaybe<Scalars['Bytes']>;
  tx_lte?: InputMaybe<Scalars['Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tx_contains?: InputMaybe<Scalars['Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['Bytes']>;
  executableAt?: InputMaybe<Scalars['BigInt']>;
  executableAt_not?: InputMaybe<Scalars['BigInt']>;
  executableAt_gt?: InputMaybe<Scalars['BigInt']>;
  executableAt_lt?: InputMaybe<Scalars['BigInt']>;
  executableAt_gte?: InputMaybe<Scalars['BigInt']>;
  executableAt_lte?: InputMaybe<Scalars['BigInt']>;
  executableAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executableAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SubmitSlowModeTransactionEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SubmitSlowModeTransactionEvent_filter>>>;
};

export type SubmitSlowModeTransactionEvent_orderBy =
  | 'id'
  | 'sender'
  | 'tx'
  | 'executableAt'
  | 'createdAt';

export type SubmitTransactionsEvent = {
  id: Scalars['ID'];
  transactions: Array<Scalars['Bytes']>;
  createdAt: Scalars['BigInt'];
};

export type SubmitTransactionsEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transactions?: InputMaybe<Array<Scalars['Bytes']>>;
  transactions_not?: InputMaybe<Array<Scalars['Bytes']>>;
  transactions_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  transactions_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  transactions_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  transactions_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SubmitTransactionsEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SubmitTransactionsEvent_filter>>>;
};

export type SubmitTransactionsEvent_orderBy =
  | 'id'
  | 'transactions'
  | 'createdAt';

export type Subscription = {
  clearinghouse?: Maybe<Clearinghouse>;
  clearinghouses: Array<Clearinghouse>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  modifyCollateralEvent?: Maybe<ModifyCollateralEvent>;
  modifyCollateralEvents: Array<ModifyCollateralEvent>;
  settlePnlEvent?: Maybe<SettlePnlEvent>;
  settlePnlEvents: Array<SettlePnlEvent>;
  liquidationEvent?: Maybe<LiquidationEvent>;
  liquidationEvents: Array<LiquidationEvent>;
  fillOrderEvent?: Maybe<FillOrderEvent>;
  fillOrderEvents: Array<FillOrderEvent>;
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
  submitTransactionsEvent?: Maybe<SubmitTransactionsEvent>;
  submitTransactionsEvents: Array<SubmitTransactionsEvent>;
  submitSlowModeTransactionEvent?: Maybe<SubmitSlowModeTransactionEvent>;
  submitSlowModeTransactionEvents: Array<SubmitSlowModeTransactionEvent>;
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


export type SubscriptionsubmitTransactionsEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubmitTransactionsEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubmitTransactionsEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubmitTransactionsEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubmitSlowModeTransactionEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsubmitSlowModeTransactionEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubmitSlowModeTransactionEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SubmitSlowModeTransactionEvent_filter>;
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
  and?: InputMaybe<Array<InputMaybe<TradeSummary_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TradeSummary_filter>>>;
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

}
export type QueryVertexCoreSdk = {
  /** null **/
  clearinghouse: InContextSdkMethod<VertexCoreTypes.Query['clearinghouse'], VertexCoreTypes.QueryclearinghouseArgs, MeshContext>,
  /** null **/
  clearinghouses: InContextSdkMethod<VertexCoreTypes.Query['clearinghouses'], VertexCoreTypes.QueryclearinghousesArgs, MeshContext>,
  /** null **/
  order: InContextSdkMethod<VertexCoreTypes.Query['order'], VertexCoreTypes.QueryorderArgs, MeshContext>,
  /** null **/
  orders: InContextSdkMethod<VertexCoreTypes.Query['orders'], VertexCoreTypes.QueryordersArgs, MeshContext>,
  /** null **/
  modifyCollateralEvent: InContextSdkMethod<VertexCoreTypes.Query['modifyCollateralEvent'], VertexCoreTypes.QuerymodifyCollateralEventArgs, MeshContext>,
  /** null **/
  modifyCollateralEvents: InContextSdkMethod<VertexCoreTypes.Query['modifyCollateralEvents'], VertexCoreTypes.QuerymodifyCollateralEventsArgs, MeshContext>,
  /** null **/
  settlePnlEvent: InContextSdkMethod<VertexCoreTypes.Query['settlePnlEvent'], VertexCoreTypes.QuerysettlePnlEventArgs, MeshContext>,
  /** null **/
  settlePnlEvents: InContextSdkMethod<VertexCoreTypes.Query['settlePnlEvents'], VertexCoreTypes.QuerysettlePnlEventsArgs, MeshContext>,
  /** null **/
  liquidationEvent: InContextSdkMethod<VertexCoreTypes.Query['liquidationEvent'], VertexCoreTypes.QueryliquidationEventArgs, MeshContext>,
  /** null **/
  liquidationEvents: InContextSdkMethod<VertexCoreTypes.Query['liquidationEvents'], VertexCoreTypes.QueryliquidationEventsArgs, MeshContext>,
  /** null **/
  fillOrderEvent: InContextSdkMethod<VertexCoreTypes.Query['fillOrderEvent'], VertexCoreTypes.QueryfillOrderEventArgs, MeshContext>,
  /** null **/
  fillOrderEvents: InContextSdkMethod<VertexCoreTypes.Query['fillOrderEvents'], VertexCoreTypes.QueryfillOrderEventsArgs, MeshContext>,
  /** null **/
  subaccount: InContextSdkMethod<VertexCoreTypes.Query['subaccount'], VertexCoreTypes.QuerysubaccountArgs, MeshContext>,
  /** null **/
  subaccounts: InContextSdkMethod<VertexCoreTypes.Query['subaccounts'], VertexCoreTypes.QuerysubaccountsArgs, MeshContext>,
  /** null **/
  tradeSummary: InContextSdkMethod<VertexCoreTypes.Query['tradeSummary'], VertexCoreTypes.QuerytradeSummaryArgs, MeshContext>,
  /** null **/
  tradeSummaries: InContextSdkMethod<VertexCoreTypes.Query['tradeSummaries'], VertexCoreTypes.QuerytradeSummariesArgs, MeshContext>,
  /** null **/
  spotBalanceSummary: InContextSdkMethod<VertexCoreTypes.Query['spotBalanceSummary'], VertexCoreTypes.QueryspotBalanceSummaryArgs, MeshContext>,
  /** null **/
  spotBalanceSummaries: InContextSdkMethod<VertexCoreTypes.Query['spotBalanceSummaries'], VertexCoreTypes.QueryspotBalanceSummariesArgs, MeshContext>,
  /** null **/
  closedSpotBalance: InContextSdkMethod<VertexCoreTypes.Query['closedSpotBalance'], VertexCoreTypes.QueryclosedSpotBalanceArgs, MeshContext>,
  /** null **/
  closedSpotBalances: InContextSdkMethod<VertexCoreTypes.Query['closedSpotBalances'], VertexCoreTypes.QueryclosedSpotBalancesArgs, MeshContext>,
  /** null **/
  perpBalanceSummary: InContextSdkMethod<VertexCoreTypes.Query['perpBalanceSummary'], VertexCoreTypes.QueryperpBalanceSummaryArgs, MeshContext>,
  /** null **/
  perpBalanceSummaries: InContextSdkMethod<VertexCoreTypes.Query['perpBalanceSummaries'], VertexCoreTypes.QueryperpBalanceSummariesArgs, MeshContext>,
  /** null **/
  closedPerpBalance: InContextSdkMethod<VertexCoreTypes.Query['closedPerpBalance'], VertexCoreTypes.QueryclosedPerpBalanceArgs, MeshContext>,
  /** null **/
  closedPerpBalances: InContextSdkMethod<VertexCoreTypes.Query['closedPerpBalances'], VertexCoreTypes.QueryclosedPerpBalancesArgs, MeshContext>,
  /** null **/
  submitTransactionsEvent: InContextSdkMethod<VertexCoreTypes.Query['submitTransactionsEvent'], VertexCoreTypes.QuerysubmitTransactionsEventArgs, MeshContext>,
  /** null **/
  submitTransactionsEvents: InContextSdkMethod<VertexCoreTypes.Query['submitTransactionsEvents'], VertexCoreTypes.QuerysubmitTransactionsEventsArgs, MeshContext>,
  /** null **/
  submitSlowModeTransactionEvent: InContextSdkMethod<VertexCoreTypes.Query['submitSlowModeTransactionEvent'], VertexCoreTypes.QuerysubmitSlowModeTransactionEventArgs, MeshContext>,
  /** null **/
  submitSlowModeTransactionEvents: InContextSdkMethod<VertexCoreTypes.Query['submitSlowModeTransactionEvents'], VertexCoreTypes.QuerysubmitSlowModeTransactionEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<VertexCoreTypes.Query['_meta'], VertexCoreTypes.Query_metaArgs, MeshContext>
};

export type MutationVertexCoreSdk = {

};

export type SubscriptionVertexCoreSdk = {
  /** null **/
  clearinghouse: InContextSdkMethod<VertexCoreTypes.Subscription['clearinghouse'], VertexCoreTypes.SubscriptionclearinghouseArgs, MeshContext>,
  /** null **/
  clearinghouses: InContextSdkMethod<VertexCoreTypes.Subscription['clearinghouses'], VertexCoreTypes.SubscriptionclearinghousesArgs, MeshContext>,
  /** null **/
  order: InContextSdkMethod<VertexCoreTypes.Subscription['order'], VertexCoreTypes.SubscriptionorderArgs, MeshContext>,
  /** null **/
  orders: InContextSdkMethod<VertexCoreTypes.Subscription['orders'], VertexCoreTypes.SubscriptionordersArgs, MeshContext>,
  /** null **/
  modifyCollateralEvent: InContextSdkMethod<VertexCoreTypes.Subscription['modifyCollateralEvent'], VertexCoreTypes.SubscriptionmodifyCollateralEventArgs, MeshContext>,
  /** null **/
  modifyCollateralEvents: InContextSdkMethod<VertexCoreTypes.Subscription['modifyCollateralEvents'], VertexCoreTypes.SubscriptionmodifyCollateralEventsArgs, MeshContext>,
  /** null **/
  settlePnlEvent: InContextSdkMethod<VertexCoreTypes.Subscription['settlePnlEvent'], VertexCoreTypes.SubscriptionsettlePnlEventArgs, MeshContext>,
  /** null **/
  settlePnlEvents: InContextSdkMethod<VertexCoreTypes.Subscription['settlePnlEvents'], VertexCoreTypes.SubscriptionsettlePnlEventsArgs, MeshContext>,
  /** null **/
  liquidationEvent: InContextSdkMethod<VertexCoreTypes.Subscription['liquidationEvent'], VertexCoreTypes.SubscriptionliquidationEventArgs, MeshContext>,
  /** null **/
  liquidationEvents: InContextSdkMethod<VertexCoreTypes.Subscription['liquidationEvents'], VertexCoreTypes.SubscriptionliquidationEventsArgs, MeshContext>,
  /** null **/
  fillOrderEvent: InContextSdkMethod<VertexCoreTypes.Subscription['fillOrderEvent'], VertexCoreTypes.SubscriptionfillOrderEventArgs, MeshContext>,
  /** null **/
  fillOrderEvents: InContextSdkMethod<VertexCoreTypes.Subscription['fillOrderEvents'], VertexCoreTypes.SubscriptionfillOrderEventsArgs, MeshContext>,
  /** null **/
  subaccount: InContextSdkMethod<VertexCoreTypes.Subscription['subaccount'], VertexCoreTypes.SubscriptionsubaccountArgs, MeshContext>,
  /** null **/
  subaccounts: InContextSdkMethod<VertexCoreTypes.Subscription['subaccounts'], VertexCoreTypes.SubscriptionsubaccountsArgs, MeshContext>,
  /** null **/
  tradeSummary: InContextSdkMethod<VertexCoreTypes.Subscription['tradeSummary'], VertexCoreTypes.SubscriptiontradeSummaryArgs, MeshContext>,
  /** null **/
  tradeSummaries: InContextSdkMethod<VertexCoreTypes.Subscription['tradeSummaries'], VertexCoreTypes.SubscriptiontradeSummariesArgs, MeshContext>,
  /** null **/
  spotBalanceSummary: InContextSdkMethod<VertexCoreTypes.Subscription['spotBalanceSummary'], VertexCoreTypes.SubscriptionspotBalanceSummaryArgs, MeshContext>,
  /** null **/
  spotBalanceSummaries: InContextSdkMethod<VertexCoreTypes.Subscription['spotBalanceSummaries'], VertexCoreTypes.SubscriptionspotBalanceSummariesArgs, MeshContext>,
  /** null **/
  closedSpotBalance: InContextSdkMethod<VertexCoreTypes.Subscription['closedSpotBalance'], VertexCoreTypes.SubscriptionclosedSpotBalanceArgs, MeshContext>,
  /** null **/
  closedSpotBalances: InContextSdkMethod<VertexCoreTypes.Subscription['closedSpotBalances'], VertexCoreTypes.SubscriptionclosedSpotBalancesArgs, MeshContext>,
  /** null **/
  perpBalanceSummary: InContextSdkMethod<VertexCoreTypes.Subscription['perpBalanceSummary'], VertexCoreTypes.SubscriptionperpBalanceSummaryArgs, MeshContext>,
  /** null **/
  perpBalanceSummaries: InContextSdkMethod<VertexCoreTypes.Subscription['perpBalanceSummaries'], VertexCoreTypes.SubscriptionperpBalanceSummariesArgs, MeshContext>,
  /** null **/
  closedPerpBalance: InContextSdkMethod<VertexCoreTypes.Subscription['closedPerpBalance'], VertexCoreTypes.SubscriptionclosedPerpBalanceArgs, MeshContext>,
  /** null **/
  closedPerpBalances: InContextSdkMethod<VertexCoreTypes.Subscription['closedPerpBalances'], VertexCoreTypes.SubscriptionclosedPerpBalancesArgs, MeshContext>,
  /** null **/
  submitTransactionsEvent: InContextSdkMethod<VertexCoreTypes.Subscription['submitTransactionsEvent'], VertexCoreTypes.SubscriptionsubmitTransactionsEventArgs, MeshContext>,
  /** null **/
  submitTransactionsEvents: InContextSdkMethod<VertexCoreTypes.Subscription['submitTransactionsEvents'], VertexCoreTypes.SubscriptionsubmitTransactionsEventsArgs, MeshContext>,
  /** null **/
  submitSlowModeTransactionEvent: InContextSdkMethod<VertexCoreTypes.Subscription['submitSlowModeTransactionEvent'], VertexCoreTypes.SubscriptionsubmitSlowModeTransactionEventArgs, MeshContext>,
  /** null **/
  submitSlowModeTransactionEvents: InContextSdkMethod<VertexCoreTypes.Subscription['submitSlowModeTransactionEvents'], VertexCoreTypes.SubscriptionsubmitSlowModeTransactionEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<VertexCoreTypes.Subscription['_meta'], VertexCoreTypes.Subscription_metaArgs, MeshContext>
};
export type VertexCoreContext = {
      ["VertexCore"]: { Query: QueryVertexCoreSdk, Mutation: MutationVertexCoreSdk, Subscription: SubscriptionVertexCoreSdk },
      ["coreEndpoint"]: Scalars['ID']
    };