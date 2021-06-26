import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    CurrencyConverterWrapper: {
      display: 'flex',
      height: "200px",
      width: '600px',
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid black",
    },
  }),
  {
    name: "CurrencyConverter",
  }
);
