/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace IProductEngine {
  export type HealthDeltaStruct = {
    productId: PromiseOrValue<BigNumberish>;
    amountDeltaX18: PromiseOrValue<BigNumberish>;
    vQuoteDeltaX18: PromiseOrValue<BigNumberish>;
  };

  export type HealthDeltaStructOutput = [number, BigNumber, BigNumber] & {
    productId: number;
    amountDeltaX18: BigNumber;
    vQuoteDeltaX18: BigNumber;
  };
}

export interface IClearinghouseInterface extends utils.Interface {
  functions: {
    "addEngine(address,uint8)": FunctionFragment;
    "getEngineByProduct(uint32)": FunctionFragment;
    "getEngineByType(uint8)": FunctionFragment;
    "getHealthWithDeltasX18(uint64,uint8,(uint32,int256,int256)[])": FunctionFragment;
    "getHealthX18(uint64,uint8)": FunctionFragment;
    "getInsurance()": FunctionFragment;
    "getNumProducts()": FunctionFragment;
    "getNumSubaccounts()": FunctionFragment;
    "getOrderbook(uint32)": FunctionFragment;
    "getQuote()": FunctionFragment;
    "getSubaccountId(address,string)": FunctionFragment;
    "getSubaccountOwner(uint64)": FunctionFragment;
    "getSupportedEngines()": FunctionFragment;
    "liquidateSubaccount(string,uint64,uint32,int256)": FunctionFragment;
    "modifyCollateral(string,uint32[],int256[])": FunctionFragment;
    "modifyInsurance(int256)": FunctionFragment;
    "registerProductForId()": FunctionFragment;
    "settlePnl(uint64[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addEngine"
      | "getEngineByProduct"
      | "getEngineByType"
      | "getHealthWithDeltasX18"
      | "getHealthX18"
      | "getInsurance"
      | "getNumProducts"
      | "getNumSubaccounts"
      | "getOrderbook"
      | "getQuote"
      | "getSubaccountId"
      | "getSubaccountOwner"
      | "getSupportedEngines"
      | "liquidateSubaccount"
      | "modifyCollateral"
      | "modifyInsurance"
      | "registerProductForId"
      | "settlePnl"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addEngine",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEngineByProduct",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getEngineByType",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getHealthWithDeltasX18",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      IProductEngine.HealthDeltaStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getHealthX18",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getInsurance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumProducts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumSubaccounts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOrderbook",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "getQuote", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getSubaccountId",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubaccountOwner",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSupportedEngines",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "liquidateSubaccount",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "modifyCollateral",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "modifyInsurance",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerProductForId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "settlePnl",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;

  decodeFunctionResult(functionFragment: "addEngine", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getEngineByProduct",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEngineByType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHealthWithDeltasX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHealthX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInsurance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumProducts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumSubaccounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOrderbook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getQuote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSubaccountId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubaccountOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSupportedEngines",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "liquidateSubaccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "modifyCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "modifyInsurance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerProductForId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "settlePnl", data: BytesLike): Result;

  events: {
    "ClearinghouseInitialized(address,address,address)": EventFragment;
    "CreateSubaccount(address,string,uint64)": EventFragment;
    "Liquidation(uint64,uint64,uint32,int256,int256,int256)": EventFragment;
    "ModifyCollateral(int256,uint64,uint32)": EventFragment;
    "SettlePnl(uint64,int256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClearinghouseInitialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateSubaccount"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Liquidation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ModifyCollateral"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SettlePnl"): EventFragment;
}

export interface ClearinghouseInitializedEventObject {
  quote: string;
  oracle: string;
  fees: string;
}
export type ClearinghouseInitializedEvent = TypedEvent<
  [string, string, string],
  ClearinghouseInitializedEventObject
>;

export type ClearinghouseInitializedEventFilter =
  TypedEventFilter<ClearinghouseInitializedEvent>;

export interface CreateSubaccountEventObject {
  owner: string;
  name: string;
  subaccount: BigNumber;
}
export type CreateSubaccountEvent = TypedEvent<
  [string, string, BigNumber],
  CreateSubaccountEventObject
>;

export type CreateSubaccountEventFilter =
  TypedEventFilter<CreateSubaccountEvent>;

export interface LiquidationEventObject {
  liquidatorSubaccount: BigNumber;
  liquidateeSubaccount: BigNumber;
  productId: number;
  liquidatorBaseDelta: BigNumber;
  liquidatorQuoteDelta: BigNumber;
  insuranceCoverage: BigNumber;
}
export type LiquidationEvent = TypedEvent<
  [BigNumber, BigNumber, number, BigNumber, BigNumber, BigNumber],
  LiquidationEventObject
>;

export type LiquidationEventFilter = TypedEventFilter<LiquidationEvent>;

export interface ModifyCollateralEventObject {
  amount: BigNumber;
  subaccount: BigNumber;
  productId: number;
}
export type ModifyCollateralEvent = TypedEvent<
  [BigNumber, BigNumber, number],
  ModifyCollateralEventObject
>;

export type ModifyCollateralEventFilter =
  TypedEventFilter<ModifyCollateralEvent>;

export interface SettlePnlEventObject {
  subaccount: BigNumber;
  amount: BigNumber;
}
export type SettlePnlEvent = TypedEvent<
  [BigNumber, BigNumber],
  SettlePnlEventObject
>;

export type SettlePnlEventFilter = TypedEventFilter<SettlePnlEvent>;

export interface IClearinghouse extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IClearinghouseInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addEngine(
      engine: PromiseOrValue<string>,
      engineType: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getEngineByProduct(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getEngineByType(
      engineType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getHealthWithDeltasX18(
      subaccount: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      healthDeltas: IProductEngine.HealthDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getHealthX18(
      subaccount: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getInsurance(overrides?: CallOverrides): Promise<[BigNumber]>;

    getNumProducts(overrides?: CallOverrides): Promise<[number]>;

    getNumSubaccounts(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getQuote(overrides?: CallOverrides): Promise<[string]>;

    getSubaccountId(
      owner: PromiseOrValue<string>,
      subaccountName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSubaccountOwner(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getSupportedEngines(overrides?: CallOverrides): Promise<[number[]]>;

    liquidateSubaccount(
      subaccountName: PromiseOrValue<string>,
      liquidateeId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    modifyCollateral(
      subaccountName: PromiseOrValue<string>,
      productIds: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    modifyInsurance(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerProductForId(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    settlePnl(
      subaccountIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addEngine(
    engine: PromiseOrValue<string>,
    engineType: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getEngineByProduct(
    productId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getEngineByType(
    engineType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getHealthWithDeltasX18(
    subaccount: PromiseOrValue<BigNumberish>,
    healthType: PromiseOrValue<BigNumberish>,
    healthDeltas: IProductEngine.HealthDeltaStruct[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getHealthX18(
    subaccount: PromiseOrValue<BigNumberish>,
    healthType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getInsurance(overrides?: CallOverrides): Promise<BigNumber>;

  getNumProducts(overrides?: CallOverrides): Promise<number>;

  getNumSubaccounts(overrides?: CallOverrides): Promise<BigNumber>;

  getOrderbook(
    productId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getQuote(overrides?: CallOverrides): Promise<string>;

  getSubaccountId(
    owner: PromiseOrValue<string>,
    subaccountName: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSubaccountOwner(
    subaccountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getSupportedEngines(overrides?: CallOverrides): Promise<number[]>;

  liquidateSubaccount(
    subaccountName: PromiseOrValue<string>,
    liquidateeId: PromiseOrValue<BigNumberish>,
    productId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  modifyCollateral(
    subaccountName: PromiseOrValue<string>,
    productIds: PromiseOrValue<BigNumberish>[],
    amounts: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  modifyInsurance(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerProductForId(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  settlePnl(
    subaccountIds: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addEngine(
      engine: PromiseOrValue<string>,
      engineType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getEngineByProduct(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getEngineByType(
      engineType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getHealthWithDeltasX18(
      subaccount: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      healthDeltas: IProductEngine.HealthDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHealthX18(
      subaccount: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInsurance(overrides?: CallOverrides): Promise<BigNumber>;

    getNumProducts(overrides?: CallOverrides): Promise<number>;

    getNumSubaccounts(overrides?: CallOverrides): Promise<BigNumber>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getQuote(overrides?: CallOverrides): Promise<string>;

    getSubaccountId(
      owner: PromiseOrValue<string>,
      subaccountName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSubaccountOwner(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getSupportedEngines(overrides?: CallOverrides): Promise<number[]>;

    liquidateSubaccount(
      subaccountName: PromiseOrValue<string>,
      liquidateeId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    modifyCollateral(
      subaccountName: PromiseOrValue<string>,
      productIds: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    modifyInsurance(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    registerProductForId(overrides?: CallOverrides): Promise<number>;

    settlePnl(
      subaccountIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ClearinghouseInitialized(address,address,address)"(
      quote?: null,
      oracle?: null,
      fees?: null
    ): ClearinghouseInitializedEventFilter;
    ClearinghouseInitialized(
      quote?: null,
      oracle?: null,
      fees?: null
    ): ClearinghouseInitializedEventFilter;

    "CreateSubaccount(address,string,uint64)"(
      owner?: null,
      name?: null,
      subaccount?: null
    ): CreateSubaccountEventFilter;
    CreateSubaccount(
      owner?: null,
      name?: null,
      subaccount?: null
    ): CreateSubaccountEventFilter;

    "Liquidation(uint64,uint64,uint32,int256,int256,int256)"(
      liquidatorSubaccount?: PromiseOrValue<BigNumberish> | null,
      liquidateeSubaccount?: PromiseOrValue<BigNumberish> | null,
      productId?: PromiseOrValue<BigNumberish> | null,
      liquidatorBaseDelta?: null,
      liquidatorQuoteDelta?: null,
      insuranceCoverage?: null
    ): LiquidationEventFilter;
    Liquidation(
      liquidatorSubaccount?: PromiseOrValue<BigNumberish> | null,
      liquidateeSubaccount?: PromiseOrValue<BigNumberish> | null,
      productId?: PromiseOrValue<BigNumberish> | null,
      liquidatorBaseDelta?: null,
      liquidatorQuoteDelta?: null,
      insuranceCoverage?: null
    ): LiquidationEventFilter;

    "ModifyCollateral(int256,uint64,uint32)"(
      amount?: null,
      subaccount?: PromiseOrValue<BigNumberish> | null,
      productId?: null
    ): ModifyCollateralEventFilter;
    ModifyCollateral(
      amount?: null,
      subaccount?: PromiseOrValue<BigNumberish> | null,
      productId?: null
    ): ModifyCollateralEventFilter;

    "SettlePnl(uint64,int256)"(
      subaccount?: PromiseOrValue<BigNumberish> | null,
      amount?: null
    ): SettlePnlEventFilter;
    SettlePnl(
      subaccount?: PromiseOrValue<BigNumberish> | null,
      amount?: null
    ): SettlePnlEventFilter;
  };

  estimateGas: {
    addEngine(
      engine: PromiseOrValue<string>,
      engineType: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getEngineByProduct(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEngineByType(
      engineType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHealthWithDeltasX18(
      subaccount: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      healthDeltas: IProductEngine.HealthDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHealthX18(
      subaccount: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInsurance(overrides?: CallOverrides): Promise<BigNumber>;

    getNumProducts(overrides?: CallOverrides): Promise<BigNumber>;

    getNumSubaccounts(overrides?: CallOverrides): Promise<BigNumber>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getQuote(overrides?: CallOverrides): Promise<BigNumber>;

    getSubaccountId(
      owner: PromiseOrValue<string>,
      subaccountName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSubaccountOwner(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSupportedEngines(overrides?: CallOverrides): Promise<BigNumber>;

    liquidateSubaccount(
      subaccountName: PromiseOrValue<string>,
      liquidateeId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    modifyCollateral(
      subaccountName: PromiseOrValue<string>,
      productIds: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    modifyInsurance(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerProductForId(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    settlePnl(
      subaccountIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addEngine(
      engine: PromiseOrValue<string>,
      engineType: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getEngineByProduct(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEngineByType(
      engineType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getHealthWithDeltasX18(
      subaccount: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      healthDeltas: IProductEngine.HealthDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getHealthX18(
      subaccount: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInsurance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNumProducts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNumSubaccounts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getQuote(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSubaccountId(
      owner: PromiseOrValue<string>,
      subaccountName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSubaccountOwner(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSupportedEngines(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    liquidateSubaccount(
      subaccountName: PromiseOrValue<string>,
      liquidateeId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    modifyCollateral(
      subaccountName: PromiseOrValue<string>,
      productIds: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    modifyInsurance(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerProductForId(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    settlePnl(
      subaccountIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
