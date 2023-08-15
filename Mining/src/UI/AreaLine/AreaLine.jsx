import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';


export const AreaLine = ({props, width, height}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );

    const options = {
        responsive: true,
        scales: {
            y: {
                display: false,
                grid: {
                    display: false
                }
            },
            x: {
                ticks: {
                    maxRotation: 0,
                    minRotation: 0
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
    };

    const data = {
        labels: props ? props.map(el => el) : [],
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: props,
                borderColor: 'rgba(0, 0, 0, 0)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                backgroundColor: (context) => {
                    const bgColor = [
                        'rgba(253, 208, 46, 1)',
                        'rgba(57, 64, 30, 1)',
                    ]
                    if (!context.chart.chartArea) {
                        return
                    }
                    const { ctx, chartArea: { top, bottom } } = context.chart
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg
                },
            },
        ],
    };



    return <Line options={options} data={data} width={width ? width : 'auto'} height={height ? height : 'auto'} />
}