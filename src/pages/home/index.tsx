import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets, getTopPriceData } from "../../store/thunks/assets";
import { Box, Grid2, Typography } from "@mui/material";
import { useStyles } from "./styles";
import AreaChart from "../../components/charts/area-chart";
import TrendUp from '../../assets/images/chart/trendUp.svg'
import TrendDown from '../../assets/images/chart/trendDown.svg'
import LineChart from "../../components/charts/line-chart";
import TopPriceComponent from "../../components/top-price";
import AppLoadingButton from "../../components/loading-button";
import { deleteBD, fundingsRefresh, fundingsStartBD } from "../../store/thunks/fundings";
import { IRefreshFundings } from "../../common/types/fundings";
import { ISingleCoin } from "../../common/types/assets";


const Home: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const fetchDataRef = useRef(false)
    const fundingData = useAppSelector((state) => state.fundings.fundings);
    const loading = useAppSelector((state) => state.fundings.isLoading);
    const filteredArray: ISingleCoin[] = useMemo(() => {
        const filteredArray1: ISingleCoin[] = fundingData[0].filter(singleCoin =>
            fundingData[1].some(data =>
                data.coin === singleCoin.coin &&
                data.days1goodORbad === "GOOD" &&
                data.days3goodORbad === "GOOD" &&
                data.days7goodORbad === "GOOD"
            )
        );

        return filteredArray1
            .map(element => ({
                coin: element.coin,
                last1Day: element.last1Day,
                last3Days: element.last3Days,
                last7Days: element.last7Days,
                last14Days: element.last14Days,
                last30Days: element.last30Days,
                last60Days: element.last60Days,
            }))
    }, [fundingData]);

    const GoodBadArr = fundingData[1].filter(el =>
        filteredArray.some(element => element.coin === el.coin)
    )


    // const fetchData = useCallback((data: string[]) => {
    //     data.forEach((element: string) => {
    //     })

    // }, [dispatch])

    useEffect(() => {
        if (fetchDataRef.current || fundingData[1].length > 0) { return }
        console.log("render")
        fetchDataRef.current = true
        dispatch(fundingsStartBD())


    }, [dispatch, fundingData])


    const handleClick = () => {
        dispatch(deleteBD()); // Отправляем запрос через Thunk
    };

    const data = {
        days: 60
    }

    const handleClick1 = () => {
        dispatch(fundingsRefresh(data));

    };

    return (
        <Box className={classes.root}>
            <Typography variant='h2' sx={{ textAlign: 'center', marginBottom: '32px' }}>
                Best COINS
            </Typography>

            <Grid2 container className={classes.topPriceRoot}>

                <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>

                    <TopPriceComponent coins={filteredArray} GoodBad={GoodBadArr} />


                </Grid2>
            </Grid2>
            <Box className={classes.buttonBlock}>
                <AppLoadingButton type='submit' onClick={handleClick}>Удалить БД</AppLoadingButton>
            </Box>
            <Box className={classes.buttonBlock}>
                <AppLoadingButton loading={loading} type='submit' onClick={handleClick1}>Обновить </AppLoadingButton>
            </Box>
        </Box>


    );
};
export default Home;