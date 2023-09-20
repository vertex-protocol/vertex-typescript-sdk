/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface IAirdropInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claim"
      | "claimToLBA"
      | "getClaimed"
      | "getClaimingDeadlines"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claim",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimToLBA",
    values: [BigNumberish, BigNumberish, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getClaimed",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getClaimingDeadlines",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimToLBA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getClaimed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getClaimingDeadlines",
    data: BytesLike
  ): Result;
}

export interface IAirdrop extends BaseContract {
  connect(runner?: ContractRunner | null): IAirdrop;
  waitForDeployment(): Promise<this>;

  interface: IAirdropInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  claim: TypedContractMethod<
    [
      epoch: BigNumberish,
      amount: BigNumberish,
      totalAmount: BigNumberish,
      proof: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;

  claimToLBA: TypedContractMethod<
    [amount: BigNumberish, totalAmount: BigNumberish, proof: BytesLike[]],
    [void],
    "nonpayable"
  >;

  getClaimed: TypedContractMethod<[account: AddressLike], [bigint[]], "view">;

  getClaimingDeadlines: TypedContractMethod<[], [bigint[]], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<
    [
      epoch: BigNumberish,
      amount: BigNumberish,
      totalAmount: BigNumberish,
      proof: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimToLBA"
  ): TypedContractMethod<
    [amount: BigNumberish, totalAmount: BigNumberish, proof: BytesLike[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getClaimed"
  ): TypedContractMethod<[account: AddressLike], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "getClaimingDeadlines"
  ): TypedContractMethod<[], [bigint[]], "view">;

  filters: {};
}
