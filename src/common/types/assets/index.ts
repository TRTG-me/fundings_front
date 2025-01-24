export interface IAreaChartProps {
    data: number[][]
}

export interface ILineChartProps {
    data: any
}

interface Roi {
    times: number
    currency: string
    percentage: number
}

export interface ISingleCoin {
    coin: string
    last1Day: number
    last3Days: number
    last7Days: number
    last14Days: number
    last30Days: number
    last60Days: number

}

export interface IChartData {
    name: string
    price_chart_data: number[][]

}


export interface ITableTopCoins {
    coins: ISingleCoin[]
}