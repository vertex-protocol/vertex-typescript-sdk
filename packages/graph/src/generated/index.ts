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

import GraphqlHandler from "@graphql-mesh/graphql"
import AutoPaginationTransform from "@graphprotocol/client-auto-pagination";
import BlockTrackingTransform from "@graphprotocol/client-block-tracking";
import AutoTypeMergingTransform from "@graphprotocol/client-auto-type-merging";
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import type { VertexCandlesticksContext } from './sources/VertexCandlesticks/types';
import type { VertexMarketsContext } from './sources/VertexMarkets/types';
import type { VertexCoreContext } from './sources/VertexCore/types';
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

export type Query = {
  marketCandlestick?: Maybe<MarketCandlestick>;
  marketCandlesticks: Array<MarketCandlestick>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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
};


export type QuerymarketCandlestickArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketCandlesticksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketCandlestick_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketCandlestick_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
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

export type Subscription = {
  marketCandlestick?: Maybe<MarketCandlestick>;
  marketCandlesticks: Array<MarketCandlestick>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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
};


export type SubscriptionmarketCandlestickArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketCandlesticksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketCandlestick_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketCandlestick_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type MarketCandlestick = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  time: Scalars['BigInt'];
  period: Scalars['Int'];
  openX18: Scalars['BigInt'];
  closeX18: Scalars['BigInt'];
  lowX18: Scalars['BigInt'];
  highX18: Scalars['BigInt'];
  volumeBase: Scalars['BigInt'];
  volumeQuote: Scalars['BigInt'];
};

export type MarketCandlestick_filter = {
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
  and?: InputMaybe<Array<InputMaybe<MarketCandlestick_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketCandlestick_filter>>>;
};

export type MarketCandlestick_orderBy =
  | 'id'
  | 'productId'
  | 'time'
  | 'period'
  | 'openX18'
  | 'closeX18'
  | 'lowX18'
  | 'highX18'
  | 'volumeBase'
  | 'volumeQuote';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

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
  volumeBase: Scalars['BigInt'];
  volumeQuote: Scalars['BigInt'];
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
  volumeBase: Scalars['BigInt'];
  volumeQuote: Scalars['BigInt'];
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
  and?: InputMaybe<Array<InputMaybe<MarketSnapshot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketSnapshot_filter>>>;
};

export type MarketSnapshot_orderBy =
  | 'id'
  | 'period'
  | 'periodIndex'
  | 'market'
  | 'lastFillPriceX18'
  | 'volumeBase'
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
  snapshots_?: InputMaybe<MarketSnapshot_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Market_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Market_filter>>>;
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
  | 'volumeBase'
  | 'volumeQuote'
  | 'snapshots';

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
  and?: InputMaybe<Array<InputMaybe<PerpEngine_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PerpEngine_filter>>>;
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
  liquidationPriceX18: Scalars['BigInt'];
  cumulativeFundingLongX18: Scalars['BigInt'];
  cumulativeFundingShortX18: Scalars['BigInt'];
  openInterest: Scalars['BigInt'];
  availableSettle: Scalars['BigInt'];
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
  liquidationPriceX18: Scalars['BigInt'];
  cumulativeFundingLongX18: Scalars['BigInt'];
  cumulativeFundingShortX18: Scalars['BigInt'];
  openInterest: Scalars['BigInt'];
  availableSettle: Scalars['BigInt'];
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
  liquidationPriceX18?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  openInterest?: InputMaybe<Scalars['BigInt']>;
  openInterest_not?: InputMaybe<Scalars['BigInt']>;
  openInterest_gt?: InputMaybe<Scalars['BigInt']>;
  openInterest_lt?: InputMaybe<Scalars['BigInt']>;
  openInterest_gte?: InputMaybe<Scalars['BigInt']>;
  openInterest_lte?: InputMaybe<Scalars['BigInt']>;
  openInterest_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openInterest_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  availableSettle?: InputMaybe<Scalars['BigInt']>;
  availableSettle_not?: InputMaybe<Scalars['BigInt']>;
  availableSettle_gt?: InputMaybe<Scalars['BigInt']>;
  availableSettle_lt?: InputMaybe<Scalars['BigInt']>;
  availableSettle_gte?: InputMaybe<Scalars['BigInt']>;
  availableSettle_lte?: InputMaybe<Scalars['BigInt']>;
  availableSettle_in?: InputMaybe<Array<Scalars['BigInt']>>;
  availableSettle_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  and?: InputMaybe<Array<InputMaybe<PerpProductSnapshot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PerpProductSnapshot_filter>>>;
};

export type PerpProductSnapshot_orderBy =
  | 'id'
  | 'period'
  | 'periodIndex'
  | 'product'
  | 'liquidationPriceX18'
  | 'cumulativeFundingLongX18'
  | 'cumulativeFundingShortX18'
  | 'openInterest'
  | 'availableSettle'
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
  liquidationPriceX18?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_not?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_gt?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_lt?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_gte?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_lte?: InputMaybe<Scalars['BigInt']>;
  liquidationPriceX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidationPriceX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  openInterest?: InputMaybe<Scalars['BigInt']>;
  openInterest_not?: InputMaybe<Scalars['BigInt']>;
  openInterest_gt?: InputMaybe<Scalars['BigInt']>;
  openInterest_lt?: InputMaybe<Scalars['BigInt']>;
  openInterest_gte?: InputMaybe<Scalars['BigInt']>;
  openInterest_lte?: InputMaybe<Scalars['BigInt']>;
  openInterest_in?: InputMaybe<Array<Scalars['BigInt']>>;
  openInterest_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  availableSettle?: InputMaybe<Scalars['BigInt']>;
  availableSettle_not?: InputMaybe<Scalars['BigInt']>;
  availableSettle_gt?: InputMaybe<Scalars['BigInt']>;
  availableSettle_lt?: InputMaybe<Scalars['BigInt']>;
  availableSettle_gte?: InputMaybe<Scalars['BigInt']>;
  availableSettle_lte?: InputMaybe<Scalars['BigInt']>;
  availableSettle_in?: InputMaybe<Array<Scalars['BigInt']>>;
  availableSettle_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  and?: InputMaybe<Array<InputMaybe<PerpProduct_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PerpProduct_filter>>>;
};

export type PerpProduct_orderBy =
  | 'id'
  | 'productId'
  | 'market'
  | 'engine'
  | 'liquidationPriceX18'
  | 'cumulativeFundingLongX18'
  | 'cumulativeFundingShortX18'
  | 'openInterest'
  | 'availableSettle'
  | 'lpSupply'
  | 'lpQuoteAmount'
  | 'lpBaseAmount'
  | 'lpCumulativeFundingPerLpX18'
  | 'snapshots';

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
  and?: InputMaybe<Array<InputMaybe<SocializeProductEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SocializeProductEvent_filter>>>;
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
  and?: InputMaybe<Array<InputMaybe<SpotEngine_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SpotEngine_filter>>>;
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
  totalDepositsNormalized: Scalars['BigInt'];
  totalBorrowsNormalized: Scalars['BigInt'];
  lpSupply: Scalars['BigInt'];
  lpQuoteAmount: Scalars['BigInt'];
  lpBaseAmount: Scalars['BigInt'];
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
  totalDepositsNormalized: Scalars['BigInt'];
  totalBorrowsNormalized: Scalars['BigInt'];
  lpSupply: Scalars['BigInt'];
  lpQuoteAmount: Scalars['BigInt'];
  lpBaseAmount: Scalars['BigInt'];
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
  cumulativeDepositsMultiplierX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeBorrowsMultiplierX18?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeBorrowsMultiplierX18_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeBorrowsMultiplierX18_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDepositsNormalized?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_not?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_gt?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_lt?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_gte?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_lte?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDepositsNormalized_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBorrowsNormalized?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_not?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_gt?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_lt?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_gte?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_lte?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBorrowsNormalized_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SpotProductSnapshot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SpotProductSnapshot_filter>>>;
};

export type SpotProductSnapshot_orderBy =
  | 'id'
  | 'period'
  | 'periodIndex'
  | 'product'
  | 'priceX18'
  | 'cumulativeDepositsMultiplierX18'
  | 'cumulativeBorrowsMultiplierX18'
  | 'totalDepositsNormalized'
  | 'totalBorrowsNormalized'
  | 'lpSupply'
  | 'lpQuoteAmount'
  | 'lpBaseAmount';

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
  totalDepositsNormalized?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_not?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_gt?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_lt?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_gte?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_lte?: InputMaybe<Scalars['BigInt']>;
  totalDepositsNormalized_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDepositsNormalized_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBorrowsNormalized?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_not?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_gt?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_lt?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_gte?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_lte?: InputMaybe<Scalars['BigInt']>;
  totalBorrowsNormalized_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBorrowsNormalized_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  snapshots_?: InputMaybe<SpotProductSnapshot_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SpotProduct_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SpotProduct_filter>>>;
};

export type SpotProduct_orderBy =
  | 'id'
  | 'productId'
  | 'market'
  | 'engine'
  | 'priceX18'
  | 'cumulativeDepositsMultiplierX18'
  | 'cumulativeBorrowsMultiplierX18'
  | 'totalDepositsNormalized'
  | 'totalBorrowsNormalized'
  | 'lpSupply'
  | 'lpQuoteAmount'
  | 'lpBaseAmount'
  | 'snapshots';

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
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MarketCandlestick: ResolverTypeWrapper<MarketCandlestick>;
  MarketCandlestick_filter: MarketCandlestick_filter;
  MarketCandlestick_orderBy: MarketCandlestick_orderBy;
  OrderDirection: OrderDirection;
  String: ResolverTypeWrapper<Scalars['String']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  Market: ResolverTypeWrapper<Market>;
  MarketSnapshot: ResolverTypeWrapper<MarketSnapshot>;
  MarketSnapshot_filter: MarketSnapshot_filter;
  MarketSnapshot_orderBy: MarketSnapshot_orderBy;
  Market_filter: Market_filter;
  Market_orderBy: Market_orderBy;
  PerpEngine: ResolverTypeWrapper<PerpEngine>;
  PerpEngine_filter: PerpEngine_filter;
  PerpEngine_orderBy: PerpEngine_orderBy;
  PerpProduct: ResolverTypeWrapper<PerpProduct>;
  PerpProductSnapshot: ResolverTypeWrapper<PerpProductSnapshot>;
  PerpProductSnapshot_filter: PerpProductSnapshot_filter;
  PerpProductSnapshot_orderBy: PerpProductSnapshot_orderBy;
  PerpProduct_filter: PerpProduct_filter;
  PerpProduct_orderBy: PerpProduct_orderBy;
  SocializeProductEvent: ResolverTypeWrapper<SocializeProductEvent>;
  SocializeProductEvent_filter: SocializeProductEvent_filter;
  SocializeProductEvent_orderBy: SocializeProductEvent_orderBy;
  SpotEngine: ResolverTypeWrapper<SpotEngine>;
  SpotEngine_filter: SpotEngine_filter;
  SpotEngine_orderBy: SpotEngine_orderBy;
  SpotProduct: ResolverTypeWrapper<SpotProduct>;
  SpotProductSnapshot: ResolverTypeWrapper<SpotProductSnapshot>;
  SpotProductSnapshot_filter: SpotProductSnapshot_filter;
  SpotProductSnapshot_orderBy: SpotProductSnapshot_orderBy;
  SpotProduct_filter: SpotProduct_filter;
  SpotProduct_orderBy: SpotProduct_orderBy;
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
  LiquidationEvent: ResolverTypeWrapper<LiquidationEvent>;
  LiquidationEvent_filter: LiquidationEvent_filter;
  LiquidationEvent_orderBy: LiquidationEvent_orderBy;
  ModifyCollateralEvent: ResolverTypeWrapper<ModifyCollateralEvent>;
  ModifyCollateralEvent_filter: ModifyCollateralEvent_filter;
  ModifyCollateralEvent_orderBy: ModifyCollateralEvent_orderBy;
  Order: ResolverTypeWrapper<Order>;
  OrderType: OrderType;
  Order_filter: Order_filter;
  Order_orderBy: Order_orderBy;
  PerpBalanceSummary: ResolverTypeWrapper<PerpBalanceSummary>;
  PerpBalanceSummary_filter: PerpBalanceSummary_filter;
  PerpBalanceSummary_orderBy: PerpBalanceSummary_orderBy;
  SettlePnlEvent: ResolverTypeWrapper<SettlePnlEvent>;
  SettlePnlEvent_filter: SettlePnlEvent_filter;
  SettlePnlEvent_orderBy: SettlePnlEvent_orderBy;
  SpotBalanceSummary: ResolverTypeWrapper<SpotBalanceSummary>;
  SpotBalanceSummary_filter: SpotBalanceSummary_filter;
  SpotBalanceSummary_orderBy: SpotBalanceSummary_orderBy;
  Subaccount: ResolverTypeWrapper<Subaccount>;
  Subaccount_filter: Subaccount_filter;
  Subaccount_orderBy: Subaccount_orderBy;
  SubmitSlowModeTransactionEvent: ResolverTypeWrapper<SubmitSlowModeTransactionEvent>;
  SubmitSlowModeTransactionEvent_filter: SubmitSlowModeTransactionEvent_filter;
  SubmitSlowModeTransactionEvent_orderBy: SubmitSlowModeTransactionEvent_orderBy;
  SubmitTransactionsEvent: ResolverTypeWrapper<SubmitTransactionsEvent>;
  SubmitTransactionsEvent_filter: SubmitTransactionsEvent_filter;
  SubmitTransactionsEvent_orderBy: SubmitTransactionsEvent_orderBy;
  TradeSummary: ResolverTypeWrapper<TradeSummary>;
  TradeSummary_filter: TradeSummary_filter;
  TradeSummary_orderBy: TradeSummary_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  MarketCandlestick: MarketCandlestick;
  MarketCandlestick_filter: MarketCandlestick_filter;
  String: Scalars['String'];
  _Block_: _Block_;
  _Meta_: _Meta_;
  Market: Market;
  MarketSnapshot: MarketSnapshot;
  MarketSnapshot_filter: MarketSnapshot_filter;
  Market_filter: Market_filter;
  PerpEngine: PerpEngine;
  PerpEngine_filter: PerpEngine_filter;
  PerpProduct: PerpProduct;
  PerpProductSnapshot: PerpProductSnapshot;
  PerpProductSnapshot_filter: PerpProductSnapshot_filter;
  PerpProduct_filter: PerpProduct_filter;
  SocializeProductEvent: SocializeProductEvent;
  SocializeProductEvent_filter: SocializeProductEvent_filter;
  SpotEngine: SpotEngine;
  SpotEngine_filter: SpotEngine_filter;
  SpotProduct: SpotProduct;
  SpotProductSnapshot: SpotProductSnapshot;
  SpotProductSnapshot_filter: SpotProductSnapshot_filter;
  SpotProduct_filter: SpotProduct_filter;
  Clearinghouse: Clearinghouse;
  Clearinghouse_filter: Clearinghouse_filter;
  ClosedPerpBalance: ClosedPerpBalance;
  ClosedPerpBalance_filter: ClosedPerpBalance_filter;
  ClosedSpotBalance: ClosedSpotBalance;
  ClosedSpotBalance_filter: ClosedSpotBalance_filter;
  FillOrderEvent: FillOrderEvent;
  FillOrderEvent_filter: FillOrderEvent_filter;
  LiquidationEvent: LiquidationEvent;
  LiquidationEvent_filter: LiquidationEvent_filter;
  ModifyCollateralEvent: ModifyCollateralEvent;
  ModifyCollateralEvent_filter: ModifyCollateralEvent_filter;
  Order: Order;
  Order_filter: Order_filter;
  PerpBalanceSummary: PerpBalanceSummary;
  PerpBalanceSummary_filter: PerpBalanceSummary_filter;
  SettlePnlEvent: SettlePnlEvent;
  SettlePnlEvent_filter: SettlePnlEvent_filter;
  SpotBalanceSummary: SpotBalanceSummary;
  SpotBalanceSummary_filter: SpotBalanceSummary_filter;
  Subaccount: Subaccount;
  Subaccount_filter: Subaccount_filter;
  SubmitSlowModeTransactionEvent: SubmitSlowModeTransactionEvent;
  SubmitSlowModeTransactionEvent_filter: SubmitSlowModeTransactionEvent_filter;
  SubmitTransactionsEvent: SubmitTransactionsEvent;
  SubmitTransactionsEvent_filter: SubmitTransactionsEvent_filter;
  TradeSummary: TradeSummary;
  TradeSummary_filter: TradeSummary_filter;
}>;

export type QueryResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  marketCandlestick?: Resolver<Maybe<ResolversTypes['MarketCandlestick']>, ParentType, ContextType, RequireFields<QuerymarketCandlestickArgs, 'id' | 'subgraphError'>>;
  marketCandlesticks?: Resolver<Array<ResolversTypes['MarketCandlestick']>, ParentType, ContextType, RequireFields<QuerymarketCandlesticksArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
  spotEngine?: Resolver<Maybe<ResolversTypes['SpotEngine']>, ParentType, ContextType, RequireFields<QueryspotEngineArgs, 'id' | 'subgraphError'>>;
  spotEngines?: Resolver<Array<ResolversTypes['SpotEngine']>, ParentType, ContextType, RequireFields<QueryspotEnginesArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpEngine?: Resolver<Maybe<ResolversTypes['PerpEngine']>, ParentType, ContextType, RequireFields<QueryperpEngineArgs, 'id' | 'subgraphError'>>;
  perpEngines?: Resolver<Array<ResolversTypes['PerpEngine']>, ParentType, ContextType, RequireFields<QueryperpEnginesArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotProduct?: Resolver<Maybe<ResolversTypes['SpotProduct']>, ParentType, ContextType, RequireFields<QueryspotProductArgs, 'id' | 'subgraphError'>>;
  spotProducts?: Resolver<Array<ResolversTypes['SpotProduct']>, ParentType, ContextType, RequireFields<QueryspotProductsArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotProductSnapshot?: Resolver<Maybe<ResolversTypes['SpotProductSnapshot']>, ParentType, ContextType, RequireFields<QueryspotProductSnapshotArgs, 'id' | 'subgraphError'>>;
  spotProductSnapshots?: Resolver<Array<ResolversTypes['SpotProductSnapshot']>, ParentType, ContextType, RequireFields<QueryspotProductSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpProduct?: Resolver<Maybe<ResolversTypes['PerpProduct']>, ParentType, ContextType, RequireFields<QueryperpProductArgs, 'id' | 'subgraphError'>>;
  perpProducts?: Resolver<Array<ResolversTypes['PerpProduct']>, ParentType, ContextType, RequireFields<QueryperpProductsArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpProductSnapshot?: Resolver<Maybe<ResolversTypes['PerpProductSnapshot']>, ParentType, ContextType, RequireFields<QueryperpProductSnapshotArgs, 'id' | 'subgraphError'>>;
  perpProductSnapshots?: Resolver<Array<ResolversTypes['PerpProductSnapshot']>, ParentType, ContextType, RequireFields<QueryperpProductSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  market?: Resolver<Maybe<ResolversTypes['Market']>, ParentType, ContextType, RequireFields<QuerymarketArgs, 'id' | 'subgraphError'>>;
  markets?: Resolver<Array<ResolversTypes['Market']>, ParentType, ContextType, RequireFields<QuerymarketsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketSnapshot?: Resolver<Maybe<ResolversTypes['MarketSnapshot']>, ParentType, ContextType, RequireFields<QuerymarketSnapshotArgs, 'id' | 'subgraphError'>>;
  marketSnapshots?: Resolver<Array<ResolversTypes['MarketSnapshot']>, ParentType, ContextType, RequireFields<QuerymarketSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  socializeProductEvent?: Resolver<Maybe<ResolversTypes['SocializeProductEvent']>, ParentType, ContextType, RequireFields<QuerysocializeProductEventArgs, 'id' | 'subgraphError'>>;
  socializeProductEvents?: Resolver<Array<ResolversTypes['SocializeProductEvent']>, ParentType, ContextType, RequireFields<QuerysocializeProductEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  clearinghouse?: Resolver<Maybe<ResolversTypes['Clearinghouse']>, ParentType, ContextType, RequireFields<QueryclearinghouseArgs, 'id' | 'subgraphError'>>;
  clearinghouses?: Resolver<Array<ResolversTypes['Clearinghouse']>, ParentType, ContextType, RequireFields<QueryclearinghousesArgs, 'skip' | 'first' | 'subgraphError'>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryorderArgs, 'id' | 'subgraphError'>>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryordersArgs, 'skip' | 'first' | 'subgraphError'>>;
  modifyCollateralEvent?: Resolver<Maybe<ResolversTypes['ModifyCollateralEvent']>, ParentType, ContextType, RequireFields<QuerymodifyCollateralEventArgs, 'id' | 'subgraphError'>>;
  modifyCollateralEvents?: Resolver<Array<ResolversTypes['ModifyCollateralEvent']>, ParentType, ContextType, RequireFields<QuerymodifyCollateralEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  settlePnlEvent?: Resolver<Maybe<ResolversTypes['SettlePnlEvent']>, ParentType, ContextType, RequireFields<QuerysettlePnlEventArgs, 'id' | 'subgraphError'>>;
  settlePnlEvents?: Resolver<Array<ResolversTypes['SettlePnlEvent']>, ParentType, ContextType, RequireFields<QuerysettlePnlEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidationEvent?: Resolver<Maybe<ResolversTypes['LiquidationEvent']>, ParentType, ContextType, RequireFields<QueryliquidationEventArgs, 'id' | 'subgraphError'>>;
  liquidationEvents?: Resolver<Array<ResolversTypes['LiquidationEvent']>, ParentType, ContextType, RequireFields<QueryliquidationEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  fillOrderEvent?: Resolver<Maybe<ResolversTypes['FillOrderEvent']>, ParentType, ContextType, RequireFields<QueryfillOrderEventArgs, 'id' | 'subgraphError'>>;
  fillOrderEvents?: Resolver<Array<ResolversTypes['FillOrderEvent']>, ParentType, ContextType, RequireFields<QueryfillOrderEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
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
  submitTransactionsEvent?: Resolver<Maybe<ResolversTypes['SubmitTransactionsEvent']>, ParentType, ContextType, RequireFields<QuerysubmitTransactionsEventArgs, 'id' | 'subgraphError'>>;
  submitTransactionsEvents?: Resolver<Array<ResolversTypes['SubmitTransactionsEvent']>, ParentType, ContextType, RequireFields<QuerysubmitTransactionsEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  submitSlowModeTransactionEvent?: Resolver<Maybe<ResolversTypes['SubmitSlowModeTransactionEvent']>, ParentType, ContextType, RequireFields<QuerysubmitSlowModeTransactionEventArgs, 'id' | 'subgraphError'>>;
  submitSlowModeTransactionEvents?: Resolver<Array<ResolversTypes['SubmitSlowModeTransactionEvent']>, ParentType, ContextType, RequireFields<QuerysubmitSlowModeTransactionEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  marketCandlestick?: SubscriptionResolver<Maybe<ResolversTypes['MarketCandlestick']>, "marketCandlestick", ParentType, ContextType, RequireFields<SubscriptionmarketCandlestickArgs, 'id' | 'subgraphError'>>;
  marketCandlesticks?: SubscriptionResolver<Array<ResolversTypes['MarketCandlestick']>, "marketCandlesticks", ParentType, ContextType, RequireFields<SubscriptionmarketCandlesticksArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
  spotEngine?: SubscriptionResolver<Maybe<ResolversTypes['SpotEngine']>, "spotEngine", ParentType, ContextType, RequireFields<SubscriptionspotEngineArgs, 'id' | 'subgraphError'>>;
  spotEngines?: SubscriptionResolver<Array<ResolversTypes['SpotEngine']>, "spotEngines", ParentType, ContextType, RequireFields<SubscriptionspotEnginesArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpEngine?: SubscriptionResolver<Maybe<ResolversTypes['PerpEngine']>, "perpEngine", ParentType, ContextType, RequireFields<SubscriptionperpEngineArgs, 'id' | 'subgraphError'>>;
  perpEngines?: SubscriptionResolver<Array<ResolversTypes['PerpEngine']>, "perpEngines", ParentType, ContextType, RequireFields<SubscriptionperpEnginesArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotProduct?: SubscriptionResolver<Maybe<ResolversTypes['SpotProduct']>, "spotProduct", ParentType, ContextType, RequireFields<SubscriptionspotProductArgs, 'id' | 'subgraphError'>>;
  spotProducts?: SubscriptionResolver<Array<ResolversTypes['SpotProduct']>, "spotProducts", ParentType, ContextType, RequireFields<SubscriptionspotProductsArgs, 'skip' | 'first' | 'subgraphError'>>;
  spotProductSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['SpotProductSnapshot']>, "spotProductSnapshot", ParentType, ContextType, RequireFields<SubscriptionspotProductSnapshotArgs, 'id' | 'subgraphError'>>;
  spotProductSnapshots?: SubscriptionResolver<Array<ResolversTypes['SpotProductSnapshot']>, "spotProductSnapshots", ParentType, ContextType, RequireFields<SubscriptionspotProductSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpProduct?: SubscriptionResolver<Maybe<ResolversTypes['PerpProduct']>, "perpProduct", ParentType, ContextType, RequireFields<SubscriptionperpProductArgs, 'id' | 'subgraphError'>>;
  perpProducts?: SubscriptionResolver<Array<ResolversTypes['PerpProduct']>, "perpProducts", ParentType, ContextType, RequireFields<SubscriptionperpProductsArgs, 'skip' | 'first' | 'subgraphError'>>;
  perpProductSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['PerpProductSnapshot']>, "perpProductSnapshot", ParentType, ContextType, RequireFields<SubscriptionperpProductSnapshotArgs, 'id' | 'subgraphError'>>;
  perpProductSnapshots?: SubscriptionResolver<Array<ResolversTypes['PerpProductSnapshot']>, "perpProductSnapshots", ParentType, ContextType, RequireFields<SubscriptionperpProductSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  market?: SubscriptionResolver<Maybe<ResolversTypes['Market']>, "market", ParentType, ContextType, RequireFields<SubscriptionmarketArgs, 'id' | 'subgraphError'>>;
  markets?: SubscriptionResolver<Array<ResolversTypes['Market']>, "markets", ParentType, ContextType, RequireFields<SubscriptionmarketsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['MarketSnapshot']>, "marketSnapshot", ParentType, ContextType, RequireFields<SubscriptionmarketSnapshotArgs, 'id' | 'subgraphError'>>;
  marketSnapshots?: SubscriptionResolver<Array<ResolversTypes['MarketSnapshot']>, "marketSnapshots", ParentType, ContextType, RequireFields<SubscriptionmarketSnapshotsArgs, 'skip' | 'first' | 'subgraphError'>>;
  socializeProductEvent?: SubscriptionResolver<Maybe<ResolversTypes['SocializeProductEvent']>, "socializeProductEvent", ParentType, ContextType, RequireFields<SubscriptionsocializeProductEventArgs, 'id' | 'subgraphError'>>;
  socializeProductEvents?: SubscriptionResolver<Array<ResolversTypes['SocializeProductEvent']>, "socializeProductEvents", ParentType, ContextType, RequireFields<SubscriptionsocializeProductEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  clearinghouse?: SubscriptionResolver<Maybe<ResolversTypes['Clearinghouse']>, "clearinghouse", ParentType, ContextType, RequireFields<SubscriptionclearinghouseArgs, 'id' | 'subgraphError'>>;
  clearinghouses?: SubscriptionResolver<Array<ResolversTypes['Clearinghouse']>, "clearinghouses", ParentType, ContextType, RequireFields<SubscriptionclearinghousesArgs, 'skip' | 'first' | 'subgraphError'>>;
  order?: SubscriptionResolver<Maybe<ResolversTypes['Order']>, "order", ParentType, ContextType, RequireFields<SubscriptionorderArgs, 'id' | 'subgraphError'>>;
  orders?: SubscriptionResolver<Array<ResolversTypes['Order']>, "orders", ParentType, ContextType, RequireFields<SubscriptionordersArgs, 'skip' | 'first' | 'subgraphError'>>;
  modifyCollateralEvent?: SubscriptionResolver<Maybe<ResolversTypes['ModifyCollateralEvent']>, "modifyCollateralEvent", ParentType, ContextType, RequireFields<SubscriptionmodifyCollateralEventArgs, 'id' | 'subgraphError'>>;
  modifyCollateralEvents?: SubscriptionResolver<Array<ResolversTypes['ModifyCollateralEvent']>, "modifyCollateralEvents", ParentType, ContextType, RequireFields<SubscriptionmodifyCollateralEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  settlePnlEvent?: SubscriptionResolver<Maybe<ResolversTypes['SettlePnlEvent']>, "settlePnlEvent", ParentType, ContextType, RequireFields<SubscriptionsettlePnlEventArgs, 'id' | 'subgraphError'>>;
  settlePnlEvents?: SubscriptionResolver<Array<ResolversTypes['SettlePnlEvent']>, "settlePnlEvents", ParentType, ContextType, RequireFields<SubscriptionsettlePnlEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidationEvent?: SubscriptionResolver<Maybe<ResolversTypes['LiquidationEvent']>, "liquidationEvent", ParentType, ContextType, RequireFields<SubscriptionliquidationEventArgs, 'id' | 'subgraphError'>>;
  liquidationEvents?: SubscriptionResolver<Array<ResolversTypes['LiquidationEvent']>, "liquidationEvents", ParentType, ContextType, RequireFields<SubscriptionliquidationEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  fillOrderEvent?: SubscriptionResolver<Maybe<ResolversTypes['FillOrderEvent']>, "fillOrderEvent", ParentType, ContextType, RequireFields<SubscriptionfillOrderEventArgs, 'id' | 'subgraphError'>>;
  fillOrderEvents?: SubscriptionResolver<Array<ResolversTypes['FillOrderEvent']>, "fillOrderEvents", ParentType, ContextType, RequireFields<SubscriptionfillOrderEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
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
  submitTransactionsEvent?: SubscriptionResolver<Maybe<ResolversTypes['SubmitTransactionsEvent']>, "submitTransactionsEvent", ParentType, ContextType, RequireFields<SubscriptionsubmitTransactionsEventArgs, 'id' | 'subgraphError'>>;
  submitTransactionsEvents?: SubscriptionResolver<Array<ResolversTypes['SubmitTransactionsEvent']>, "submitTransactionsEvents", ParentType, ContextType, RequireFields<SubscriptionsubmitTransactionsEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  submitSlowModeTransactionEvent?: SubscriptionResolver<Maybe<ResolversTypes['SubmitSlowModeTransactionEvent']>, "submitSlowModeTransactionEvent", ParentType, ContextType, RequireFields<SubscriptionsubmitSlowModeTransactionEventArgs, 'id' | 'subgraphError'>>;
  submitSlowModeTransactionEvents?: SubscriptionResolver<Array<ResolversTypes['SubmitSlowModeTransactionEvent']>, "submitSlowModeTransactionEvents", ParentType, ContextType, RequireFields<SubscriptionsubmitSlowModeTransactionEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
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

export type MarketCandlestickResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['MarketCandlestick'] = ResolversParentTypes['MarketCandlestick']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
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

export type _Block_Resolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['Market'] = ResolversParentTypes['Market']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  orderbook?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sizeIncrement?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  priceIncrementX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastFillPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeBase?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeQuote?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<Array<ResolversTypes['MarketSnapshot']>, ParentType, ContextType, RequireFields<MarketsnapshotsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketSnapshotResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['MarketSnapshot'] = ResolversParentTypes['MarketSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  periodIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  lastFillPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeBase?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  volumeQuote?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpEngineResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['PerpEngine'] = ResolversParentTypes['PerpEngine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['PerpProduct']>, ParentType, ContextType, RequireFields<PerpEngineproductsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpProductResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['PerpProduct'] = ResolversParentTypes['PerpProduct']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  engine?: Resolver<ResolversTypes['PerpEngine'], ParentType, ContextType>;
  liquidationPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingLongX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingShortX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openInterest?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  availableSettle?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpQuoteAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpBaseAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpCumulativeFundingPerLpX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<Array<ResolversTypes['PerpProductSnapshot']>, ParentType, ContextType, RequireFields<PerpProductsnapshotsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpProductSnapshotResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['PerpProductSnapshot'] = ResolversParentTypes['PerpProductSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  periodIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['PerpProduct'], ParentType, ContextType>;
  liquidationPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingLongX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeFundingShortX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  openInterest?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  availableSettle?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpQuoteAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpBaseAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpCumulativeFundingPerLpX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SocializeProductEventResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['SocializeProductEvent'] = ResolversParentTypes['SocializeProductEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amountSocialized?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotEngineResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['SpotEngine'] = ResolversParentTypes['SpotEngine']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['SpotProduct']>, ParentType, ContextType, RequireFields<SpotEngineproductsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotProductResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['SpotProduct'] = ResolversParentTypes['SpotProduct']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>;
  engine?: Resolver<ResolversTypes['SpotEngine'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeDepositsMultiplierX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeBorrowsMultiplierX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDepositsNormalized?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalBorrowsNormalized?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpQuoteAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpBaseAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<Array<ResolversTypes['SpotProductSnapshot']>, ParentType, ContextType, RequireFields<SpotProductsnapshotsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotProductSnapshotResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['SpotProductSnapshot'] = ResolversParentTypes['SpotProductSnapshot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  periodIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['SpotProduct'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeDepositsMultiplierX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeBorrowsMultiplierX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDepositsNormalized?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalBorrowsNormalized?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpQuoteAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lpBaseAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClearinghouseResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['Clearinghouse'] = ResolversParentTypes['Clearinghouse']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  endpoint?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quoteProduct?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  numSubaccounts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  numProducts?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccounts?: Resolver<Array<ResolversTypes['Subaccount']>, ParentType, ContextType, RequireFields<ClearinghousesubaccountsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClosedPerpBalanceResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['ClosedPerpBalance'] = ResolversParentTypes['ClosedPerpBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['PerpBalanceSummary'], ParentType, ContextType>;
  timeOpened?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timeClosed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  netFunding?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClosedSpotBalanceResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['ClosedSpotBalance'] = ResolversParentTypes['ClosedSpotBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['SpotBalanceSummary'], ParentType, ContextType>;
  timeOpened?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timeClosed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  netInterest?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FillOrderEventResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['FillOrderEvent'] = ResolversParentTypes['FillOrderEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  isTaker?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  feeQuote?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amountDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quoteDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  newOrderFilledAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LiquidationEventResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['LiquidationEvent'] = ResolversParentTypes['LiquidationEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidator?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  liquidatee?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  mode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  healthGroup?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidationAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  liquidationPayment?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  insuranceCoverage?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  spotProductId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  spotAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  perpProductId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  perpAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  spotOraclePriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  perpLiquidationPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ModifyCollateralEventResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['ModifyCollateralEvent'] = ResolversParentTypes['ModifyCollateralEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  newBalanceAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  oraclePriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['OrderType'], ParentType, ContextType>;
  digest?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  priceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  isTaker?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  expiration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realExpiration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  reportedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reportedAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  filledAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quoteAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collectedFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PerpBalanceSummaryResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['PerpBalanceSummary'] = ResolversParentTypes['PerpBalanceSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  timeOpened?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  vQuoteWithoutFunding?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNetFunding?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  closedBalances?: Resolver<Array<ResolversTypes['ClosedPerpBalance']>, ParentType, ContextType, RequireFields<PerpBalanceSummaryclosedBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SettlePnlEventResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['SettlePnlEvent'] = ResolversParentTypes['SettlePnlEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  positionAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  perpLiquidationPriceX18?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotBalanceSummaryResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['SpotBalanceSummary'] = ResolversParentTypes['SpotBalanceSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  timeOpened?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  netRealAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNetInterest?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  closedBalances?: Resolver<Array<ResolversTypes['ClosedSpotBalance']>, ParentType, ContextType, RequireFields<SpotBalanceSummaryclosedBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubaccountResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['Subaccount'] = ResolversParentTypes['Subaccount']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clearinghouse?: Resolver<ResolversTypes['Clearinghouse'], ParentType, ContextType>;
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
  fillOrderEvents?: Resolver<Array<ResolversTypes['FillOrderEvent']>, ParentType, ContextType, RequireFields<SubaccountfillOrderEventsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubmitSlowModeTransactionEventResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['SubmitSlowModeTransactionEvent'] = ResolversParentTypes['SubmitSlowModeTransactionEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tx?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  executableAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubmitTransactionsEventResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['SubmitTransactionsEvent'] = ResolversParentTypes['SubmitTransactionsEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TradeSummaryResolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }, ParentType extends ResolversParentTypes['TradeSummary'] = ResolversParentTypes['TradeSummary']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  subaccount?: Resolver<ResolversTypes['Subaccount'], ParentType, ContextType>;
  totalEntryQuoteAmountAbs?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalEntryAmountAbs?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalCloseQuoteAmountAbs?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalCloseAmountAbs?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext & { coreEndpoint: string; marketsEndpoint: string; candlesticksEndpoint: string }> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  MarketCandlestick?: MarketCandlestickResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  Market?: MarketResolvers<ContextType>;
  MarketSnapshot?: MarketSnapshotResolvers<ContextType>;
  PerpEngine?: PerpEngineResolvers<ContextType>;
  PerpProduct?: PerpProductResolvers<ContextType>;
  PerpProductSnapshot?: PerpProductSnapshotResolvers<ContextType>;
  SocializeProductEvent?: SocializeProductEventResolvers<ContextType>;
  SpotEngine?: SpotEngineResolvers<ContextType>;
  SpotProduct?: SpotProductResolvers<ContextType>;
  SpotProductSnapshot?: SpotProductSnapshotResolvers<ContextType>;
  Clearinghouse?: ClearinghouseResolvers<ContextType>;
  ClosedPerpBalance?: ClosedPerpBalanceResolvers<ContextType>;
  ClosedSpotBalance?: ClosedSpotBalanceResolvers<ContextType>;
  FillOrderEvent?: FillOrderEventResolvers<ContextType>;
  LiquidationEvent?: LiquidationEventResolvers<ContextType>;
  ModifyCollateralEvent?: ModifyCollateralEventResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  PerpBalanceSummary?: PerpBalanceSummaryResolvers<ContextType>;
  SettlePnlEvent?: SettlePnlEventResolvers<ContextType>;
  SpotBalanceSummary?: SpotBalanceSummaryResolvers<ContextType>;
  Subaccount?: SubaccountResolvers<ContextType>;
  SubmitSlowModeTransactionEvent?: SubmitSlowModeTransactionEventResolvers<ContextType>;
  SubmitTransactionsEvent?: SubmitTransactionsEventResolvers<ContextType>;
  TradeSummary?: TradeSummaryResolvers<ContextType>;
}>;


export type MeshContext = VertexCandlesticksContext & VertexMarketsContext & VertexCoreContext & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn = (moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/VertexCandlesticks/introspectionSchema":
      return import("./sources/VertexCandlesticks/introspectionSchema");
    
    case ".graphclient/sources/VertexMarkets/introspectionSchema":
      return import("./sources/VertexMarkets/introspectionSchema");
    
    case ".graphclient/sources/VertexCore/introspectionSchema":
      return import("./sources/VertexCore/introspectionSchema");
    
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

const sources = [];
const transforms = [];
const additionalEnvelopPlugins = [];
const vertexCoreTransforms = [];
const vertexMarketsTransforms = [];
const vertexCandlesticksTransforms = [];
const additionalTypeDefs = [] as any[];
const vertexCoreHandler = new GraphqlHandler({
              name: "VertexCore",
              config: {"endpoint":"{context.coreEndpoint:https://api.thegraph.com/subgraphs/name/vertex-protocol/vertex-dev-core}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("VertexCore"),
              logger: logger.child("VertexCore"),
              importFn,
            });
const vertexMarketsHandler = new GraphqlHandler({
              name: "VertexMarkets",
              config: {"endpoint":"{context.marketsEndpoint:https://api.thegraph.com/subgraphs/name/vertex-protocol/vertex-dev-markets}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("VertexMarkets"),
              logger: logger.child("VertexMarkets"),
              importFn,
            });
const vertexCandlesticksHandler = new GraphqlHandler({
              name: "VertexCandlesticks",
              config: {"endpoint":"{context.candlesticksEndpoint:https://api.thegraph.com/subgraphs/name/vertex-protocol/vertex-dev-candlesticks}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("VertexCandlesticks"),
              logger: logger.child("VertexCandlesticks"),
              importFn,
            });
vertexCoreTransforms[0] = new AutoPaginationTransform({
                  apiName: "VertexCore",
                  config: {"validateSchema":true},
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
vertexCoreTransforms[1] = new BlockTrackingTransform({
                  apiName: "VertexCore",
                  config: {"validateSchema":true,"ignoreFieldNames":[],"ignoreOperationNames":[]},
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
vertexCoreTransforms[2] = new AutoTypeMergingTransform({
                  apiName: "VertexCore",
                  config: true,
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
vertexMarketsTransforms[0] = new AutoPaginationTransform({
                  apiName: "VertexMarkets",
                  config: {"validateSchema":true},
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
vertexMarketsTransforms[1] = new BlockTrackingTransform({
                  apiName: "VertexMarkets",
                  config: {"validateSchema":true,"ignoreFieldNames":[],"ignoreOperationNames":[]},
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
vertexMarketsTransforms[2] = new AutoTypeMergingTransform({
                  apiName: "VertexMarkets",
                  config: true,
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
vertexCandlesticksTransforms[0] = new AutoPaginationTransform({
                  apiName: "VertexCandlesticks",
                  config: {"validateSchema":true},
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
vertexCandlesticksTransforms[1] = new BlockTrackingTransform({
                  apiName: "VertexCandlesticks",
                  config: {"validateSchema":true,"ignoreFieldNames":[],"ignoreOperationNames":[]},
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
vertexCandlesticksTransforms[2] = new AutoTypeMergingTransform({
                  apiName: "VertexCandlesticks",
                  config: true,
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                });
sources[0] = {
          name: 'VertexCore',
          handler: vertexCoreHandler,
          transforms: vertexCoreTransforms
        }
sources[1] = {
          name: 'VertexMarkets',
          handler: vertexMarketsHandler,
          transforms: vertexMarketsTransforms
        }
sources[2] = {
          name: 'VertexCandlesticks',
          handler: vertexCandlesticksHandler,
          transforms: vertexCandlesticksTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
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
        document: SubaccountOrderFillsQueryDocument,
        get rawSDL() {
          return printWithCache(SubaccountOrderFillsQueryDocument);
        },
        location: 'SubaccountOrderFillsQueryDocument.graphql'
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

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type CandlesticksQueryQueryVariables = Exact<{
  productId: Scalars['BigInt'];
  maxTimeExclusive: Scalars['BigInt'];
  period: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type CandlesticksQueryQuery = { marketCandlesticks: Array<Pick<MarketCandlestick, 'id' | 'time' | 'openX18' | 'closeX18' | 'highX18' | 'lowX18' | 'volumeQuote'>> };

export type HourlyHistoricalMarketDataQueryQueryVariables = Exact<{
  marketEntityId: Scalars['String'];
  maxHourExclusive: Scalars['BigInt'];
  minHourInclusive: Scalars['BigInt'];
}>;


export type HourlyHistoricalMarketDataQueryQuery = { marketSnapshots: Array<Pick<MarketSnapshot, 'id' | 'periodIndex' | 'volumeQuote' | 'lastFillPriceX18'>> };

export type HourlyHistoricalProductDataQueryQueryVariables = Exact<{
  productEntityId: Scalars['String'];
  minHourInclusive: Scalars['BigInt'];
  maxHourExclusive: Scalars['BigInt'];
}>;


export type HourlyHistoricalProductDataQueryQuery = { spotProductSnapshots: Array<Pick<SpotProductSnapshot, 'id' | 'periodIndex' | 'priceX18'>>, perpProductSnapshots: Array<Pick<PerpProductSnapshot, 'id' | 'periodIndex' | 'liquidationPriceX18' | 'openInterest'>> };

export type LatestOrderFillsQueryQueryVariables = Exact<{
  productId: Scalars['BigInt'];
}>;


export type LatestOrderFillsQueryQuery = { fillOrderEvents: Array<(
    Pick<FillOrderEvent, 'blockTime' | 'quoteDelta' | 'amountDelta'>
    & { order: Pick<Order, 'priceX18'> }
  )> };

export type PaginatedAllMarketOrdersQueryQueryVariables = Exact<{
  productId: Scalars['BigInt'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type PaginatedAllMarketOrdersQueryQuery = { orders: Array<(
    Pick<Order, 'id' | 'digest' | 'type' | 'priceX18' | 'productId' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
    & { subaccount: Pick<Subaccount, 'owner' | 'name'> }
  )> };

export type PaginatedSubaccountOrdersQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type PaginatedSubaccountOrdersQueryQuery = { orders: Array<(
    Pick<Order, 'id' | 'digest' | 'type' | 'priceX18' | 'productId' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
    & { subaccount: Pick<Subaccount, 'owner' | 'name'> }
  )> };

export type PaginatedSubaccountOrdersForProductsQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  allowedProductIds: Array<Scalars['BigInt']> | Scalars['BigInt'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type PaginatedSubaccountOrdersForProductsQueryQuery = { orders: Array<(
    Pick<Order, 'id' | 'digest' | 'type' | 'priceX18' | 'productId' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
    & { subaccount: Pick<Subaccount, 'owner' | 'name'> }
  )> };

export type OrderByDigestQueryQueryVariables = Exact<{
  digest: Scalars['Bytes'];
  productId: Scalars['BigInt'];
}>;


export type OrderByDigestQueryQuery = { orders: Array<(
    Pick<Order, 'id' | 'digest' | 'type' | 'priceX18' | 'productId' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
    & { subaccount: Pick<Subaccount, 'owner' | 'name'> }
  )> };

export type OrderEntityFieldsFragmentFragment = (
  Pick<Order, 'id' | 'digest' | 'type' | 'priceX18' | 'productId' | 'reportedAt' | 'reportedAtBlock' | 'filledAmount' | 'totalAmount' | 'quoteAmount' | 'collectedFee'>
  & { subaccount: Pick<Subaccount, 'owner' | 'name'> }
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


export type SubaccountLiquidationEventHistoryQueryQuery = { liquidationEvents: Array<Pick<LiquidationEvent, 'id' | 'blockTime' | 'spotProductId' | 'perpProductId' | 'perpAmount' | 'spotAmount' | 'liquidationPayment' | 'insuranceCoverage' | 'spotOraclePriceX18' | 'perpLiquidationPriceX18'>> };

export type SubaccountSettlementEventHistoryQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  maxTimeExclusive: Scalars['BigInt'];
  minTimeInclusive: Scalars['BigInt'];
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type SubaccountSettlementEventHistoryQueryQuery = { settlePnlEvents: Array<Pick<SettlePnlEvent, 'id' | 'blockTime' | 'productId' | 'amount' | 'positionAmount' | 'perpLiquidationPriceX18'>> };

export type SubaccountOrderFillsQueryQueryVariables = Exact<{
  subaccountEntityId: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type SubaccountOrderFillsQueryQuery = { fillOrderEvents: Array<(
    Pick<FillOrderEvent, 'id' | 'blockTime' | 'quoteDelta' | 'amountDelta' | 'newOrderFilledAmount'>
    & { order: Pick<Order, 'digest' | 'type' | 'productId' | 'priceX18' | 'totalAmount' | 'quoteAmount' | 'filledAmount'> }
  )> };

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


export type SubaccountsForAddressQuery = { subaccounts: Array<Pick<Subaccount, 'id' | 'name' | 'owner'>> };

export const OrderEntityFieldsFragmentFragmentDoc = gql`
    fragment OrderEntityFieldsFragment on Order {
  id
  digest
  type
  priceX18
  productId
  subaccount {
    owner
    name
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
    query CandlesticksQuery($productId: BigInt!, $maxTimeExclusive: BigInt!, $period: Int!, $limit: Int!) {
  marketCandlesticks(
    where: {productId: $productId, time_lt: $maxTimeExclusive, period: $period}
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
  marketSnapshots(
    where: {market: $marketEntityId, periodIndex_gte: $minHourInclusive, periodIndex_lt: $maxHourExclusive, period: 3600}
    orderBy: periodIndex
    orderDirection: desc
  ) {
    id
    periodIndex
    volumeQuote
    lastFillPriceX18
  }
}
    ` as unknown as DocumentNode<HourlyHistoricalMarketDataQueryQuery, HourlyHistoricalMarketDataQueryQueryVariables>;
export const HourlyHistoricalProductDataQueryDocument = gql`
    query HourlyHistoricalProductDataQuery($productEntityId: String!, $minHourInclusive: BigInt!, $maxHourExclusive: BigInt!) {
  spotProductSnapshots(
    where: {product: $productEntityId, periodIndex_gte: $minHourInclusive, periodIndex_lt: $maxHourExclusive, period: 3600}
  ) {
    id
    periodIndex
    priceX18
  }
  perpProductSnapshots(
    where: {product: $productEntityId, periodIndex_gte: $minHourInclusive, periodIndex_lt: $maxHourExclusive, period: 3600}
  ) {
    id
    periodIndex
    liquidationPriceX18
    openInterest
  }
}
    ` as unknown as DocumentNode<HourlyHistoricalProductDataQueryQuery, HourlyHistoricalProductDataQueryQueryVariables>;
export const LatestOrderFillsQueryDocument = gql`
    query LatestOrderFillsQuery($productId: BigInt!) {
  fillOrderEvents(
    where: {productId: $productId, isTaker: false}
    orderBy: blockTime
    orderDirection: desc
    first: 100
  ) {
    blockTime
    quoteDelta
    amountDelta
    order {
      priceX18
    }
  }
}
    ` as unknown as DocumentNode<LatestOrderFillsQueryQuery, LatestOrderFillsQueryQueryVariables>;
export const PaginatedAllMarketOrdersQueryDocument = gql`
    query PaginatedAllMarketOrdersQuery($productId: BigInt!, $first: Int, $skip: Int) {
  orders(
    where: {productId: $productId}
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
    query PaginatedSubaccountOrdersForProductsQuery($subaccountEntityId: String!, $allowedProductIds: [BigInt!]!, $first: Int, $skip: Int) {
  orders(
    where: {subaccount: $subaccountEntityId, productId_in: $allowedProductIds}
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
    query OrderByDigestQuery($digest: Bytes!, $productId: BigInt!) {
  orders(where: {digest: $digest, productId: $productId}) {
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
    spotProductId
    perpProductId
    perpAmount
    spotAmount
    liquidationPayment
    insuranceCoverage
    spotOraclePriceX18
    perpLiquidationPriceX18
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
    positionAmount
    perpLiquidationPriceX18
  }
}
    ` as unknown as DocumentNode<SubaccountSettlementEventHistoryQueryQuery, SubaccountSettlementEventHistoryQueryQueryVariables>;
export const SubaccountOrderFillsQueryDocument = gql`
    query SubaccountOrderFillsQuery($subaccountEntityId: String!, $first: Int, $skip: Int) {
  fillOrderEvents(
    where: {subaccount: $subaccountEntityId}
    orderBy: blockTime
    orderDirection: desc
    first: $first
    skip: $skip
  ) {
    id
    blockTime
    quoteDelta
    amountDelta
    newOrderFilledAmount
    order {
      digest
      type
      productId
      priceX18
      totalAmount
      quoteAmount
      filledAmount
    }
  }
}
    ` as unknown as DocumentNode<SubaccountOrderFillsQueryQuery, SubaccountOrderFillsQueryQueryVariables>;
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
    SubaccountOrderFillsQuery(variables: SubaccountOrderFillsQueryQueryVariables, options?: C): Promise<SubaccountOrderFillsQueryQuery> {
      return requester<SubaccountOrderFillsQueryQuery, SubaccountOrderFillsQueryQueryVariables>(SubaccountOrderFillsQueryDocument, variables, options) as Promise<SubaccountOrderFillsQueryQuery>;
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