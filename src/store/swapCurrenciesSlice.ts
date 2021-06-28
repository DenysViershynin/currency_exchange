import { createSlice } from "@reduxjs/toolkit";
import { ISwapCur } from "../components/utilities/interfaces/interfaces";

const initialState: ISwapCur = {
  swapCurrencies: false,
  focus: false,
};

const swapCurrenciesSlice = createSlice({
  name: "swapCurrencies",
  initialState,
  reducers: {
    setSwapTrue(state) {
      state.swapCurrencies = true;
    },
    setSwapFalse(state) {
      state.swapCurrencies = false;
    },
    setFocusTrue(state) {
      state.focus = true;
    },
    setFocusFalse(state) {
      state.focus = false;
    },
  },
});

export default swapCurrenciesSlice.reducer;
export const {
  setSwapTrue,
  setSwapFalse,
  setFocusTrue,
  setFocusFalse,
} = swapCurrenciesSlice.actions;
