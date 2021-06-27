import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Grid } from '@material-ui/core';
import { useStyles } from '../../../styles/currencyConverter.styles';
import ChangeGetInput from './changeGetInput';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { InputTypeEnum } from '../../utilities/enums/enums';
import { ICurrencyExchange } from '../../utilities/interfaces/interfaces';

const CurrencyConverter = () => {
    const classes = useStyles();
    
    const changeCurrency = useSelector((state: ICurrencyExchange) => state.exchange.changeCurrency);
    const changeCurrencyAmount = useSelector((state: ICurrencyExchange) => state.exchange.changeCurrencyAmount);
    const getCurrency = useSelector((state: ICurrencyExchange) => state.exchange.getCurrency);
    const getCurrencyAmount = useSelector((state: ICurrencyExchange) => state.exchange.getCurrencyAmount);

    return (
        <Grid container className={classes.CurrencyConverterWrapper}>
            <ChangeGetInput type={InputTypeEnum.Change} />
            <CompareArrowsIcon fontSize='large' />
            <ChangeGetInput type={InputTypeEnum.Get} />
        </Grid>
    )
}

export default CurrencyConverter;