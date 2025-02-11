import { Subaccount } from '../common';
import { getVertexEIP712Domain } from '../eip712';
import { subaccountToHex } from './bytes32';
import { keccak256, Signer } from 'ethers';

interface Params extends Subaccount {
  signer: Signer;
  chainId: number;
  endpointAddress: string;
}

/**
 * Deterministically creates a new private key from a predetermined EIP712 message. This is used to
 * reliably create an authorized signer delegate for the subaccount across different clients. Used on the FE in order
 * to have a consistent private key for the subaccount linked signer across different clients.
 *
 * @param params
 */
export async function createDeterministicLinkedSignerPrivateKey(
  params: Params,
) {
  const { chainId, endpointAddress, signer, subaccountName, subaccountOwner } =
    params;

  const signedMessage = await signer.signTypedData(
    getVertexEIP712Domain(endpointAddress, chainId),
    {
      CreateLinkedSignerWallet: [{ name: 'subaccount', type: 'bytes32' }],
    },
    {
      subaccount: subaccountToHex({
        subaccountOwner,
        subaccountName,
      }),
    },
  );

  return keccak256(signedMessage);
}
