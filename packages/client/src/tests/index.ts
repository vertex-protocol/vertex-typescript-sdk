import { wsSanity } from './sanityWs';
import { fullSanity } from './sanity';
import { ethers, Wallet } from 'ethers';
import { createVertexClient } from '../createVertexClient';

async function main() {
  const signer = new Wallet(
    '0xa0dff2b40838cef1ae86ddd11b8c2a34aa52d2d6f4355e3eb9abbaaf8eccee91',
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
    signerOrProvider: signer,
  });

  await fullSanity(signer, vertexClient);
  await wsSanity(signer, vertexClient);
}

main().catch((e) => console.log(e));
