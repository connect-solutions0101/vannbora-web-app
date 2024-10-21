import React from "react";
import classNames from "classnames";
import styles from "./Botao.module.css";

const Botao = ({ children, onClick, size, colorPreset, hoverPreset }) => {
    const buttonClass = "botao"
    hoverPreset += "Hover"

    const classes = classNames({
        [styles[buttonClass]]: true,
        [styles[colorPreset]]: colorPreset,
        [styles[hoverPreset]]: hoverPreset
    });

    return (
        <button style={{width: size+"px"}} className={classes} onClick={onClick}>{children}</button>
    );
}

export default Botao;