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
  export type ProductDeltaStruct = {
    productId: PromiseOrValue<BigNumberish>;
    subaccountId: PromiseOrValue<BigNumberish>;
    amountDeltaX18: PromiseOrValue<BigNumberish>;
    vQuoteDeltaX18: PromiseOrValue<BigNumberish>;
  };

  export type ProductDeltaStructOutput = [
    number,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    productId: number;
    subaccountId: BigNumber;
    amountDeltaX18: BigNumber;
    vQuoteDeltaX18: BigNumber;
  };

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

export interface IProductEngineInterface extends utils.Interface {
  functions: {
    "applyDeltas((uint32,uint64,int256,int256)[])": FunctionFragment;
    "getBalanceAmountX18(uint32,uint64)": FunctionFragment;
    "getBalanceHealthWithDeltaX18(uint64,uint32,uint8,int256,int256)": FunctionFragment;
    "getBalanceHealthX18(uint64,uint32,uint8)": FunctionFragment;
    "getClearinghouse()": FunctionFragment;
    "getEngineType()": FunctionFragment;
    "getHealthWithDeltasX18(uint64,uint8,(uint32,int256,int256)[])": FunctionFragment;
    "getHealthX18(uint64,uint8)": FunctionFragment;
    "getLiqPriceX18(uint32,int256)": FunctionFragment;
    "getMaximumLiquidatableX18(uint64,uint32,int256)": FunctionFragment;
    "getOracle()": FunctionFragment;
    "getOraclePriceX18(uint32)": FunctionFragment;
    "getOrderbook(uint32)": FunctionFragment;
    "getProductIds()": FunctionFragment;
    "hasAssets(uint64)": FunctionFragment;
    "initialize(address,address,address,address,address)": FunctionFragment;
    "socializeProduct(uint32,int256,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "applyDeltas"
      | "getBalanceAmountX18"
      | "getBalanceHealthWithDeltaX18"
      | "getBalanceHealthX18"
      | "getClearinghouse"
      | "getEngineType"
      | "getHealthWithDeltasX18"
      | "getHealthX18"
      | "getLiqPriceX18"
      | "getMaximumLiquidatableX18"
      | "getOracle"
      | "getOraclePriceX18"
      | "getOrderbook"
      | "getProductIds"
      | "hasAssets"
      | "initialize"
      | "socializeProduct"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "applyDeltas",
    values: [IProductEngine.ProductDeltaStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceAmountX18",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceHealthWithDeltaX18",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceHealthX18",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getClearinghouse",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEngineType",
    values?: undefined
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
    functionFragment: "getLiqPriceX18",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaximumLiquidatableX18",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "getOracle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getOraclePriceX18",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getOrderbook",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getProductIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hasAssets",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "socializeProduct",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "applyDeltas",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceAmountX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceHealthWithDeltaX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceHealthX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getClearinghouse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEngineType",
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
    functionFragment: "getLiqPriceX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaximumLiquidatableX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOracle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getOraclePriceX18",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOrderbook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProductIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasAssets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "socializeProduct",
    data: BytesLike
  ): Result;

  events: {
    "AddProduct(uint32)": EventFragment;
    "ProductUpdate(uint32)": EventFragment;
    "SocializeProduct(uint32,int256,int256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddProduct"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProductUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SocializeProduct"): EventFragment;
}

export interface AddProductEventObject {
  productId: number;
}
export type AddProductEvent = TypedEvent<[number], AddProductEventObject>;

export type AddProductEventFilter = TypedEventFilter<AddProductEvent>;

export interface ProductUpdateEventObject {
  productId: number;
}
export type ProductUpdateEvent = TypedEvent<[number], ProductUpdateEventObject>;

export type ProductUpdateEventFilter = TypedEventFilter<ProductUpdateEvent>;

export interface SocializeProductEventObject {
  productId: number;
  socializedQuote: BigNumber;
  socializedBase: BigNumber;
}
export type SocializeProductEvent = TypedEvent<
  [number, BigNumber, BigNumber],
  SocializeProductEventObject
>;

export type SocializeProductEventFilter =
  TypedEventFilter<SocializeProductEvent>;

export interface IProductEngine extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IProductEngineInterface;

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
    applyDeltas(
      deltas: IProductEngine.ProductDeltaStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getBalanceAmountX18(
      productId: PromiseOrValue<BigNumberish>,
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getBalanceHealthWithDeltaX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      amountDeltaX18: PromiseOrValue<BigNumberish>,
      vQuoteDeltaX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getBalanceHealthX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getClearinghouse(overrides?: CallOverrides): Promise<[string]>;

    getEngineType(overrides?: CallOverrides): Promise<[number]>;

    getHealthWithDeltasX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      healthDeltas: IProductEngine.HealthDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getHealthX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getLiqPriceX18(
      productId: PromiseOrValue<BigNumberish>,
      amountX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMaximumLiquidatableX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthAmountX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOracle(overrides?: CallOverrides): Promise<[string]>;

    getOraclePriceX18(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getProductIds(overrides?: CallOverrides): Promise<[number[]]>;

    hasAssets(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      _quote: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      _admin: PromiseOrValue<string>,
      _fees: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    socializeProduct(
      productId: PromiseOrValue<BigNumberish>,
      vQuoteX18: PromiseOrValue<BigNumberish>,
      isLong: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  applyDeltas(
    deltas: IProductEngine.ProductDeltaStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getBalanceAmountX18(
    productId: PromiseOrValue<BigNumberish>,
    subaccountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getBalanceHealthWithDeltaX18(
    subaccountId: PromiseOrValue<BigNumberish>,
    productId: PromiseOrValue<BigNumberish>,
    healthType: PromiseOrValue<BigNumberish>,
    amountDeltaX18: PromiseOrValue<BigNumberish>,
    vQuoteDeltaX18: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getBalanceHealthX18(
    subaccountId: PromiseOrValue<BigNumberish>,
    productId: PromiseOrValue<BigNumberish>,
    healthType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getClearinghouse(overrides?: CallOverrides): Promise<string>;

  getEngineType(overrides?: CallOverrides): Promise<number>;

  getHealthWithDeltasX18(
    subaccountId: PromiseOrValue<BigNumberish>,
    healthType: PromiseOrValue<BigNumberish>,
    healthDeltas: IProductEngine.HealthDeltaStruct[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getHealthX18(
    subaccountId: PromiseOrValue<BigNumberish>,
    healthType: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getLiqPriceX18(
    productId: PromiseOrValue<BigNumberish>,
    amountX18: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMaximumLiquidatableX18(
    subaccountId: PromiseOrValue<BigNumberish>,
    productId: PromiseOrValue<BigNumberish>,
    healthAmountX18: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOracle(overrides?: CallOverrides): Promise<string>;

  getOraclePriceX18(
    productId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOrderbook(
    productId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getProductIds(overrides?: CallOverrides): Promise<number[]>;

  hasAssets(
    subaccountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    _clearinghouse: PromiseOrValue<string>,
    _quote: PromiseOrValue<string>,
    _oracle: PromiseOrValue<string>,
    _admin: PromiseOrValue<string>,
    _fees: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  socializeProduct(
    productId: PromiseOrValue<BigNumberish>,
    vQuoteX18: PromiseOrValue<BigNumberish>,
    isLong: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    applyDeltas(
      deltas: IProductEngine.ProductDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    getBalanceAmountX18(
      productId: PromiseOrValue<BigNumberish>,
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalanceHealthWithDeltaX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      amountDeltaX18: PromiseOrValue<BigNumberish>,
      vQuoteDeltaX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalanceHealthX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getClearinghouse(overrides?: CallOverrides): Promise<string>;

    getEngineType(overrides?: CallOverrides): Promise<number>;

    getHealthWithDeltasX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      healthDeltas: IProductEngine.HealthDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHealthX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLiqPriceX18(
      productId: PromiseOrValue<BigNumberish>,
      amountX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaximumLiquidatableX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthAmountX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOracle(overrides?: CallOverrides): Promise<string>;

    getOraclePriceX18(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getProductIds(overrides?: CallOverrides): Promise<number[]>;

    hasAssets(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      _quote: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      _admin: PromiseOrValue<string>,
      _fees: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    socializeProduct(
      productId: PromiseOrValue<BigNumberish>,
      vQuoteX18: PromiseOrValue<BigNumberish>,
      isLong: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AddProduct(uint32)"(productId?: null): AddProductEventFilter;
    AddProduct(productId?: null): AddProductEventFilter;

    "ProductUpdate(uint32)"(
      productId?: PromiseOrValue<BigNumberish> | null
    ): ProductUpdateEventFilter;
    ProductUpdate(
      productId?: PromiseOrValue<BigNumberish> | null
    ): ProductUpdateEventFilter;

    "SocializeProduct(uint32,int256,int256)"(
      productId?: PromiseOrValue<BigNumberish> | null,
      socializedQuote?: null,
      socializedBase?: null
    ): SocializeProductEventFilter;
    SocializeProduct(
      productId?: PromiseOrValue<BigNumberish> | null,
      socializedQuote?: null,
      socializedBase?: null
    ): SocializeProductEventFilter;
  };

  estimateGas: {
    applyDeltas(
      deltas: IProductEngine.ProductDeltaStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getBalanceAmountX18(
      productId: PromiseOrValue<BigNumberish>,
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalanceHealthWithDeltaX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      amountDeltaX18: PromiseOrValue<BigNumberish>,
      vQuoteDeltaX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalanceHealthX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getClearinghouse(overrides?: CallOverrides): Promise<BigNumber>;

    getEngineType(overrides?: CallOverrides): Promise<BigNumber>;

    getHealthWithDeltasX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      healthDeltas: IProductEngine.HealthDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getHealthX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLiqPriceX18(
      productId: PromiseOrValue<BigNumberish>,
      amountX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaximumLiquidatableX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthAmountX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOracle(overrides?: CallOverrides): Promise<BigNumber>;

    getOraclePriceX18(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getProductIds(overrides?: CallOverrides): Promise<BigNumber>;

    hasAssets(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      _quote: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      _admin: PromiseOrValue<string>,
      _fees: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    socializeProduct(
      productId: PromiseOrValue<BigNumberish>,
      vQuoteX18: PromiseOrValue<BigNumberish>,
      isLong: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    applyDeltas(
      deltas: IProductEngine.ProductDeltaStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getBalanceAmountX18(
      productId: PromiseOrValue<BigNumberish>,
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBalanceHealthWithDeltaX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      amountDeltaX18: PromiseOrValue<BigNumberish>,
      vQuoteDeltaX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBalanceHealthX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getClearinghouse(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEngineType(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getHealthWithDeltasX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      healthDeltas: IProductEngine.HealthDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getHealthX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      healthType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLiqPriceX18(
      productId: PromiseOrValue<BigNumberish>,
      amountX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaximumLiquidatableX18(
      subaccountId: PromiseOrValue<BigNumberish>,
      productId: PromiseOrValue<BigNumberish>,
      healthAmountX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOraclePriceX18(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProductIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hasAssets(
      subaccountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      _quote: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      _admin: PromiseOrValue<string>,
      _fees: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    socializeProduct(
      productId: PromiseOrValue<BigNumberish>,
      vQuoteX18: PromiseOrValue<BigNumberish>,
      isLong: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
