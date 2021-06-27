import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrencyState } from "../components/utilities/interfaces/interfaces";

const initialState: ICurrencyState = {
  USD: {
    currency: "USD",
    baseCurrency: "UAH",
    buy: 0,
    sell: 0,
    usersInputBuy: 0,
    usersInputSell: 0,
  },
  EUR: {
    currency: "EUR",
    baseCurrency: "UAH",
    buy: 0,
    sell: 0,
    usersInputBuy: 0,
    usersInputSell: 0,
  },
  BTC: {
    currency: "BTC",
    baseCurrency: "UAH",
    buy: 0,
    sell: 0,
    usersInputBuy: 0,
    usersInputSell: 0,
  },
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setUSD(state, action: PayloadAction<number>) {
      state.USD.buy = action.payload;
      state.USD.sell = action.payload;
    },
    setEUR(state, action: PayloadAction<number>) {
      state.EUR.buy = action.payload;
      state.EUR.sell = action.payload;
    },
    setBTC(state, action: PayloadAction<number>) {
      state.BTC.buy = action.payload;
      state.BTC.sell = action.payload;
    },
    fetchState(state) {
      return state;
    },
  },
});

export default currencySlice.reducer;
export const { setUSD, setEUR, setBTC, fetchState } = currencySlice.actions;
