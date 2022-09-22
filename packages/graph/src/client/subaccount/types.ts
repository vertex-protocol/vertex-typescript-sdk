import {
  SubaccountEventHistoryQueryQuery,
  SubaccountMakerFillEventHistoryQueryQuery,
  SubaccountsForAddressQuery,
  SubaccountStateQueryQuery,
  SubaccountTakerFillEventHistoryQueryQuery,
} from '../../generated';

export interface GetSubaccountsParams {
  address: string;
}

export type GetSubaccountsResponse = SubaccountsForAddressQuery['subaccounts'];

export interface GetSubaccountStateParams {
  subaccountId: number;
}

export type GetSubaccountStateResponse =
  SubaccountStateQueryQuery['subaccount'];

export type GraphSubaccountEvent =
  | 'cancel_order'
  | 'maker_fill_order'
  | 'taker_fill_order'
  | 'liquidatee'
  | 'modify_collateral'
  | 'place_order'
  | 'settle_pnl';

export interface GetSubaccountEventsParams {
  subaccountId: number;
  // UNIX timestamp in seconds
  minTimeInclusive?: number;
  // UNIX timestamp in seconds
  maxTimeExclusive?: number;
  // If given, only the specified event types are returned, by default, all event types are returned
  includeEventTypes?: GraphSubaccountEvent[];
}

export type GetSubaccountEventsResponse = SubaccountEventHistoryQueryQuery & {
  takerFillOrderEvents: SubaccountTakerFillEventHistoryQueryQuery['fillOrderEvents'];
  makerFillOrderEvents: SubaccountMakerFillEventHistoryQueryQuery['fillOrderEvents'];
};
