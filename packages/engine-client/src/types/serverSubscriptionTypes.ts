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
export interface EngineServerSubscriptionStreamByType {
  trade: EngineServerTradeStreamParams;
  best_bid_offer: EngineServerBestBidOfferStreamParams;
  fill: EngineServerFillStreamParams;
  position_change: EngineServerPositionChangeStreamParams;
  book_depth: EngineServerBookDepthStreamParams;
}

export type EngineServerSubscriptionStreamType =
  keyof EngineServerSubscriptionStreamByType;

/**
 * @description Describes a stream that can be subscribed to.
 */
export type EngineServerSubscriptionStream<
  TStreamType extends EngineServerSubscriptionStreamType,
> = {
  type: TStreamType;
} & EngineServerSubscriptionStreamByType[TStreamType];

/**
 * @description Params to provide to a `subscribe` / `unsubscribe` action.
 */
export interface EngineServerSubscriptionParams {
  stream: EngineServerSubscriptionStream<EngineServerSubscriptionStreamType>;
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
