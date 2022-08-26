import { OrderbookRequest } from './types';
import { IOffchainBook } from '../typechain-types';
import { toX18 } from '@vertex-protocol/utils';

/**
 * Given an orderbook request, map to expected struct type by contracts
 */
export function getContractOrderStruct(
  request: OrderbookRequest,
): IOffchainBook.OrderStruct {
  return {
    amount: request.amount,
    nonce: request.nonce,
    subaccount: request.subaccountId,
    expiration: request.price,
    priceX18: toX18(request.price),
  };
}

export function getContractMarketOrder() {
  // TODO: Expose a util that takes in an optional price multiplier to construct a market order
}
