import { Line } from "react-chartjs-2";
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

export const ChartLine = ({ props, width, height }) => {
    console.log(props.ETHUSDT.map(el => el))
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'jl', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                id: 1,
                fill: true,
                label: 'Etheur',
                data: props.ETHUSDT.map(el => el),
                borderColor: 'rgb(134, 142, 251)',
            },
            {
                id: 2,
                fill: true,
                label: 'Bitcoin',
                data: props.BTCUSDT.map(el => el),
                borderColor: 'rgb(250, 193, 26)',
            }
        ],
    };

    return <Line options={options} datasetIdKey='id' data={data} width={width ? width : 'auto'} height={height ? height : 'auto'} />
}