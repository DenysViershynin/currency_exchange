import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    tableWrapper: {
      width: '900px',
      height: '500px',
      border: '1px solid black',
    },
    editIcon: {
      display: 'none',
      position: "absolute",
      cursor: 'pointer',
      marginLeft: '10px',
      marginTop: '-7px',
    },
  }),
  {
    name: "currencyTable",
  }
);
