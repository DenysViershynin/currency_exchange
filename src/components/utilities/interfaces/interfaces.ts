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