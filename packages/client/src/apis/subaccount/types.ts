import { AccountWithPrivateKey } from '@vertex-protocol/contracts';
import {
  EngineLinkSignerParams,
  EngineLiquidateSubaccountParams,
} from '@vertex-protocol/engine-client';
import { OptionalSignatureParams, OptionalSubaccountOwner } from '../types';

export type LinkSignerParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineLinkSignerParams>
>;

export type LiquidateSubaccountParams = OptionalSignatureParams<
  OptionalSubaccountOwner<EngineLiquidateSubaccountParams>
>;

export type CreateStandardLinkedSignerResult = AccountWithPrivateKey;
