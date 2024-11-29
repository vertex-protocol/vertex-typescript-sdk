import { SettlePnlParams } from '@vertex-protocol/contracts';
import { BaseVertexAPI } from '../base';

export class PerpExecuteAPI extends BaseVertexAPI {
  settlePnl(_params: SettlePnlParams) {
    throw Error('Not implemented');
  }
}
