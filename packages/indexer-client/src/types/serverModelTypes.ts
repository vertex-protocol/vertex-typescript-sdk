import {
  EngineServerPerpBalance,
  EngineServerPerpProduct,
  EngineServerSpotBalance,
  EngineServerSpotProduct,
} from '@vertex-protocol/engine-client';
import { IndexerEventType } from './IndexerEventType';
import { VertexTx } from './VertexTx';
import { EIP712OrderValues } from '@vertex-protocol/contracts';

export type IndexerServerProduct =
  | {
      spot: EngineServerSpotProduct;
    }
  | {
      perp: EngineServerPerpProduct;
    };

export type IndexerServerBalance =
  | {
      spot: EngineServerSpotBalance;
    }
  | {
      perp: EngineServerPerpBalance;
    };

export interface IndexerServerCandlestick {
  product_id: number;
  granularity: string;
  submission_idx: string;
  timestamp: string;
  open_x18: string;
  high_x18: string;
  low_x18: string;
  close_x18: string;
  volume: string;
}

export interface IndexerServerProductSnapshot {
  product_id: number;
  submission_idx: string;
  product: IndexerServerProduct;
}

export interface IndexerServerEvent {
  subaccount: string;
  product_id: number;
  submission_idx: string;
  event_type: IndexerEventType;
  pre_balance: IndexerServerBalance;
  post_balance: IndexerServerBalance;
  product: IndexerServerProduct;
  net_interest_unrealized: string;
  net_interest_cumulative: string;
  net_funding_unrealized: string;
  net_funding_cumulative: string;
  net_entry_unrealized: string;
  net_entry_cumulative: string;
  net_entry_lp_unrealized: string;
  net_entry_lp_cumulative: string;
}

export interface IndexerServerTx {
  submission_idx: string;
  timestamp: string;
  tx: VertexTx;
}

export interface IndexerServerOrder {
  digest: string;
  subaccount: string;
  product_id: number;
  submission_idx: string;
  amount: string;
  price_x18: string;
  expiration: string;
  nonce: string;
  base_filled: string;
  // Includes fee
  quote_filled: string;
  fee: string;
}

export interface IndexerServerMatchEvent {
  digest: string;
  order: EIP712OrderValues;
  base_filled: string;
  quote_filled: string;
  fee: string;
  cumulative_fee: string;
  cumulative_base_filled: string;
  cumulative_quote_filled: string;
  submission_idx: string;
}