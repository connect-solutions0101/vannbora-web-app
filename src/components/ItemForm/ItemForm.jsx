import React, { useState, useEffect } from "react";
import styles from "./ItemForm.module.css";
import Input from "../Input/Input";
import InputMask from "react-input-mask";
import { RiCloseCircleLine } from "react-icons/ri";
import useViaCep from "../../utils/useViaCep";

const ItemForm = ({painelState, setPainelState}) => {
        const atualizarPropriedade = (e, prop) => {
            const props = prop.split(".");
            if(props.length === 1){
                setPainelState((prevState) => ({
                    ...prevState,
                    [prop]: e.target.value,
                }));
            }
            else if(props.length === 2){
                setPainelState((prevState) => ({
                    ...prevState,
                    [props[0]]: {
                        ...prevState[props[0]],
                        [props[1]]: e.target.value,
                    }
                }));
            }
        };

        const resetarObj = () => {
            setPainelState({
                id: "",
                nome: "",
                telefone: "",
                nomeRepresentante: "",
                telefoneRepresentante: "",
                endereco: {
                    id: "",
                    cep: "",
                    numero: "",
                    logradouro: "",
                    cidade: "",
                    bairro: "",
                    pontoReferencia: ""
                }
            });
        };

        const [cep, setCep] = useState(painelState.endereco.cep);
        const { dados, erro, loading, buscarCep } = useViaCep();
        const [updateKey, setUpdateKey] = useState(0); 

        const handleBuscar = async () => {
            if (cep.length === 8 && !isNaN(cep)) {
                buscarCep(cep)
            }
        };

        useEffect(()=>{
            handleBuscar()
        },[cep])

        useEffect(() => {
            if (dados && !erro) {
                painelState.endereco.cep = dados.cep || "";
                painelState.endereco.logradouro = dados.logradouro || "";
                painelState.endereco.bairro = dados.bairro || "";
                painelState.endereco.cidade = dados.localidade || "";
                setUpdateKey((prevKey) => prevKey + 1);
            } else {
                console.error("Erro ao buscar o CEP:", erro);
            }
        }
        , [dados, erro]);
        
        return (
            <div className={styles["container"]} key={updateKey}>
                <RiCloseCircleLine className={styles.closeButton} onClick={resetarObj}/>
                <form className={styles["formulario"]}>
                    <h1>Informações da <span style={{color:"#0D21A1"}}>escola</span></h1>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Nome da escola"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "nome")}
                            value={painelState.nome}
                            styleNumber={1}
                            />
                        <Input
                            type="text"
                            label={"Telefone da escola"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "telefone")}
                            value={painelState.telefone}
                            styleNumber={1}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Representante"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "nomeResponsavel")}
                            value={painelState.nomeResponsavel}
                            styleNumber={1}
                        />
                        <Input
                            type="text"
                            label={"Tel representante"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "telefoneResponsavel")}
                            value={painelState.telefoneResponsavel}
                            styleNumber={1}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.doubleInput} style={{display:"flex"}}>
                            <InputMask
                                mask="99999-999"
                                maskChar={null}
                                value={cep}
                                onChange={(e) => setCep(e.target.value.replace("-", ""))}
                            >
                                {() =>
                                    <Input
                                        label="CEP"
                                        type="text"
                                        styleNumber={1}
                                        size={84}
                                    />
                                }
                            </InputMask>
                            <Input
                                type="text"
                                label={"Nº"} 
                                size={84}
                                onChange={(e) => atualizarPropriedade(e, "endereco.numero")}
                                value={painelState.endereco.numero}
                                styleNumber={1}
                            />
                        </div>
                        <Input
                            type="text"
                            label={"Logradouro (Rua)"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "endereco.logradouro")}
                            value={painelState.endereco.logradouro}
                            styleNumber={1}
                        />                        
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Cidade"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "endereco.cidade")}
                            value={painelState.endereco.cidade}
                            styleNumber={1}
                        />
                        <Input
                            type="text"
                            label={"Bairro"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "endereco.bairro")}
                            value={painelState.endereco.bairro}
                            styleNumber={1}
                        />
                    </div>
                </form>
            </div>
        );
    };

export default ItemForm;