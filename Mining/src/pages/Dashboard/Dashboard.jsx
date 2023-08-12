import { useEffect, useRef, useState } from 'react'
import styles from './Dashboard.module.sass'





export const Dashboard = () => {
    const socketRef = useRef()
    const [etheur, setEtheur] = useState()
    const [etheurColor, setEtheurColor] = useState(null)

    useEffect(() => {
        socketRef.current = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade')
        socketRef.current.onmessage = (event) => {
            if (event.data) {
                let response = JSON.parse(event.data)
                let currentPrice = parseFloat(response.p).toFixed(2)
                setEtheur(currentPrice)
                console.log(currentPrice, etheur)
                if (currentPrice > etheur) {
                    setEtheurColor(true)
                }
                if (currentPrice < etheur) {
                    setEtheurColor(false)
                }
            }
        }
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
                            DIAGRAM
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