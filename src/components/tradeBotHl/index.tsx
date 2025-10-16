import React, { useState, useRef, useEffect } from "react";
import * as hl from "@nktkas/hyperliquid";
import { privateKeyToAccount } from "viem/accounts";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hook";
import WebSocketPrice from "../websocket";

const account = privateKeyToAccount("0x40cd5bbe7c21f991bac70a1d682b7c92c4c69277a7633bbfbdcea95ae86a1d25");

const TradeBot: React.FC = () => {
    const [tradeActive, setTradeActive] = useState(false);
    const [targetAmount, setTargetAmount] = useState(10);
    const [tradeSize, setTradeSize] = useState(10);
    const [accumulated, setAccumulated] = useState(0);
    const [currentPrice1, setCurrentPrice] = useState<number | null>(null);
    const { id } = useParams()
    const stopTradeRef = useRef(false);
    //const [bestHypeBid, setBestHypeBid] = useState<number | null>(null);
    const [HypeAsk, setHypeAsk] = useState<number | null>(null);
    //const [priceDiffPr, setPriceDiffPr] = useState<number | null>(null);
    //const [priceDiffOb, setPriceDiffOb] = useState<number | null>(null);
    const [transport, setTransport] = useState<hl.WebSocketTransport | null>(null);
    const coins = useAppSelector((state) => state.fundings.coins);
    const coinsArr = coins.length ? coins.find(el => el[1] === id) : null;
    const bin = coinsArr ? coinsArr[0] : null;

    const coin = 'ONDO'
    const currentPrice = 1.28

    useEffect(() => {
        const newTransport = new hl.WebSocketTransport({ url: "https://api.hyperliquid-testnet.xyz/ws" });
        setTransport(newTransport);

        return () => {
            if (newTransport) {
                newTransport.close();
                console.log("WebSocket для торговли закрыт");
            }
        };
    }, [coin]);

    const placeOrder = async () => {
        if (!currentPrice || !transport) return;

        const walletClient = new hl.WalletClient({ wallet: account, transport, isTestnet: true });

        try {
            const result = await walletClient.order({
                orders: [
                    {
                        a: 87,
                        b: true,
                        p: currentPrice.toFixed(2),
                        s: tradeSize.toString(),
                        r: false,
                        t: { limit: { tif: "Gtc" } },
                    },
                ],
                grouping: "na",
            });
            setAccumulated((prev) => prev + tradeSize);
            console.log("Ордер исполнен:", result);
        } catch (error) {
            console.error("Ошибка при размещении ордера:", error);
        }
    };

    const startTrading = () => {
        setTradeActive(true);
        stopTradeRef.current = false;

        let localAccumulated = 0; // Локальная переменная, чтобы точно отслеживать количество

        const tradeLoop = async () => {
            while (localAccumulated < targetAmount && !stopTradeRef.current) {
                if (currentPrice < 1.5) {
                    await placeOrder(); // Дожидаемся завершения API-запроса
                    localAccumulated += tradeSize; // Увеличиваем локальное накопление
                    setAccumulated(localAccumulated); // Обновляем состояние React
                }
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Задержка 1 сек
            }
            setTradeActive(false);
            console.log("Трейд завершён");
        };

        tradeLoop();
    };

    const stopTrading = () => {
        stopTradeRef.current = true;
        setTradeActive(false);
    };

    return (
        <div>

            {bin && id && (
                <WebSocketPrice
                    coinBin={bin}
                    coinHype={id}
                    setHypeAsk={setHypeAsk}

                />
            )}
            <h2>Авто-трейдер для {coin}</h2>
            <p>Текущая цена: ${currentPrice.toFixed(2)}</p>
            <p>Набранное количество: {accumulated}/{targetAmount}</p>
            <p>Цена: {HypeAsk}</p>
            <button onClick={startTrading} disabled={tradeActive}>Старт</button>
            <button onClick={stopTrading} disabled={!tradeActive}>Стоп</button>
        </div>
    );
};

export default TradeBot;
