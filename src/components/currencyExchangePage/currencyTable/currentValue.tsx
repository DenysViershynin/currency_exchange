import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../../../styles/currentValue.styles";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { setUSD_buy } from "../../../store/currencySlice";

export interface ICurrentValue {
  value: string;
  showCurrencyInput: boolean;
  activateEventListeners: () => void;
  type: string;
}

const CurrentValue: React.FC<ICurrentValue> = ({
  value,
  showCurrencyInput,
  activateEventListeners,
  type,
}) => {
  const dispatch = useDispatch();
  value = value.replace(/0+$/, "");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [disabledConfirmation, setDisabledConfirmation] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  console.log(disabledConfirmation);

  useEffect(() => {
    setShowInput(showCurrencyInput);
  }, [showCurrencyInput]);

  const classes = useStyles();

  useEffect(() => {
    if(Number(inputValue) < Number(value) * 0.9 || Number(inputValue) > Number(value) * 1.1) {
      console.log('error');
      setDisabledConfirmation(true);
    } 
  }, [inputValue])

  const handleConfirmation = () => {
    setShowInput(false);
    activateEventListeners();
    dispatch(setUSD_buy(inputValue));
  };

  const handleCancelation = () => {
    setShowInput(false);
    activateEventListeners();
  };

  const curValue = <Typography>{value}</Typography>;

  const input = (
    <>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(event) => setInputValue(event.target.value)}
        />
      </form>
      <DoneIcon
        className={classes.inputIcons}
        fontSize="large"
        onClick={disabledConfirmation ? () => {} : () => handleConfirmation()}
      />
      <CloseIcon
        className={classes.inputIcons}
        fontSize="large"
        onClick={() => handleCancelation()}
      />
    </>
  );

  let result: JSX.Element;
  showInput ? (result = input) : (result = curValue);

  return (
    <Grid container direction="row">
      {result}
    </Grid>
  );
};

export default CurrentValue;
