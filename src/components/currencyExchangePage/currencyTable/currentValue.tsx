import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../../../styles/currentValue.styles";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";

export interface ICurrentValue {
  value: string;
  originalValue: string;
  showCurrencyInput: boolean;
  activateEventListeners: () => void;
  reducer: (val: string) => void;
}

const CurrentValue: React.FC<ICurrentValue> = ({
  value,
  showCurrencyInput,
  activateEventListeners,
  reducer,
  originalValue,
}) => {
  const dispatch = useDispatch();
  value = value.replace(/0+$/, "");

  const [showInput, setShowInput] = useState<boolean>(false);
  const [disabledConfirmation, setDisabledConfirmation] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setShowInput(showCurrencyInput);
  }, [showCurrencyInput]);

  const classes = useStyles();

  useEffect(() => {
    if (
      Number(inputValue) < Number(originalValue) * 0.9 ||
      Number(inputValue) > Number(originalValue) * 1.1 ||
      /[^0-9.]/.test(inputValue)
    ) {
      setDisabledConfirmation(true);
    } else {
      setDisabledConfirmation(false);
    }
  }, [inputValue]);

  const handleConfirmation = () => {
    setShowInput(false);
    activateEventListeners();
    dispatch(reducer(inputValue));
  };

  const handleCancelation = () => {
    setShowInput(false);
    activateEventListeners();
  };

  const curValue = <Typography className={classes.fonts}>{value}</Typography>;

  const input: JSX.Element = (
    <div style={{
      display: 'flex',
    }}>
      <form
        noValidate
        autoComplete="off"
        style={{
          width: "fit-content",
          margin: 0,
        }}
      >
        <TextField
          className={classes.root}
          error={disabledConfirmation ? true : false}
          id="outlined-basic"
          color='primary'
          label={disabledConfirmation ? "Error" : "Editing currency"}
          variant="outlined"
          onChange={(event) => setInputValue(event.target.value)}
          defaultValue={value}
          inputProps={{
            color: '#e9e9e9',
          }}
        />
      </form>
      <DoneIcon
        className={classes.inputIcons}
        fontSize="large"
        onClick={disabledConfirmation ? () => {} : () => handleConfirmation()}
        style={{
          color: "green",
          backgroundColor: disabledConfirmation ? "#151e27" : "#1d2733",
        }}
      />
      <CloseIcon
        className={classes.inputIcons}
        fontSize="large"
        onClick={() => handleCancelation()}
        style={{
          color: "red",
        }}
      />
    </div>
  );

  let result: JSX.Element;
  showInput ? (result = input) : (result = curValue);

  return (
    <Grid
      container
      direction="row"
      style={{
        display: "inline-block",
        width: showInput ? "100%" : "auto",
      }}
    >
      {result}
    </Grid>
  );
};

export default CurrentValue;
