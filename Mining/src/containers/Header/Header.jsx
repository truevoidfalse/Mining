import { useState } from 'react'
import styles from './Header.module.sass'







export const Header = () => {

    return (
        <div className={styles.Header__container}>
            <div className={styles.__left}>
                <h1 className={styles._welcome}>Welcome, James</h1>
                <p className={styles._time}>1 Octomber 2022 | 11:59 AM GMT</p>
            </div>
            <div className={styles.__right}>
                <span className={`${styles._icon} ${styles.message}`}></span>
                <span className={`${styles._icon} ${styles.notification}`}></span>
                <span className={styles._line}></span>
                <input className={styles._search} defaultValue='Search' type="text" name="" id="" />
            </div>
        </div>
    )
}