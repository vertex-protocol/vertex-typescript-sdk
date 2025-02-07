import { Signer } from 'ethers';

export async function getChainIdFromSigner(signer: Signer) {
  if (!signer.provider) {
    throw Error('No provider found from signer');
  }
  return (await signer.provider.getNetwork()).chainId;
}
