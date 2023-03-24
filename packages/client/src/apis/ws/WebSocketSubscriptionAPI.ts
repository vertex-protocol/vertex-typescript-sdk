import {
  EngineServerSubscriptionRequestType,
  EngineServerSubscriptionRequestByType,
  EngineServerSubscriptionRequest,
  EngineServerSubscriptionStreamType,
  EngineServerSubscriptionStreamByType,
  EngineServerSubscriptionStream,
} from '@vertex-protocol/engine-client';
import { BaseVertexAPI } from '../base';

/**
 * @description Allows you to build subscription payloads as expected by the server to send over Websocket.
 * @example
 * const tradeStreamPayload = vertexClient.ws.subscription.buildStreamPayload('trade', ...);
 * const tradeSubscriptionPayload = vertexClient.ws.subscription.buildSubscriptionPayload(
 *    'subscribe', tradeStreamPayload);
 */
export class WebSocketSubscriptionAPI extends BaseVertexAPI {
  /**
   * Builds a subscription request payload as expected by the server via Websocket.
   * @param requestType name of request to build payload for.
   * @param id identifier to associate messages with responses.
   * @param params request payload params.
   * @returns subscription request payload.
   */
  public buildSubscriptionPayload<
    TRequestType extends EngineServerSubscriptionRequestType,
  >(
    requestType: TRequestType,
    id: number,
    params: EngineServerSubscriptionRequestByType[TRequestType],
  ): EngineServerSubscriptionRequest<TRequestType> {
    return {
      id,
      method: requestType,
      ...params,
    };
  }

  /**
   * Builds a subscription stream payload as expected by the server via Websocket.
   * @param streamType name of stream to build payload for.
   * @param params stream payload params.
   * @returns subscription stream payload.
   */
  public buildStreamPayload<
    TStreamType extends EngineServerSubscriptionStreamType,
  >(
    streamType: TStreamType,
    params: EngineServerSubscriptionStreamByType[TStreamType],
  ): {
    stream: EngineServerSubscriptionStream<TStreamType>;
  } {
    return {
      stream: {
        type: streamType,
        ...params,
      },
    };
  }
}
