import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  () => ({
    tableWrapper: {
      display: 'flex',
      width: '900px',
      height: '500px',
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
      color: '#749ccc',
    },
    fonts: {
      color: '#e9e9e9',
    }
  }),
  {
    name: "currencyTable",
  }
);
