import React from "react";
import { Grid } from '@material-ui/core';
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import CurrencyExchangePage from "./components/currencyExchangePage/currencyExchangePage";

function App() {
  return (
    <Grid container className="App">
      <Header />
      <CurrencyExchangePage/>
      <Footer/>
    </Grid>
  );
}

export default App;
