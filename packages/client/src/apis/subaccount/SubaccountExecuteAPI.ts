import { BaseVertexAPI } from '../base';
import {
  createDeterministicLinkedSignerPrivateKey,
  getChainIdFromSigner,
  Subaccount,
} from '@vertex-protocol/contracts';
import { Wallet } from 'ethers';
import {
  LinkSignerParams,
  LiquidateSubaccountParams,
  TransferQuoteParams,
} from './types';

export class SubaccountExecuteAPI extends BaseVertexAPI {
  /**
   * Liquidates a subaccount
   *
   * @param params
   */
  async liquidateSubaccount(params: LiquidateSubaccountParams) {
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
  async linkSigner(params: LinkSignerParams) {
    return this.context.engineClient.linkSigner({
      ...params,
      subaccountOwner: await this.getSubaccountOwnerIfNeeded(params),
      verifyingAddr: params.verifyingAddr ?? this.getEndpointAddress(),
      chainId: await this.getSignerChainIdIfNeeded(params),
    });
  }

  /**
   * Transfers quote between subaccounts under the same wallet.
   *
   * @param params
   */
  async transferQuote(params: TransferQuoteParams) {
    return this.context.engineClient.transferQuote({
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
