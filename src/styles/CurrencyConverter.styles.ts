import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    CurrencyConverterWrapper: {
      display: 'flex',
      height: "fit-content",
      width: 'fit-content',
      justifyContent: "center",
      alignItems: "center",
    },
    
  }),
  {
    name: "CurrencyConverter",
  }
);
