import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    currencyExchangePageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: 'fit-content',
      width: 'fit-content',
      justifyContent: "center",
      alignItems: "center",
      margin: '0 auto',
    },
  }),
  {
    name: "currencyExchangePage",
  }
);
