import { makeStyles } from "@material-ui/core";
import { createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme: Theme) => ({
    Inputs: {
      display: 'flex',
      height: "100px",
      width: '400px',
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid black",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    
  }),
  {
    name: "Inputs",
  }
);
