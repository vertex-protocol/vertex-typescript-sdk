import { Chain } from 'viem';

/**
 * All possible connected chain states (ex. connected chain)
 *
 * This is separated from ConnectionStatus as the connected chain can be defined even if the user is not signed in (ie. the default network is used)
 * It also helps to separate these states to have greater granularity over states within the UI
 */
export interface ChainStatus {
  type: 'idle' | 'switching' | 'switch_error';
  isIncorrectChain: boolean;
  connectedChain: Chain | undefined;
}
