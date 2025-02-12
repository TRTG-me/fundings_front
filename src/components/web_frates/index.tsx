import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface WebSocketPriceProps {
    coinBin: string; // Название пары, например "BTCUSDT"
    coinHype: string;
}

const WebFrates: React.FC<any> = ({ coinBin, coinHype, hours }) => {
    const [binanceFundingRate, setBinanceFundingRate] = useState<string | null>(null);
    const [hyperFundingRate, setHyperFundingRate] = useState<string | null>(null);
    const [hyperOI, setHyperOI] = useState<number | null>(null);

    const colorOi = (el: number, a: number, b: number) => {
        if (el >= a) return '#A9FFA7';
        if (el >= b) return 'white';
        return '#FFA7A7';
    };
    const colorBin = (el: number, a: number, b: number, hours: string) => {
        if (parseFloat(hours) === 4) {
            if (el <= a / 2) return '#A9FFA7';
            if (el > b / 2) return '#FFA7A7';
            return 'white';
        }
        if (el <= a) return '#A9FFA7';
        if (el > b) return '#FFA7A7';
        return 'white';
    };
    // const colorHl = (price: number) => {
    //     const price1 = parseFloat(price)
    //     if (price >= 8) return '#A9FFA7';
    //     if (price >= 3) return 'white';
    //     return '#FFA7A7';
    // };


    useEffect(() => {
        const timer = setTimeout(() => {
            const wsHyper = new WebSocket(`wss://api.hyperliquid.xyz/ws`);
            wsHyper.onopen = () => {
                const message = {
                    method: "subscribe",
                    subscription: {
                        type: "activeAssetCtx",
                        coin: coinHype,
                    },
                };
                wsHyper.send(JSON.stringify(message));
            };

            wsHyper.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data && data?.data?.ctx) {
                    setHyperFundingRate(((data.data.ctx.funding * 100).toFixed(4)));
                    setHyperOI(parseFloat((data.data.ctx.openInterest * data.data.ctx.oraclePx).toFixed(0)))
                }
            };

            wsHyper.onclose = () => {
                console.log("WebSocket closed, reconnecting...");
                setTimeout(() => {
                    wsHyper.close();
                }, 5000);
            };
        }, 1000); // Задержка 1 секунда

        return () => {
            clearTimeout(timer);
        };
    }, [coinBin]);
    useEffect(() => {

        const timer = setTimeout(() => {
            const ws = new WebSocket(`wss://fstream.binance.com/ws/${coinBin.toLowerCase()}@markPrice`);

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data && data.r)
                    setBinanceFundingRate(((data.r * 100).toFixed(4)))
            };

            ws.onclose = () => {
                console.log("WebSocket closed, reconnecting...");
                setTimeout(() => {
                    ws.close();
                }, 5000);
            };
        }, 1000); // Задержка 1 секунда

        return () => {
            clearTimeout(timer);
        };
    }, [coinBin]);

    return (
        <Grid2 container spacing={5} marginBottom={3} paddingLeft={1}>
            <Grid2 size={{ xs: 12, md: 3 }} >
                <Typography variant="h2" style={{ textAlign: "left" }}>
                    {coinHype}{"\u00A0"}
                    <Typography variant="h4" component="span">{hours}h</Typography>
                </Typography>
                <Typography variant='h6' >
                    HL OI: <span style={{ color: colorOi(hyperOI ?? 0, 1000000, 500000) }}> {"\u00A0"}${hyperOI !== null ? hyperOI.toLocaleString("ru-RU") : "Загрузка..."}</span>
                </Typography>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 3 }}  >

                <Typography variant='h5'>HL Rate: <span style={{ color: colorOi(parseFloat(hyperFundingRate ?? "") ?? 0, 0.0025, 0) }}>{"\u00A0\u00A0"}{hyperFundingRate ?? "Загрузка..."}</span>%</Typography>
                <Typography variant='h5'>Bin Rate: <span style={{ color: colorBin(parseFloat(binanceFundingRate ?? "") ?? 0, 0, 0.0200, hours) }}>{"\u00A0"}{binanceFundingRate ?? "Загрузка..."}</span>%</Typography>

            </Grid2></Grid2>)
}
export default WebFrates;

