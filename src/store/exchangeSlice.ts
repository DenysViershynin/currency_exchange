import { createSlice } from "@reduxjs/toolkit";
import { IExchange } from "../components/utilities/interfaces/interfaces";

const initialState: IExchange = {
  changeCurrency: "",
  getCurrency: "",
  changeCurrencyAmount: "0",
  getCurrencyAmount: "0",
};

const exhcangeSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setChangeCurrency(state, { payload }) {
      state.changeCurrency = payload;
    },
    setChangeCurrencyAmount(state, { payload }) {
      state.changeCurrencyAmount = payload;
    },
    setGetCurrency(state, { payload }) {
      state.getCurrency = payload;
    },
    setGetCurrencyAmount(state, { payload }) {
      state.getCurrencyAmount = payload;
    },
  },
});

export default exhcangeSlice.reducer;
export const {
  setChangeCurrency,
  setChangeCurrencyAmount,
  setGetCurrency,
  setGetCurrencyAmount,
} = exhcangeSlice.actions;
