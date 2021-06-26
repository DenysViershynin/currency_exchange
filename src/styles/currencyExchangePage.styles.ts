import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    currencyExchangePageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: "90vh",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid black",
    },
  }),
  {
    name: "currencyExchangePage",
  }
);
