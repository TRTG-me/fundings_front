import React, { FC, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStyles1 } from './style';
import { ISingleCoin, ITableTopCoins } from '../../common/types/assets';
import { Link, useNavigate } from 'react-router-dom';
import { TableSortLabel } from '@mui/material';
import { IAllDataM2 } from '../../common/types/fundings';


const AssetsTableComponent: FC<ITableTopCoins> = ({ coins, GoodBad }): JSX.Element => {

  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  const sortedCoins = [...coins].sort((a, b) => {
    if (!sortColumn) return 0
    if (sortColumn === "coin") {
      return sortDirection === "asc"
        ? a.coin.localeCompare(b.coin)
        : b.coin.localeCompare(a.coin)
    } else {
      const valueA = a[sortColumn as keyof ISingleCoin] as number
      const valueB = b[sortColumn as keyof ISingleCoin] as number

      if (valueA === -777) return 1; // Перемещаем "NO DATA" вниз
      if (valueB === -777) return -1;
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA
    }
  })
  const getGoodBadColor = (coin: string, column: string): string => {
    const match = GoodBad.find(el => el.coin === coin)
    if (match) {
      const dayNumber = column.match(/\d+/)?.[0]; // Это вернет '1', '3', '7', '14', '30', '60'

      if (dayNumber) {
        const goodBadKey = `days${dayNumber}goodORbad` as keyof IAllDataM2;
        if (match[goodBadKey] === 'GOOD') return '#A9FFA7';
        if (match[goodBadKey] === 'BAD') return '#FFA7A7';
      }
    }
    return ''; // Если данных нет для этого coin, то нет окраски
  }
  const classes = useStyles1()
  const navigate = useNavigate()
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 490, overflow: "auto", display: "block" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortColumn === "coin"}
                direction={sortDirection}
                onClick={() => handleSort("coin")}
              >
                Название</TableSortLabel></TableCell>
            {["last1Day", "last3Days", "last7Days", "last14Days", "last30Days", "last60Days"].map((column) => (
              <TableCell key={column} align="right">
                <TableSortLabel
                  active={sortColumn === column}
                  direction={sortDirection}
                  onClick={() => handleSort(column)}
                >
                  {column.replace("last", "")} (%)
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCoins.map((element: ISingleCoin) => (
            <TableRow key={element.coin}>
              <TableCell component="th" scope="row">
                <Link to={`/single/${element.coin}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {element.coin}
                </Link>
              </TableCell>
              {["last1Day", "last3Days", "last7Days", "last14Days", "last30Days", "last60Days"].map((column) => (
                <TableCell key={column} align="right" style={{
                  color: getGoodBadColor(element.coin, column) // Здесь применяем цвет
                }}>
                  {element[column as keyof ISingleCoin] === -777 ? "NO DATA" : element[column as keyof ISingleCoin]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssetsTableComponent;
// className={
//   element.last7Days > 0
//     ? `${classes.priceUp}`
//     : `${classes.priceDown}`}>