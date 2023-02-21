export interface IndexerServerSubaccountSummaryParams {
  // Hex representation of subaccount bytes32
  subaccount: string;
}

export interface IndexerServerFundingRateParams {
  product_id: number;
}

export interface IndexerServerQueryRequestByType {
  summary: IndexerServerSubaccountSummaryParams;
  funding_rate: IndexerServerFundingRateParams;
}

export type IndexerServerQueryRequestType =
  keyof IndexerServerQueryRequestByType;

export interface IndexerServerSubaccountSummaryResponse {
  subaccount: string;
  exists: boolean;
  spot_balances: IndexerServerSubaccountBalance[];
  spot_lp_balances: IndexerServerSubaccountBalance[];
  perp_balances: IndexerServerSubaccountBalance[];
  perp_lp_balances: IndexerServerSubaccountBalance[];
}

export interface IndexerServerSubaccountBalance {
  product_id: number;
  unrealized_pnl: string;
}

export interface IndexerServerFundingRateResponse {
  product_id: number;
  funding_rate_x18: string;
  update_time: number;
}

export interface IndexerServerQueryResponseByType {
  summary: IndexerServerSubaccountSummaryResponse;
  funding_rate: IndexerServerFundingRateResponse;
}

export type IndexerServerQueryResponse =
  IndexerServerQueryResponseByType[keyof IndexerServerQueryResponseByType];
