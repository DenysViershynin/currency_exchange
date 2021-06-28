import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    inputIcons: {
      border: '1px solid #c1c1c1',
      boxShadow: '1px 10px 8px #151e27',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    root: {
      '& > *': {
        color: '#e9e9e9',
        backgroundColor: '#151e27',
      },
    },
    fonts: {
      color: '#e9e9e9',
    },
  }),
  {
    name: "currentValue",
  }
);
