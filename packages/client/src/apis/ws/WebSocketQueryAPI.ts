import {
  EngineServerQueryRequest,
  EngineServerQueryRequestByType,
  EngineServerQueryRequestType,
} from '@vertex-protocol/engine-client';
import { BaseVertexAPI } from '../base';

export class WebSocketQueryAPI extends BaseVertexAPI {
  /**
   * Builds a query request as expected by the server via Websocket.
   * @param requestType
   * @param params
   * @returns query request payload as expected by the server to be sent via Websocket.
   */
  public buildPayload<TRequestType extends EngineServerQueryRequestType>(
    requestType: TRequestType,
    params: EngineServerQueryRequestByType[TRequestType],
  ): EngineServerQueryRequest<TRequestType> {
    return this.context.engineClient.getQueryRequest(requestType, params);
  }
}
