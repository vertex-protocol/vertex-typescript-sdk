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

/**
 * @description Available subscription streams
 */
export interface EngineServerSubscriptionStreamParamsByType {
  trade: EngineServerTradeStreamParams;
  best_bid_offer: EngineServerBestBidOfferStreamParams;
  fill: EngineServerFillStreamParams;
  position_change: EngineServerPositionChangeStreamParams;
  book_depth: EngineServerBookDepthStreamParams;
}

export type EngineServerSubscriptionStreamParamsType =
  keyof EngineServerSubscriptionStreamParamsByType;

/**
 * @description Describes a stream that can be subscribed to.
 */
export type EngineServerSubscriptionStreamParams<
  TStreamType extends EngineServerSubscriptionStreamParamsType,
> = {
  type: TStreamType;
} & EngineServerSubscriptionStreamParamsByType[TStreamType];

/**
 * @description Params to provide to a `subscribe` / `unsubscribe` action.
 */
export interface EngineServerSubscriptionParams {
  stream: EngineServerSubscriptionStreamParams<EngineServerSubscriptionStreamParamsType>;
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
 * @description Top level request to provide to send to the server.
 */
export type EngineServerSubscriptionRequest<
  TRequestType extends EngineServerSubscriptionRequestType,
> = {
  method: TRequestType;
  id: number;
} & EngineServerSubscriptionRequestByType[TRequestType];
