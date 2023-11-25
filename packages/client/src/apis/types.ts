export type OptionalSubaccountOwner<T> = Omit<T, 'subaccountOwner'> & {
  subaccountOwner?: string;
};
