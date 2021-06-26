/* eslint-disable no-restricted-globals */
import React from "react";
import { useEffect, useState, useCallback } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "../../../styles/currencyTable.styles";
import { DisplayEditIconEnum } from "../../utilities/enums";
import EditIconComponent from "./editIcon";
import CurrentValue from "./currentValue";

const CurrencyTable = () => {
  const [showCurrencyInput, setShowCurrencyInput] = useState<string[]>(["initial"]);

  const classes = useStyles();
  const createData = (currency: string, buy: number, sell: number) => {
    return { currency, buy, sell };
  };

  const showEditableIcon = useCallback((event: Event | undefined): void => {
    if (event) {
      let currentElement = event.target as HTMLElement;
      if (currentElement.tagName === "TD") {
        let editIcon = currentElement.children[1].children[0] as HTMLElement;

        if (editIcon) {
          editIcon.style.display = DisplayEditIconEnum.INLINE_BLOCK;
        }
      }
    }
  }, []);

  const hideEditableIcon = useCallback((event: Event | undefined): void => {
    if (event) {
      let currentElement = event.target as HTMLElement;
      if (currentElement.tagName === "TD") {
        let editIcon = currentElement.children[1].children[0] as HTMLElement;

        if (editIcon) {
          editIcon.style.display = DisplayEditIconEnum.NONE;
        }
      }
    }
  }, []);

  const cleanupListeners = useCallback(() => {
    const editableCells = document.querySelectorAll(".editableCell");
    editableCells.forEach((cell) => {
      cell.removeEventListener("mouseenter", showEditableIcon, true);
      cell.removeEventListener("mouseleave", hideEditableIcon, true);
    });
  }, [showEditableIcon, hideEditableIcon]);

  const activateListeners = useCallback(() => {
    const editableCells = document.querySelectorAll(".editableCell");
    editableCells.forEach((cell) => {
      cell.addEventListener("mouseenter", showEditableIcon, true);
      cell.addEventListener("mouseleave", hideEditableIcon, true);
    });
    return cleanupListeners;
  }, [showEditableIcon, hideEditableIcon, cleanupListeners])

  useEffect(() => {
    activateListeners();
  }, [activateListeners]);

  useEffect(() => {
    if(showCurrencyInput[0] !== 'initial') {
      const editableCells = document.querySelectorAll(".editableCell");
      editableCells.forEach((cell) => {
        let cellElement = cell as HTMLElement;
        if (cellElement.tagName === "TD") {
          let editIcon = cellElement.children[1].children[0] as HTMLElement;

          if (editIcon) {
            editIcon.style.display = DisplayEditIconEnum.NONE;
          }
        }
        cell.removeEventListener("mouseenter", showEditableIcon, true);
        cell.removeEventListener("mouseleave", hideEditableIcon, true);
      })
    }
  }, [showCurrencyInput, showEditableIcon, hideEditableIcon]);

  const rows = [
    createData("USD/UAH", 159, 6.0),
    // createData("EUR/UAH", 237, 9.0),
    // createData("BTC/USD", 262, 16.0),
  ];

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
            {rows.map((row) => {
              return (
                <TableRow key={row.currency}>
                  <TableCell>{row.currency}</TableCell>
                  <TableCell className="editableCell">
                    <CurrentValue
                      value={row.buy}
                      showCurrencyInput={
                        `${row.currency}_Buy` === showCurrencyInput[0]
                          ? true
                          : false
                      }
                      type={'buy'}
                      activateEventListeners={() => {activateListeners()}}
                    />
                    <EditIconComponent
                      id={`${row.currency}_Buy`}
                      clicked={(value) => {
                        setShowCurrencyInput([value]);
                      }}
                    />
                  </TableCell>
                  <TableCell className="editableCell">
                    <CurrentValue
                      value={row.sell}
                      showCurrencyInput={
                        `${row.currency}_Sell` === showCurrencyInput[0]
                          ? true
                          : false
                      }
                      type={'sell'}
                      activateEventListeners={() => {activateListeners()}}
                    />
                    <EditIconComponent
                      id={`${row.currency}_Sell`}
                      clicked={(value) => {
                        setShowCurrencyInput([value]);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CurrencyTable;
