import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { useStyles } from "../../../styles/currencyConverter.styles";
import ChangeGetInput from "./changeGetInput";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { InputTypeEnum } from "../../utilities/enums/enums";
import { ICurrencyExchange } from "../../utilities/interfaces/interfaces";
import { ICurrencyTableData } from "../../utilities/interfaces/interfaces";

interface ICurrencyConverter {
  currencyTableData: ICurrencyTableData;
}

const CurrencyConverter: React.FC<ICurrencyConverter> = ({
  currencyTableData,
}) => {
  const {
    usd_uah_buy,
    usd_uah_sell,
    eur_uah_buy,
    eur_uah_sell,
    btc_usd_buy,
    btc_usd_sell,
  } = currencyTableData;

  const [currenciesRates, setCurrenciesRates] =
    useState<ICurrencyTableData>(currencyTableData);

  useEffect(() => {
    setCurrenciesRates(currencyTableData);
  }, [currencyTableData]);

  const classes = useStyles();

  const changeCurrency = useSelector(
    (state: ICurrencyExchange) => state.exchange.changeCurrency
  );
  const changeCurrencyAmount = useSelector(
    (state: ICurrencyExchange) => state.exchange.changeCurrencyAmount
  );
  const getCurrency = useSelector(
    (state: ICurrencyExchange) => state.exchange.getCurrency
  );
  const getCurrencyAmount = useSelector(
    (state: ICurrencyExchange) => state.exchange.getCurrencyAmount
  );

  return (
    <Grid container className={classes.CurrencyConverterWrapper}>
      <ChangeGetInput 
        type={InputTypeEnum.Change} 
        changeCurrencyAmount={changeCurrencyAmount}
        getCurrency={getCurrency} 
        currencyTableData={currencyTableData} />
      <CompareArrowsIcon fontSize="large" />
      <ChangeGetInput 
        type={InputTypeEnum.Get} 
        changeCurrency={changeCurrency}
        getCurrencyAmount={getCurrencyAmount} 
        currencyTableData={currencyTableData} />
    </Grid>
  );
};

export default CurrencyConverter;
