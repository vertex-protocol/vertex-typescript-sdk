import {
  getChainIdFromSigner,
  WithContracts,
} from '@vertex-protocol/contracts';
import { VertexClientContext } from '../context';
import { isSigner } from '../utils';
import { BigNumberish } from 'ethers';

export class BaseVertexAPI {
  readonly context: VertexClientContext;

  constructor(context: VertexClientContext) {
    this.context = context;
  }

  protected getChainSigner() {
    if (isSigner(this.context.signerOrProvider)) {
      return this.context.signerOrProvider;
    }
    throw Error('Current context does not have a chain signer');
  }

  protected async getChainSignerAddress() {
    return this.getChainSigner().getAddress();
  }

  protected async getSignerChainIdIfNeeded(params: {
    chainId?: BigNumberish;
  }): Promise<BigNumberish> {
    if (params.chainId) {
      return params.chainId;
    }
    return this.getSignerChainId();
  }

  protected async getSignerChainId() {
    return getChainIdFromSigner(this.getChainSigner());
  }

  protected getEndpointAddress() {
    return this.context.contractAddresses.endpoint;
  }

  protected async getOrderbookAddress(productId: number) {
    return this.context.engineClient.getOrderbookAddress(productId);
  }

  protected async getSubaccountOwnerIfNeeded(params: {
    subaccountOwner?: string;
  }): Promise<string> {
    return params.subaccountOwner ?? (await this.getChainSignerAddress());
  }

  protected paramsWithContracts<T>(params: T): WithContracts<T> {
    return {
      ...params,
      ...this.context.contracts,
    };
  }
}
