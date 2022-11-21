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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace RiskHelper {
  export type RiskStruct = {
    longWeightInitialX18: PromiseOrValue<BigNumberish>;
    shortWeightInitialX18: PromiseOrValue<BigNumberish>;
    longWeightMaintenanceX18: PromiseOrValue<BigNumberish>;
    shortWeightMaintenanceX18: PromiseOrValue<BigNumberish>;
    largePositionPenaltyX18: PromiseOrValue<BigNumberish>;
  };

  export type RiskStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    longWeightInitialX18: BigNumber;
    shortWeightInitialX18: BigNumber;
    longWeightMaintenanceX18: BigNumber;
    shortWeightMaintenanceX18: BigNumber;
    largePositionPenaltyX18: BigNumber;
  };
}

export declare namespace ISpotEngine {
  export type ConfigStruct = {
    token: PromiseOrValue<string>;
    interestInflectionUtilX18: PromiseOrValue<BigNumberish>;
    interestFloorX18: PromiseOrValue<BigNumberish>;
    interestSmallCapX18: PromiseOrValue<BigNumberish>;
    interestLargeCapX18: PromiseOrValue<BigNumberish>;
  };

  export type ConfigStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    token: string;
    interestInflectionUtilX18: BigNumber;
    interestFloorX18: BigNumber;
    interestSmallCapX18: BigNumber;
    interestLargeCapX18: BigNumber;
  };

  export type StateStruct = {
    cumulativeDepositsMultiplierX18: PromiseOrValue<BigNumberish>;
    cumulativeBorrowsMultiplierX18: PromiseOrValue<BigNumberish>;
    totalDepositsNormalizedX18: PromiseOrValue<BigNumberish>;
    totalBorrowsNormalizedX18: PromiseOrValue<BigNumberish>;
  };

  export type StateStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    cumulativeDepositsMultiplierX18: BigNumber;
    cumulativeBorrowsMultiplierX18: BigNumber;
    totalDepositsNormalizedX18: BigNumber;
    totalBorrowsNormalizedX18: BigNumber;
  };

  export type BalanceStruct = {
    amountX18: PromiseOrValue<BigNumberish>;
    lastCumulativeMultiplierX18: PromiseOrValue<BigNumberish>;
  };

  export type BalanceStructOutput = [BigNumber, BigNumber] & {
    amountX18: BigNumber;
    lastCumulativeMultiplierX18: BigNumber;
  };

  export type LpStateStruct = {
    supply: PromiseOrValue<BigNumberish>;
    quote: ISpotEngine.BalanceStruct;
    base: ISpotEngine.BalanceStruct;
  };

  export type LpStateStructOutput = [
    BigNumber,
    ISpotEngine.BalanceStructOutput,
    ISpotEngine.BalanceStructOutput
  ] & {
    supply: BigNumber;
    quote: ISpotEngine.BalanceStructOutput;
    base: ISpotEngine.BalanceStructOutput;
  };

  export type LpBalanceStruct = { amountX18: PromiseOrValue<BigNumberish> };

  export type LpBalanceStructOutput = [BigNumber] & { amountX18: BigNumber };
}

export declare namespace FQuerier {
  export type BookInfoStruct = {
    sizeIncrement: PromiseOrValue<BigNumberish>;
    priceIncrementX18: PromiseOrValue<BigNumberish>;
    collectedFeesX18: PromiseOrValue<BigNumberish>;
    lpSpreadX18: PromiseOrValue<BigNumberish>;
  };

  export type BookInfoStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    sizeIncrement: BigNumber;
    priceIncrementX18: BigNumber;
    collectedFeesX18: BigNumber;
    lpSpreadX18: BigNumber;
  };

  export type SpotProductStruct = {
    productId: PromiseOrValue<BigNumberish>;
    oraclePriceX18: PromiseOrValue<BigNumberish>;
    risk: RiskHelper.RiskStruct;
    config: ISpotEngine.ConfigStruct;
    state: ISpotEngine.StateStruct;
    lpState: ISpotEngine.LpStateStruct;
    bookInfo: FQuerier.BookInfoStruct;
  };

  export type SpotProductStructOutput = [
    number,
    BigNumber,
    RiskHelper.RiskStructOutput,
    ISpotEngine.ConfigStructOutput,
    ISpotEngine.StateStructOutput,
    ISpotEngine.LpStateStructOutput,
    FQuerier.BookInfoStructOutput
  ] & {
    productId: number;
    oraclePriceX18: BigNumber;
    risk: RiskHelper.RiskStructOutput;
    config: ISpotEngine.ConfigStructOutput;
    state: ISpotEngine.StateStructOutput;
    lpState: ISpotEngine.LpStateStructOutput;
    bookInfo: FQuerier.BookInfoStructOutput;
  };

  export type PerpProductStruct = {
    productId: PromiseOrValue<BigNumberish>;
    oraclePriceX18: PromiseOrValue<BigNumberish>;
    markPriceX18: PromiseOrValue<BigNumberish>;
    risk: RiskHelper.RiskStruct;
    state: IPerpEngine.StateStruct;
    lpState: IPerpEngine.LpStateStruct;
    bookInfo: FQuerier.BookInfoStruct;
  };

  export type PerpProductStructOutput = [
    number,
    BigNumber,
    BigNumber,
    RiskHelper.RiskStructOutput,
    IPerpEngine.StateStructOutput,
    IPerpEngine.LpStateStructOutput,
    FQuerier.BookInfoStructOutput
  ] & {
    productId: number;
    oraclePriceX18: BigNumber;
    markPriceX18: BigNumber;
    risk: RiskHelper.RiskStructOutput;
    state: IPerpEngine.StateStructOutput;
    lpState: IPerpEngine.LpStateStructOutput;
    bookInfo: FQuerier.BookInfoStructOutput;
  };

  export type ProductInfoStruct = {
    spotProducts: FQuerier.SpotProductStruct[];
    perpProducts: FQuerier.PerpProductStruct[];
  };

  export type ProductInfoStructOutput = [
    FQuerier.SpotProductStructOutput[],
    FQuerier.PerpProductStructOutput[]
  ] & {
    spotProducts: FQuerier.SpotProductStructOutput[];
    perpProducts: FQuerier.PerpProductStructOutput[];
  };

  export type PerpBalanceStruct = {
    productId: PromiseOrValue<BigNumberish>;
    lpBalance: IPerpEngine.LpBalanceStruct;
    balance: IPerpEngine.BalanceStruct;
  };

  export type PerpBalanceStructOutput = [
    number,
    IPerpEngine.LpBalanceStructOutput,
    IPerpEngine.BalanceStructOutput
  ] & {
    productId: number;
    lpBalance: IPerpEngine.LpBalanceStructOutput;
    balance: IPerpEngine.BalanceStructOutput;
  };

  export type SpotBalanceStruct = {
    productId: PromiseOrValue<BigNumberish>;
    lpBalance: ISpotEngine.LpBalanceStruct;
    balance: ISpotEngine.BalanceStruct;
  };

  export type SpotBalanceStructOutput = [
    number,
    ISpotEngine.LpBalanceStructOutput,
    ISpotEngine.BalanceStructOutput
  ] & {
    productId: number;
    lpBalance: ISpotEngine.LpBalanceStructOutput;
    balance: ISpotEngine.BalanceStructOutput;
  };

  export type HealthInfoStruct = {
    assetsX18: PromiseOrValue<BigNumberish>;
    liabilitiesX18: PromiseOrValue<BigNumberish>;
    healthX18: PromiseOrValue<BigNumberish>;
  };

  export type HealthInfoStructOutput = [BigNumber, BigNumber, BigNumber] & {
    assetsX18: BigNumber;
    liabilitiesX18: BigNumber;
    healthX18: BigNumber;
  };

  export type SubaccountInfoStruct = {
    subaccountId: PromiseOrValue<BigNumberish>;
    exists: PromiseOrValue<boolean>;
    healths: FQuerier.HealthInfoStruct[];
    spotCount: PromiseOrValue<BigNumberish>;
    perpCount: PromiseOrValue<BigNumberish>;
    spotBalances: FQuerier.SpotBalanceStruct[];
    perpBalances: FQuerier.PerpBalanceStruct[];
    spotProducts: FQuerier.SpotProductStruct[];
    perpProducts: FQuerier.PerpProductStruct[];
  };

  export type SubaccountInfoStructOutput = [
    BigNumber,
    boolean,
    FQuerier.HealthInfoStructOutput[],
    number,
    number,
    FQuerier.SpotBalanceStructOutput[],
    FQuerier.PerpBalanceStructOutput[],
    FQuerier.SpotProductStructOutput[],
    FQuerier.PerpProductStructOutput[]
  ] & {
    subaccountId: BigNumber;
    exists: boolean;
    healths: FQuerier.HealthInfoStructOutput[];
    spotCount: number;
    perpCount: number;
    spotBalances: FQuerier.SpotBalanceStructOutput[];
    perpBalances: FQuerier.PerpBalanceStructOutput[];
    spotProducts: FQuerier.SpotProductStructOutput[];
    perpProducts: FQuerier.PerpProductStructOutput[];
  };

  export type TxnStruct = {
    to: PromiseOrValue<string>;
    data: PromiseOrValue<BytesLike>;
  };

  export type TxnStructOutput = [string, string] & { to: string; data: string };
}

export declare namespace IPerpEngine {
  export type StateStruct = {
    cumulativeFundingLongX18: PromiseOrValue<BigNumberish>;
    cumulativeFundingShortX18: PromiseOrValue<BigNumberish>;
    availableSettleX18: PromiseOrValue<BigNumberish>;
    openInterestX18: PromiseOrValue<BigNumberish>;
  };

  export type StateStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    cumulativeFundingLongX18: BigNumber;
    cumulativeFundingShortX18: BigNumber;
    availableSettleX18: BigNumber;
    openInterestX18: BigNumber;
  };

  export type LpStateStruct = {
    supply: PromiseOrValue<BigNumberish>;
    lastCumulativeFundingX18: PromiseOrValue<BigNumberish>;
    cumulativeFundingPerLpX18: PromiseOrValue<BigNumberish>;
    base: PromiseOrValue<BigNumberish>;
    quote: PromiseOrValue<BigNumberish>;
  };

  export type LpStateStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    supply: BigNumber;
    lastCumulativeFundingX18: BigNumber;
    cumulativeFundingPerLpX18: BigNumber;
    base: BigNumber;
    quote: BigNumber;
  };

  export type LpBalanceStruct = {
    amountX18: PromiseOrValue<BigNumberish>;
    lastCumulativeFundingX18: PromiseOrValue<BigNumberish>;
  };

  export type LpBalanceStructOutput = [BigNumber, BigNumber] & {
    amountX18: BigNumber;
    lastCumulativeFundingX18: BigNumber;
  };

  export type BalanceStruct = {
    amountX18: PromiseOrValue<BigNumberish>;
    vQuoteBalanceX18: PromiseOrValue<BigNumberish>;
    lastCumulativeFundingX18: PromiseOrValue<BigNumberish>;
  };

  export type BalanceStructOutput = [BigNumber, BigNumber, BigNumber] & {
    amountX18: BigNumber;
    vQuoteBalanceX18: BigNumber;
    lastCumulativeFundingX18: BigNumber;
  };
}

export interface FQuerierInterface extends utils.Interface {
  functions: {
    "getAllProducts()": FunctionFragment;
    "getBookInfo(uint32,address)": FunctionFragment;
    "getClearinghouse()": FunctionFragment;
    "getPerpBalances(uint64,uint32[])": FunctionFragment;
    "getPerpProducts(uint32[])": FunctionFragment;
    "getSpotBalances(uint64,uint32[])": FunctionFragment;
    "getSpotProducts(uint32[])": FunctionFragment;
    "getSubaccountInfo(uint64)": FunctionFragment;
    "getSubaccountInfoWithStateChange(uint64,(address,bytes)[])": FunctionFragment;
    "initialize(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getAllProducts"
      | "getBookInfo"
      | "getClearinghouse"
      | "getPerpBalances"
      | "getPerpProducts"
      | "getSpotBalances"
      | "getSpotProducts"
      | "getSubaccountInfo"
      | "getSubaccountInfoWithStateChange"
      | "initialize"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getAllProducts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBookInfo",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getClearinghouse",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPerpBalances",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getPerpProducts",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getSpotBalances",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getSpotProducts",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubaccountInfo",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubaccountInfoWithStateChange",
    values: [PromiseOrValue<BigNumberish>, FQuerier.TxnStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getAllProducts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBookInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getClearinghouse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPerpBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPerpProducts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSpotBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSpotProducts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubaccountInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubaccountInfoWithStateChange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;

  events: {};
}

export interface FQuerier extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FQuerierInterface;

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
    getAllProducts(
      overrides?: CallOverrides
    ): Promise<[FQuerier.ProductInfoStructOutput]>;

    getBookInfo(
      productId: PromiseOrValue<BigNumberish>,
      engine: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [FQuerier.BookInfoStructOutput] & {
        bookInfo: FQuerier.BookInfoStructOutput;
      }
    >;

    getClearinghouse(overrides?: CallOverrides): Promise<[string]>;

    getPerpBalances(
      subaccountId: PromiseOrValue<BigNumberish>,
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<
      [FQuerier.PerpBalanceStructOutput[]] & {
        perpBalances: FQuerier.PerpBalanceStructOutput[];
      }
    >;

    getPerpProducts(
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<
      [FQuerier.PerpProductStructOutput[]] & {
        perpProducts: FQuerier.PerpProductStructOutput[];
      }
    >;

    getSpotBalances(
      subaccountId: PromiseOrValue<BigNumberish>,
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<
      [FQuerier.SpotBalanceStructOutput[]] & {
        spotBalances: FQuerier.SpotBalanceStructOutput[];
      }
    >;

    getSpotProducts(
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<
      [FQuerier.SpotProductStructOutput[]] & {
        spotProducts: FQuerier.SpotProductStructOutput[];
      }
    >;

    getSubaccountInfo(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[FQuerier.SubaccountInfoStructOutput]>;

    getSubaccountInfoWithStateChange(
      subaccountId: PromiseOrValue<BigNumberish>,
      txns: FQuerier.TxnStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getAllProducts(
    overrides?: CallOverrides
  ): Promise<FQuerier.ProductInfoStructOutput>;

  getBookInfo(
    productId: PromiseOrValue<BigNumberish>,
    engine: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<FQuerier.BookInfoStructOutput>;

  getClearinghouse(overrides?: CallOverrides): Promise<string>;

  getPerpBalances(
    subaccountId: PromiseOrValue<BigNumberish>,
    productIds: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<FQuerier.PerpBalanceStructOutput[]>;

  getPerpProducts(
    productIds: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<FQuerier.PerpProductStructOutput[]>;

  getSpotBalances(
    subaccountId: PromiseOrValue<BigNumberish>,
    productIds: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<FQuerier.SpotBalanceStructOutput[]>;

  getSpotProducts(
    productIds: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<FQuerier.SpotProductStructOutput[]>;

  getSubaccountInfo(
    subaccountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<FQuerier.SubaccountInfoStructOutput>;

  getSubaccountInfoWithStateChange(
    subaccountId: PromiseOrValue<BigNumberish>,
    txns: FQuerier.TxnStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initialize(
    _clearinghouse: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getAllProducts(
      overrides?: CallOverrides
    ): Promise<FQuerier.ProductInfoStructOutput>;

    getBookInfo(
      productId: PromiseOrValue<BigNumberish>,
      engine: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<FQuerier.BookInfoStructOutput>;

    getClearinghouse(overrides?: CallOverrides): Promise<string>;

    getPerpBalances(
      subaccountId: PromiseOrValue<BigNumberish>,
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<FQuerier.PerpBalanceStructOutput[]>;

    getPerpProducts(
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<FQuerier.PerpProductStructOutput[]>;

    getSpotBalances(
      subaccountId: PromiseOrValue<BigNumberish>,
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<FQuerier.SpotBalanceStructOutput[]>;

    getSpotProducts(
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<FQuerier.SpotProductStructOutput[]>;

    getSubaccountInfo(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<FQuerier.SubaccountInfoStructOutput>;

    getSubaccountInfoWithStateChange(
      subaccountId: PromiseOrValue<BigNumberish>,
      txns: FQuerier.TxnStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getAllProducts(overrides?: CallOverrides): Promise<BigNumber>;

    getBookInfo(
      productId: PromiseOrValue<BigNumberish>,
      engine: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getClearinghouse(overrides?: CallOverrides): Promise<BigNumber>;

    getPerpBalances(
      subaccountId: PromiseOrValue<BigNumberish>,
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPerpProducts(
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSpotBalances(
      subaccountId: PromiseOrValue<BigNumberish>,
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSpotProducts(
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSubaccountInfo(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSubaccountInfoWithStateChange(
      subaccountId: PromiseOrValue<BigNumberish>,
      txns: FQuerier.TxnStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAllProducts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBookInfo(
      productId: PromiseOrValue<BigNumberish>,
      engine: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getClearinghouse(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPerpBalances(
      subaccountId: PromiseOrValue<BigNumberish>,
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPerpProducts(
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSpotBalances(
      subaccountId: PromiseOrValue<BigNumberish>,
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSpotProducts(
      productIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSubaccountInfo(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSubaccountInfoWithStateChange(
      subaccountId: PromiseOrValue<BigNumberish>,
      txns: FQuerier.TxnStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
