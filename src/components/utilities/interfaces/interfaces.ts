export interface IMainState {
  main: ICurrencyState;
}

export interface ICurrencyState {
  USD: ISeparateCurrencyState;
  EUR: ISeparateCurrencyState;
  BTC: ISeparateCurrencyState;
}

export interface ISeparateCurrencyState {
  currency: string;
  baseCurrency: string;
  buy: number;
  sell: number;
  usersInputBuy: number;
  usersInputSell: number;
}
