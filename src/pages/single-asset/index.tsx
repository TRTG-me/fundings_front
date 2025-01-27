import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { Alert, AlertColor, Avatar, Box, Button, Grid2, Snackbar, Typography } from '@mui/material'
import { useStyles } from './style'
import TopPriceComponent from '../../components/top-price'
import { addFavorites, deleteFavorites, fundingsStartBD, getFavorites } from '../../store/thunks/fundings'
import LineChart from '../../components/charts/line-chart'
import { getFavoriteAssets } from '../../store/thunks/assets'
import { removeFavoriteLocally, updateFavoritesLocally } from '../../store/slice/fundings'


const SingleAssetPage: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const navigate = useNavigate()
  const { id } = useParams()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const fundingData = useAppSelector((state) => state.fundings.fundings)
  const favorites = useAppSelector((state) => state.fundings.favorites)
  const selectedArr = fundingData?.[0]?.find((el) => el.coin === id) ?? null;
  const arrToLinechart = selectedArr
    ? {
      hours: selectedArr.hours,
      days: selectedArr.days,
      hoursData: selectedArr.hoursDays,
      daysData: selectedArr.dataDays
    } : { hours: [], days: [], hoursData: [], daysData: [] }
  const finalArr = selectedArr
    ? {
      coin: selectedArr.coin,
      last1Day: selectedArr.last1Day,
      last3Days: selectedArr.last3Days,
      last7Days: selectedArr.last7Days,
      last14Days: selectedArr.last14Days,
      last30Days: selectedArr.last30Days,
      last60Days: selectedArr.last60Days,
    } : null

  const GoodBadArr = fundingData[1].filter(el => finalArr && finalArr.coin === el.coin);

  const handleCreateRecord = (key: number) => {
    try {
      if (key === 0) {
        dispatch(addFavorites({ coin: id! }))
        dispatch(updateFavoritesLocally({ coin: id! }))
        setError(false)
        setSeverity('success')
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 2000)
      } else {
        dispatch(deleteFavorites({ coin: id! }))
        dispatch(removeFavoriteLocally({ coin: id! }))
        setError(false)
        setSeverity('success')
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 2000)
      }

    } catch (e) {
    }
  }
  useEffect(() => {
    if (!fundingData[0].length) {
      dispatch(fundingsStartBD())
    }
    dispatch(getFavorites())
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      <Typography variant='h2' style={{ textAlign: "center", marginBottom: 32 }}>{id}</Typography>

      <Grid2 container className={classes.lineChartBlock}>
        <Grid2 size={{ xs: 12, sm: 12, lg: 12 }} style={{ width: "99%" }}>
          <LineChart data={arrToLinechart} />
        </Grid2>

      </Grid2>

      <Grid2 container className={classes.topPriceRoot}>
        <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>
          <TopPriceComponent coins={finalArr ? [finalArr] : []} GoodBad={GoodBadArr} />
        </Grid2>
      </Grid2>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Для кнопки "Назад" слева
          width: '100%',
          gap: 2, // Промежуток между кнопками
          alignItems: 'center', // Центрирование кнопок по вертикали
        }}
      >
        <Button
          color="success"
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // Центрирование внутри этого контейнера
            gap: 2,
            flexGrow: 1, // Чтобы этот контейнер занимал всё пространство и кнопки располагались по центру
          }}
        >
          <Button
            color="success"
            variant="outlined"
            className={classes.cardButton}
            onClick={() => handleCreateRecord(0)}
            disabled={favorites.some(fav => fav.coin === id)}
          >
            Добавить
          </Button>
          <Button
            color="success"
            variant="outlined"
            className={classes.cardButton}
            onClick={() => handleCreateRecord(1)}
            disabled={!favorites.some(fav => fav.coin === id)}
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </Box>
  )

  // const assetsArray: any = useAppSelector(
  //   (state) => state.assets.assets,
  // )
  // const asset = assetsArray.find((element) => element.name === id as string)

  // console.log(asset)
  // return (
  //   <>
  //     {asset && (
  //       <Grid2 container className={classes.root}>
  //         <Grid2 size={{ xs: 12 }} className={classes.assetName}>
  //           <Typography variant='h1'>{asset.name}</Typography>
  //         </Grid2>
  //         <Grid2 size={{ sm: 6, xs: 12 }} className={classes.card}>
  //           <Grid2 className={classes.cardItem}>
  //             <FlexBetween>
  //               <Avatar src={asset.image} className={classes.assetIcon} />
  //               <Typography variant='h2' className={classes.assetSymbol}>{asset.symbol.toUpperCase()}</Typography>
  //             </FlexBetween>
  //           </Grid2>
  //         </Grid2>
  //         <Grid2 size={{ sm: 6, xs: 12 }} className={classes.card}>
  //           <Grid2 className={classes.cardItem}>
  //             <FlexBetween>
  //               <Typography variant='h2' className={classes.cardTitle}>Цена :&nbsp; </Typography>
  //               <Typography variant='h2' className={classes.assetPrice}> $ {asset.current_price}</Typography>
  //             </FlexBetween>
  //           </Grid2>
  //         </Grid2>
  //         <Grid2 size={{ sm: 6, xs: 12 }} className={classes.card}>
  //           <Grid2 container className={classes.cardItem}>
  //             <Typography variant='h2' className={classes.cardTitle}>
  //               Изменение цены :&nbsp;
  //             </Typography>
  //             <Typography
  //               variant="h2"
  //               className={
  //                 asset.price_change_percentage_24h >= 0
  //                   ? `${classes.assetPriceDetail} ${classes.trendUp}`
  //                   : `${classes.assetPriceDetail} ${classes.trendDown}`
  //               }
  //             >
  //               $ {asset.price_change_24h.toFixed(4)}
  //             </Typography>
  //           </Grid2>
  //         </Grid2>
  //         <Grid2 size={{ sm: 6, xs: 12 }} className={classes.card}>
  //           <Grid2 className={classes.cardItem}>
  //             <Typography variant='h2' className={classes.cardTitle}>
  //               Изменение цены % :&nbsp;
  //             </Typography>
  //             <Typography
  //               variant="h2"
  //               className={
  //                 asset.price_change_percentage_24h >= 0
  //                   ? `${classes.assetPriceDetail} ${classes.trendUp}`
  //                   : `${classes.assetPriceDetail} ${classes.trendDown}`
  //               }
  //             >
  //               {asset.price_change_percentage_24h.toFixed(2)}%
  //             </Typography>
  //           </Grid2>
  //         </Grid2>
  //         <Box
  //           sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%' }}
  //         >
  //           <Button
  //             color="success"
  //             variant="outlined"
  //             className={classes.cardButton}
  //             onClick={() => navigate(-1)}
  //           >
  //             Назад
  //           </Button>
  //           <Button
  //             color="success"
  //             variant="outlined"
  //             className={classes.cardButton}
  //             onClick={handleCreateRecord}
  //           >
  //             Добавить в избраное
  //           </Button>
  //         </Box>
  //         <Snackbar open={open} autoHideDuration={6000}>
  //           <Alert severity={severity} sx={{ width: '100%' }}>
  //             {!error ? "Success!" : 'Ooops'}
  //           </Alert>
  //         </Snackbar>
  //       </Grid2>
  //     )}
  //   </>
  // )
}

export default SingleAssetPage