import { Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';

export function isSigner(
  signerOrProvider: Signer | Provider,
): signerOrProvider is Signer {
  return 'getAddress' in signerOrProvider;
}
