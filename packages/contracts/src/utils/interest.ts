// TODO
// function borrowRateCalculator(config: any, util: number) {
//   const annualRate =
//     util < numberFromX18(config.interestInflectionUtilX18)
//       ? numberFromX18(config.interestFloorX18) +
//         (util / numberFromX18(config.interestInflectionUtilX18)) *
//           numberFromX18(config.interestSmallCapX18)
//       : numberFromX18(config.interestFloorX18) +
//         numberFromX18(config.interestSmallCapX18) +
//         ((1 - util) / (1 - numberFromX18(config.interestInflectionUtilX18))) *
//           numberFromX18(config.interestLargeCapX18);
//
//   return annualRate / 31536000;
// }
//
// function borrowRateMultiplier(config: any, util: number, time: number) {
//   const rate = borrowRateCalculator(config, util);
//   return (1 + rate) ** time;
// }
//
// function realizedDepositRate(config: any, util: number, time: number) {
//   const borrowMulti = borrowRateMultiplier(config, util, time);
//   return util * (borrowMulti - 1) * 0.8;
// }
//
// function depositRateMultiplier(config: any, util: number, time: number) {
//   return 1 + realizedDepositRate(config, util, time);
// }
//
// function feesMultiplier(config: any, util: number, time: number) {
//   const borrowMulti = borrowRateMultiplier(config, util, time);
//   return util * (borrowMulti - 1) - realizedDepositRate(config, util, time);
// }
