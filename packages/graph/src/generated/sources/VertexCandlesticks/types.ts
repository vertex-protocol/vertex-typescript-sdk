
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace VertexCandlesticksTypes {
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

export type MarketCandlestick = {
  id: Scalars['ID'];
  productId: Scalars['BigInt'];
  time: Scalars['BigInt'];
  period: Scalars['Int'];
  openX18: Scalars['BigInt'];
  closeX18: Scalars['BigInt'];
  lowX18: Scalars['BigInt'];
  highX18: Scalars['BigInt'];
  volumeBaseX18: Scalars['BigInt'];
  volumeQuoteX18: Scalars['BigInt'];
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

export type MarketCandlestick_orderBy =
  | 'id'
  | 'productId'
  | 'time'
  | 'period'
  | 'openX18'
  | 'closeX18'
  | 'lowX18'
  | 'highX18'
  | 'volumeBaseX18'
  | 'volumeQuoteX18';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  marketCandlestick?: Maybe<MarketCandlestick>;
  marketCandlesticks: Array<MarketCandlestick>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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

export type Subscription = {
  marketCandlestick?: Maybe<MarketCandlestick>;
  marketCandlesticks: Array<MarketCandlestick>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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
export type QueryVertexCandlesticksSdk = {
  /** null **/
  marketCandlestick: InContextSdkMethod<VertexCandlesticksTypes.Query['marketCandlestick'], VertexCandlesticksTypes.QuerymarketCandlestickArgs, MeshContext>,
  /** null **/
  marketCandlesticks: InContextSdkMethod<VertexCandlesticksTypes.Query['marketCandlesticks'], VertexCandlesticksTypes.QuerymarketCandlesticksArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<VertexCandlesticksTypes.Query['_meta'], VertexCandlesticksTypes.Query_metaArgs, MeshContext>
};

export type MutationVertexCandlesticksSdk = {

};

export type SubscriptionVertexCandlesticksSdk = {
  /** null **/
  marketCandlestick: InContextSdkMethod<VertexCandlesticksTypes.Subscription['marketCandlestick'], VertexCandlesticksTypes.SubscriptionmarketCandlestickArgs, MeshContext>,
  /** null **/
  marketCandlesticks: InContextSdkMethod<VertexCandlesticksTypes.Subscription['marketCandlesticks'], VertexCandlesticksTypes.SubscriptionmarketCandlesticksArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<VertexCandlesticksTypes.Subscription['_meta'], VertexCandlesticksTypes.Subscription_metaArgs, MeshContext>
};
export type VertexCandlesticksContext = {
      ["VertexCandlesticks"]: { Query: QueryVertexCandlesticksSdk, Mutation: MutationVertexCandlesticksSdk, Subscription: SubscriptionVertexCandlesticksSdk },
      
    };