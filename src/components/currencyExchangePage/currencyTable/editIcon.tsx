import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "../../../styles/currencyTable.styles";
import EditIcon from "@material-ui/icons/Edit";

export interface IEditIconComponent {
  clicked: (value: string) => void;
  id: string;
}

const EditIconComponent: React.FC<IEditIconComponent> = ({ clicked, id }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      onClick={() => {
        clicked(id);
      }}
    >
      <EditIcon className={classes.editIcon} />
    </Grid>
  );
};

export default EditIconComponent;
