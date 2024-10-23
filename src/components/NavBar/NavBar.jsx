import React from "react";
import styles from "./NavBar.module.css";
import logo from "../../utils/assets/vanCinza.png";
import Botao from "../Botao/Botao";

const NavBar = () => {
    return (
        <nav className={styles["navbar"]}>
            <img className={styles["logo"]} src={logo} alt="logotipo vannbora" />
            <div className={styles["botoes"]}>
                <Botao size={150} onClick={
                    () => {
                        alert("Clicou em Minhas Escolas");
                    }
                }
                colorPreset={"white"} hoverPreset={"yellow"}
                 >Minhas Escolas</Botao>

                <Botao size={150} onClick={
                    () => {
                        alert("Clicou em Meus Alunos");
                    }
                }
                colorPreset={"white"} hoverPreset={"yellow"}
                >Meus Alunos</Botao>

                <Botao size={150} onClick={
                    () => {
                        alert("Clicou em Minhas Finanças");
                    }
                }
                colorPreset={"white"} hoverPreset={"yellow"}
                >Minhas Finanças</Botao>          
            </div>
            <div className={styles["sair"]}>
                <Botao size={75} onClick={
                    () => {
                        alert("Clicou em Sair");
                    }
                }
                colorPreset={"white"} hoverPreset={"yellow"}
                >Sair</Botao>
            </div>
        </nav>
      );
}

export default NavBar;