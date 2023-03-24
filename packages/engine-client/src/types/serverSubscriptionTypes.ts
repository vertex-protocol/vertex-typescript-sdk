import { RequireExactlyOne } from '../utils';
import {
  SubscriptionBestBidOfferEvent,
  SubscriptionBookDepthEvent,
  SubscriptionFillEvent,
  SubscriptionPositionChangeEvent,
  SubscriptionTradeEvent,
} from './serverSubscriptionModelTypes';

export interface EngineServerTradeStreamParams {
  product_id: number;
}

export interface EngineServerBestBidOfferStreamParams {
  product_id: number;
}

export interface EngineServerFillStreamParams {
  product_id: number;
  subaccount: string;
}

export interface EngineServerPositionChangeStreamParams {
  product_id: number;
  subaccount: string;
}

export interface EngineServerBookDepthStreamParams {
  product_id: number;
}

export interface EngineServerSubscriptionStreamByType {
  default: Record<string, never>;
  trade: EngineServerTradeStreamParams;
  best_bid_offer: EngineServerBestBidOfferStreamParams;
  fill: EngineServerFillStreamParams;
  position_change: EngineServerPositionChangeStreamParams;
  book_depth: EngineServerBookDepthStreamParams;
}

export type EngineServerSubscriptionStreamType =
  keyof EngineServerSubscriptionStreamByType;

export type EngineServerSubscriptionStream<
  TStreamType extends EngineServerSubscriptionStreamType,
> = {
  type: TStreamType;
} & EngineServerSubscriptionStreamByType[TStreamType];

export type EngineServerSubscriptionParams = RequireExactlyOne<
  EngineServerSubscriptionStream<EngineServerSubscriptionStreamType>
>;

export interface EngineServerSubscriptionRequestByType {
  subscribe: EngineServerSubscriptionParams;
  unsubscribe: EngineServerSubscriptionParams;
  list: Record<string, never>;
}

export type EngineServerSubscriptionRequestType =
  keyof EngineServerSubscriptionRequestByType;

export type EngineServerSubscriptionRequest<
  TRequestType extends EngineServerSubscriptionRequestType,
> = {
  method: TRequestType;
} & EngineServerSubscriptionRequestByType[TRequestType];

export interface EngineServerSubscriptionResponseByType {
  subscribe: Record<string, never>;
  unsubscribe: Record<string, never>;
  list: EngineServerSubscriptionParams[];
}

export interface EngineServerSubscriptionResponse<
  TRequestType extends keyof EngineServerSubscriptionResponseByType = EngineServerSubscriptionRequestType,
> {
  id: number;
  result: EngineServerSubscriptionResponseByType[TRequestType];
}

export interface EngineServerSubscriptionEventResponseByType {
  default: Record<string, never>;
  trade: SubscriptionTradeEvent;
  best_bid_offer: SubscriptionBestBidOfferEvent;
  fill: SubscriptionFillEvent;
  position_change: SubscriptionPositionChangeEvent;
  book_depth: SubscriptionBookDepthEvent;
}

export type EngineServerSubscriptionEventResponse<
  TRequestType extends keyof EngineServerSubscriptionEventResponseByType = EngineServerSubscriptionStreamType,
> = {
  type: TRequestType;
} & EngineServerSubscriptionEventResponseByType[TRequestType];
