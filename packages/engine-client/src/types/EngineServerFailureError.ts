import { EngineServerQueryFailureResponse } from './serverQueryTypes';
import { EngineServerExecuteFailureResult } from './serverExecuteTypes';

export class EngineServerFailureError extends Error {
  constructor(
    readonly responseData:
      | EngineServerQueryFailureResponse
      | EngineServerExecuteFailureResult,
  ) {
    super();
  }
}
