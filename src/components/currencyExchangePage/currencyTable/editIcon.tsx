import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/currencyTable';
import EditIcon from "@material-ui/icons/Edit";

const EditIconComponent = () => {
    const classes = useStyles();
    return (
        <Grid container onClick={() => {console.log(5)}}>
            <EditIcon className={classes.editIcon} />
        </Grid>
    )
}

export default EditIconComponent;