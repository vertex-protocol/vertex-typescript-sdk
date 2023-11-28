import { BaseVertexAPI } from '../base';
import { OptionalSubaccountOwner } from '../types';
import {
  EngineExecuteLinkSignerParams,
  EngineExecuteLiquidateSubaccountParams,
} from '@vertex-protocol/engine-client';
import {
  createDeterministicLinkedSignerPrivateKey,
  getChainIdFromSigner,
  Subaccount,
} from '@vertex-protocol/contracts';
import { Wallet } from 'ethers';

export class SubaccountExecuteAPI extends BaseVertexAPI {
  /**
   * Liquidates a subaccount
   *
   * @param params
   */
  async liquidateSubaccount(
    params: OptionalSubaccountOwner<EngineExecuteLiquidateSubaccountParams>,
  ) {
    return this.context.engineClient.liquidateSubaccount({
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: this.getEndpointAddress(),
      chainId: await this.getSignerChainId(),
      ...params,
    });
  }

  /**
   * Links a signer to a subaccount to allow them to sign transactions on behalf of the subaccount
   *
   * @param params
   */
  async linkSigner(
    params: OptionalSubaccountOwner<EngineExecuteLinkSignerParams>,
  ) {
    return this.context.engineClient.linkSigner({
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: this.getEndpointAddress(),
      chainId: await this.getSignerChainId(),
      ...params,
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
