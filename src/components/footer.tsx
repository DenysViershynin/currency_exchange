import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../styles/footer.styles';

const Footer = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.footerWrapper}>
            <Typography>2020 all rights reserved</Typography>
        </Grid>
    )
}

export default Footer;