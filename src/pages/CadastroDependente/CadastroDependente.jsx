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

const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
};

const CadastroDependente = () => {
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [escolaId, setEscolaId] = useState("");
    const [turma, setTurma] = useState("");
    const [turno, setTurno] = useState("");
    const [condicao, setCondicao] = useState("");

    const [responsavel1, setResponsavel1] = useState({
        nome: "",
        telefone: "",
        parentesco: "",
        cpf: ""
    });

    const [responsavel2, setResponsavel2] = useState({
        nome: "",
        telefone: "",
        parentesco: "",
        cpf: ""
    });

    const [endereco, setEndereco] = useState({
        cep: "",
        bairro: "",
        cidade: "",
        numero: "",
        pontoReferencia: "",
        logradouro: ""
    });

    const [fatura, setFatura] = useState({
        valor: "",
        dataPagamento: "",
        quantidadeParcelas: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSave();
    };

    const handleSave = async () => {
        const dependente = {
            nome,
            dataNascimento,
            escolaId,
            turma,
            turno,
            condicao,
            responsavel1,
            responsavel2,
            endereco,
            fatura
        };
        const responsavel1 = {
            nome,
            telefone,
            parentesco,
            cpf,
        };
        const responsavel2 = {
            nome,
            telefone,
            parentesco,
            cpf,
        };
        const endereco = {
            cep,
            bairro,
            cidade,
            numero,
            pontoReferencia,
            logradouro,
        };
        const fatura = {
            valor,
            dataPagamento,
            quantidadeParcelas,
        };

        api
            .post(`dependente`, dependente)
            .then((r) => {
                console.log(r);
                toast.success("Dependente cadastrado com sucesso!");
                navigate("/dependentes/cadastro");
            })
            .catch((e) => {
                console.error(e);
                toast.error(
                    "Ocorreu um erro ao salvar os dados, por favor, tente novamente."
                );
            });
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
    };
};
export default CadastroDependente;