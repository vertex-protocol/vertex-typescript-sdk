import { BaseVertexAPI } from '../base';

export class MarketExecuteAPI extends BaseVertexAPI {
  // Wrap the send orders util
  async sendOrders() {
    console.log('hi eslint');
  }

  // No cancellations
  async placeOrders() {
    console.log('hi eslint');
  }

  async cancelOrders() {
    console.log('hi eslint');
  }
}
