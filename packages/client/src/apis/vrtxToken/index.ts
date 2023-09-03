import { Mixin } from 'ts-mixer';
import { VrtxTokenExecuteAPI } from './VrtxTokenExecuteAPI';
import { VrtxTokenQueryAPI } from './VrtxTokenQueryAPI';

export * from './types';

export class VrtxTokenAPI extends Mixin(
  VrtxTokenExecuteAPI,
  VrtxTokenQueryAPI,
) {}
