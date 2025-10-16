import React, { FC } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import ZoomPlugin from 'chartjs-plugin-zoom';
import moment from 'moment'
import { ILineChartProps } from '../../../common/types/assets'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ZoomPlugin,
)

const LineChart: FC<ILineChartProps> = (props: ILineChartProps) => {
    const { data } = props

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'category' as const,
                display: false,
                labels: data.daysData.map((element: any) =>
                    moment(element).format('DD.MM.YY, HH:mm')
                ),
                grid: {
                    display: false
                }
            },
            x1: {
                type: 'category' as const,
                display: false,
                labels: data.hoursData.map((element: any) =>
                    moment(element).format('DD.MM.YY, HH:mm')
                ),
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'top' as const
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'xy' as const, // Указываем как константу
                },
                pan: {
                    enabled: true,
                    mode: 'xy' as const, // Указываем как константу
                },
            },
        },
    }

    const values = {
        labels: data.hoursData.map((element: any) =>
            moment(element).format('DD.MM.YY, h:mm'),
        ),
        datasets: [
            {
                label: "Days",
                data: data.days,
                borderColor: 'rgb(189, 54, 83)',
                backgroundColor: 'rgba(85, 49, 57, 0.5)',
                pointBorderColor: 'rgb(255, 0, 8)',
                xAxisID: 'x',
                pointRadius: 6,
                order: 1

            },
            {
                label: "Hours",
                data: data.hours,
                borderColor: 'rgb(77, 29, 236)',
                backgroundColor: 'rgba(81, 126, 140, 0.5)',
                xAxisID: 'x1',
                pointRadius: 2,
                pointBorderColor: 'rgb(0, 255, 221)',
                //pointBackgroundColor: 'rgb(0, 255, 0)', 
                fill: true,
                order: 2,
            },

        ],
    }
    return <Line options={options} data={values} width="100%" height="20%" />
}

export default LineChart