import React, { useState } from "react";
import styles from "./CadastroDependente.module.css";
import Input from "../../components/Input/Input";
import Botao from "../../components/Botao/Botao";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import NextLink from "../../components/NextLink/NextLink";
import PreviousLink from "../../components/PreviousLink/PreviousLink";

const CadastroDependente = () => {
    const navigate = useNavigate();

    return (
        <div className={styles["fundo"]}>
            <div className={styles["container"]}>
                <div className={styles["formulario"]}>
                    <h1>
                        Cadastrar novo <span style={{ color: "#0D21A1" }}>Aluno</span>
                    </h1> 

                    <div className={styles["texto-formulario"]}>
                        <span>Representante Finaceiro</span>
                        <span>Representante Secundario</span>
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            placeholder={"Nome Completo"}
                            size={280}
                            styleNumber={5}
                        />
                        <Input
                            type="text"
                            placeholder={"Nome Completo"}
                            size={280}
                            styleNumber={5}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            placeholder={"Telefone"}
                            size={280}
                            styleNumber={5}
                        />
                        <Input
                            type="text"
                            placeholder={"Telefone"}
                            size={280}
                            styleNumber={5}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            placeholder={"Parentesco"}
                            size={280}
                            styleNumber={5}
                        />
                        <Input
                            type="text"
                            placeholder={"Parentesco"}
                            size={280}
                            styleNumber={5}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            placeholder={"CPF"}
                            size={280}
                            styleNumber={5}
                        />
                        <Input
                            type="text"
                            placeholder={"CPF"}
                            size={280}
                            styleNumber={5}
                        />
                    </div>
                    <div className={styles["navigation-links"]}>
                        <PreviousLink size={140} colorPreset="whiteRed" hoverPreset="red" >
                            Cancelar
                        </PreviousLink>

                        <NextLink size={140} colorPreset="whiteBlue" hoverPreset="blue">
                            Cadastrar
                        </NextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CadastroDependente;