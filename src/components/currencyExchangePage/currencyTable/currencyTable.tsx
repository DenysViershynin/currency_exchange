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
import { ICurrencyTableData } from '../../utilities/interfaces/interfaces';
import {
  setUSD_buy,
  setUSD_sell,
  setEUR_buy,
  setEUR_sell,
  setBTC_buy,
  setBTC_sell,
} from "../../../store/currencySlice";
import { Typography } from "@material-ui/core";

interface ICurrencyTable {
  currencyTableDataModified: ICurrencyTableData;
  currencyTableDataOriginal: ICurrencyTableData;
}

const CurrencyTable: React.FC<ICurrencyTable> = ({ currencyTableDataModified, currencyTableDataOriginal }) => {
  const {
    modified_usd_uah_buy,
    modified_usd_uah_sell,
    modified_eur_uah_buy,
    modified_eur_uah_sell,
    modified_btc_usd_buy,
    modified_btc_usd_sell,
  } = currencyTableDataModified;

  const {
    usd_uah_buy,
    usd_uah_sell,
    eur_uah_buy,
    eur_uah_sell,
    btc_usd_buy,
    btc_usd_sell,
  } = currencyTableDataOriginal;

  const [showCurrencyInput, setShowCurrencyInput] = useState<string[]>([
    "initial",
  ]);

  const classes = useStyles();

  const showEditableIcon = useCallback((event: Event | undefined): void => {
    if (event) {
      let currentElement = event.target as HTMLElement;
      if (currentElement.tagName === "TD") {
        let editIcon = currentElement.children[1] as HTMLElement;

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
        let editIcon = currentElement.children[1] as HTMLElement;

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
          let editIcon = cellElement.children[1] as HTMLElement;

          if (editIcon) {
            editIcon.style.display = DisplayEditIconEnum.NONE;
          }
        }
        cell.removeEventListener("mouseenter", showEditableIcon, true);
        cell.removeEventListener("mouseleave", hideEditableIcon, true);
      });
    }
  }, [showCurrencyInput, showEditableIcon, hideEditableIcon]);

  const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
  }

  const getCurrenceTableData: () => {
    currency: string;
    buy: string;
    sell: string;
    reducer_buy: (x: string) => void;
    reducer_sell: (x: string) => void;
    originalBuyValue: string,
    originalSellValue: string,
  }[] = () => {
    const createData = (
      currency: string,
      buy: string,
      sell: string,
      reducer_buy: (x: string) => void,
      reducer_sell: (x: string) => void,
      originalBuyValue: string,
      originalSellValue: string,
    ) => {
      return { currency, buy, sell, reducer_buy, reducer_sell, originalBuyValue, originalSellValue };
    };

    const rows = [
      createData("USD/UAH", modified_usd_uah_buy, modified_usd_uah_sell, setUSD_buy, setUSD_sell, usd_uah_buy, usd_uah_sell),
      createData("EUR/UAH", modified_eur_uah_buy, modified_eur_uah_sell, setEUR_buy, setEUR_sell, eur_uah_buy, eur_uah_sell),
      createData("BTC/USD", modified_btc_usd_buy, modified_btc_usd_sell, setBTC_buy, setBTC_sell, btc_usd_buy, btc_usd_sell),
    ];
    return rows;
  };

  return (
    <>
      <TableContainer className={classes.tableWrapper} id="tableWrapper">
        <Table size="medium" aria-label="currency-exchange">
          <TableHead>
            <TableRow>
              <TableCell><Typography className={classes.secondaryFonts}>Currency / {getCurrentDate()}</Typography></TableCell>
              <TableCell><Typography className={classes.secondaryFonts}>Buy</Typography></TableCell>
              <TableCell><Typography className={classes.secondaryFonts}>Sell</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrenceTableData().map((row) => {
              return (
                <TableRow key={row.currency}>
                  <TableCell><Typography className={classes.secondaryFonts}>{row.currency}</Typography></TableCell>
                  <TableCell className="editableCell">
                    <CurrentValue
                      originalValue={row.originalBuyValue}
                      value={row.buy}
                      showCurrencyInput={
                        `${row.currency}_Buy` === showCurrencyInput[0]
                          ? true
                          : false
                      }
                      activateEventListeners={() => {
                        activateListeners();
                      }}
                      reducer={row.reducer_buy}
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
                      originalValue={row.originalSellValue}
                      value={row.sell}
                      showCurrencyInput={
                        `${row.currency}_Sell` === showCurrencyInput[0]
                          ? true
                          : false
                      }
                      activateEventListeners={() => {
                        activateListeners();
                      }}
                      reducer={row.reducer_sell}
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
