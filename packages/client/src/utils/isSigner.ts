import { Provider, Signer } from 'ethers';

export function isSigner(
  signerOrProvider: Signer | Provider,
): signerOrProvider is Signer {
  return 'getAddress' in signerOrProvider;
}
