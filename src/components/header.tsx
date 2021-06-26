import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../styles/header.styles';

const Header = () => {
    const classes = useStyles();
    return (
        <Grid container direction="row" className={classes.headerWrapper}>
            'Logo'
            <Typography>Currency Exchange</Typography>
        </Grid>
    )
}

export default Header;