import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';
import {
  EngineExecuteLinkSignerParams,
  EngineExecuteLiquidateSubaccountParams,
} from '@vertex-protocol/engine-client';

export interface GetSubaccountIdParams {
  address: string;
  name: string;
}

export type LinkSignerParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteLinkSignerParams>
>;

export type LiquidateSubaccountParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteLiquidateSubaccountParams>
>;
