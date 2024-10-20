import React from "react";
import styles from "./Radio.module.css";

const Radio = ({ size, label, radioLabels, values, name, onChange }) => {
    return (
        <div style={{width: (size||224)+"px"}} className={styles["div"]}>
            <label className={styles["label"]}>{label}</label>
            <div className={styles["radios"]}>
            {values.map((val, index) => (
                <div className={styles["radio"]} key={index}>
                    <input
                        type="radio"
                        value={val}
                        onChange={onChange}
                        name={name}
                        className={styles["input"]}
                    />
                    <label className={styles["label"]}>{radioLabels[index]}</label>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Radio;