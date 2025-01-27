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
                    moment(element).format('DD.MM.YY, h:mm')
                ),
                grid: {
                    display: false
                }
            },
            x1: {
                type: 'category' as const,
                display: false,
                labels: data.hoursData.map((element: any) =>
                    moment(element).format('DD.MM.YY, h:mm')
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
                borderColor: 'rgb(192, 41, 74)',
                backgroundColor: 'rgba(85, 49, 57, 0.5)',
                xAxisID: 'x',
                pointRadius: 5,
                order: 1

            },
            {
                label: "Hours",
                data: data.hours,
                borderColor: 'rgb(77, 29, 236)',
                backgroundColor: 'rgba(81, 126, 140, 0.5)',
                xAxisID: 'x1',
                pointRadius: 0,
                fill: true,
                order: 2,
            },

        ],
    }
    return <Line options={options} data={values} width="100%" height="20%" />
}

export default LineChart