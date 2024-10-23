import React from "react";
import styles from "./MiniCardDash.module.css";

const MiniCardDash = ({ title, value, icon }) => {
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                {icon}
                <span>{title}</span>
            </div>
            <span>{value}</span>
        </div>
    );
};

export default MiniCardDash;