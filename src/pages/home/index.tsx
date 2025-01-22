import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets, getTopPriceData } from "../../store/thunks/assets";
import { Box, Grid2 } from "@mui/material";
import { useStyles } from "./styles";
import AreaChart from "../../components/charts/area-chart";
import TrendUp from '../../assets/images/chart/trendUp.svg'
import TrendDown from '../../assets/images/chart/trendDown.svg'
import LineChart from "../../components/charts/line-chart";
import { IChartData, ISingleAsset } from "../../common/types/assets";
import TopPriceComponent from "../../components/top-price";
import AppLoadingButton from "../../components/loading-button";
import { deleteBD } from "../../store/thunks/fundings";


const Home: FC = (): JSX.Element => {
    const favoriteAssets: IChartData[] = useAppSelector(
        (state) => state.assets.favoriteAssets,
    )
    const assetsArray: ISingleAsset[] = useAppSelector(
        (state) => state.assets.assets,
    )

    const dispatch = useAppDispatch()
    const classes = useStyles()
    const fetchDataRef = useRef(false)
    const favoriteAssetName = useMemo(() => ['bitcoin', 'ethereum'], [])
    const filteredArray: IChartData[] = useMemo(() => {
        return favoriteAssetName
            .map(name => favoriteAssets.find(asset => asset.name === name)) // Ищем по имени
            .filter((asset): asset is IChartData => Boolean(asset)) // Убираем undefined
            .filter(
                (value, index, self) => index === self.findIndex(t => t.name === value.name)
            )
    }, [favoriteAssets]);

    const filteredAssetArray = assetsArray
        .slice()
        .sort((a, b) => b.current_price - a.current_price)


    const fetchData = useCallback((data: string[]) => {
        data.forEach((element: string) => {

            dispatch(getFavoriteAssets(element))
        })

    }, [dispatch])


    useEffect(() => {
        if (fetchDataRef.current) return
        fetchDataRef.current = true

        fetchData(favoriteAssetName)
        dispatch(getTopPriceData())
    }, [favoriteAssetName, fetchData, dispatch])
    const handleClick = () => {
        dispatch(deleteBD()); // Отправляем запрос через Thunk
    };

    const renderFavoriteBlock = filteredArray.map((element: IChartData) => {
        let currentPrice = 0
        let changePrice = 0
        element.singleAsset.forEach((element: ISingleAsset) => {
            currentPrice = element.current_price
            changePrice = element.price_change_percentage_24h
        })

        return (
            <Grid2 size={{ xs: 12, sm: 6, lg: 6 }} key={element.name}>
                <Grid2 container className={classes.topCardItem}>
                    <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                        <h3 className={classes.assetName}>{element.name}</h3>
                        <div className={classes.itemDetails}>
                            <h3 className={classes.cardPrice}>
                                ${currentPrice}
                            </h3>
                            <Box
                                className={
                                    changePrice > 0
                                        ? `${classes.priceTrend} ${classes.trendUp}`
                                        : `${classes.priceTrend} ${classes.trendDown}`
                                }
                            >
                                {changePrice > 0 ? (
                                    <img src={TrendUp} alt="TrendUp" />
                                ) : (
                                    <img src={TrendDown} alt="TrendDown" />
                                )}
                                <span>{Number(changePrice).toFixed(2)}%</span>
                            </Box>
                        </div>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                        <AreaChart data={element.price_chart_data} />
                    </Grid2>
                </Grid2>
            </Grid2>

        )
    })
    return (
        <Box className={classes.root}>
            <Grid2 container spacing={2} className={classes.areaChart}  >
                {renderFavoriteBlock}
            </Grid2>
            <Grid2 container className={classes.lineChartBlock}>
                <Grid2 size={{ xs: 12, sm: 12, lg: 12 }} style={{ width: "99%" }}>
                    {filteredArray.length > 0 && <LineChart data={filteredArray} />}
                </Grid2>

            </Grid2>
            <Grid2 container className={classes.topPriceRoot}>
                <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>

                    {filteredAssetArray.length && (<TopPriceComponent assets={filteredAssetArray.slice(0, 6)} />)}

                </Grid2>
            </Grid2>
            <Box className={classes.buttonBlock}>
                <AppLoadingButton type='submit' onClick={handleClick}>Сохранить</AppLoadingButton>
            </Box>
        </Box>


    );
};
export default Home;