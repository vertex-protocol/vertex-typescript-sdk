import {
  EngineServerQueryRequest,
  EngineServerQueryRequestByType,
  EngineServerQueryRequestType,
} from '@vertex-protocol/engine-client';
import { BaseVertexAPI } from '../base';

/**
 * @description Allows you to build query payloads as expected by the server to send over Websocket.
 * @example vertexClient.ws.query.buildQueryPayload('all_products', {})
 */
export class WebSocketQueryAPI extends BaseVertexAPI {
  /**
   * Builds a query request payload as expected by the server via Websocket.
   * @param requestType
   * @param params
   * @returns query request payload as expected by the server to be sent via Websocket.
   */
  public buildQueryPayload<TRequestType extends EngineServerQueryRequestType>(
    requestType: TRequestType,
    params: EngineServerQueryRequestByType[TRequestType],
  ): EngineServerQueryRequest<TRequestType> {
    return this.context.engineClient.getQueryRequest(requestType, params);
  }
}
