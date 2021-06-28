import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    headerWrapper: {
      display: "flex",
      height: "100px",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: '#0a0545',
    },
    fonts: {
      color: '#e9e9e9',
    },
  }),
  {
    name: "header",
  }
);
