import { BaseVertexAPI } from '../base';

export class SubaccountQueryAPI extends BaseVertexAPI {
  // By address
  async getSubaccounts() {}

  // From querier
  async getSubaccountSummary() {}

  // Logical filters
  async getOrders() {}

  async getAllEvents() {}

  async getLiquidationEvents() {}

  async getModifyCollateralEvents() {}

  // TODO: The other events if needed
}
