import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    footerWrapper: {
      height: "100px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#222e3c',
    },
    fonts: {
      color: '#e9e9e9',
    },
  }),
  {
    name: "footer",
  }
);
