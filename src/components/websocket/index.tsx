import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";


interface WebSocketPriceProps {
    coinBin: string; // Название пары, например "BTCUSDT"
    coinHype: string;
}

const WebSocketPrice: React.FC<WebSocketPriceProps> = ({ coinBin, coinHype }) => {
    const [binancePriceBid, setBinancePriceBid] = useState<number | null>(null);
    const [binancePriceAsk, setBinancePriceAsk] = useState<number | null>(null);

    const [priceDiffPr, setPriceDiffPr] = useState<number | null>(null);
    const [priceDiffOb, setPriceDiffOb] = useState<number | null>(null);

    const [bestHypeBid, setHypeBestBid] = useState<number | null>(null);
    const [bestHypeAsk, setHypeBestAsk] = useState<number | null>(null);


    const [orderBook, setOrderBook] = useState<{ bids: [string, string][]; asks: [string, string][] }>({
        bids: [],
        asks: [],
    });

    const priceColor = priceDiffOb !== null && priceDiffOb > 0 ? 'green' : 'red';
    const color = (price: number) => {
        if (price >= 8) return '#A9FFA7';
        if (price >= 3) return 'white';
        return '#FFA7A7';
    };

    // Шаг 1: Получение снимка стакана через REST API

    const fetchSnapshot = async () => {
        try {
            const response = await axios.get(`https://fapi.binance.com/fapi/v1/depth`, {
                params: { symbol: coinBin, limit: 50 }, // Получаем 1000 уровней стакана
            });
            setOrderBook({
                bids: response.data.bids,
                asks: response.data.asks,
            });
            // Устанавливаем лучшие цены bid и ask из снимка
            if (response.data.bids.length > 0) {
                setBinancePriceBid(coinBin === "NEIROUSDT" ? parseFloat((response.data.bids[0][0] * 1000).toFixed(5)) : parseFloat(response.data.bids[0][0]));
            }
            if (response.data.asks.length > 0) {
                setBinancePriceAsk(coinBin === "NEIROUSDT" ? parseFloat((response.data.asks[0][0] * 1000).toFixed(5)) : parseFloat(response.data.asks[0][0]));
            }
        } catch (error) {
            console.error("Ошибка при получении снимка стакана:", error);
        }
    };

    useEffect(() => {
        fetchSnapshot();

        // Периодический опрос REST API для синхронизации стакана
        const syncInterval = setInterval(fetchSnapshot, 60000); // Синхронизация каждую минуту

        return () => {
            clearInterval(syncInterval); // Очистка интервала при размонтировании
        };
    }, [coinBin]);

    // Шаг 2: Подписка на WebSocket для получения обновлений
    useEffect(() => {

        const timer = setTimeout(() => {
            const ws = new WebSocket(`wss://fstream.binance.com/ws/${coinBin.toLowerCase()}@depth`);

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                // Шаг 3: Применение обновлений к локальному стакану
                setOrderBook((prev) => {

                    const newBids = [...prev.bids];
                    const newAsks = [...prev.asks];
                    const maxSize = 10; // Ограничиваем стакан 10 уровнями
                    newBids.splice(maxSize);
                    newAsks.splice(maxSize);

                    // Обновляем bids (ордера на покупку)
                    data.b.forEach(([price, quantity]: [string, string]) => {
                        const index = newBids.findIndex((bid) => bid[0] === price);

                        // Если количество равно 0, удаляем ордер
                        if (parseFloat(quantity) === 0) {
                            if (index !== -1) newBids.splice(index, 1);
                        } else {
                            // Если ордер уже существует, обновляем его
                            if (index !== -1) newBids[index] = [price, quantity];
                            // Если ордера нет, добавляем его
                            else newBids.push([price, quantity]);
                        }
                    });

                    // Обновляем asks (ордера на продажу)
                    data.a.forEach(([price, quantity]: [string, string]) => {
                        const index = newAsks.findIndex((ask) => ask[0] === price);

                        // Если количество равно 0, удаляем ордер
                        if (parseFloat(quantity) === 0) {
                            if (index !== -1) newAsks.splice(index, 1);
                        } else {
                            // Если ордер уже существует, обновляем его
                            if (index !== -1) newAsks[index] = [price, quantity];
                            // Если ордера нет, добавляем его
                            else newAsks.push([price, quantity]);
                        }
                    });

                    // Сортируем bids по убыванию цены, asks по возрастанию цены
                    newBids.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
                    newAsks.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));

                    // Устанавливаем лучшие цены bid и ask

                    if (newBids.length > 0) {
                        setBinancePriceBid(coinBin === "NEIROUSDT" ? parseFloat((parseFloat(newBids[0][0]) * 1000).toFixed(5)) : parseFloat(newBids[0][0]));
                    }
                    if (newAsks.length > 0) {
                        setBinancePriceAsk(coinBin === "NEIROUSDT" ? parseFloat((parseFloat(newAsks[0][0]) * 1000).toFixed(5)) : parseFloat(newAsks[0][0]));
                    }

                    return { bids: newBids, asks: newAsks };
                });
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
    // HyperLiquid WebSocket

    useEffect(() => {
        const timer = setTimeout(() => {
            const ws = new WebSocket(`wss://api.hyperliquid.xyz/ws`);

            ws.onopen = () => {
                const message = {
                    method: 'subscribe',
                    subscription: {
                        type: 'l2Book',
                        coin: coinHype,
                    },
                };
                ws.send(JSON.stringify(message));
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data?.channel === 'l2Book' && data?.data) {
                    const { levels } = data.data;

                    if (levels) {
                        setHypeBestBid(levels[0][0]?.px); // Лучшая цена на покупку (bid)
                        setHypeBestAsk(levels[1][0]?.px); // Лучшая цена на продажу (ask)
                    }
                }
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
    }, [coinHype]);

    // Вычисляем разницу в цене
    useEffect(() => {
        if (binancePriceAsk !== null && bestHypeBid !== null) {
            setPriceDiffPr(((bestHypeBid - binancePriceAsk) / bestHypeBid) * 10000);
        }
    }, [binancePriceAsk, bestHypeBid]);

    useEffect(() => {
        if (binancePriceBid !== null && bestHypeAsk !== null) {
            setPriceDiffOb(((binancePriceBid - bestHypeAsk) / binancePriceBid) * 10000);
        }
    }, [binancePriceBid, bestHypeAsk]);

    return (
        <Grid2 container spacing={5}>
            <Grid2 size={{ xs: 12 }}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6">Bin Ask: {"\u00A0"}{binancePriceAsk ?? "Загрузка..."}</Typography>
                    <Typography variant="h6">Hype Bid: {"\u00A0"}{bestHypeBid ?? "Загрузка..."}</Typography>
                    <Typography variant="h3" sx={{ whiteSpace: "nowrap" }}>OPEN: {"\u00A0"}
                        <span style={{ color: color(priceDiffPr ? priceDiffPr : 0) }}>
                            {priceDiffPr !== null ? priceDiffPr.toFixed(2) : "Загрузка..."}
                        </span>
                        {" bp"}</Typography>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 9 }}>
                <Box display="flex" flexDirection="column">
                    <Typography variant="h6">Hype Ask: {"\u00A0"}{bestHypeAsk ?? "Загрузка..."}</Typography>
                    <Typography variant="h6">Bin Bid: {"\u00A0"}{binancePriceBid ?? "Загрузка..."}</Typography>
                    <Typography variant="h3" sx={{ whiteSpace: "nowrap" }}>CLOSE: {"\u00A0"}
                        <span style={{ color: color(priceDiffOb ? priceDiffOb : 0) }}>
                            {priceDiffOb !== null ? priceDiffOb.toFixed(2) : "Загрузка..."}
                        </span>
                        {" bp"}</Typography>
                </Box>
            </Grid2>

        </Grid2>
    );
};

export default WebSocketPrice;
