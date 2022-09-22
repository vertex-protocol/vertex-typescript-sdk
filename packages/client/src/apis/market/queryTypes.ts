import { OrderByDigestResponse } from '@vertex-protocol/graph';
import { GetEngineOrderResponse } from '@vertex-protocol/engine-client';

export interface GetOrderByDigestParams {
  productId: number;
  digest: string;
}

export interface GetOrderByDigestResponse {
  graph?: OrderByDigestResponse;
  engine?: GetEngineOrderResponse;
}
