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

export declare namespace IStaking {
  export type GlobalRewardsBreakdownStruct = {
    distributionTime: BigNumberish;
    rewardsAmount: BigNumberish;
  };

  export type GlobalRewardsBreakdownStructOutput = [
    distributionTime: bigint,
    rewardsAmount: bigint
  ] & { distributionTime: bigint; rewardsAmount: bigint };

  export type LastActionTimesStruct = {
    lastStakeTime: BigNumberish;
    lastWithdrawTime: BigNumberish;
  };

  export type LastActionTimesStructOutput = [
    lastStakeTime: bigint,
    lastWithdrawTime: bigint
  ] & { lastStakeTime: bigint; lastWithdrawTime: bigint };

  export type WithdrawnVrtxStatesStruct = {
    vrtxClaimable: BigNumberish;
    vrtxPendingUnlock: BigNumberish;
  };

  export type WithdrawnVrtxStatesStructOutput = [
    vrtxClaimable: bigint,
    vrtxPendingUnlock: bigint
  ] & { vrtxClaimable: bigint; vrtxPendingUnlock: bigint };
}

export interface IStakingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claimUsdc"
      | "claimUsdcAndStake"
      | "claimVrtx"
      | "getEstimatedVrtxToStake"
      | "getGlobalRewardsBreakdown"
      | "getLastActionTimes"
      | "getRewardsBreakdown"
      | "getScore"
      | "getTotalScore"
      | "getTotalVrtxStaked"
      | "getUsdcClaimable"
      | "getVrtxStaked"
      | "getWithdrawLockingTime"
      | "getWithdrawnVrtxStates"
      | "stake"
      | "stakeAs"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "claimUsdc", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimUsdcAndStake",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "claimVrtx", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getEstimatedVrtxToStake",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getGlobalRewardsBreakdown",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLastActionTimes",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRewardsBreakdown",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getScore",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalScore",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalVrtxStaked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUsdcClaimable",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getVrtxStaked",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getWithdrawLockingTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWithdrawnVrtxStates",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "stake", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "stakeAs",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "claimUsdc", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimUsdcAndStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimVrtx", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getEstimatedVrtxToStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGlobalRewardsBreakdown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastActionTimes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRewardsBreakdown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getScore", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalScore",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalVrtxStaked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUsdcClaimable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVrtxStaked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWithdrawLockingTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWithdrawnVrtxStates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakeAs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export interface IStaking extends BaseContract {
  connect(runner?: ContractRunner | null): IStaking;
  waitForDeployment(): Promise<this>;

  interface: IStakingInterface;

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

  claimUsdc: TypedContractMethod<[], [void], "nonpayable">;

  claimUsdcAndStake: TypedContractMethod<[], [void], "nonpayable">;

  claimVrtx: TypedContractMethod<[], [void], "nonpayable">;

  getEstimatedVrtxToStake: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "nonpayable"
  >;

  getGlobalRewardsBreakdown: TypedContractMethod<
    [],
    [IStaking.GlobalRewardsBreakdownStructOutput[]],
    "view"
  >;

  getLastActionTimes: TypedContractMethod<
    [account: AddressLike],
    [IStaking.LastActionTimesStructOutput],
    "view"
  >;

  getRewardsBreakdown: TypedContractMethod<
    [account: AddressLike],
    [bigint[]],
    "view"
  >;

  getScore: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  getTotalScore: TypedContractMethod<[], [bigint], "view">;

  getTotalVrtxStaked: TypedContractMethod<[], [bigint], "view">;

  getUsdcClaimable: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  getVrtxStaked: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  getWithdrawLockingTime: TypedContractMethod<[], [bigint], "view">;

  getWithdrawnVrtxStates: TypedContractMethod<
    [account: AddressLike],
    [IStaking.WithdrawnVrtxStatesStructOutput],
    "view"
  >;

  stake: TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  stakeAs: TypedContractMethod<
    [staker: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claimUsdc"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "claimUsdcAndStake"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "claimVrtx"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getEstimatedVrtxToStake"
  ): TypedContractMethod<[account: AddressLike], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "getGlobalRewardsBreakdown"
  ): TypedContractMethod<
    [],
    [IStaking.GlobalRewardsBreakdownStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getLastActionTimes"
  ): TypedContractMethod<
    [account: AddressLike],
    [IStaking.LastActionTimesStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRewardsBreakdown"
  ): TypedContractMethod<[account: AddressLike], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "getScore"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTotalScore"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTotalVrtxStaked"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getUsdcClaimable"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getVrtxStaked"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getWithdrawLockingTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getWithdrawnVrtxStates"
  ): TypedContractMethod<
    [account: AddressLike],
    [IStaking.WithdrawnVrtxStatesStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "stake"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "stakeAs"
  ): TypedContractMethod<
    [staker: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  filters: {};
}
