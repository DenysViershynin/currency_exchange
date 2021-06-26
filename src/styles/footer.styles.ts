import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    footerWrapper: {
      height: "100px",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid black",
    },
  }),
  {
    name: "footer",
  }
);
