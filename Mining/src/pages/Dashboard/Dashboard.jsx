import { useEffect, useRef, useState } from 'react'
import styles from './Dashboard.module.sass'

import React from 'react';
import { faker } from '@faker-js/faker'
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
import { Line } from 'react-chartjs-2';




export const Dashboard = () => {
    const socketRef = useRef()
    const [etheur, setEtheur] = useState()
    const [etheurColor, setEtheurColor] = useState(null)
    const [etheurData, setEtheurData] = useState([])

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
        labels: etheurData.map(el => el),
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: etheurData,
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
                    const { ctx, data, chartArea: { top, bottom } } = context.chart
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)
                    gradientBg.addColorStop(0, bgColor[0])
                    gradientBg.addColorStop(1, bgColor[1])
                    return gradientBg
                },
            },
        ],
    };

    useEffect(() => {
        socketRef.current = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade')
        socketRef.current.onmessage = (event) => {
            if (event.data) {
                let response = JSON.parse(event.data)
                let currentPrice = parseFloat(response.p).toFixed(2)
                setEtheur(currentPrice)
                if (currentPrice > etheur) {
                    setEtheurColor(true)
                }
                if (currentPrice < etheur) {
                    setEtheurColor(false)
                }
                setEtheurData(prev => [...prev, currentPrice])
            }
        }
    })
    console.log(etheurData)
    

    return (
        <main className={styles.main}>
            <section className={styles.left_side__section}>
                <section className={styles.Area__section}>
                    <div className={styles.Area__container}>
                        <div>
                            <h2 className={styles._title}>Avarage Revenue</h2>
                            <span style={{color: etheurColor === true ? 'green' : 'red'}} className={styles._current_price}>${etheur}</span>
                            <div className={styles.diagram__status}>
                                <span className={styles._status}>icon 20%</span>
                                <span className={styles._old_price}>$20,452</span>
                            </div>
                        </div>
                        <div className={styles.diagram__container}>
                            <Line options={options} data={data} />
                        </div>
                    </div>
                    <div className={styles.Area__container}>
                        <div>
                            <h2 className={styles._title}>Customer Return</h2>
                            <span className={styles._current_price}>7956</span>
                            <div className={styles.diagram__status}>
                                <span className={styles._status}>icon 15%</span>
                                <span className={styles._old_price}>6759</span>
                            </div>
                        </div>
                        <div className={styles.diagram__container}>
                            DIAGRAM
                        </div>
                    </div>
                </section>
            </section>
            <section className={styles.right_side_section}>
                <div className={styles.Area_pie__container}>

                </div>
                <div className={styles.Top_products__container}>

                </div>
            </section>
        </main>
    )
}