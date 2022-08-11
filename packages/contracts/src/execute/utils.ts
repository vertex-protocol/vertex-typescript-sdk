import { IClearinghouse } from '../typechain-types';
import { BigNumber } from 'ethers';
import { MaxInt256 } from '@ethersproject/constants';
import { OrderbookRequest } from './executeArgs';

export function mapOrderbookRequest(
  request: OrderbookRequest,
): IClearinghouse.OrderRequestStruct {
  if (request.type === 'new_order') {
    const expiration =
      {
        ioc: 1,
        fok: 2,
      }[request.expiration] ?? Number(request.expiration);
    const priceX18 = (() => {
      if (request.price === 'market') {
        return BigNumber.from(request.amount).gt(0) ? MaxInt256 : 0;
      }
      return request.price;
    })();

    return {
      amountOrQueuePos: request.amount,
      expiration,
      priceX18,
    };
  } else {
    return {
      expiration: 0,
      amountOrQueuePos: request.id.queuePos,
      priceX18: request.id.priceX18,
    };
  }
}
