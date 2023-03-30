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
    subaccount: PromiseOrValue<BytesLike>;
    amountDelta: PromiseOrValue<BigNumberish>;
    vQuoteDelta: PromiseOrValue<BigNumberish>;
  };

  export type ProductDeltaStructOutput = [
    number,
    string,
    BigNumber,
    BigNumber
  ] & {
    productId: number;
    subaccount: string;
    amountDelta: BigNumber;
    vQuoteDelta: BigNumber;
  };
}

export interface IProductEngineInterface extends utils.Interface {
  functions: {
    "applyDeltas((uint32,bytes32,int128,int128)[])": FunctionFragment;
    "burnLp(uint32,bytes32,int128)": FunctionFragment;
    "decomposeLps(bytes32,bytes32,address)": FunctionFragment;
    "getClearinghouse()": FunctionFragment;
    "getEngineType()": FunctionFragment;
    "getOrderbook(uint32)": FunctionFragment;
    "getProductIds()": FunctionFragment;
    "initialize(address,address,address,address,address)": FunctionFragment;
    "mintLp(uint32,bytes32,int128,int128,int128)": FunctionFragment;
    "swapLp(uint32,bytes32,int128,int128,int128,int128)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "applyDeltas"
      | "burnLp"
      | "decomposeLps"
      | "getClearinghouse"
      | "getEngineType"
      | "getOrderbook"
      | "getProductIds"
      | "initialize"
      | "mintLp"
      | "swapLp"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "applyDeltas",
    values: [IProductEngine.ProductDeltaStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "burnLp",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "decomposeLps",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
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
    functionFragment: "getOrderbook",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getProductIds",
    values?: undefined
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
    functionFragment: "mintLp",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapLp",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "applyDeltas",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "burnLp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decomposeLps",
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
    functionFragment: "getOrderbook",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProductIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintLp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapLp", data: BytesLike): Result;

  events: {
    "AddProduct(uint32)": EventFragment;
    "BurnLp(uint32,bytes32,int128,int128,int128)": EventFragment;
    "MintLp(uint32,bytes32,int128,int128,int128)": EventFragment;
    "ProductUpdate(uint32)": EventFragment;
    "SocializeProduct(uint32,int128)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddProduct"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BurnLp"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MintLp"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProductUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SocializeProduct"): EventFragment;
}

export interface AddProductEventObject {
  productId: number;
}
export type AddProductEvent = TypedEvent<[number], AddProductEventObject>;

export type AddProductEventFilter = TypedEventFilter<AddProductEvent>;

export interface BurnLpEventObject {
  productId: number;
  subaccount: string;
  lpAmount: BigNumber;
  baseAmount: BigNumber;
  quoteAmount: BigNumber;
}
export type BurnLpEvent = TypedEvent<
  [number, string, BigNumber, BigNumber, BigNumber],
  BurnLpEventObject
>;

export type BurnLpEventFilter = TypedEventFilter<BurnLpEvent>;

export interface MintLpEventObject {
  productId: number;
  subaccount: string;
  lpAmount: BigNumber;
  baseAmount: BigNumber;
  quoteAmount: BigNumber;
}
export type MintLpEvent = TypedEvent<
  [number, string, BigNumber, BigNumber, BigNumber],
  MintLpEventObject
>;

export type MintLpEventFilter = TypedEventFilter<MintLpEvent>;

export interface ProductUpdateEventObject {
  productId: number;
}
export type ProductUpdateEvent = TypedEvent<[number], ProductUpdateEventObject>;

export type ProductUpdateEventFilter = TypedEventFilter<ProductUpdateEvent>;

export interface SocializeProductEventObject {
  productId: number;
  amountSocialized: BigNumber;
}
export type SocializeProductEvent = TypedEvent<
  [number, BigNumber],
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

    burnLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amountLp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    decomposeLps(
      liquidatee: PromiseOrValue<BytesLike>,
      liquidator: PromiseOrValue<BytesLike>,
      feeCalculator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getClearinghouse(overrides?: CallOverrides): Promise<[string]>;

    getEngineType(overrides?: CallOverrides): Promise<[number]>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getProductIds(overrides?: CallOverrides): Promise<[number[]]>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      _quote: PromiseOrValue<string>,
      _endpoint: PromiseOrValue<string>,
      _admin: PromiseOrValue<string>,
      _fees: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amountBase: PromiseOrValue<BigNumberish>,
      quoteAmountLow: PromiseOrValue<BigNumberish>,
      quoteAmountHigh: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      priceX18: PromiseOrValue<BigNumberish>,
      sizeIncrement: PromiseOrValue<BigNumberish>,
      lpSpreadX18: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  applyDeltas(
    deltas: IProductEngine.ProductDeltaStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  burnLp(
    productId: PromiseOrValue<BigNumberish>,
    subaccount: PromiseOrValue<BytesLike>,
    amountLp: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  decomposeLps(
    liquidatee: PromiseOrValue<BytesLike>,
    liquidator: PromiseOrValue<BytesLike>,
    feeCalculator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getClearinghouse(overrides?: CallOverrides): Promise<string>;

  getEngineType(overrides?: CallOverrides): Promise<number>;

  getOrderbook(
    productId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getProductIds(overrides?: CallOverrides): Promise<number[]>;

  initialize(
    _clearinghouse: PromiseOrValue<string>,
    _quote: PromiseOrValue<string>,
    _endpoint: PromiseOrValue<string>,
    _admin: PromiseOrValue<string>,
    _fees: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintLp(
    productId: PromiseOrValue<BigNumberish>,
    subaccount: PromiseOrValue<BytesLike>,
    amountBase: PromiseOrValue<BigNumberish>,
    quoteAmountLow: PromiseOrValue<BigNumberish>,
    quoteAmountHigh: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapLp(
    productId: PromiseOrValue<BigNumberish>,
    subaccount: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    priceX18: PromiseOrValue<BigNumberish>,
    sizeIncrement: PromiseOrValue<BigNumberish>,
    lpSpreadX18: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    applyDeltas(
      deltas: IProductEngine.ProductDeltaStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    burnLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amountLp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decomposeLps(
      liquidatee: PromiseOrValue<BytesLike>,
      liquidator: PromiseOrValue<BytesLike>,
      feeCalculator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getClearinghouse(overrides?: CallOverrides): Promise<string>;

    getEngineType(overrides?: CallOverrides): Promise<number>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getProductIds(overrides?: CallOverrides): Promise<number[]>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      _quote: PromiseOrValue<string>,
      _endpoint: PromiseOrValue<string>,
      _admin: PromiseOrValue<string>,
      _fees: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    mintLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amountBase: PromiseOrValue<BigNumberish>,
      quoteAmountLow: PromiseOrValue<BigNumberish>,
      quoteAmountHigh: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    swapLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      priceX18: PromiseOrValue<BigNumberish>,
      sizeIncrement: PromiseOrValue<BigNumberish>,
      lpSpreadX18: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;
  };

  filters: {
    "AddProduct(uint32)"(productId?: null): AddProductEventFilter;
    AddProduct(productId?: null): AddProductEventFilter;

    "BurnLp(uint32,bytes32,int128,int128,int128)"(
      productId?: PromiseOrValue<BigNumberish> | null,
      subaccount?: PromiseOrValue<BytesLike> | null,
      lpAmount?: null,
      baseAmount?: null,
      quoteAmount?: null
    ): BurnLpEventFilter;
    BurnLp(
      productId?: PromiseOrValue<BigNumberish> | null,
      subaccount?: PromiseOrValue<BytesLike> | null,
      lpAmount?: null,
      baseAmount?: null,
      quoteAmount?: null
    ): BurnLpEventFilter;

    "MintLp(uint32,bytes32,int128,int128,int128)"(
      productId?: PromiseOrValue<BigNumberish> | null,
      subaccount?: PromiseOrValue<BytesLike> | null,
      lpAmount?: null,
      baseAmount?: null,
      quoteAmount?: null
    ): MintLpEventFilter;
    MintLp(
      productId?: PromiseOrValue<BigNumberish> | null,
      subaccount?: PromiseOrValue<BytesLike> | null,
      lpAmount?: null,
      baseAmount?: null,
      quoteAmount?: null
    ): MintLpEventFilter;

    "ProductUpdate(uint32)"(
      productId?: PromiseOrValue<BigNumberish> | null
    ): ProductUpdateEventFilter;
    ProductUpdate(
      productId?: PromiseOrValue<BigNumberish> | null
    ): ProductUpdateEventFilter;

    "SocializeProduct(uint32,int128)"(
      productId?: PromiseOrValue<BigNumberish> | null,
      amountSocialized?: null
    ): SocializeProductEventFilter;
    SocializeProduct(
      productId?: PromiseOrValue<BigNumberish> | null,
      amountSocialized?: null
    ): SocializeProductEventFilter;
  };

  estimateGas: {
    applyDeltas(
      deltas: IProductEngine.ProductDeltaStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    burnLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amountLp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    decomposeLps(
      liquidatee: PromiseOrValue<BytesLike>,
      liquidator: PromiseOrValue<BytesLike>,
      feeCalculator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getClearinghouse(overrides?: CallOverrides): Promise<BigNumber>;

    getEngineType(overrides?: CallOverrides): Promise<BigNumber>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getProductIds(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      _quote: PromiseOrValue<string>,
      _endpoint: PromiseOrValue<string>,
      _admin: PromiseOrValue<string>,
      _fees: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amountBase: PromiseOrValue<BigNumberish>,
      quoteAmountLow: PromiseOrValue<BigNumberish>,
      quoteAmountHigh: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      priceX18: PromiseOrValue<BigNumberish>,
      sizeIncrement: PromiseOrValue<BigNumberish>,
      lpSpreadX18: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    applyDeltas(
      deltas: IProductEngine.ProductDeltaStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    burnLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amountLp: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    decomposeLps(
      liquidatee: PromiseOrValue<BytesLike>,
      liquidator: PromiseOrValue<BytesLike>,
      feeCalculator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getClearinghouse(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEngineType(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOrderbook(
      productId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProductIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _clearinghouse: PromiseOrValue<string>,
      _quote: PromiseOrValue<string>,
      _endpoint: PromiseOrValue<string>,
      _admin: PromiseOrValue<string>,
      _fees: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amountBase: PromiseOrValue<BigNumberish>,
      quoteAmountLow: PromiseOrValue<BigNumberish>,
      quoteAmountHigh: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapLp(
      productId: PromiseOrValue<BigNumberish>,
      subaccount: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      priceX18: PromiseOrValue<BigNumberish>,
      sizeIncrement: PromiseOrValue<BigNumberish>,
      lpSpreadX18: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
