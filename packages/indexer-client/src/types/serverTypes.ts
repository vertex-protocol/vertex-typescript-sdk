export interface IndexerServerSubaccountSummaryParams {
  // Hex representation of subaccount bytes32
  subaccount: string;
}

export interface IndexerServerQueryRequestByType {
  summary: IndexerServerSubaccountSummaryParams;
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

export interface IndexerServerQueryResponseByType {
  summary: IndexerServerSubaccountSummaryResponse;
}

export type IndexerServerQueryResponse =
  IndexerServerQueryResponseByType[keyof IndexerServerQueryResponseByType];
