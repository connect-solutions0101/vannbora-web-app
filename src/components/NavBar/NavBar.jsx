import React from "react";
import styles from "./NavBar.module.css";
import logo from "../../utils/assets/vanCinza.png";
import Botao from "../Botao/Botao";
import {useNavigate} from "react-router-dom";
import "../../utils/global";
import { logoff } from "../../utils/global";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className={styles["navbar"]}>
            <img className={styles["logo"]} src={logo} alt="logotipo vannbora" />
            <div className={styles["botoes"]}>
                <Botao size={150} onClick={
                    () => {
                        navigate("/escolas");
                    }
                }
                colorPreset={"white"} hoverPreset={"yellow"}
                 >Minhas Escolas</Botao>

                <Botao size={150} onClick={
                    () => {
                        navigate("/alunos");
                    }
                }
                colorPreset={"white"} hoverPreset={"yellow"}
                >Meus Alunos</Botao>

                <Botao size={150} onClick={
                    () => {
                        navigate("/dashboard");
                    }
                }
                colorPreset={"white"} hoverPreset={"yellow"}
                >Minhas Finanças</Botao>          
            </div>
            <div className={styles["sair"]}>
                <Botao size={75} onClick={
                    () => {
                        logoff();
                        navigate("/login");
                    }
                }
                colorPreset={"white"} hoverPreset={"yellow"}
                >Sair</Botao>
            </div>
        </nav>
      );
}

export default NavBar;