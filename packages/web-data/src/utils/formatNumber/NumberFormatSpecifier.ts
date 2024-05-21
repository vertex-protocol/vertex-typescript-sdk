export enum CustomNumberFormatSpecifier {
  // For areas of the app where we want to show as much precision as possible
  NUMBER_PRECISE = 'number_precise',
  // For generic numbers and asset amounts
  NUMBER_AUTO = 'number_auto',
  SIGNED_NUMBER_AUTO = 'signed_number_auto',
  // Used for large numbers where we want to show "M" for million & "B" for billion
  NUMBER_LARGE_ABBREVIATED = 'number_large_abbreviated',
  CURRENCY_LARGE_ABBREVIATED = 'currency_large_abbreviated',
  // Properly adjusts for zero values by not showing a sign
  SIGNED_CURRENCY_2DP = 'signed_currency_2dp',
}

export enum PresetNumberFormatSpecifier {
  CURRENCY_INT = '$,.0f',
  CURRENCY_2DP = '$,.2f',
  CURRENCY_SI_3SF = '$,.3s',
  NUMBER_1DP = '.1f',
  NUMBER_2DP = ',.2f',
  NUMBER_4DP = ',.4f',
  NUMBER_UPTO_6DP = ',.6~f',
  NUMBER_INT = ',.0f',
  NUMBER_SI_3SF = ',.3s',
  NUMBER_SI_5SF = ',.5s',
  PERCENTAGE_2DP = ',.2%',
  PERCENTAGE_UPTO_4DP = ',.4~%',
  PERCENTAGE_INT = ',.0%',
  SIGNED_NUMBER_2DP = '+,.2f',
  SIGNED_NUMBER_4DP = '+,.4f',
  SIGNED_CURRENCY_2DP = '+$,.2f',
  SIGNED_PERCENTAGE_2DP = '+,.2%',
  SIGNED_PERCENTAGE_4DP = '+,.4%',
}

export type NumberFormatSpecifier =
  | PresetNumberFormatSpecifier
  | CustomNumberFormatSpecifier;
