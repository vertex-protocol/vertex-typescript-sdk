import { Mixin } from 'ts-mixer';
import { SpotExecuteAPI } from './SpotExecuteAPI';
import { SpotQueryAPI } from './SpotQueryAPI';

export class SpotAPI extends Mixin(SpotExecuteAPI, SpotQueryAPI) {}

export * from './types';
