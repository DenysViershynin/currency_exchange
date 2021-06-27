import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    inputIcons: {
      border: '1px solid grey',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  }),
  {
    name: "currentValue",
  }
);
