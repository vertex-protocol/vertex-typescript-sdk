import {
  EngineExecuteLinkSignerParams,
  EngineExecuteLiquidateSubaccountParams,
} from '@vertex-protocol/engine-client';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';

export interface QuerySubaccountIdParams {
  address: string;
  name: string;
}

export type ExecuteLinkSignerParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteLinkSignerParams>
>;

export type ExecuteLiquidateSubaccountParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineExecuteLiquidateSubaccountParams>
>;
