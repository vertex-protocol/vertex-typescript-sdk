/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace IStakingV2 {
  export type ConfigStruct = {
    withdrawLockingTime: bigint;
    minimumStakingPeriod: bigint;
    toDistributeRatio: bigint;
    toTreasuryRatio: bigint;
  };

  export type ConfigStructOutput = [
    withdrawLockingTime: bigint,
    minimumStakingPeriod: bigint,
    toDistributeRatio: bigint,
    toTreasuryRatio: bigint
  ] & {
    withdrawLockingTime: bigint;
    minimumStakingPeriod: bigint;
    toDistributeRatio: bigint;
    toTreasuryRatio: bigint;
  };

  export type GlobalYieldsBreakdownStruct = {
    distributionTime: bigint;
    baseYieldAmount: bigint;
    feesYieldAmount: bigint;
    totalVrtxBalance: bigint;
    usdcAmount: bigint;
  };

  export type GlobalYieldsBreakdownStructOutput = [
    distributionTime: bigint,
    baseYieldAmount: bigint,
    feesYieldAmount: bigint,
    totalVrtxBalance: bigint,
    usdcAmount: bigint
  ] & {
    distributionTime: bigint;
    baseYieldAmount: bigint;
    feesYieldAmount: bigint;
    totalVrtxBalance: bigint;
    usdcAmount: bigint;
  };

  export type LastActionTimesStruct = {
    lastStakeTime: bigint;
    lastWithdrawTime: bigint;
  };

  export type LastActionTimesStructOutput = [
    lastStakeTime: bigint,
    lastWithdrawTime: bigint
  ] & { lastStakeTime: bigint; lastWithdrawTime: bigint };

  export type ReleaseScheduleStruct = {
    releaseTime: bigint;
    amount: bigint;
  };

  export type ReleaseScheduleStructOutput = [
    releaseTime: bigint,
    amount: bigint
  ] & { releaseTime: bigint; amount: bigint };

  export type StateStruct = {
    cumulativeStakedAmount: bigint;
    cumulativeWithdrawnAmount: bigint;
    cumulativeBurnedAmount: bigint;
    currentStakedAmount: bigint;
  };

  export type StateStructOutput = [
    cumulativeStakedAmount: bigint,
    cumulativeWithdrawnAmount: bigint,
    cumulativeBurnedAmount: bigint,
    currentStakedAmount: bigint
  ] & {
    cumulativeStakedAmount: bigint;
    cumulativeWithdrawnAmount: bigint;
    cumulativeBurnedAmount: bigint;
    currentStakedAmount: bigint;
  };
}

export interface IStakingV2Interface extends Interface {
  getFunction(
    nameOrSignature:
      | "claimWithdraw"
      | "connectTradingWallet"
      | "getConfig"
      | "getDefaultConfig"
      | "getGlobalYieldsBreakdown"
      | "getLastActionTimes"
      | "getMigrationBonusPool"
      | "getReleaseSchedule"
      | "getState"
      | "getTotalVrtxBalance"
      | "getTradingWallet"
      | "getVrtxBalance"
      | "getWithdrawableTime"
      | "migrate"
      | "stake"
      | "stakeAs"
      | "withdraw"
      | "withdrawSlow"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "ConnectTradingWallet" | "ModifyStake"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "claimWithdraw",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "connectTradingWallet",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getConfig",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getDefaultConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGlobalYieldsBreakdown",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLastActionTimes",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getMigrationBonusPool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getReleaseSchedule",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getState",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalVrtxBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTradingWallet",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getVrtxBalance",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getWithdrawableTime",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "migrate",
    values: [AddressLike, bigint, bigint]
  ): string;
  encodeFunctionData(functionFragment: "stake", values: [bigint]): string;
  encodeFunctionData(
    functionFragment: "stakeAs",
    values: [AddressLike, bigint]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawSlow",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "claimWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "connectTradingWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getConfig", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDefaultConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGlobalYieldsBreakdown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastActionTimes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMigrationBonusPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReleaseSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalVrtxBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTradingWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVrtxBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWithdrawableTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "migrate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakeAs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawSlow",
    data: BytesLike
  ): Result;
}

export namespace ConnectTradingWalletEvent {
  export type InputTuple = [account: AddressLike, wallet: AddressLike];
  export type OutputTuple = [account: string, wallet: string];
  export interface OutputObject {
    account: string;
    wallet: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ModifyStakeEvent {
  export type InputTuple = [
    account: AddressLike,
    vrtxDelta: bigint,
    liquidDelta: bigint
  ];
  export type OutputTuple = [
    account: string,
    vrtxDelta: bigint,
    liquidDelta: bigint
  ];
  export interface OutputObject {
    account: string;
    vrtxDelta: bigint;
    liquidDelta: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IStakingV2 extends BaseContract {
  connect(runner?: ContractRunner | null): IStakingV2;
  waitForDeployment(): Promise<this>;

  interface: IStakingV2Interface;

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

  claimWithdraw: TypedContractMethod<[], [void], "nonpayable">;

  connectTradingWallet: TypedContractMethod<
    [wallet: AddressLike],
    [void],
    "nonpayable"
  >;

  getConfig: TypedContractMethod<
    [account: AddressLike],
    [IStakingV2.ConfigStructOutput],
    "view"
  >;

  getDefaultConfig: TypedContractMethod<
    [],
    [IStakingV2.ConfigStructOutput],
    "view"
  >;

  getGlobalYieldsBreakdown: TypedContractMethod<
    [],
    [IStakingV2.GlobalYieldsBreakdownStructOutput[]],
    "view"
  >;

  getLastActionTimes: TypedContractMethod<
    [account: AddressLike],
    [IStakingV2.LastActionTimesStructOutput],
    "view"
  >;

  getMigrationBonusPool: TypedContractMethod<[], [bigint], "view">;

  getReleaseSchedule: TypedContractMethod<
    [account: AddressLike],
    [IStakingV2.ReleaseScheduleStructOutput],
    "view"
  >;

  getState: TypedContractMethod<
    [account: AddressLike],
    [IStakingV2.StateStructOutput],
    "view"
  >;

  getTotalVrtxBalance: TypedContractMethod<[], [bigint], "view">;

  getTradingWallet: TypedContractMethod<
    [account: AddressLike],
    [string],
    "view"
  >;

  getVrtxBalance: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  getWithdrawableTime: TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  migrate: TypedContractMethod<
    [staker: AddressLike, amount: bigint, bonus: bigint],
    [void],
    "nonpayable"
  >;

  stake: TypedContractMethod<[amount: bigint], [void], "nonpayable">;

  stakeAs: TypedContractMethod<
    [staker: AddressLike, amount: bigint],
    [void],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<[], [void], "nonpayable">;

  withdrawSlow: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claimWithdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "connectTradingWallet"
  ): TypedContractMethod<[wallet: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getConfig"
  ): TypedContractMethod<
    [account: AddressLike],
    [IStakingV2.ConfigStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getDefaultConfig"
  ): TypedContractMethod<[], [IStakingV2.ConfigStructOutput], "view">;
  getFunction(
    nameOrSignature: "getGlobalYieldsBreakdown"
  ): TypedContractMethod<
    [],
    [IStakingV2.GlobalYieldsBreakdownStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getLastActionTimes"
  ): TypedContractMethod<
    [account: AddressLike],
    [IStakingV2.LastActionTimesStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getMigrationBonusPool"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getReleaseSchedule"
  ): TypedContractMethod<
    [account: AddressLike],
    [IStakingV2.ReleaseScheduleStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getState"
  ): TypedContractMethod<
    [account: AddressLike],
    [IStakingV2.StateStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTotalVrtxBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTradingWallet"
  ): TypedContractMethod<[account: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getVrtxBalance"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getWithdrawableTime"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "migrate"
  ): TypedContractMethod<
    [staker: AddressLike, amount: bigint, bonus: bigint],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "stake"
  ): TypedContractMethod<[amount: bigint], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "stakeAs"
  ): TypedContractMethod<
    [staker: AddressLike, amount: bigint],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawSlow"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "ConnectTradingWallet"
  ): TypedContractEvent<
    ConnectTradingWalletEvent.InputTuple,
    ConnectTradingWalletEvent.OutputTuple,
    ConnectTradingWalletEvent.OutputObject
  >;
  getEvent(
    key: "ModifyStake"
  ): TypedContractEvent<
    ModifyStakeEvent.InputTuple,
    ModifyStakeEvent.OutputTuple,
    ModifyStakeEvent.OutputObject
  >;

  filters: {
    "ConnectTradingWallet(address,address)": TypedContractEvent<
      ConnectTradingWalletEvent.InputTuple,
      ConnectTradingWalletEvent.OutputTuple,
      ConnectTradingWalletEvent.OutputObject
    >;
    ConnectTradingWallet: TypedContractEvent<
      ConnectTradingWalletEvent.InputTuple,
      ConnectTradingWalletEvent.OutputTuple,
      ConnectTradingWalletEvent.OutputObject
    >;

    "ModifyStake(address,int128,int128)": TypedContractEvent<
      ModifyStakeEvent.InputTuple,
      ModifyStakeEvent.OutputTuple,
      ModifyStakeEvent.OutputObject
    >;
    ModifyStake: TypedContractEvent<
      ModifyStakeEvent.InputTuple,
      ModifyStakeEvent.OutputTuple,
      ModifyStakeEvent.OutputObject
    >;
  };
}
