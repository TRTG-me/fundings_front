import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LineChart from "../charts/line-chart";

interface WebSocketPriceProps {
    coinBin: string; // Название пары, например "BTCUSDT"
    coinHype: string
}

const WebSocketPrice: React.FC<WebSocketPriceProps> = ({ coinBin, coinHype }) => {
    const [binancePriceBid, setBinancePriceBid] = useState<number | null>(null);
    const [binancePriceAsk, setBinancePriceAsk] = useState<number | null>(null);

    const [priceDiffPr, setPriceDiffPr] = useState<number | null>(null);
    const [priceDiffOb, setPriceDiffOb] = useState<number | null>(null);

    const [bestHypeBid, setHypeBestBid] = useState<number | null>(null);
    const [bestHypeAsk, setHypeBestAsk] = useState<number | null>(null);

    const priceColor = priceDiffOb !== null && priceDiffOb > 0 ? 'green' : 'red';
    const color = (price: number) => {
        if (price >= 8) return '#A9FFA7';
        if (price >= 3) return 'white';
        return '#FFA7A7';
    };

    useEffect(() => {
        // Binance WebSocket
        const binanceWs = new WebSocket(`wss://fstream.binance.com/ws/${coinBin.toLowerCase()}@depth`);

        binanceWs.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (
                data &&
                Array.isArray(data.b) &&
                data.b.length > 3 &&
                Array.isArray(data.a) &&
                data.a.length > 3
            ) {

                // Убираем элементы с amount === 0 из bid
                let bidPrice = data.b[data.b.length - 1][0]; // Последний элемент
                if (parseFloat(data.b[data.b.length - 1][1]) === 0 && data.b.length > 1) {
                    bidPrice = data.b[data.b.length - 2][0]; // Предпоследний элемент, если последний нулевой
                }

                // Убираем элементы с amount === 0 из ask
                let askPrice = data.a[0][0]; // Первый элемент
                if (parseFloat(data.a[0][1]) === 0 && data.a.length > 1) {
                    askPrice = data.a[1][0]; // Второй элемент, если первый нулевой
                }
                setBinancePriceBid(parseFloat(bidPrice));
                setBinancePriceAsk(parseFloat(askPrice));
            } else {
                console.log("error");
            }
        }
        // HyperLiquid WebSocket
        const ws = new WebSocket(`wss://api.hyperliquid.xyz/ws`);

        ws.onopen = () => {
            // Подписываемся на канал l2Book для указанной монеты (фьючерсной пары)
            const message = {
                method: 'subscribe',
                subscription: {
                    type: 'l2Book',   // Книга ордеров второго уровня
                    coin: coinHype   // Указываем нужную фьючерсную пару (например, 'BTCUSDT')
                }
            };
            ws.send(JSON.stringify(message));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data?.channel === 'l2Book' && data?.data) {
                const { levels } = data.data;

                if (levels) {
                    setHypeBestBid(levels[0][0]?.px);  // Лучшая цена на покупку (bid)
                    setHypeBestAsk(levels[1][0]?.px);  // Лучшая цена на продажу (ask)

                }
            }
        };

        // Закрываем соединение при уходе со страницы
        return () => {
            binanceWs.close();
            ws.close();
        };
    }, [coinBin, coinHype]) //coinHype]);

    // Вычисляем разницу в цене
    useEffect(() => {
        if (binancePriceAsk !== null && bestHypeBid !== null) {
            setPriceDiffPr(((bestHypeBid - binancePriceAsk) / bestHypeBid) * 10000);
        }
    }, [binancePriceAsk, bestHypeBid]);
    useEffect(() => {
        if (binancePriceBid !== null && bestHypeAsk !== null) {
            setPriceDiffOb((binancePriceBid - bestHypeAsk) / binancePriceBid * 10000);
        }
    }, [binancePriceBid, bestHypeAsk]);

    return (
        <Grid2 container spacing={5}>
            <Grid2 size={{ xs: 12 }}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6">Bin Ask: {"\u00A0"}{binancePriceAsk ?? "Загрузка..."}</Typography>
                    <Typography variant="h6">Hype Bid: {"\u00A0"}{bestHypeBid ?? "Загрузка..."}</Typography>
                    <Typography variant="h3">OPEN: {"\u00A0"}
                        <span style={{ color: color(priceDiffPr ? priceDiffPr : 0) }}>
                            {priceDiffPr !== null ? priceDiffPr.toFixed(2) : "Ожидание..."}
                        </span>
                        {" bp"}</Typography>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 9 }}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6">Hype Ask: {"\u00A0"}{bestHypeAsk ?? "Загрузка..."}</Typography>
                    <Typography variant="h6">Bin Bid: {"\u00A0"}{binancePriceBid ?? "Загрузка..."}</Typography>
                    <Typography variant="h3">CLOSE: {"\u00A0"}
                        <span style={{ color: color(priceDiffOb ? priceDiffOb : 0) }}>
                            {priceDiffOb !== null ? priceDiffOb.toFixed(2) : "Ожидание..."}
                        </span>
                        {" bp"}</Typography>
                </Box>
            </Grid2>

        </Grid2>
    );
};

export default WebSocketPrice;
