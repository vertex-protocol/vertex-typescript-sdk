import { BaseVertexAPI } from '../base';
import {
  getSendOrdersArgs,
  SendOrdersParams,
} from '@vertex-protocol/contracts';

export class MarketExecuteAPI extends BaseVertexAPI {
  async sendOrders(params: SendOrdersParams) {
    return this.context.contracts.clearinghouse.sendOrders(
      ...getSendOrdersArgs(params),
    );
  }
}
