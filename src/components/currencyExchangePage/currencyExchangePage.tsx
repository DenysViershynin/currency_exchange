import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "../../styles/currencyExchangePage.styles";
import CurrencyTable from "./currencyTable/currencyTable";
import CurrencyConverter from "./currencyConverter/currencyCoverter";
import { useSelector, useDispatch } from "react-redux";
import { IMainState } from "../utilities/interfaces/interfaces";
import { useEffect } from "react";
import { getData } from "../../store/currencySlice";
import { ICurrencyTableData } from "../utilities/interfaces/interfaces";
import { Alert, AlertTitle } from "@material-ui/lab";

const CurrencyExchangePage = () => {
  const [errorState, setErrorState] = useState<boolean>(getErrorValue());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  function getErrorValue() {
    const reqCounter = localStorage.getItem("numberOfRequests");
    if (reqCounter && reqCounter === "4") {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if(errorState === true) {
      setTimeout(() => {
        localStorage.clear();
        setErrorState(false);
      }, 2000)
    }
  }, [errorState])

  const usd_uah_buy = useSelector((state: IMainState) => state.main.USD.buy);
  const usd_uah_sell = useSelector((state: IMainState) => state.main.USD.sell);
  const eur_uah_buy = useSelector((state: IMainState) => state.main.EUR.buy);
  const eur_uah_sell = useSelector((state: IMainState) => state.main.EUR.sell);
  const btc_usd_buy = useSelector((state: IMainState) => state.main.BTC.buy);
  const btc_usd_sell = useSelector((state: IMainState) => state.main.BTC.sell);

  const currencyTableDataOriginal: ICurrencyTableData = {
    usd_uah_buy: usd_uah_buy,
    usd_uah_sell: usd_uah_sell,
    eur_uah_buy: eur_uah_buy,
    eur_uah_sell: eur_uah_sell,
    btc_usd_buy: btc_usd_buy,
    btc_usd_sell: btc_usd_sell,
  };

  const modified_usd_uah_buy = useSelector(
    (state: IMainState) => state.main.USD.usersModifiedBuy
  );
  const modified_usd_uah_sell = useSelector(
    (state: IMainState) => state.main.USD.usersModifiedSell
  );
  const modified_eur_uah_buy = useSelector(
    (state: IMainState) => state.main.EUR.usersModifiedBuy
  );
  const modified_eur_uah_sell = useSelector(
    (state: IMainState) => state.main.EUR.usersModifiedSell
  );
  const modified_btc_usd_buy = useSelector(
    (state: IMainState) => state.main.BTC.usersModifiedBuy
  );
  const modified_btc_usd_sell = useSelector(
    (state: IMainState) => state.main.BTC.usersModifiedSell
  );

  const currencyTableDataModified: ICurrencyTableData = {
    modified_usd_uah_buy: modified_usd_uah_buy,
    modified_usd_uah_sell: modified_usd_uah_sell,
    modified_eur_uah_buy: modified_eur_uah_buy,
    modified_eur_uah_sell: modified_eur_uah_sell,
    modified_btc_usd_buy: modified_btc_usd_buy,
    modified_btc_usd_sell: modified_btc_usd_sell,
  };

  const classes = useStyles();

  const error: JSX.Element = (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Error alert — <strong>fifth render</strong>
    </Alert>
  );

  return (
    <Grid container className={classes.currencyExchangePageWrapper}>
      {errorState ? (
        error
      ) : (
        <>
          <CurrencyTable
            currencyTableDataModified={currencyTableDataModified}
            currencyTableDataOriginal={currencyTableDataOriginal}
          />
          <CurrencyConverter currencyTableData={currencyTableDataModified} />
        </>
      )}
    </Grid>
  );
};

export default CurrencyExchangePage;
