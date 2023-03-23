import { wsSanity } from './sanityWs';
import { fullSanity } from './sanity';
import { ethers, Wallet } from 'ethers';
import { createVertexClient } from '../createVertexClient';

async function main() {
  const signer = new Wallet(
    'xxx',
    new ethers.providers.StaticJsonRpcProvider(
      'https://goerli-rollup.arbitrum.io/rpc',
      {
        name: 'arbitrum-goerli',
        chainId: 421613,
      },
    ),
  );

  const vertexClient = await createVertexClient('testnet', {
    // Specify different signers/providers if needed
    chainSignerOrProvider: signer,
    engineSigner: signer,
  });

  await fullSanity(signer, vertexClient);
  await wsSanity(signer, vertexClient);
}

main().catch((e) => console.log(e));
