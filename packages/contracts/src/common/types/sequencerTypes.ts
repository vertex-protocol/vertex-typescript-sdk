/**
 * All valid types for ISequencer
 */
export enum SequencerTransactionType {
  LiquidateSubaccount,
  DepositCollateral,
  WithdrawCollateral,
  UpdateTime,
  UpdatePrice,
  SettlePnl,
  MatchOrders,
}

/**
 * Maps a raw SequencerTransactionType enum value to the proper type
 * @param val
 */
export function toSequencerTransactionType(
  val: number,
): SequencerTransactionType {
  switch (val) {
    case 0:
      return SequencerTransactionType.LiquidateSubaccount;
    case 1:
      return SequencerTransactionType.DepositCollateral;
    case 2:
      return SequencerTransactionType.WithdrawCollateral;
    case 3:
      return SequencerTransactionType.UpdateTime;
    case 4:
      return SequencerTransactionType.UpdatePrice;
    case 5:
      return SequencerTransactionType.SettlePnl;
    case 6:
      return SequencerTransactionType.MatchOrders;
    default:
      throw new Error(`Unknown sequencer transaction type: ${val}`);
  }
}
