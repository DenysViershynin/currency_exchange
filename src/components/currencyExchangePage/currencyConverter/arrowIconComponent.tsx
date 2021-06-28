import React from "react";
import { useDispatch } from "react-redux";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { setChangeCurrencyAmount } from "../../../store/exchangeSlice";
import { setSwapTrue } from "../../../store/swapCurrenciesSlice";

interface IArrowIconComponent {
  changeCurrencyAmount: string;
  getCurrencyAmount: string;
}

const ArrowIconComponent: React.FC<IArrowIconComponent> = ({
  changeCurrencyAmount,
  getCurrencyAmount,
}) => {
  const dispatch = useDispatch();
  const swapValues = () => {
    console.log("clicked", changeCurrencyAmount, getCurrencyAmount);
    dispatch(setSwapTrue());
    dispatch(setChangeCurrencyAmount(getCurrencyAmount));
  };

  return <CompareArrowsIcon fontSize="large" onClick={() => swapValues()} />;
};

export default ArrowIconComponent;
