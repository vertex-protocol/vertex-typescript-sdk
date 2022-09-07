import { BigNumberish } from 'ethers';

export interface RedisSpotProduct {
  productId: number;
  priceX18: BigNumberish;
  cumulativeDepositsMultiplierX18: BigNumberish;
  cumulativeBorrowsMultiplierX18: BigNumberish;
  totalDepositsNormalizedX18: BigNumberish;
  totalBorrowsNormalizedX18: BigNumberish;
  lastUpdateTime: BigNumberish;
}

export interface RedisSpotBalance {
  productId: number;
  amountX18: BigNumberish;
  initialX18: BigNumberish;
  maintenanceX18: BigNumberish;
  pnlX18: BigNumberish;
}

export interface RedisPerpProduct {
  productId: number;
  priceX18: BigNumberish;
  emaPriceX18: BigNumberish;
  cumulativeFundingLongX18: BigNumberish;
  cumulativeFundingShortX18: BigNumberish;
  openInterestX18: BigNumberish;
  fundingLastUpdated: BigNumberish;
  emaPriceLastUpdated: BigNumberish;
  availableSettleX18: BigNumberish;
}

export interface RedisPerpBalance {
  productId: number;
  amountX18: BigNumberish;
  vQuoteBalanceX18: BigNumberish;
  lastCumulativeFundingX18: BigNumberish;
  initialX18: BigNumberish;
  maintenanceX18: BigNumberish;
  pnlX18: BigNumberish;
}
