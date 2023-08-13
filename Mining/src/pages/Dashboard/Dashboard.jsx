import { useEffect, useRef, useState } from 'react'
import styles from './Dashboard.module.sass'

import React from 'react';
import { faker } from '@faker-js/faker'

import { Line } from 'react-chartjs-2';
import { AreaLine } from '../../UI/AreaLine/AreaLine';




export const Dashboard = () => {

    // WebSocketFetching
    const EtheurSocketRef = useRef()
    const BitcoinSocketRef = useRef()

    // State for ChartJS graphs
    const [etheur, setEtheur] = useState()
    const [etheurColor, setEtheurColor] = useState(null)
    const [etheurData, setEtheurData] = useState([])

    const [bitcoin, setBitcoin] = useState()
    const [bitcoinColor, setBitcoinColor] = useState(null)
    const [bitcoinData, setBitcoinData] = useState([])

    

    

    

    useEffect(() => {
        const EtheurWebSocket = () => {
            EtheurSocketRef.current = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade')
            EtheurSocketRef.current.onmessage = (event) => {
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
                    setEtheurData(prev => {
                        if (prev.length >= 8) {
                            return [...prev.slice(1), currentPrice]
                        } else {
                            return [...prev, currentPrice]
                        }
                    })
                }
            }
        }
        const BitcoinWebSocket = () => {
            BitcoinSocketRef.current = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
            BitcoinSocketRef.current.onmessage = (event) => {
                if (event.data) {
                    let response = JSON.parse(event.data)
                    let currentPrice = parseFloat(response.p).toFixed(2)
                    setBitcoin(currentPrice)
                    if (currentPrice > bitcoin) {
                        setBitcoinColor(true)
                    }
                    if (currentPrice < bitcoin) {
                        setBitcoinColor(false)
                    }
                    setBitcoinData(prev => {
                        if (prev.length >= 8) {
                            return [...prev.slice(1), currentPrice]
                        } else {
                            return [...prev, currentPrice]
                        }
                    })
                }
            }
        }
        EtheurWebSocket()
        BitcoinWebSocket()
    })
    

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
                            <AreaLine props={etheurData} />
                        </div>
                    </div>
                    <div className={styles.Area__container}>
                        <div>
                            <h2 className={styles._title}>Avarage Revenue</h2>
                            <span style={{ color: bitcoinColor === true ? 'green' : 'red' }} className={styles._current_price}>${bitcoin}</span>
                            <div className={styles.diagram__status}>
                                <span className={styles._status}>icon 20%</span>
                                <span className={styles._old_price}>$20,452</span>
                            </div>
                        </div>
                        <div className={styles.diagram__container}>
                            <AreaLine props={bitcoinData} />
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