/* eslint-disable no-restricted-globals */
import React from "react";
import { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "../../../styles/currencyTable";
import { DisplayEditIconEnum } from "../../utilities/enums";
import EditIconComponent from "./editIcon";
import CurrentValue from './currentValue';

const CurrencyTable = () => {
  const classes = useStyles();
  const createData = (currency: string, buy: number, sell: number) => {
    return { currency, buy, sell };
  };

  const rows = [
    createData("USD/UAH", 159, 6.0),
    createData("EUR/UAH", 237, 9.0),
    createData("BTC/USD", 262, 16.0),
  ];

  const showEditableIcon = (event: Event | undefined): void => {
    if (event) {
      let currentElement = event.target as HTMLElement;
      let editIcon = currentElement.children[1].children[0] as HTMLElement;

      if (editIcon) {
        editIcon.style.display = DisplayEditIconEnum.INLINE_BLOCK;
      }
    }
  };

  const hideEditableIcon = (event: Event | undefined): void => {
    if (event) {
      let currentElement = event.target as HTMLElement;
      let editIcon = currentElement.children[1].children[0] as HTMLElement;

      if (editIcon) {
        editIcon.style.display = DisplayEditIconEnum.NONE;
      }
    }
  };

  useEffect(() => {
    const editableCells = document.querySelectorAll(".editableCell");
    editableCells.forEach((cell) => {
      cell.addEventListener("mouseenter", () => showEditableIcon(event), false);
      cell.addEventListener("mouseleave", () => hideEditableIcon(event), false);
    });

    return function cleanup() {
      editableCells.forEach((cell) => {
        cell.removeEventListener(
          "mouseenter",
          () => showEditableIcon(event),
          false
        );
        cell.removeEventListener(
          "mouseleave",
          () => hideEditableIcon(event),
          false
        );
      });
    };
  }, []);

  return (
    <>
      <TableContainer className={classes.tableWrapper} id="tableWrapper">
        <Table size="medium" aria-label="currency-exchange">
          <TableHead>
            <TableRow>
              <TableCell>Currency/Current date</TableCell>
              <TableCell>Buy</TableCell>
              <TableCell>Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.currency}>
                <TableCell>{row.currency}</TableCell>
                <TableCell className="editableCell">
                  <CurrentValue value={row.buy} />
                  <EditIconComponent />
                </TableCell>
                <TableCell className="editableCell">
                  <CurrentValue value={row.sell} />
                  <EditIconComponent />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CurrencyTable;
