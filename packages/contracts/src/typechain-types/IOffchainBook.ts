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

export declare namespace IEndpoint {
  export type OrderStruct = {
    sender: BytesLike;
    priceX18: bigint;
    amount: bigint;
    expiration: bigint;
    nonce: bigint;
  };

  export type OrderStructOutput = [
    sender: string,
    priceX18: bigint,
    amount: bigint,
    expiration: bigint,
    nonce: bigint
  ] & {
    sender: string;
    priceX18: bigint;
    amount: bigint;
    expiration: bigint;
    nonce: bigint;
  };

  export type SignedOrderStruct = {
    order: IEndpoint.OrderStruct;
    signature: BytesLike;
  };

  export type SignedOrderStructOutput = [
    order: IEndpoint.OrderStructOutput,
    signature: string
  ] & { order: IEndpoint.OrderStructOutput; signature: string };

  export type MatchOrderAMMStruct = {
    productId: bigint;
    baseDelta: bigint;
    quoteDelta: bigint;
    taker: IEndpoint.SignedOrderStruct;
  };

  export type MatchOrderAMMStructOutput = [
    productId: bigint,
    baseDelta: bigint,
    quoteDelta: bigint,
    taker: IEndpoint.SignedOrderStructOutput
  ] & {
    productId: bigint;
    baseDelta: bigint;
    quoteDelta: bigint;
    taker: IEndpoint.SignedOrderStructOutput;
  };

  export type MatchOrdersStruct = {
    productId: bigint;
    amm: boolean;
    taker: IEndpoint.SignedOrderStruct;
    maker: IEndpoint.SignedOrderStruct;
  };

  export type MatchOrdersStructOutput = [
    productId: bigint,
    amm: boolean,
    taker: IEndpoint.SignedOrderStructOutput,
    maker: IEndpoint.SignedOrderStructOutput
  ] & {
    productId: bigint;
    amm: boolean;
    taker: IEndpoint.SignedOrderStructOutput;
    maker: IEndpoint.SignedOrderStructOutput;
  };

  export type MatchOrdersWithSignerStruct = {
    matchOrders: IEndpoint.MatchOrdersStruct;
    takerLinkedSigner: AddressLike;
    makerLinkedSigner: AddressLike;
  };

  export type MatchOrdersWithSignerStructOutput = [
    matchOrders: IEndpoint.MatchOrdersStructOutput,
    takerLinkedSigner: string,
    makerLinkedSigner: string
  ] & {
    matchOrders: IEndpoint.MatchOrdersStructOutput;
    takerLinkedSigner: string;
    makerLinkedSigner: string;
  };

  export type SwapAMMStruct = {
    sender: BytesLike;
    productId: bigint;
    amount: bigint;
    priceX18: bigint;
  };

  export type SwapAMMStructOutput = [
    sender: string,
    productId: bigint,
    amount: bigint,
    priceX18: bigint
  ] & { sender: string; productId: bigint; amount: bigint; priceX18: bigint };
}

export declare namespace IOffchainBook {
  export type MarketStruct = {
    productId: bigint;
    sizeIncrement: bigint;
    priceIncrementX18: bigint;
    lpSpreadX18: bigint;
    collectedFees: bigint;
    sequencerFees: bigint;
  };

  export type MarketStructOutput = [
    productId: bigint,
    sizeIncrement: bigint,
    priceIncrementX18: bigint,
    lpSpreadX18: bigint,
    collectedFees: bigint,
    sequencerFees: bigint
  ] & {
    productId: bigint;
    sizeIncrement: bigint;
    priceIncrementX18: bigint;
    lpSpreadX18: bigint;
    collectedFees: bigint;
    sequencerFees: bigint;
  };
}

export interface IOffchainBookInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claimSequencerFee"
      | "dumpFees"
      | "getDigest"
      | "getMarket"
      | "getMinSize"
      | "getVersion"
      | "initialize"
      | "matchOrderAMM"
      | "matchOrders"
      | "modifyConfig"
      | "swapAMM"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "FillOrder"): EventFragment;

  encodeFunctionData(
    functionFragment: "claimSequencerFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "dumpFees", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getDigest",
    values: [IEndpoint.OrderStruct]
  ): string;
  encodeFunctionData(functionFragment: "getMarket", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getMinSize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      AddressLike,
      AddressLike,
      bigint,
      bigint,
      bigint,
      bigint,
      bigint
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "matchOrderAMM",
    values: [IEndpoint.MatchOrderAMMStruct, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "matchOrders",
    values: [IEndpoint.MatchOrdersWithSignerStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "modifyConfig",
    values: [bigint, bigint, bigint, bigint]
  ): string;
  encodeFunctionData(
    functionFragment: "swapAMM",
    values: [IEndpoint.SwapAMMStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimSequencerFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dumpFees", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getDigest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getMarket", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getMinSize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "matchOrderAMM",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "matchOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "modifyConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swapAMM", data: BytesLike): Result;
}

export namespace FillOrderEvent {
  export type InputTuple = [
    digest: BytesLike,
    subaccount: BytesLike,
    priceX18: bigint,
    amount: bigint,
    expiration: bigint,
    nonce: bigint,
    isTaker: boolean,
    feeAmount: bigint,
    baseDelta: bigint,
    quoteDelta: bigint
  ];
  export type OutputTuple = [
    digest: string,
    subaccount: string,
    priceX18: bigint,
    amount: bigint,
    expiration: bigint,
    nonce: bigint,
    isTaker: boolean,
    feeAmount: bigint,
    baseDelta: bigint,
    quoteDelta: bigint
  ];
  export interface OutputObject {
    digest: string;
    subaccount: string;
    priceX18: bigint;
    amount: bigint;
    expiration: bigint;
    nonce: bigint;
    isTaker: boolean;
    feeAmount: bigint;
    baseDelta: bigint;
    quoteDelta: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IOffchainBook extends BaseContract {
  connect(runner?: ContractRunner | null): IOffchainBook;
  waitForDeployment(): Promise<this>;

  interface: IOffchainBookInterface;

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

  claimSequencerFee: TypedContractMethod<[], [bigint], "nonpayable">;

  dumpFees: TypedContractMethod<[], [void], "nonpayable">;

  getDigest: TypedContractMethod<
    [order: IEndpoint.OrderStruct],
    [string],
    "view"
  >;

  getMarket: TypedContractMethod<
    [],
    [IOffchainBook.MarketStructOutput],
    "view"
  >;

  getMinSize: TypedContractMethod<[], [bigint], "view">;

  getVersion: TypedContractMethod<[], [bigint], "nonpayable">;

  initialize: TypedContractMethod<
    [
      _clearinghouse: AddressLike,
      _engine: AddressLike,
      _endpoint: AddressLike,
      _admin: AddressLike,
      _fees: AddressLike,
      _productId: bigint,
      _sizeIncrement: bigint,
      _priceIncrementX18: bigint,
      _minSize: bigint,
      _lpSpreadX18: bigint
    ],
    [void],
    "nonpayable"
  >;

  matchOrderAMM: TypedContractMethod<
    [tx: IEndpoint.MatchOrderAMMStruct, takerLinkedSigner: AddressLike],
    [void],
    "nonpayable"
  >;

  matchOrders: TypedContractMethod<
    [tx: IEndpoint.MatchOrdersWithSignerStruct],
    [void],
    "nonpayable"
  >;

  modifyConfig: TypedContractMethod<
    [
      _sizeIncrement: bigint,
      _priceIncrementX18: bigint,
      _minSize: bigint,
      _lpSpreadX18: bigint
    ],
    [void],
    "nonpayable"
  >;

  swapAMM: TypedContractMethod<
    [tx: IEndpoint.SwapAMMStruct],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claimSequencerFee"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "dumpFees"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getDigest"
  ): TypedContractMethod<[order: IEndpoint.OrderStruct], [string], "view">;
  getFunction(
    nameOrSignature: "getMarket"
  ): TypedContractMethod<[], [IOffchainBook.MarketStructOutput], "view">;
  getFunction(
    nameOrSignature: "getMinSize"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getVersion"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      _clearinghouse: AddressLike,
      _engine: AddressLike,
      _endpoint: AddressLike,
      _admin: AddressLike,
      _fees: AddressLike,
      _productId: bigint,
      _sizeIncrement: bigint,
      _priceIncrementX18: bigint,
      _minSize: bigint,
      _lpSpreadX18: bigint
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "matchOrderAMM"
  ): TypedContractMethod<
    [tx: IEndpoint.MatchOrderAMMStruct, takerLinkedSigner: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "matchOrders"
  ): TypedContractMethod<
    [tx: IEndpoint.MatchOrdersWithSignerStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "modifyConfig"
  ): TypedContractMethod<
    [
      _sizeIncrement: bigint,
      _priceIncrementX18: bigint,
      _minSize: bigint,
      _lpSpreadX18: bigint
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "swapAMM"
  ): TypedContractMethod<[tx: IEndpoint.SwapAMMStruct], [void], "nonpayable">;

  getEvent(
    key: "FillOrder"
  ): TypedContractEvent<
    FillOrderEvent.InputTuple,
    FillOrderEvent.OutputTuple,
    FillOrderEvent.OutputObject
  >;

  filters: {
    "FillOrder(bytes32,bytes32,int128,int128,uint64,uint64,bool,int128,int128,int128)": TypedContractEvent<
      FillOrderEvent.InputTuple,
      FillOrderEvent.OutputTuple,
      FillOrderEvent.OutputObject
    >;
    FillOrder: TypedContractEvent<
      FillOrderEvent.InputTuple,
      FillOrderEvent.OutputTuple,
      FillOrderEvent.OutputObject
    >;
  };
}
