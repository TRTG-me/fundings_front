export interface IRefreshFundings {
    days: number,
    coins: string[][],
    koef: number[]
}

export interface IAllDataM1 {
    coin: string,
    hours: number[],
    days: number[],
    last1Day: number,
    last3Days: number,
    last7Days: number,
    last14Days: number,
    last30Days: number,
    last60Days: number,
}
export interface IAllDataM2 {
    coin: string,
    days1goodOrbad: string,
    days3goodOrbad: string,
    days7goodOrbad: string,
    days14goodOrbad: string,
    days30goodOrbad: string,
    days60goodOrbad: string,

}
export interface IAllData {
    fundings: [IAllDataM1[], IAllDataM2[]],
    isLoading: boolean;
}