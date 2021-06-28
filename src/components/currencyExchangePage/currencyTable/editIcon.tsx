import React from "react";
import { useStyles } from "../../../styles/currencyTable.styles";
import EditIcon from "@material-ui/icons/Edit";

export interface IEditIconComponent {
  clicked: (value: string) => void;
  id: string;
}

const EditIconComponent: React.FC<IEditIconComponent> = ({ clicked, id }) => {
  const classes = useStyles();

  return (
    <EditIcon
      className={classes.editIcon}
      onClick={() => {
        clicked(id);
      }}
    />
  );
};

export default EditIconComponent;
