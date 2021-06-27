import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrencyState } from "../components/utilities/interfaces/interfaces";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseURL } from "../components/utilities/enums/enums";

const initialState: ICurrencyState = {
  USD: {
    currency: "USD",
    baseCurrency: "UAH",
    buy: "0",
    sell: "0",
  },
  EUR: {
    currency: "EUR",
    baseCurrency: "UAH",
    buy: "0",
    sell: "0",
  },
  BTC: {
    currency: "BTC",
    baseCurrency: "UAH",
    buy: "0",
    sell: "0",
  },
};

// interface Ilol {
//   ccy: string;
//   base_ccy: string;
//   buy: number;
//   sale: number;
// }

export const getData: any = createAsyncThunk(
  "currencies/getCurrenciesData",
  async () => {
    let promise = new Promise((resolve, reject) => {
      resolve(axios.get(BaseURL.PrivatBank));
    });

    let result: any = await promise;
    return result.data;
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setUSD_buy(state, { payload }) {
      state.USD.buy = payload;
    },
    setUSD_sell(state, { payload }) {
      state.USD.sell = payload;
    },
    setEUR_buy(state, { payload }) {
      state.EUR.buy = payload;
    },
    setEUR_sell(state, { payload }) {
      state.EUR.sell = payload;
    },
    setBTC_buy(state, { payload }) {
      state.BTC.buy = payload;
    },
    setBTC_sell(state, { payload }) {
      state.BTC.sell = payload;
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, { payload }) => {
      state.USD.buy = payload[0].buy;
      state.USD.sell = payload[0].sale;
      state.EUR.buy = payload[1].buy;
      state.EUR.sell = payload[1].sale;
      state.BTC.buy = payload[3].buy;
      state.BTC.sell = payload[3].sale;
    },
  },
});

export default currencySlice.reducer;
export const { setUSD_buy, setUSD_sell, setEUR_buy, setEUR_sell, setBTC_buy, setBTC_sell } = currencySlice.actions;
