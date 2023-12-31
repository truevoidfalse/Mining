import { useEffect, useRef, useState } from 'react'
import styles from './Dashboard.module.sass'

import React from 'react';
import { faker } from '@faker-js/faker'
import axios from 'axios'

import { AreaLine } from '../../UI/AreaLine/AreaLine';
import { PieLine } from '../../UI/PieLine/PieLine';
import { ChartLine } from '../../UI/ChartLine/ChartLine';




export const Dashboard = () => {

    // State for ChartJS graphs
    const [klineData, setKlineData] = useState({
        ETHUSDT: [],
        BTCUSDT: []
    })
    const [cryptoCount, setCryptoCount] = useState({
        ETHUSDT: null,
        BTCUSDT: null
    })
    const [etheur, setEtheur] = useState(null)
    const [etheurColor, setEtheurColor] = useState(null)

    const [bitcoin, setBitcoin] = useState()
    const [bitcoinColor, setBitcoinColor] = useState(null)

    // WebSocketFetching
    const SocketRef = useRef()
    

    const pairs = ['BTCUSDT', 'ETHUSDT']
    
    useEffect(() => {
        SocketRef.current = new WebSocket('wss://stream.binance.com:9443/ws')
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
                    if (prev[`${response.s}`].length >= 20) {
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
            
            
            return () => {
                SocketRef.current.close()
            }
        }  
    }, [

    ])

    useEffect(() => {
        const cryptoBitcoinFecthing = async () => {
            const { data } = await axios.get('https://api.binance.com/api/v3/depth?symbol=BTCUSDT')
            setCryptoCount((prev) => {
                return {
                    ...prev,
                    BTCUSDT: data.bids.reduce((total, bid) => {
                        return parseFloat(total) + parseFloat(bid[1])
                    })
                }
            })

        }
        const cryptoEtheurFecthing = async () => {
            const { data } = await axios.get('https://api.binance.com/api/v3/depth?symbol=ETHUSDT')
            setCryptoCount((prev) => {
                return {
                    ...prev,
                    ETHUSDT: data.bids.reduce((total, bid) => {
                        return parseFloat(total) + parseFloat(bid[1])
                    })
                }
            })

        }
        cryptoBitcoinFecthing()
        cryptoEtheurFecthing()
    }, [])

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
                <section className={styles.Chart_section}>
                    <div className={styles.ChartLine__container}>
                        <div className={styles._header}>
                            <h2 className={styles._title}>Bitcoin vs Ethereum</h2>
                            <div className={styles._right_side}>
                                <div className={styles._item}>
                                    <span style={{backgroundColor: 'yellow'}} className={styles._circle}></span>
                                    <h3>Bitcoin</h3>
                                </div>
                                <div className={styles._item}>
                                    <span style={{backgroundColor: 'blue'}} className={styles._circle}></span>
                                    <h3>Ethereum</h3>
                                </div>
                            </div>
                        </div>
                        <ChartLine props={{
                            ETHUSDT: [1566, 1788, 2234, 1235, 1556, 1256, 1567, 2155, 1566, 1766, 1456, 1897],
                            BTCUSDT: [1466, 1288, 1234, 1635, 1356, 1456, 1367, 1655, 1266, 1866, 1656, 1397]
                        }}  />
                    </div>
                </section>
            </section>
            <section className={styles.right_side_section}>
                <div className={styles.Area_pie__container}>
                    <PieLine props={cryptoCount}/>
                </div>
                <div className={styles.Top_products__container}>

                </div>
            </section>
        </main>
    )
}