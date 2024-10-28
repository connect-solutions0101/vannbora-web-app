import React from "react";
import styles from "./Painel.module.css";
import Botao from "../Botao/Botao";

const Painel = ({ painelItems, editFunction, children }) => {
    return (
        <div className={styles["painel"]}>
            <div className={styles["container"]}>
                {children}
            </div>
            <div className={styles["botao"]}>
                <Botao colorPreset={"blue"} hoverPreset={"white"} size={150} onClick={editFunction}> Editar </Botao>
            </div>
        </div>
    );
}

export default Painel;