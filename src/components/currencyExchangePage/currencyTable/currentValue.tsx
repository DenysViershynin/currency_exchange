import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../../../styles/header.styles";

export interface ICurrentValue {
  value: number;
}

const CurrentValue: React.FC<ICurrentValue> = ({ value }) => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Typography>{value}</Typography>
    </Grid>
  );
};

export default CurrentValue;
