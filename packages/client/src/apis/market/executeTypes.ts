import {
  BaseEnginePlaceOrderParams,
  OrderParamsWithoutNonce,
} from '@vertex-protocol/engine-client';
import { WithoutSubaccountOwner } from '../spot/BaseSpotAPI';

export type OrderActionParams = Omit<BaseEnginePlaceOrderParams, 'order'> & {
  order: WithoutSubaccountOwner<OrderParamsWithoutNonce>;
};
