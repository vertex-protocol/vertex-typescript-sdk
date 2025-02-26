import { Abi } from 'viem';
import { ContractInstance, WriteableContractInstance } from '../common';

export function isWriteableContract<TAbi extends Abi>(
  contract: ContractInstance<TAbi>,
): contract is WriteableContractInstance<TAbi> {
  return 'write' in contract;
}
