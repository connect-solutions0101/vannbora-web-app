import React from "react";
import styles from "./SelectItems.module.css";

function SelectItems({ items, label, size, styleNumber, ref }) {

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
        <div className={styles.container}>
            <label className={styles.label} htmlFor={label}>
                {label}
            </label>
            <select
                className={styles.select}
                style={{ width: `${size}px`, color: color, border: border, borderRadius: borderRadius }}
                ref={ref}
            >
                <option value="" disabled selected>
                    Selecione
                </option>
                {items.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.nome}
                </option>
                ))}
            </select>
        </div>
    );
}

export default SelectItems;