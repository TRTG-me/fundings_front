import * as hl from "@nktkas/hyperliquid";
import { privateKeyToAccount } from "viem/accounts";
import { BigNumber } from "bignumber.js";

// Helper functions
async function getAssetData(client: hl.PublicClient, assetName: string): Promise<{
    id: number;
    universe: hl.PerpsUniverse;
    ctx: hl.PerpsAssetCtx;
}> {
    const data = await client.metaAndAssetCtxs();
    const id = data[0].universe.findIndex((u) => u.name === assetName)!;
    const universe = data[0].universe[id];
    const ctx = data[1][id];
    return { id, universe, ctx };
}
function formatPrice( // https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/tick-and-lot-size
    price: BigNumber.Value,
    szDecimals: number,
    isPerp: boolean = true,
    roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_HALF_UP,
): string {
    const priceBN = new BigNumber(price);
    if (priceBN.isInteger()) return priceBN.toString();

    const maxDecimals = isPerp ? 6 : 8;
    const maxAllowedDecimals = Math.max(maxDecimals - szDecimals, 0);

    return priceBN
        .precision(5, roundingMode)
        .toFixed(maxAllowedDecimals, roundingMode)
        .replace(/\.?0+$/, "");
}
function formatSize( // https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/tick-and-lot-size
    size: BigNumber.Value,
    szDecimals: number,
    roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_HALF_UP,
): string {
    return new BigNumber(size)
        .toFixed(szDecimals, roundingMode)
        .replace(/\.?0+$/, "");
}

// Initialize
const account = privateKeyToAccount("0x40cd5bbe7c21f991bac70a1d682b7c92c4c69277a7633bbfbdcea95ae86a1d25"); // Your private key
const transport = new hl.HttpTransport({ url: "https://api.hyperliquid-testnet.xyz" }); // Testnet
const walletClient = new hl.WalletClient({ wallet: account, transport, isTestnet: true }); // Testnet
const publicClient = new hl.PublicClient({ transport });

// Prepare
const MarketOrderButton: React.FC<any> = () => {
    const placeMarketOrder = async () => {
        try {
            //const { id, universe, ctx } = await getAssetData(publicClient, "ONDO");

            //const pxUp = formatPrice(new BigNumber(ctx.markPx).times(1.01), universe.szDecimals);

            // const sz = formatSize(new BigNumber(20).div(ctx.markPx), universe.szDecimals);

            const result = await walletClient.order({
                orders: [
                    {
                        a: 87,
                        b: true,
                        p: '1.4',
                        s: '1',
                        r: false,
                        t: { limit: { tif: "Gtc" } },
                    },
                ],
                grouping: "na",
            });

            console.log("Маркет-ордер исполнен:", result);
        } catch (error) {
            console.error("Ошибка при размещении ордера:", error);
        }
    };

    return <button onClick={placeMarketOrder}>Купить маркетом</button>;
};

export default MarketOrderButton;

