import React from "react";
import styles from "./PreviousLink.module.css"
import classNames from "classnames";
import { IoIosArrowBack } from "react-icons/io";

const PreviousLink = ({size, color, onClickFunction}) => {
    let scale = size === "small" ? 15 : 26;
    let colorPreset = color === "light" ? "#0D21A1" : "#011638";

    const classes = classNames({
        [styles[size]]:size,
        [styles[color]]:color,
        [styles.container]:true
    });

    return (
        <div className={classes} onClick={onClickFunction}>
            <IoIosArrowBack size={scale} color={colorPreset}/>
            <span className={styles["text"]}>Anterior</span>
        </div>
    )
}

export default PreviousLink;