import {
  EngineExecutePlaceOrderParams,
  EngineOrderParams,
} from '@vertex-protocol/engine-client';
import { WithoutSubaccountOwner } from '../types';

export type PlaceOrderParams = Omit<EngineExecutePlaceOrderParams, 'order'> & {
  order: WithoutSubaccountOwner<EngineOrderParams>;
};
