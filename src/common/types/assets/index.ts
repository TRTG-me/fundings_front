import { IAllDataM2 } from "../fundings";

export interface IAreaChartProps {
    data: number[][]
}

export interface ILineChartProps {
    data: {
        hours: number[];
        days: number[];
        hoursData: number[]
        daysData: number[]
    }
};




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
    GoodBad: IAllDataM2[]
}