import { BaseVertexAPI } from '../base';

export class MarketExecuteAPI extends BaseVertexAPI {
  // Wrap the send orders util
  async sendOrders() {}

  // No cancellations
  async placeOrders() {}

  async cancelOrders() {}
}
