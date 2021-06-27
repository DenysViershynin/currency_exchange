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
import { DisplayEditIconEnum } from "../../utilities/enums/enums";
import EditIconComponent from "./editIcon";
import CurrentValue from "./currentValue";
import { ICurrencyTableData } from "../currencyExchangePage";

interface ICurrencyTable {
  currencyTableData: ICurrencyTableData;
}

const CurrencyTable: React.FC<ICurrencyTable> = ({ currencyTableData }) => {
  const {
    usd_uah_buy,
    usd_uah_sell,
    eur_uah_buy,
    eur_uah_sell,
    btc_usd_buy,
    btc_usd_sell,
  } = currencyTableData;

  const [showCurrencyInput, setShowCurrencyInput] = useState<string[]>([
    "initial",
  ]);

  const classes = useStyles();

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
    setShowCurrencyInput(["initial"]);
    return cleanupListeners;
  }, [showEditableIcon, hideEditableIcon, cleanupListeners]);

  useEffect(() => {
    activateListeners();
  }, [activateListeners]);

  useEffect(() => {
    if (showCurrencyInput[0] !== "initial") {
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
      });
    }
  }, [showCurrencyInput, showEditableIcon, hideEditableIcon]);

  const getCurrenceTableData: () => {
    currency: string;
    buy: number;
    sell: number;
  }[] = () => {
    const createData = (currency: string, buy: number, sell: number) => {
      return { currency, buy, sell };
    };

    const rows = [
      createData("USD/UAH", usd_uah_buy, usd_uah_sell),
      createData("EUR/UAH", eur_uah_buy, eur_uah_sell),
      createData("BTC/USD", btc_usd_buy, btc_usd_sell),
    ];
    return rows;
  };

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
            {getCurrenceTableData().map((row) => {
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
                      type={"buy"}
                      activateEventListeners={() => {
                        activateListeners();
                      }}
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
                      type={"sell"}
                      activateEventListeners={() => {
                        activateListeners();
                      }}
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
