import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    inputIcons: {
      cursor: 'pointer',
      border: '1px solid grey',
      borderRadius: '5px'
    },
  }),
  {
    name: "currentValue",
  }
);
