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
  buy: string;
  sell: string;
  usersModifiedBuy: string;
  usersModifiedSell: string;
}

export interface ICurrencyExchange {
  exchange: IExchange;
};

export interface IExchange {
  changeCurrency: string;
  getCurrency: string;
  changeCurrencyAmount: string;
  getCurrencyAmount: string;
};

export interface ICurrencyTableData {
  [name: string]: string;
}

export interface ISwapCurrencies {
  swapCurrencies: ISwapCur;
};

export interface ISwapCur {
  swapCurrencies: boolean;
  focus: boolean;
}