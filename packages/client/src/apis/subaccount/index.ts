import { Mixin } from 'ts-mixer';
import { SubaccountExecuteAPI } from './SubaccountExecuteAPI';
import { SubaccountQueryAPI } from './SubaccountQueryAPI';
import {
  createDeterministicLinkedSignerPrivateKey,
  getChainIdFromSigner,
} from '@vertex-protocol/contracts';
import { Wallet } from 'ethers';

export * from './types';

export class SubaccountAPI extends Mixin(
  SubaccountExecuteAPI,
  SubaccountQueryAPI,
) {
  /**
   * Given the current context, create a standard link signer wallet for the subaccount
   * @param subaccountName
   */
  async createStandardLinkedSigner(subaccountName: string) {
    const signer = await this.getChainSigner();

    const privateKey = await createDeterministicLinkedSignerPrivateKey({
      chainId: await getChainIdFromSigner(signer),
      endpointAddress: this.getEndpointAddress(),
      signer,
      subaccountName,
      subaccountOwner: await signer.getAddress(),
    });

    return new Wallet(privateKey);
  }
}
