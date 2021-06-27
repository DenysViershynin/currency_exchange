import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "../../styles/currencyExchangePage.styles";
import CurrencyTable from "./currencyTable/currencyTable";
import CurrencyConverter from "../currencyCoverter";
import { useSelector, useDispatch } from "react-redux";
import { IMainState } from "../utilities/interfaces/interfaces";
import { useEffect } from "react";
import { getData } from '../../store/currencySlice';

export interface ICurrencyTableData {
  [name: string]: string;
}

const CurrencyExchangePage = () => {
  const dispatch = useDispatch();
    
  useEffect(() => {
    console.log("useEffect[]");
    dispatch(getData());
  }, []);

  const usd_uah_buy = useSelector((state: IMainState) => state.main.USD.buy);
  const usd_uah_sell = useSelector((state: IMainState) => state.main.USD.sell);
  const eur_uah_buy = useSelector((state: IMainState) => state.main.EUR.buy);
  const eur_uah_sell = useSelector((state: IMainState) => state.main.EUR.sell);
  const btc_usd_buy = useSelector((state: IMainState) => state.main.BTC.buy);
  const btc_usd_sell = useSelector((state: IMainState) => state.main.BTC.sell);

  const currencyTableData: ICurrencyTableData = {
    usd_uah_buy: usd_uah_buy,
    usd_uah_sell: usd_uah_sell,
    eur_uah_buy: eur_uah_buy,
    eur_uah_sell: eur_uah_sell,
    btc_usd_buy: btc_usd_buy,
    btc_usd_sell: btc_usd_sell,
  };

  const classes = useStyles();

  return (
    <Grid container className={classes.currencyExchangePageWrapper}>
      <CurrencyTable currencyTableData={currencyTableData} />
      <CurrencyConverter />
    </Grid>
  );
};

export default CurrencyExchangePage;
