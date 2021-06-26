import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../../../styles/currentValue.styles";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

export interface ICurrentValue {
  value: number;
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
  const [showInput, setShowInput] = useState<boolean>(false);
  console.log(type, showCurrencyInput);
  useEffect(() => {
    console.log('test');
    setShowInput(showCurrencyInput);
  }, [showCurrencyInput]);

  const classes = useStyles();
 
  const handleConfirmation = () => {
    setShowInput(false)
    console.log('setShowInput(false)');
    activateEventListeners()
  }

  const handleCancelation = () => {
    setShowInput(false)
    console.log('setShowInput(false)');
    activateEventListeners()
  }

  const curValue = <Typography>{value}</Typography>;

  const input = (
    <>
      <form noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
      <DoneIcon className={classes.inputIcons} fontSize="large" onClick={ () => handleConfirmation() } />
      <CloseIcon className={classes.inputIcons} fontSize="large" onClick={ () => handleCancelation() } />
    </>
  );

  return (
    <Grid container direction="row">
      {showInput ? input : curValue}
    </Grid>
  );
};

export default CurrentValue;
