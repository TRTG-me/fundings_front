export interface IRefreshFundings {
    days: number,
    coins: string[][],
    koef: number[]
}

export interface IAllDataM1 {
    coin: string,
    hours: number[],
    hoursDays: number[],
    days: number[],
    dataDays: number[],
    last1Day: number,
    last3Days: number,
    last7Days: number,
    last14Days: number,
    last30Days: number,
    last60Days: number,
}
export interface IAllDataM2 {
    coin: string,
    days1goodORbad: string,
    days3goodORbad: string,
    days7goodORbad: string,
    days14goodORbad: string,
    days30goodORbad: string,
    days60goodORbad: string,

}
export interface ISettings {
    key: string,
    value: number,
}

export interface IAllData {
    fundings: [IAllDataM1[], IAllDataM2[]]
    isLoading: boolean;
    favorites: [IAllDataM1[], IAllDataM2[]]
    single: [IAllDataM1[], IAllDataM2[]]
    coins: string[]
    settings: ISettings[]

}