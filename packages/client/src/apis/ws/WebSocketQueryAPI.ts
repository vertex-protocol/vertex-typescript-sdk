import {
  EngineServerQueryRequest,
  EngineServerQueryRequestByType,
  EngineServerQueryRequestType,
} from '@vertex-protocol/engine-client';
import { BaseVertexAPI } from '../base';

export class WebSocketQueryAPI extends BaseVertexAPI {
  public buildQueryMsg<TRequestType extends EngineServerQueryRequestType>(
    requestType: TRequestType,
    params: EngineServerQueryRequestByType[TRequestType],
  ): EngineServerQueryRequest<TRequestType> {
    return this.context.engineClient.getQueryRequest(requestType, params);
  }
}
