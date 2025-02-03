import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { getFavoriteAssets, getTopPriceData } from "../../store/thunks/assets";
import { Box, Grid2, TextField, Typography } from "@mui/material";
import { useStyles } from "./styles";
import AreaChart from "../../components/charts/area-chart";
import TrendUp from '../../assets/images/chart/trendUp.svg'
import TrendDown from '../../assets/images/chart/trendDown.svg'
import LineChart from "../../components/charts/line-chart";
import TopPriceComponent from "../../components/top-price";
import AppLoadingButton from "../../components/loading-button";
import { deleteBD, fundingsRefresh, fundingsStartBD, getSettings } from "../../store/thunks/fundings";
import { IRefreshFundings } from "../../common/types/fundings";
import { ISingleCoin } from "../../common/types/assets";


const Home: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const fetchDataRef = useRef(false)
    const fundingData = useAppSelector((state) => state.fundings.fundings);
    const loading = useAppSelector((state) => state.fundings.isLoading);
    const settings = useAppSelector((state) => state.fundings.settings);
    const labels = ["1Day", "3Days", "7Days", "14Days", "30Days", "60Days"];

    useEffect(() => {
        if (fetchDataRef.current || fundingData[1].length > 0) { return }
        fetchDataRef.current = true
        dispatch(fundingsStartBD())
    }, [dispatch])

    useEffect(() => {
        dispatch(getSettings())
    }, [dispatch])


    const [formValues, setFormValues] = useState<{ [key: string]: string }>({});


    useEffect(() => {
        if (settings.length > 0) {
            const newValues = labels.reduce((acc, label, index) => {
                acc[label] = String(settings[index]?.value || ""); // Берем данные из settings
                return acc;
            }, {} as { [key: string]: string });

            setFormValues(newValues);
        }
    }, [settings]);

    const handleInputChange = (label: string, value: string) => {
        setFormValues((prev) => ({
            ...prev,
            [label]: value
        }));
    }
    const handleUpdate = () => {
        const updatedSettings = labels.map((label) => ({
            key: label,
            value: formValues[label] || "0", // Отправляем значение или 0, если пусто
        }));
        const days = 60
        const data = { days, updatedSettings }
        dispatch(fundingsRefresh(data));
    };

    const handleClick = () => {
        dispatch(deleteBD()); // Отправляем запрос через Thunk
    }

    return (
        <Box className={classes.root}>
            <Typography variant='h2' sx={{ textAlign: 'center', marginBottom: '32px' }}>
                Best COINS
            </Typography>

            <Grid2 container className={classes.topPriceRoot}>

                <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>

                    <TopPriceComponent coins={fundingData[0]} GoodBad={fundingData[1]} />


                </Grid2>
            </Grid2>

            <Grid2
                component="form"
                noValidate
                autoComplete='off'
                className={classes.rootFields}
            //onSubmit={handleSubmit}
            >
                <Box className={classes.formWrapper}>
                    {labels.map((label, index) => (
                        <TextField
                            key={label}
                            className={classes.inputField}
                            type="text"
                            label={label}
                            variant="outlined"
                            value={formValues[label] || ""} // Если пусто, показываем label
                            onChange={(e) => handleInputChange(label, e.target.value)}

                        />
                    ))}
                </Box>

            </Grid2>
            {/* <Box className={classes.buttonBlock}>
                <AppLoadingButton type='submit' onClick={handleClick}>Удалить БД</AppLoadingButton>
            </Box> */}
            <Box className={classes.buttonBlock}>
                <AppLoadingButton loading={loading} type='submit' onClick={handleUpdate}>Обновить </AppLoadingButton>
            </Box>


        </Box>


    );
};
export default Home;