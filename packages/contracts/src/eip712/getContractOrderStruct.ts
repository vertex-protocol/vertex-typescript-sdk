import { toX18 } from '@vertex-protocol/utils';
import { OrderbookOrder } from '../common';
import { ISequencer } from '../typechain-types/IOffchainBook';

/**
 * Given an orderbook order, map to expected struct type by contracts
 */
export function getContractOrderStruct(
  order: OrderbookOrder,
): ISequencer.OrderStruct {
  return {
    amount: order.amount,
    nonce: order.nonce,
    subaccount: order.subaccountId,
    expiration: order.expiration,
    priceX18: toX18(order.price),
  };
}

export function getContractMarketOrder() {
  // TODO: Expose a util that takes in an optional price multiplier to construct a market order
}
