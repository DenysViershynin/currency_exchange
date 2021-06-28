import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { useStyles } from "../../../styles/CurrencyConverter.styles";
import ChangeGetInput from "./changeGetInput";
import ArrowIconComponent from './arrowIconComponent';
import { InputTypeEnum } from "../../utilities/enums/enums";
import { ICurrencyExchange } from "../../utilities/interfaces/interfaces";
import { ISwapCurrencies } from "../../utilities/interfaces/interfaces";
import { ICurrencyTableData } from "../../utilities/interfaces/interfaces";

interface ICurrencyConverter {
  currencyTableData: ICurrencyTableData;
}

const CurrencyConverter: React.FC<ICurrencyConverter> = ({
  currencyTableData,
}) => {
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
  const swapCurrencies = useSelector((state: ISwapCurrencies) => state.swapCurrencies.swapCurrencies);
  const focusValue = useSelector((state: ISwapCurrencies) => state.swapCurrencies.focus);

  return (
    <Grid container className={classes.CurrencyConverterWrapper}>
      <ChangeGetInput 
        type={InputTypeEnum.Change} 
        changeCurrencyAmount={changeCurrencyAmount}
        getCurrency={getCurrency} 
        currencyTableData={currencyTableData}
        swapCurrencies={swapCurrencies}
        focusValue={focusValue} />
      <ArrowIconComponent changeCurrencyAmount={changeCurrencyAmount} getCurrencyAmount={getCurrencyAmount} />
      <ChangeGetInput 
        type={InputTypeEnum.Get} 
        changeCurrency={changeCurrency}
        getCurrencyAmount={getCurrencyAmount} 
        currencyTableData={currencyTableData} />
    </Grid>
  );
};

export default CurrencyConverter;
