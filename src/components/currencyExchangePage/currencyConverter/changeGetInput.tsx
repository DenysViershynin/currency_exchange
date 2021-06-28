import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography, Box } from "@material-ui/core";
import { useStyles } from "../../../styles/inputs.styles";
import TextField from "@material-ui/core/TextField";
import { InputTypeEnum } from "../../utilities/enums/enums";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import {
  setGetCurrencyAmount,
  setGetCurrency,
  setChangeCurrencyAmount,
  setChangeCurrency,
} from "../../../store/exchangeSlice";
import { ICurrencyTableData } from "../../utilities/interfaces/interfaces";
import { setSwapFalse, setFocusTrue } from '../../../store/swapCurrenciesSlice'

interface IChangeGetInput {
  type: string;
  currencyTableData: ICurrencyTableData;
  getCurrencyAmount?: string;
  getCurrency?: string;
  changeCurrencyAmount?: string;
  changeCurrency?: string;
  swapCurrencies?: boolean;
  focusValue?: boolean;
}

const ChangeGetInput: React.FC<IChangeGetInput> = ({
  type,
  currencyTableData,
  getCurrencyAmount,
  getCurrency,
  changeCurrencyAmount,
  changeCurrency,
  swapCurrencies,
  focusValue,
}) => {
  const {
    usd_uah_buy,
    usd_uah_sell,
    eur_uah_buy,
    eur_uah_sell,
    btc_usd_buy,
    btc_usd_sell,
  } = currencyTableData;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chosenCurrency, setChosenCurrency] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (/[^0-9.]/.test(inputValue)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (type === InputTypeEnum.Change && changeCurrency) {
      setChosenCurrency(changeCurrency);
    } else if (type === InputTypeEnum.Get && getCurrency) {
      setChosenCurrency(getCurrency);
    }
  }, [getCurrency, changeCurrency])

  useEffect(() => {
    if(type === InputTypeEnum.Change && focusValue) {
      setFocused(true);
    }
  }, [focusValue])

  const onFocus = useCallback(() => {
    setFocused(true);
  }, [])

  const onBlur = useCallback(() => {
    setFocused(false);
  }, [])

  const cleanupListeners = useCallback(() => {
    let id = `${type}_input`;
    let input = document.querySelector(`#${id}`)
    input?.removeEventListener('focus', onFocus, true);
    input?.removeEventListener('blur', onBlur, true);
  }, []);

  useEffect(() => {
    if (type === InputTypeEnum.Change) {
      setChosenCurrency("UAH");
      setInputValue("0");
      dispatch(setChangeCurrency("UAH"));
    } else if (type === InputTypeEnum.Get) {
      setChosenCurrency("USD");
      setInputValue("0");
      dispatch(setGetCurrency("USD"));
    }
    let id = `${type}_input`;
    let input = document.querySelector(`#${id}`)
    input?.addEventListener('focus', onFocus, true);
    input?.addEventListener('blur', onBlur, true);

    return cleanupListeners;
  }, []);

  useEffect(() => {
    if (type === InputTypeEnum.Get && getCurrencyAmount) {
      setInputValue(getCurrencyAmount);
    } else if (type === InputTypeEnum.Change && changeCurrencyAmount) {
      setInputValue(changeCurrencyAmount);
    }
  }, [getCurrencyAmount, changeCurrencyAmount]);

  const dispatchGetCurrencyAmount = () => {
    if (
      chosenCurrency === "UAH" &&
      getCurrency === "USD" &&
      usd_uah_buy !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) / Number(usd_uah_buy)).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "USD" &&
      getCurrency === "UAH" &&
      usd_uah_sell !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) * Number(usd_uah_sell)).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    }
    if (
      chosenCurrency === "UAH" &&
      getCurrency === "EUR" &&
      eur_uah_buy !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) / Number(eur_uah_buy)).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "EUR" &&
      getCurrency === "UAH" &&
      eur_uah_sell !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) * Number(eur_uah_sell)).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "BTC" &&
      getCurrency === "USD" &&
      btc_usd_sell !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) * Number(btc_usd_sell)).toFixed(6) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "USD" &&
      getCurrency === "BTC" &&
      btc_usd_buy !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) / Number(btc_usd_buy)).toFixed(6) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (chosenCurrency === "UAH" && getCurrency === "UAH") {
      let CurrencyAmount = Number(inputValue).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (chosenCurrency === "USD" && getCurrency === "USD") {
      let CurrencyAmount = Number(inputValue).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (chosenCurrency === "EUR" && getCurrency === "EUR") {
      let CurrencyAmount = Number(inputValue).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (chosenCurrency === "BTC" && getCurrency === "BTC") {
      let CurrencyAmount = Number(inputValue).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "UAH" &&
      getCurrency === "BTC" &&
      btc_usd_buy !== "0"
    ) {
      let amountInUSD =
        (Number(inputValue) / Number(usd_uah_buy)).toFixed(2) + "";
      let amountInBTC =
        (Number(amountInUSD) / Number(btc_usd_buy)).toFixed(6) + "";
      dispatch(setGetCurrencyAmount(amountInBTC));
    } else if (
      chosenCurrency === "BTC" &&
      getCurrency === "UAH" &&
      btc_usd_buy !== "0"
    ) {
      let amountInUSD = Number(inputValue) * Number(btc_usd_sell) + "";
      let amountInUAH = Number(amountInUSD) * Number(usd_uah_sell) + "";
      dispatch(setGetCurrencyAmount(amountInUAH));
    } else if (
      chosenCurrency === "EUR" &&
      getCurrency === "USD" &&
      usd_uah_sell !== "0"
    ) {
      let amountInUAH =
        (Number(inputValue) * Number(eur_uah_sell)).toFixed(2) + "";
      let amountInUSD =
        (Number(amountInUAH) / Number(usd_uah_buy)).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(amountInUSD));
    } else if (
      chosenCurrency === "USD" &&
      getCurrency === "EUR" &&
      usd_uah_sell !== "0"
    ) {
      let amountInUAH =
        (Number(inputValue) * Number(usd_uah_sell)).toFixed(2) + "";
      let amountInEUR =
        (Number(amountInUAH) / Number(eur_uah_buy)).toFixed(2) + "";
      dispatch(setGetCurrencyAmount(amountInEUR));
    } else if (
      chosenCurrency === "EUR" &&
      getCurrency === "BTC" &&
      eur_uah_sell !== "0"
    ) {
      let amountInUAH =
        (Number(inputValue) * Number(eur_uah_sell)).toFixed(2) + "";
      let amountInUSD =
        (Number(amountInUAH) / Number(usd_uah_buy)).toFixed(2) + "";
      let amountInBTC =
        (Number(amountInUSD) / Number(btc_usd_buy)).toFixed(6) + "";
      dispatch(setGetCurrencyAmount(amountInBTC));
    } else if (
      chosenCurrency === "BTC" &&
      getCurrency === "EUR" &&
      btc_usd_sell !== "0"
    ) {
      let amountInUSD =
        (Number(inputValue) * Number(btc_usd_sell)).toFixed(2) + "";
      let amountInUAH =
        (Number(amountInUSD) * Number(usd_uah_sell)).toFixed(2) + "";
      let amountInEUR =
        (Number(amountInUAH) / Number(eur_uah_buy)).toFixed(6) + "";
      dispatch(setGetCurrencyAmount(amountInEUR));
    }
  }

  const dispatchChangeCurrencyAmount = () => {
    if (
      chosenCurrency === "UAH" &&
      changeCurrency === "USD" &&
      usd_uah_sell !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) / Number(usd_uah_sell)).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "USD" &&
      changeCurrency === "UAH" &&
      usd_uah_buy !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) * Number(usd_uah_buy)).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "UAH" &&
      changeCurrency === "EUR" &&
      eur_uah_sell !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) / Number(eur_uah_sell)).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "EUR" &&
      changeCurrency === "UAH" &&
      eur_uah_buy !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) * Number(eur_uah_buy)).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "BTC" &&
      changeCurrency === "USD" &&
      btc_usd_buy !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) * Number(btc_usd_buy)).toFixed(6) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "USD" &&
      changeCurrency === "BTC" &&
      btc_usd_sell !== "0"
    ) {
      let CurrencyAmount =
        (Number(inputValue) / Number(btc_usd_sell)).toFixed(6) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (chosenCurrency === "UAH" && changeCurrency === "UAH") {
      let CurrencyAmount = Number(inputValue).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (chosenCurrency === "USD" && changeCurrency === "USD") {
      let CurrencyAmount = Number(inputValue).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (chosenCurrency === "EUR" && changeCurrency === "EUR") {
      let CurrencyAmount = Number(inputValue).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (chosenCurrency === "BTC" && changeCurrency === "BTC") {
      let CurrencyAmount = Number(inputValue).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(CurrencyAmount));
    } else if (
      chosenCurrency === "UAH" &&
      changeCurrency === "BTC" &&
      btc_usd_buy !== "0"
    ) {
      let amountInUSD =
        (Number(inputValue) / Number(usd_uah_buy)).toFixed(2) + "";
      let amountInBTC =
        (Number(amountInUSD) / Number(btc_usd_buy)).toFixed(6) + "";
      dispatch(setChangeCurrencyAmount(amountInBTC));
    } else if (
      chosenCurrency === "BTC" &&
      changeCurrency === "UAH" &&
      btc_usd_buy !== "0"
    ) {
      let amountInUSD = (Number(inputValue) * Number(btc_usd_sell)).toFixed(2) + "";
      let amountInUAH = (Number(amountInUSD) * Number(usd_uah_sell)).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(amountInUAH));
    } else if (
      chosenCurrency === "EUR" &&
      changeCurrency === "USD" &&
      usd_uah_sell !== "0"
    ) {
      let amountInUAH =
        (Number(inputValue) * Number(eur_uah_sell)).toFixed(2) + "";
      let amountInUSD =
        (Number(amountInUAH) / Number(usd_uah_buy)).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(amountInUSD));
    } else if (
      chosenCurrency === "USD" &&
      changeCurrency === "EUR" &&
      usd_uah_sell !== "0"
    ) {
      let amountInUAH =
        (Number(inputValue) * Number(usd_uah_sell)).toFixed(2) + "";
      let amountInEUR =
        (Number(amountInUAH) / Number(eur_uah_buy)).toFixed(2) + "";
      dispatch(setChangeCurrencyAmount(amountInEUR));
    } else if (
      chosenCurrency === "EUR" &&
      changeCurrency === "BTC" &&
      eur_uah_sell !== "0"
    ) {
      let amountInUAH =
        (Number(inputValue) * Number(eur_uah_sell)).toFixed(2) + "";
      let amountInUSD =
        (Number(amountInUAH) / Number(usd_uah_buy)).toFixed(2) + "";
      let amountInBTC =
        (Number(amountInUSD) / Number(btc_usd_buy)).toFixed(6) + "";
      dispatch(setChangeCurrencyAmount(amountInBTC));
    } else if (
      chosenCurrency === "BTC" &&
      changeCurrency === "EUR" &&
      btc_usd_sell !== "0"
    ) {
      let amountInUSD =
        (Number(inputValue) * Number(btc_usd_sell)).toFixed(2) + "";
      let amountInUAH =
        (Number(amountInUSD) * Number(usd_uah_sell)).toFixed(2) + "";
      let amountInEUR =
        (Number(amountInUAH) / Number(eur_uah_buy)).toFixed(6) + "";
      dispatch(setChangeCurrencyAmount(amountInEUR));
    }
  }

  const showExchangeRates = () => {
    console.log('type', type, focused, swapCurrencies);
    if (type === InputTypeEnum.Change && (focused || swapCurrencies)) {
      dispatch(setChangeCurrencyAmount(inputValue));
      dispatchGetCurrencyAmount();
      dispatch(setSwapFalse());
    } else if (type === InputTypeEnum.Get && focused) {
      dispatch(setGetCurrencyAmount(inputValue));
      dispatchChangeCurrencyAmount();
    }
  };

  useEffect(() => {
    showExchangeRates();
  }, [inputValue, getCurrency, changeCurrency]);

  useEffect(() => {
    if (type === InputTypeEnum.Change) {
      showExchangeRates();
    }
    
  }, [chosenCurrency]);

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const currency = event.target.value;
    setChosenCurrency(currency);
    if (type === InputTypeEnum.Change) {
      setFocused(true);
      dispatch(setChangeCurrency(currency));
    } else if (type === InputTypeEnum.Get) {
      dispatch(setFocusTrue());
      dispatch(setGetCurrency(currency));
    }
  };

  return (
    <Grid container className={classes.Inputs}>
      <Box>
        <Typography>{type}</Typography>
        <TextField
          id={`${type}_input`}
          error={error ? true : false}
          value={inputValue}
          variant="outlined"
          onChange={(event) => setInputValue(event.target.value)}
        />
      </Box>
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={handleChange}
          name="age"
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "age" }}
        >
          <option value={type === InputTypeEnum.Get ? "USD" : "UAH"}>
            {type === InputTypeEnum.Get ? "USD" : "UAH"}
          </option>
          <option value={"EUR"}>EUR</option>
          <option value={type === InputTypeEnum.Get ? "UAH" : "USD"}>
            {type === InputTypeEnum.Get ? "UAH" : "USD"}
          </option>
          <option value={"BTC"}>BTC</option>
        </NativeSelect>
      </FormControl>
    </Grid>
  );
};

export default ChangeGetInput;
