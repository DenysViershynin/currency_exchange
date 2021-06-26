import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    headerWrapper: {
      display: "flex",
      height: "100px",
      justifyContent: "space-around",
      alignItems: "center",
      border: "1px solid black",
    },
  }),
  {
    name: "header",
  }
);
