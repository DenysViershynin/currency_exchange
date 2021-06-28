import { makeStyles } from "@material-ui/core";
import { Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    Inputs: {
      display: 'flex',
      height: "100px",
      width: '400px',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#1d2733',
      borderRadius: '6px',
      boxShadow:' 5px 10px 20px #10171e',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    fonts: {
      color: '#e9e9e9',
    },
    root: {
      '& > *': {
        color: '#e9e9e9',
        backgroundColor: '#151e27',
      },
    },
    icon: {
      '& > *': {
        color: '#5b54b2',
        backgroundColor: '#151e27',
        fontWeight: 'bold',
      },
    },
  }),
  {
    name: "Inputs",
  }
);
