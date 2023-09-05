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

export declare namespace ILBA {
  export type ConfigStruct = {
    depositStartTime: BigNumberish;
    depositEndTime: BigNumberish;
    withdrawEndTime: BigNumberish;
    lpVestStartTime: BigNumberish;
    lpVestEndTime: BigNumberish;
  };

  export type ConfigStructOutput = [
    depositStartTime: bigint,
    depositEndTime: bigint,
    withdrawEndTime: bigint,
    lpVestStartTime: bigint,
    lpVestEndTime: bigint
  ] & {
    depositStartTime: bigint;
    depositEndTime: bigint;
    withdrawEndTime: bigint;
    lpVestStartTime: bigint;
    lpVestEndTime: bigint;
  };

  export type StateStruct = {
    totalVrtxDeposited: BigNumberish;
    totalUsdcDeposited: BigNumberish;
    totalLpMinted: BigNumberish;
    totalLpWithdrawn: BigNumberish;
  };

  export type StateStructOutput = [
    totalVrtxDeposited: bigint,
    totalUsdcDeposited: bigint,
    totalLpMinted: bigint,
    totalLpWithdrawn: bigint
  ] & {
    totalVrtxDeposited: bigint;
    totalUsdcDeposited: bigint;
    totalLpMinted: bigint;
    totalLpWithdrawn: bigint;
  };
}

export interface ILBAInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "depositUsdc"
      | "depositVrtx"
      | "getConfig"
      | "getDepositedUsdc"
      | "getDepositedVrtx"
      | "getLockedLpBalance"
      | "getLpBalance"
      | "getMaxWithdrawableUsdc"
      | "getStage"
      | "getState"
      | "getVrtxInitialPriceX18"
      | "getWithdrawableLpBalance"
      | "withdrawLiquidity"
      | "withdrawUsdc"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "depositUsdc",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositVrtx",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getConfig", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getDepositedUsdc",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getDepositedVrtx",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getLockedLpBalance",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getLpBalance",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxWithdrawableUsdc",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "getStage", values?: undefined): string;
  encodeFunctionData(functionFragment: "getState", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getVrtxInitialPriceX18",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWithdrawableLpBalance",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLiquidity",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawUsdc",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositUsdc",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositVrtx",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getConfig", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDepositedUsdc",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDepositedVrtx",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLockedLpBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLpBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxWithdrawableUsdc",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getStage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVrtxInitialPriceX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWithdrawableLpBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawUsdc",
    data: BytesLike
  ): Result;
}

export interface ILBA extends BaseContract {
  connect(runner?: ContractRunner | null): ILBA;
  waitForDeployment(): Promise<this>;

  interface: ILBAInterface;

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

  depositUsdc: TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  depositVrtx: TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getConfig: TypedContractMethod<[], [ILBA.ConfigStructOutput], "view">;

  getDepositedUsdc: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  getDepositedVrtx: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  getLockedLpBalance: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  getLpBalance: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  getMaxWithdrawableUsdc: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  getStage: TypedContractMethod<[], [bigint], "view">;

  getState: TypedContractMethod<[], [ILBA.StateStructOutput], "view">;

  getVrtxInitialPriceX18: TypedContractMethod<[], [bigint], "view">;

  getWithdrawableLpBalance: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  withdrawLiquidity: TypedContractMethod<
    [lpAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawUsdc: TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "depositUsdc"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "depositVrtx"
  ): TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getConfig"
  ): TypedContractMethod<[], [ILBA.ConfigStructOutput], "view">;
  getFunction(
    nameOrSignature: "getDepositedUsdc"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getDepositedVrtx"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getLockedLpBalance"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getLpBalance"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getMaxWithdrawableUsdc"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getStage"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getState"
  ): TypedContractMethod<[], [ILBA.StateStructOutput], "view">;
  getFunction(
    nameOrSignature: "getVrtxInitialPriceX18"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getWithdrawableLpBalance"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdrawLiquidity"
  ): TypedContractMethod<[lpAmount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawUsdc"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  filters: {};
}
