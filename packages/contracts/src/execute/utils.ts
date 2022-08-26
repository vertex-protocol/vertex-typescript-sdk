import { BigNumber } from 'ethers';
import { MaxInt256 } from '@ethersproject/constants';
import { OrderbookRequest } from './types';

// TODO consider how to handle this
export function mapOrderbookRequest(request: OrderbookRequest) {
  if (request.type === 'new_order') {
    const expiration =
      {
        ioc: 1,
        fok: 2,
      }[request.expiration.toString()] ?? Number(request.expiration);
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
