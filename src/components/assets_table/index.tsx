import React, { FC } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStyles1 } from './style';
import { ISingleCoin, ITableTopCoins } from '../../common/types/assets';


const AssetsTableComponent: FC<ITableTopCoins> = (props: ITableTopCoins): JSX.Element => {
  const { coins } = props
  const classes = useStyles1()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="right">1DAY (%)</TableCell>
            <TableCell align="right">3DAYS (%)</TableCell>
            <TableCell align="right">7DAYS (%)</TableCell>
            <TableCell align="right">14DAYS (%)</TableCell>
            <TableCell align="right">30DAYS (%)</TableCell>
            <TableCell align="right">60DAYS (%)</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((element: ISingleCoin) => (
            <TableRow
              key={element.coin}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {element.coin}
              </TableCell>
              <TableCell align="right">{element.last1Day < 0 ? "NO DATA" : element.last1Day}</TableCell>

              <TableCell align="right">{element.last3Days < 0 ? "NO DATA" : element.last3Days}</TableCell>
              <TableCell align="right">{element.last7Days < 0 ? "NO DATA" : element.last7Days}</TableCell>
              <TableCell align="right">{element.last14Days < 0 ? "NO DATA" : element.last14Days}</TableCell>
              <TableCell align="right">{element.last30Days < 0 ? "NO DATA" : element.last30Days}</TableCell>
              <TableCell align="right">{element.last60Days < 0 ? "NO DATA" : element.last60Days}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AssetsTableComponent

// className={
//   element.last7Days > 0
//     ? `${classes.priceUp}`
//     : `${classes.priceDown}`}>