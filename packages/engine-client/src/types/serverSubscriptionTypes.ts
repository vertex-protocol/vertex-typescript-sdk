export interface EngineServerSubscriptionTradeStreamParams {
  product_id: number;
}

export interface EngineServerSubscriptionBestBidOfferStreamParams {
  product_id: number;
}

export interface EngineServerSubscriptionFillStreamParams {
  product_id: number;
  subaccount: string;
}

export interface EngineServerSubscriptionPositionChangeStreamParams {
  product_id: number;
  subaccount: string;
}

export interface EngineServerSubscriptionBookDepthStreamParams {
  product_id: number;
}

/**
 * @description Available subscription streams
 */
export interface EngineServerSubscriptionStreamParamsByType {
  trade: EngineServerSubscriptionTradeStreamParams;
  best_bid_offer: EngineServerSubscriptionBestBidOfferStreamParams;
  fill: EngineServerSubscriptionFillStreamParams;
  position_change: EngineServerSubscriptionPositionChangeStreamParams;
  book_depth: EngineServerSubscriptionBookDepthStreamParams;
}

export type EngineServerSubscriptionStreamParamsType =
  keyof EngineServerSubscriptionStreamParamsByType;

/**
 * @description Describes a stream that can be subscribed to.
 */
export type EngineServerSubscriptionStream<
  TStreamType extends EngineServerSubscriptionStreamParamsType,
> = {
  type: TStreamType;
} & EngineServerSubscriptionStreamParamsByType[TStreamType];

/**
 * @description Params to provide to a `subscribe` / `unsubscribe` action.
 */
export interface EngineServerSubscriptionParams {
  stream: EngineServerSubscriptionStream<EngineServerSubscriptionStreamParamsType>;
}

/**
 * @description Available actions on the subscription API.
 */
export interface EngineServerSubscriptionRequestByType {
  subscribe: EngineServerSubscriptionParams;
  unsubscribe: EngineServerSubscriptionParams;
  list: Record<string, never>;
}

export type EngineServerSubscriptionRequestType =
  keyof EngineServerSubscriptionRequestByType;

/**
 * @description Top level request to send to the server.
 */
export type EngineServerSubscriptionRequest<
  TRequestType extends EngineServerSubscriptionRequestType,
> = {
  id: number;
  method: TRequestType;
} & EngineServerSubscriptionRequestByType[TRequestType];
