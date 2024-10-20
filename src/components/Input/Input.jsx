import React from "react";
import styles from "./Input.module.css";

const Input = ({ size, type, label, value, onChange }) => {
    return (
        <div style={{width: (size||224)+"px"}} className={styles["div"]}>
            <label className={styles["label"]} >{label}</label>
            <input type={type} value={value} onChange={onChange} className={styles["input"]} />
        </div>
    );
}

export default Input;