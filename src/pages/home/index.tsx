import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets, getTopPriceData } from "../../store/thunks/assets";
import { Box, Grid2 } from "@mui/material";
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
    const favoriteAssetName = useMemo(() => ['bitcoin', 'ethereum'], [])
    const fundingData = useAppSelector((state) => state.fundings.fundings);
    const loading = useAppSelector((state) => state.fundings.isLoading);

    const filteredArray: ISingleCoin[] = useMemo(() => {
        return fundingData[0]
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
    console.log(filteredArray)



    const fetchData = useCallback((data: string[]) => {
        data.forEach((element: string) => {
        })

    }, [dispatch])


    useEffect(() => {
        if (fetchDataRef.current) return
        fetchDataRef.current = true
        dispatch(fundingsStartBD())
        dispatch(getTopPriceData())

    }, [favoriteAssetName, fetchData, dispatch])

    useEffect(() => {
        console.log("fundingData updated:", fundingData[0]);
    }, [fundingData]);

    const handleClick = () => {
        dispatch(deleteBD()); // Отправляем запрос через Thunk
    };

    const data = {
        days: 30
    }

    const handleClick1 = () => {
        dispatch(fundingsRefresh(data));

    };

    // const renderFavoriteBlock = filteredArray.map((element: IChartData) => {
    //     let currentPrice = 0
    //     let changePrice = 0
    //     element.singleAsset.forEach((element: ISingleAsset) => {
    //         currentPrice = element.current_price
    //         changePrice = element.price_change_percentage_24h
    //     })

    //     return (
    //         <Grid2 size={{ xs: 12, sm: 6, lg: 6 }} key={element.name}>
    //             <Grid2 container className={classes.topCardItem}>
    //                 <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
    //                     <h3 className={classes.assetName}>{element.name}</h3>
    //                     <div className={classes.itemDetails}>
    //                         <h3 className={classes.cardPrice}>
    //                             ${currentPrice}
    //                         </h3>
    //                         <Box
    //                             className={
    //                                 changePrice > 0
    //                                     ? `${classes.priceTrend} ${classes.trendUp}`
    //                                     : `${classes.priceTrend} ${classes.trendDown}`
    //                             }
    //                         >
    //                             {changePrice > 0 ? (
    //                                 <img src={TrendUp} alt="TrendUp" />
    //                             ) : (
    //                                 <img src={TrendDown} alt="TrendDown" />
    //                             )}
    //                             <span>{Number(changePrice).toFixed(2)}%</span>
    //                         </Box>
    //                     </div>
    //                 </Grid2>
    //                 <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
    //                     <AreaChart data={element.price_chart_data} />
    //                 </Grid2>
    //             </Grid2>
    //         </Grid2>

    //     )
    // })
    return (
        <Box className={classes.root}>
            {/* <Grid2 container spacing={2} className={classes.areaChart}  >
                {renderFavoriteBlock}
            </Grid2> */}
            {/* <Grid2 container className={classes.lineChartBlock}>
                <Grid2 size={{ xs: 12, sm: 12, lg: 12 }} style={{ width: "99%" }}>
                    {filteredArray.length > 0 && <LineChart data={filteredArray} />}
                </Grid2>

            </Grid2> */}
            <Grid2 container className={classes.topPriceRoot}>
                <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>

                    <TopPriceComponent coins={filteredArray} />
                    {/* {filteredArray.length && (<TopPriceComponent coins={filteredArray} />)} */}

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