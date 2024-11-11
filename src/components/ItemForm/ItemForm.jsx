import React from "react";
import styles from "./ItemForm.module.css";
import Input from "../Input/Input";
import { RiCloseCircleLine } from "react-icons/ri";

function ItemForm({endpoint, setPainelState, painelState}) {

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
    
        return (
            <div className={styles["container"]}>
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
                            <Input
                                type="text"
                                label={"CEP"}
                                size={84}
                                onChange={(e) => atualizarPropriedade(e, "endereco.cep")}
                                value={painelState.endereco.cep}
                                styleNumber={1}
                            />
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