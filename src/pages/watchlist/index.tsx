import React, { FC, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { getWatchlistElements } from '../../store/thunks/watchlist'
import { getTopPriceData } from '../../store/thunks/assets'
import AssetsTableComponent from '../../components/assets_table'
import { Grid2, Typography } from '@mui/material'
import { useStyles } from './styles'
import { getFavorites } from '../../store/thunks/fundings'
import { ISingleCoin } from '../../common/types/assets'


const WatchListCOmponent: FC = (): JSX.Element => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.fundings.favorites)

  useEffect(() => {
    dispatch(getFavorites())
  }, [dispatch])

  return (
    <Grid2 className={classes.root}>
      <Grid2 className={classes.watchlistHeading}>
        <Typography variant='h2' className={classes.heading}>
          Favorites
        </Typography>
      </Grid2>
      <Grid2 className={classes.assetsTableBlock}>
        <AssetsTableComponent coins={favorites[0]} GoodBad={favorites[1]} />
      </Grid2>
    </Grid2>


  )
}

export default WatchListCOmponent