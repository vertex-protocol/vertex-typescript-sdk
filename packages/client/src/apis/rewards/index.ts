import { Mixin } from 'ts-mixer';
import { RewardsExecuteAPI } from './RewardsExecuteAPI';
import { RewardsQueryAPI } from './RewardsQueryAPI';

export * from './types';

export class RewardsAPI extends Mixin(RewardsExecuteAPI, RewardsQueryAPI) {}
