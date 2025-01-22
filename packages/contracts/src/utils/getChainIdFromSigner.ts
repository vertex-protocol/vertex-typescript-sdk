import { Signer } from 'ethers';

export async function getChainIdFromSigner(signer: Signer) {
  if (!signer.provider) {
    throw Error('No provider found from signer');
  }
  return Number((await signer.provider.getNetwork()).chainId);
}
