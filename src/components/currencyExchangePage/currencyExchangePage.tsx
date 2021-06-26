import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../styles/currencyExchangePage.styles';
import CurrencyTable from './currencyTable/currencyTable';
import CurrencyConverter from '../currencyCoverter';

const CurrencyExchangePage = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.currencyExchangePageWrapper}>
            <CurrencyTable/>
            <CurrencyConverter/>
        </Grid>
    )
}

export default CurrencyExchangePage;