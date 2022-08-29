import { IOffchainBook } from '../typechain-types';
import { TypedDataSigner } from '@ethersproject/abstract-signer';
import {
  OrderbookRequest,
  toValidationResult,
  ValidationResult,
} from '../common';
import { BigNumberish } from 'ethers';
import { getSignedOrderStruct } from '../execute';

interface Params {
  book: IOffchainBook;
  requests: OrderbookRequest[];
  chainId: number;
  signer: TypedDataSigner;
}

interface OrderRequestStatus {
  amountFilled: BigNumberish;
  validationResult: ValidationResult;
}

export async function getOrderRequestStatuses(
  params: Params,
): Promise<OrderRequestStatus[]> {
  const signedOrderPromises: Promise<IOffchainBook.SignedOrderStruct>[] = [];
  const isCancellations: boolean[] = [];

  params.requests.forEach((request) => {
    signedOrderPromises.push(
      getSignedOrderStruct({
        chainId: params.chainId,
        orderbookAddress: params.book.address,
        request,
        signer: params.signer,
      }),
    );
    isCancellations.push(request.action === 'cancellation');
  });

  const statuses = await params.book.validateTransactions(
    await Promise.all(signedOrderPromises),
    isCancellations,
  );

  return statuses.map((fillStatus): OrderRequestStatus => {
    return {
      amountFilled: fillStatus.amount,
      validationResult: toValidationResult(fillStatus.result),
    };
  });
}
