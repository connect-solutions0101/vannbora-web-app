import React from "react";
import styles from "./Painel.module.css";
import Botao from "../Botao/Botao";

const Painel = ({ children }) => {
    return (
        <div className={styles["painel"]}>
            {/* {children} */}
            <div className={styles["container"]}>

            </div>
            <div className={styles["botao"]}>
                <Botao colorPreset={"blue"} hoverPreset={"white"} size={150} onClick={() => alert("asiorasior")}> Editar </Botao>
            </div>
        </div>
    );
}

export default Painel;