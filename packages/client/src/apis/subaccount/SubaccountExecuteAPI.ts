import {
  createDeterministicLinkedSignerPrivateKey,
  getChainIdFromSigner,
  Subaccount,
} from '@vertex-protocol/contracts';
import { Wallet } from 'ethers';
import { BaseVertexAPI } from '../base';
import {
  ExecuteLinkSignerParams,
  ExecuteLiquidateSubaccountParams,
} from './types';

export class SubaccountExecuteAPI extends BaseVertexAPI {
  /**
   * Liquidates a subaccount
   *
   * @param params
   */
  async liquidateSubaccount(params: ExecuteLiquidateSubaccountParams) {
    return this.context.engineClient.liquidateSubaccount({
      ...params,
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
      chainId: await this.getSignerChainIdIfNeeded(params),
    });
  }

  /**
   * Links a signer to a subaccount to allow them to sign transactions on behalf of the subaccount
   *
   * @param params
   */
  async linkSigner(params: ExecuteLinkSignerParams) {
    return this.context.engineClient.linkSigner({
      ...params,
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
      chainId: await this.getSignerChainIdIfNeeded(params),
    });
  }

  /**
   * Utility fn to get a deterministic private key for a chain signer
   */
  async createDeterministicLinkedSigner(
    params: Pick<Subaccount, 'subaccountName'>,
  ) {
    const chainSigner = await this.getChainSigner();

    const chainId = await getChainIdFromSigner(chainSigner);
    const address = await chainSigner.getAddress();
    const privateKey = await createDeterministicLinkedSignerPrivateKey({
      chainId,
      signer: chainSigner,
      endpointAddress: this.getEndpointAddress(),
      subaccountOwner: address,
      subaccountName: params.subaccountName,
    });

    return new Wallet(privateKey, chainSigner.provider);
  }
}
