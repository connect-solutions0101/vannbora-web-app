import React from "react";
import styles from "./NextLink.module.css"
import classNames from "classnames";
import { IoIosArrowForward } from "react-icons/io";

const NextLink = ({size, color, onClickFunction}) => {  
    let scale = size === "small" ? 15 : 26;    
    let colorPreset = color === "light" ? "#0D21A1" : "#011638";

    const classes = classNames({
        [styles[size]]:size,
        [styles[color]]:color,
        [styles.container]:true
    });

    return (
        <div className={classes}>
            <span className={styles["text"]}>Próximo</span>
            <IoIosArrowForward size={scale} color={colorPreset}/>
        </div>
    )
}

export default NextLink;