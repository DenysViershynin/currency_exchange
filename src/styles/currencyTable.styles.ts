import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    tableWrapper: {
      display: 'flex',
      maxWidth: '900px',
      height: '350px',
      marginBottom: '50px',
      backgroundColor: '#1d2733',
      borderRadius: '6px',
      boxShadow:' 5px 10px 20px #10171e',
    },
    editIcon: {
      display: 'none',
      position: "absolute",
      cursor: 'pointer',
      marginLeft: '10px',
      marginTop: '-7px',
      color: '#d4d3d3',
    },
    secondaryFonts: {
      color: '#87abd5',
    },
    fonts: {
      color: '#e9e9e9',
    },
    tableCell: {
      maxWidth: '70px',
    },
  }),
  {
    name: "currencyTable",
  }
);
