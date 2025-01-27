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
  const fundings = useAppSelector(state => state.fundings.fundings)



  const filteredArray: ISingleCoin[] = useMemo(() => {
    if (!fundings.length || !favorites.length) return [];
    return fundings[0]
      .filter(element => favorites.some(fav => fav.coin === element.coin))
      .map(element => ({
        coin: element.coin,
        last1Day: element.last1Day,
        last3Days: element.last3Days,
        last7Days: element.last7Days,
        last14Days: element.last14Days,
        last30Days: element.last30Days,
        last60Days: element.last60Days,
      }))
  }, [fundings, favorites]);

  const GoodBadArr = fundings[1].filter(el =>
    filteredArray.some(element => element.coin === el.coin)
  )

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
        <AssetsTableComponent coins={filteredArray} GoodBad={GoodBadArr} />
      </Grid2>
    </Grid2>


  )
}

export default WatchListCOmponent