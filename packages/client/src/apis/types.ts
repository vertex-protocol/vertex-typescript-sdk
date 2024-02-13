export type OptionalSubaccountOwner<T> = Omit<T, 'subaccountOwner'> & {
  subaccountOwner?: string;
};

export type OptionalSignatureParams<T> = Omit<
  T,
  'verifyingAddr' | 'chainId'
> & {
  verifyingAddr?: string;
  chainId?: number;
};
