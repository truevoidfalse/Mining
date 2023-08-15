import { useEffect, useRef, useState } from 'react'
import styles from './Dashboard.module.sass'

import React from 'react';
import { faker } from '@faker-js/faker'

import { Line } from 'react-chartjs-2';
import { AreaLine } from '../../UI/AreaLine/AreaLine';




export const Dashboard = () => {

    // State for ChartJS graphs
    const [klineData, setKlineData] = useState({
        ETHUSDT: [],
        BTCUSDT: []
    })
    const [etheur, setEtheur] = useState(null)
    const [etheurColor, setEtheurColor] = useState(null)

    const [bitcoin, setBitcoin] = useState()
    const [bitcoinColor, setBitcoinColor] = useState(null)

    // WebSocketFetching
    const SocketRef = useRef()
    SocketRef.current = new WebSocket('wss://stream.binance.com:9443/ws')

    const pairs = ['BTCUSDT', 'ETHUSDT']
    
    useEffect(() => {
        SocketRef.current.onopen = () => {
            pairs.forEach(pair => {
                SocketRef.current.send(JSON.stringify({
                    "method": "SUBSCRIBE",
                    "params": [
                        `${pair.toLowerCase()}@kline_30m`
                    ],
                    "id": 1
                }))
            })
        }
        SocketRef.current.onmessage = (event) => {
            const response = JSON.parse(event.data)

            if (response?.e) {
                const currentPrice = parseFloat(response.k.c).toFixed(2)
                if (response.s === "ETHUSDT") {
                    setEtheur(currentPrice)
                    if (currentPrice > etheur) {
                        setEtheurColor(true)
                    }
                    if (currentPrice < etheur) {
                        setEtheurColor(false)
                    }

                }
                if (response.s === "BTCUSDT") {
                    setBitcoin(currentPrice)
                    if (currentPrice > bitcoin) {
                        setBitcoinColor(true)
                    }
                    if (currentPrice < bitcoin) {
                        setBitcoinColor(false)
                    }
                }
                setKlineData((prev) => {
                    if (prev[`${response.s}`].length >= 8) {
                        return {
                            ...prev,
                            [`${response.s}`]: [...prev[`${response.s}`].slice(1), currentPrice]
                        }
                    } else {
                        return {
                            ...prev,
                            [`${response.s}`]: [...prev[`${response.s}`], currentPrice]
                        }
                    }
                }
                )
            }
        }
    }, [

    ])

    return (
        <main className={styles.main}>
            <section className={styles.left_side__section}>
                <section className={styles.Area__section}>
                    <div className={styles.Area__container}>
                        <div>
                            <h2 className={styles._title}>Ethereum</h2>
                            <span style={{color: etheurColor === true ? 'green' : 'red'}} className={styles._current_price}>${etheur}</span>
                            <div className={styles.diagram__status}>
                                <span className={styles._status}>icon 20%</span>
                                <span className={styles._old_price}>$20,452</span>
                            </div>
                        </div>
                        <div className={styles.diagram__container}>
                            <AreaLine props={ klineData ? klineData['ETHUSDT'] : null} />
                        </div>
                    </div>
                    <div className={styles.Area__container}>
                        <div>
                            <h2 className={styles._title}>Bitcoin</h2>
                            <span style={{ color: bitcoinColor === true ? 'green' : 'red' }} className={styles._current_price}>${bitcoin}</span>
                            <div className={styles.diagram__status}>
                                <span className={styles._status}>icon 20%</span>
                                <span className={styles._old_price}>$20,452</span>
                            </div>
                        </div>
                        <div className={styles.diagram__container}>
                            <AreaLine props={klineData ? klineData['BTCUSDT'] : null} />
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