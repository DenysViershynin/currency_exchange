import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Box } from "@material-ui/core";
import { useStyles } from "../../../styles/inputs.styles";
import TextField from "@material-ui/core/TextField";
import { InputTypeEnum } from "../../utilities/enums/enums";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { setGetCurrencyAmount, setGetCurrency, setChangeCurrencyAmount, setChangeCurrency } from '../../../store/exchangeSlice';

interface IChangeGetInput {
  type: string;
}

const ChangeGetInput: React.FC<IChangeGetInput> = ({ type }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chosenCurrency, setChosenCurrency] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState<string>("");

  useEffect(() => {
    if (type === InputTypeEnum.Change) {
      setChosenCurrency("UAH");
    } else if (type === InputTypeEnum.Get) {
      setChosenCurrency("USD");
    }
  }, []);

  const showExchangeRates = () => {
    if (type === InputTypeEnum.Change) {
        dispatch(setChangeCurrency(chosenCurrency));
        dispatch(setChangeCurrencyAmount(inputValue));
        
    } else if(type === InputTypeEnum.Get) {
        dispatch(setGetCurrency(chosenCurrency));
        dispatch(setGetCurrencyAmount(inputValue));
    }
  };

  useEffect(() => {
    showExchangeRates();
  }, [inputValue, chosenCurrency]);

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const currency = event.target.value;
    setChosenCurrency(currency);
  };

  return (
    <Grid container className={classes.Inputs}>
      <Box>
        <Typography>{type}</Typography>
        <TextField
          error={false}
          variant="outlined"
          onChange={(event) => setInputValue(event.target.value)}
          defaultValue={"100.00"}
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
