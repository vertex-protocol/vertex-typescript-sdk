import { Mixin } from 'ts-mixer';
import { MarketExecuteAPI } from './MarketExecuteAPI';
import { MarketQueryAPI } from './MarketQueryAPI';

export * from './queryTypes';
export * from './executeTypes';

export class MarketAPI extends Mixin(MarketExecuteAPI, MarketQueryAPI) {}
