import React from "react";
import styles from "./Botao.module.css";

const Botao = ({ children, onClick, size }) => {
    return (
        <button style={{width: size+"px"}} className={styles["botao"]} onClick={onClick}>{children}</button>
    );
}

export default Botao;