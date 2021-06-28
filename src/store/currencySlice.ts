import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICurrencyState } from "../components/utilities/interfaces/interfaces";
import axios from "axios";
import { BaseURLEnum } from "../components/utilities/enums/enums";

const initialState: ICurrencyState = {
  USD: {
    currency: "USD",
    baseCurrency: "UAH",
    buy: "0",
    sell: "0",
    usersModifiedBuy: "0",
    usersModifiedSell: "0",
  },
  EUR: {
    currency: "EUR",
    baseCurrency: "UAH",
    buy: "0",
    sell: "0",
    usersModifiedBuy: "0",
    usersModifiedSell: "0",
  },
  BTC: {
    currency: "BTC",
    baseCurrency: "UAH",
    buy: "0",
    sell: "0",
    usersModifiedBuy: "0",
    usersModifiedSell: "0",
  },
};

export const getData: any = createAsyncThunk(
  "currencies/getCurrenciesData",
  async () => {
    let promise = new Promise((resolve, reject) => {
      resolve(axios.get(BaseURLEnum.PrivatBank));
    });

    if (localStorage.getItem("numberOfRequests") === null) {
      localStorage.setItem("numberOfRequests", "1");
    } else {
      let counter = localStorage.getItem("numberOfRequests");
      if (counter && counter !== '4') {
        counter = (Number(counter) + 1).toString();
        localStorage.setItem("numberOfRequests", `${counter}`);
      }
    }

    let result: any = await promise;
    return result.data;
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setUSD_buy(state, { payload }) {
      state.USD.usersModifiedBuy = payload;
    },
    setUSD_sell(state, { payload }) {
      state.USD.usersModifiedSell = payload;
    },
    setEUR_buy(state, { payload }) {
      state.EUR.usersModifiedBuy = payload;
    },
    setEUR_sell(state, { payload }) {
      state.EUR.usersModifiedSell = payload;
    },
    setBTC_buy(state, { payload }) {
      state.BTC.usersModifiedBuy = payload;
    },
    setBTC_sell(state, { payload }) {
      state.BTC.usersModifiedSell = payload;
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

      state.USD.usersModifiedBuy = payload[0].buy;
      state.USD.usersModifiedSell = payload[0].sale;
      state.EUR.usersModifiedBuy = payload[1].buy;
      state.EUR.usersModifiedSell = payload[1].sale;
      state.BTC.usersModifiedBuy = payload[3].buy;
      state.BTC.usersModifiedSell = payload[3].sale;
    },
  },
});

export default currencySlice.reducer;
export const {
  setUSD_buy,
  setUSD_sell,
  setEUR_buy,
  setEUR_sell,
  setBTC_buy,
  setBTC_sell,
} = currencySlice.actions;
