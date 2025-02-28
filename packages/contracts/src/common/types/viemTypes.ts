import {
  Abi,
  Account,
  Chain,
  GetContractReturnType,
  PublicClient,
  RpcSchema,
  Transport,
  WalletClient,
} from 'viem';

/**
 * A viem WalletClient that is fully initialized with a Transport, Chain, Account, and RpcSchema
 */
export type WalletClientWithAccount = WalletClient<
  Transport,
  Chain,
  Account,
  RpcSchema
>;

/**
 * A viem contract instance that has a connected WalletClient, thus allowing write operations
 */
export type WriteableContractInstance<TAbi extends Abi = Abi> =
  GetContractReturnType<TAbi, WalletClientWithAccount>;

/**
 * A viem contract instance that has a connected WalletClient or PublicClient
 */
export type ContractInstance<TAbi extends Abi = Abi> = GetContractReturnType<
  TAbi,
  WalletClient | PublicClient
>;
