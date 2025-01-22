import React, { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ISingleAsset } from '../../common/types/assets'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { Alert, AlertColor, Avatar, Box, Button, Grid2, Snackbar, Typography } from '@mui/material'
import FlexBetween from '../../components/Flex-Between/indext'
import { useStyles } from './style'
import { createWatchListRecord } from '../../store/thunks/assets'


const SingleAssetPage: FC = (): JSX.Element => {
const [open, setOpen] = useState(false)
const [error, setError] = useState(false)
const [severity, setSeverity] = useState<AlertColor>('success')
const navigate = useNavigate()
const {id} = useParams()
const classes = useStyles()
const dispatch = useAppDispatch()
const handleCreateRecord = () =>{
      try{const data={
        name: '',
        assetId: ' '
      }
      if (asset) {
       data.name=asset.name
       data.assetId=asset.id
      }
      dispatch(createWatchListRecord(data))
      setError(false)
      setSeverity('success')
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 2000)

      }catch (e){
      setError(true)
      setSeverity('error')
      setOpen(true)    
      setTimeout(() => {
        setOpen(false)
      }, 2000)  
      }
}

 const assetsArray: ISingleAsset[] = useAppSelector(
        (state) => state.assets.assets,
    )
    const asset = assetsArray.find((element) => element.name === id as string)

    console.log(asset)
  return (
    <>
      {asset && (
        <Grid2 container className={classes.root}>
          <Grid2 size={{xs:12}}  className={classes.assetName}>
            <Typography variant='h1'>{asset.name}</Typography>
          </Grid2>
            <Grid2 size={{sm:6, xs:12}}  className={classes.card}>
              <Grid2  className={classes.cardItem}>
            <FlexBetween>
                  <Avatar src={asset.image} className={classes.assetIcon}/>
                  <Typography variant='h2' className={classes.assetSymbol}>{asset.symbol.toUpperCase()}</Typography>
                  </FlexBetween>
                  </Grid2>
            </Grid2>
            <Grid2 size={{sm:6, xs:12}} className={classes.card}>
              <Grid2 className={classes.cardItem}>
              <FlexBetween>
              <Typography variant='h2' className={classes.cardTitle}>Цена :&nbsp; </Typography>
              <Typography variant='h2' className={classes.assetPrice}> $ {asset.current_price}</Typography>
              </FlexBetween>
              </Grid2>
            </Grid2>
            <Grid2 size={{sm:6, xs:12}} className={classes.card}>
              <Grid2 container className={classes.cardItem}>
              <Typography variant='h2' className={classes.cardTitle}> 
                Изменение цены :&nbsp;
                </Typography>
                <Typography
                                variant="h2"
                                className={
                                    asset.price_change_percentage_24h >= 0
                                        ? `${classes.assetPriceDetail} ${classes.trendUp}`
                                        : `${classes.assetPriceDetail} ${classes.trendDown}`
                                }
                            >
                                $ {asset.price_change_24h.toFixed(4)}
                                </Typography>
                </Grid2>
             </Grid2>
            <Grid2 size={{sm:6, xs:12}} className={classes.card}>
              <Grid2 className={classes.cardItem}>
            <Typography variant='h2' className={classes.cardTitle}> 
                Изменение цены % :&nbsp;
              </Typography>
              <Typography
                                variant="h2"
                                className={
                                    asset.price_change_percentage_24h >= 0
                                        ? `${classes.assetPriceDetail} ${classes.trendUp}`
                                        : `${classes.assetPriceDetail} ${classes.trendDown}`
                                }
                            >
                                 {asset.price_change_percentage_24h.toFixed(2)}%
                            </Typography>
              </Grid2>
              </Grid2>
              <Box 
                sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%' }}
>
                        <Button
                            color="success"
                            variant="outlined"
                            className={classes.cardButton}
                            onClick={() => navigate(-1)}
                        >
                            Назад
                        </Button>
                        <Button
                            color="success"
                            variant="outlined"
                            className={classes.cardButton}
                            onClick={handleCreateRecord}
                        >
                            Добавить в избраное
                        </Button>
                    </Box>
                    <Snackbar open={open} autoHideDuration={6000}>
                        <Alert severity={severity} sx={{ width: '100%' }}>
                            {!error ? "Success!" : 'Ooops'}
                        </Alert>
                    </Snackbar>
        </Grid2>
      )}
    </>
  )
}

export default SingleAssetPage