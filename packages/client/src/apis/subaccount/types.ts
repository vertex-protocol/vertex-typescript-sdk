import { AccountWithPrivateKey } from '@vertex-protocol/contracts';
import {
  EngineLinkSignerParams,
  EngineLiquidateSubaccountParams,
  EngineTransferQuoteParams,
} from '@vertex-protocol/engine-client';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';

export type LinkSignerParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineLinkSignerParams>
>;

export type LiquidateSubaccountParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineLiquidateSubaccountParams>
>;

export type TransferQuoteParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineTransferQuoteParams>
>;

export type CreateStandardLinkedSignerResult = AccountWithPrivateKey;
