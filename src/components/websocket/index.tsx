import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";


interface WebSocketPriceProps {
    coinBin: string; // Название пары, например "BTCUSDT"
    coinHype: string;
    setHypeAsk?: React.Dispatch<React.SetStateAction<number | null>>;

}

const WebSocketPrice: React.FC<WebSocketPriceProps> = ({
    coinBin,
    coinHype,
    setHypeAsk, }) => {
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
                params: { symbol: coinBin, limit: 100 },
            });
            const newOrderBook = {
                bids: response.data.bids.slice(0, 40), // Берем только топ-10
                asks: response.data.asks.slice(0, 40),
            };
            setOrderBook(newOrderBook);

            // Устанавливаем начальные цены
            if (newOrderBook.bids.length > 0) {
                const bidPrice = parseFloat(newOrderBook.bids[0][0]);
                setBinancePriceBid(coinBin === "NEIROUSDT" ? parseFloat((bidPrice * 1000).toFixed(5)) : bidPrice);
            } else {
                console.warn("No bids in initial snapshot");
            }
            if (newOrderBook.asks.length > 0) {
                const askPrice = parseFloat(newOrderBook.asks[0][0]);
                setBinancePriceAsk(coinBin === "NEIROUSDT" ? parseFloat((askPrice * 1000).toFixed(5)) : askPrice);
            } else {
                console.warn("No asks in initial snapshot");
            }
        } catch (error) {
            console.error("Ошибка при получении снимка стакана:", error);
        }
    };

    useEffect(() => {
        fetchSnapshot();
        const syncInterval = setInterval(fetchSnapshot, 10000); // Синхронизация каждую минуту
        return () => clearInterval(syncInterval);
    }, [coinBin]);

    // Шаг 2: Подписка на WebSocket для получения обновлений
    useEffect(() => {
        const ws = new WebSocket(`wss://fstream.binance.com/ws/${coinBin.toLowerCase()}@depth`);

        ws.onopen = () => console.log("WebSocket Bin открыт:", coinBin);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            //console.log("data", data)

            setOrderBook((prev) => {
                const newBids = [...prev.bids];
                const newAsks = [...prev.asks];
                const maxSize = 40;
                // console.log("A", data.a, "B", data.b)
                // Обновляем bids
                data.b.forEach(([price, quantity]: [string, string]) => {
                    const index = newBids.findIndex((bid) => bid[0] === price);
                    if (parseFloat(quantity) === 0) {
                        if (index !== -1) newBids.splice(index, 1);
                    } else {
                        if (index !== -1) newBids[index] = [price, quantity];
                        else newBids.push([price, quantity]);
                    }
                });

                // Обновляем asks
                data.a.forEach(([price, quantity]: [string, string]) => {
                    const index = newAsks.findIndex((ask) => ask[0] === price);
                    if (parseFloat(quantity) === 0) {
                        if (index !== -1) newAsks.splice(index, 1);
                    } else {
                        if (index !== -1) newAsks[index] = [price, quantity];
                        else newAsks.push([price, quantity]);
                    }
                });

                // Сортируем и ограничиваем размер
                const sortedBids = newBids.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).slice(0, maxSize);
                const sortedAsks = newAsks.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])).slice(0, maxSize);

                // Обновляем цены напрямую после обработки
                if (sortedBids.length > 0) {
                    const bidPrice = parseFloat(sortedBids[0][0]);
                    setBinancePriceBid(coinBin === "NEIROUSDT" ? parseFloat((bidPrice * 1000).toFixed(5)) : bidPrice);
                }
                if (sortedAsks.length > 0) {
                    const askPrice = parseFloat(sortedAsks[0][0]);
                    setBinancePriceAsk(coinBin === "NEIROUSDT" ? parseFloat((askPrice * 1000).toFixed(5)) : askPrice);
                }

                return { bids: sortedBids, asks: sortedAsks };
            });
        };
        ws.onclose = () => console.log("WebSocket закрыт:", coinBin);

        return () => ws.close();
    }, [coinBin]);
    // HyperLiquid WebSocket

    useEffect(() => {
        const ws = new WebSocket(`wss://api.hyperliquid.xyz/ws`);


        ws.onopen = () => {
            console.log("WebSocket Hype открыт:", coinBin);
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
                    if (setHypeAsk && levels[1][0]?.px !== undefined) {
                        setHypeAsk(levels[1][0].px);
                    }
                    setHypeBestAsk(levels[1][0]?.px); // Лучшая цена на продажу (ask)
                }
            }
        };
        ws.onclose = () => {
        };


        return () => {
            console.log("WebSocket Hype закрыт:", coinBin);
            ws.close()
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
