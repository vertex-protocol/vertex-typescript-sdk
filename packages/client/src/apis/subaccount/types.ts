import {
  EngineLinkSignerParams,
  EngineLiquidateSubaccountParams,
} from '@vertex-protocol/engine-client';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';

export interface GetSubaccountIdParams {
  address: string;
  name: string;
}

export type LinkSignerParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineLinkSignerParams>
>;

export type LiquidateSubaccountParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineLiquidateSubaccountParams>
>;
