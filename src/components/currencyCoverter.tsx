import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../styles/CurrencyConverter.styles';


const CurrencyConverter = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.CurrencyConverterWrapper}>
            'Converter'
        </Grid>
    )
}

export default CurrencyConverter;