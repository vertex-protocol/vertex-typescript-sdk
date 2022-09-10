import {
  EngineServerExecuteRequestByType,
  EngineServerExecuteRequestType,
  EngineServerExecutionResult,
} from './serverExecuteTypes';
import {
  EngineServerQueryRequestByType,
  EngineServerQueryRequestType,
  EngineServerQueryResponse,
} from './serverQueryTypes';

export interface EngineExecuteRequestBody<
  T extends EngineServerExecuteRequestType = EngineServerExecuteRequestType,
> {
  // Can't type by T here, but the key should be one of EngineExecuteRequestType
  [type: string]: EngineServerExecuteRequestByType[T];
}

export type EngineExecuteRequestResponse = EngineServerExecutionResult;

export type EngineQueryRequestParams<
  T extends EngineServerQueryRequestType = EngineServerQueryRequestType,
> = EngineServerQueryRequestByType[T] & {
  type: T;
};

export type EngineQueryRequestResponse<
  T extends EngineServerQueryRequestType = EngineServerQueryRequestType,
> = EngineServerQueryResponse<T>;
