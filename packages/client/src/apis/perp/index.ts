import { Mixin } from 'ts-mixer';
import { PerpExecuteAPI } from './PerpExecuteAPI';
import { PerpQueryAPI } from './PerpQueryAPI';

export class PerpAPI extends Mixin(PerpExecuteAPI, PerpQueryAPI) {}
