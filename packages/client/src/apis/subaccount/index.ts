import { Mixin } from 'ts-mixer';
import { SubaccountExecuteAPI } from './SubaccountExecuteAPI';
import { SubaccountQueryAPI } from './SubaccountQueryAPI';

export class SubaccountAPI extends Mixin(
  SubaccountExecuteAPI,
  SubaccountQueryAPI,
) {}
