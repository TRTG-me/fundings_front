import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { Alert, AlertColor, Avatar, Box, Button, Grid2, Snackbar, Typography } from '@mui/material'
import { useStyles } from './style'
import TopPriceComponent from '../../components/top-price'
import { addFavorites, deleteFavorites, fundingsStartBD, getFavorites, getSingle } from '../../store/thunks/fundings'
import LineChart from '../../components/charts/line-chart'
import WebSocketPrice from '../../components/websocket'
import WebFrates from '../../components/web_frates'

const SingleAssetPage: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const navigate = useNavigate()
  const { id } = useParams()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const fundingData = useAppSelector((state) => state.fundings.single)
  const favorites = useAppSelector((state) => state.fundings.favorites)
  const coins = useAppSelector((state) => state.fundings.coins);

  const coinsArr = coins.length ? coins.find(el => el[1] === id) : null;
  const bin = coinsArr ? coinsArr[0] : null;
  const hour = coinsArr ? coinsArr[2] : null;


  const arrToLinechart = fundingData[0][0]
    ? {
      hours: fundingData[0][0].hours,
      days: fundingData[0][0].days,
      hoursData: fundingData[0][0].hoursDays,
      daysData: fundingData[0][0].dataDays
    } : { hours: [], days: [], hoursData: [], daysData: [] }
  const finalArr = fundingData[0][0]
    ? {
      coin: fundingData[0][0].coin,
      last1Day: fundingData[0][0].last1Day,
      last3Days: fundingData[0][0].last3Days,
      last7Days: fundingData[0][0].last7Days,
      last14Days: fundingData[0][0].last14Days,
      last30Days: fundingData[0][0].last30Days,
      last60Days: fundingData[0][0].last60Days,
    } : null



  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {

    setIsFavorite(favorites[0].some(fav => fav.coin === id));
  }, [favorites, id]);

  const handleCreateRecord = (key: number) => {
    try {
      if (key === 0) {
        dispatch(addFavorites({ coin: id! }))
        setIsFavorite(true)
        setError(false)
        setSeverity('success')
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 2000)
      } else {
        setIsFavorite(false)
        dispatch(deleteFavorites({ coin: id! }))

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
    if (!fundingData?.[0]?.length || fundingData[0][0]?.coin !== id) {

      dispatch(getSingle({ coin: id! }));
    }
  }, [dispatch, id, fundingData]);
  return (
    <Grid2 className={classes.root}>

      <WebFrates coinBin={bin ?? ""} coinHype={id ?? ""} hours={hour ?? ""} />

      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 3 }} className={classes.bidask}>
          {bin && id && <WebSocketPrice coinBin={bin} coinHype={id} />}
        </Grid2>

        <Grid2 size={{ xs: 12, md: 9 }} className={classes.lineChartBlock}>
          <LineChart data={arrToLinechart} />
        </Grid2>
      </Grid2>


      <Grid2 container className={classes.topPriceRoot}>
        <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>

          <TopPriceComponent coins={finalArr ? [finalArr] : []} GoodBad={fundingData[1]} />
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
            disabled={isFavorite}
          >
            Добавить
          </Button>
          <Button
            color="success"
            variant="outlined"
            className={classes.cardButton}
            onClick={() => handleCreateRecord(1)}
            disabled={!isFavorite}
          >
            Удалить
          </Button>
        </Box>

      </Box>

    </Grid2>
  )


}

export default SingleAssetPage