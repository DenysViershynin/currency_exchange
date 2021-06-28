import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles/header.styles";
import logo from "../components/assets/insart_logo.jpg";

const Header = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" className={classes.headerWrapper}>
      <img src={logo} alt="Logo" width="300px" height="70px" />
      <Typography variant="h5" className={classes.fonts}>Currency Exchange</Typography>
    </Grid>
  );
};

export default Header;
