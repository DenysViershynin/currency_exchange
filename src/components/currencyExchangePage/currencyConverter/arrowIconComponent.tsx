import React from "react";
import { useDispatch } from "react-redux";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { setChangeCurrencyAmount } from "../../../store/exchangeSlice";
import { setSwapTrue } from "../../../store/swapCurrenciesSlice";
import { useStyles } from "../../../styles/arrowIcon.styles";

interface IArrowIconComponent {
  changeCurrencyAmount: string;
  getCurrencyAmount: string;
}

const ArrowIconComponent: React.FC<IArrowIconComponent> = ({
  changeCurrencyAmount,
  getCurrencyAmount,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const swapValues = () => {
    dispatch(setSwapTrue());
    dispatch(setChangeCurrencyAmount(getCurrencyAmount));
  };

  return <CompareArrowsIcon fontSize="large" onClick={() => swapValues()} className={classes.arrowIcon} />;
};

export default ArrowIconComponent;
