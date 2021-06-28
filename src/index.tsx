import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currencySlice from "./store/currencySlice";
import exchangeSlice from "./store/exchangeSlice";
import swapCurrenciesSlice from './store/swapCurrenciesSlice';
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  main: currencySlice,
  exchange: exchangeSlice,
  swapCurrencies: swapCurrenciesSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
