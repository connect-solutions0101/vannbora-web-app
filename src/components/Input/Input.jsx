import React, { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(({ size, type, label, value, placeholder, onChange, styleNumber}, ref) => {
    let color = "#141414";
    let border = "1px solid #141414";
    let borderRadius = "7px"

    switch (styleNumber) {
        case 1:
            border = "2px solid #0D21A1";
            borderRadius = "7px";
            break;
        case 2:
            border = "2px solid #EEC643";
            borderRadius = "7px";
            break;
        case 3: 
            border = "2px solid #E21F1F";
            borderRadius = "7px";
            break;
        case 4:
            color = "#757575"; 
            border = "1px solid #011638";
            borderRadius = "4px";
            break;
        case 5:
            color = "#011638"; 
            border = "1px solid #0D21A1";
            borderRadius = "4px";
            break;
        case 6:
            color = "rgba(226, 31, 31, .65)";
            border = "1px solid #E21F1F";
            borderRadius = "4px";
            break;
    }

    return (
        <div style={{ width: (size || 224) + "px"}} className={styles["div"]}>
            <label className={styles["label"]}>{label}</label>
            <input 
                style={{color:color, border:border, borderRadius:borderRadius}} 
                type={type} 
                defaultValue={value} 
                onChange={onChange} 
                placeholder={placeholder} 
                className={styles["input"]}
                ref={ref} />
        </div>
    );
})

export default Input;