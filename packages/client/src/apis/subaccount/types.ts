import {
  EngineLinkSignerParams,
  EngineLiquidateSubaccountParams,
  EngineTransferQuoteParams,
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

export type TransferQuoteParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineTransferQuoteParams>
>;
