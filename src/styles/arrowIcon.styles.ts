import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    arrowIcon: {
      color: '#e9e9e9',
      boxShadow: '5px 10px 20px #10171e',
      cursor: 'pointer',
      margin: '5px',
    },
  }),
  {
    name: "arrowIcon",
  }
);
