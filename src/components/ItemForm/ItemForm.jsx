import React from "react";
import styles from "./ItemForm.module.css";
import Input from "../Input/Input";
import { RiCloseCircleLine } from "react-icons/ri";

function ItemForm({endpoint, setPainelState, painelState}) {

        const atualizarPropriedade = (e, prop) => {          
            setPainelState(prevState => ({
                ...prevState,
                [prop]: e.target.value
            }));
        };

        const resetarObj = () => {
            setPainelState({
                id: "",
                nome: "",
                telefone: "",
                nomeRepresentante: "",
                telefoneRepresentante: "",
                endereco:{
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
                        />
                        <Input
                            type="text"
                            label={"Telefone da escola"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "telefone")}
                            value={painelState.telefone}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Representante"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "nomeResponsavel")}
                            value={painelState.nomeResponsavel}
                        />
                        <Input
                            type="text"
                            label={"Tel representante"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "telefoneResponsavel")}
                            value={painelState.telefoneResponsavel}
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
                            />
                            <Input
                                type="text"
                                label={"Nº"} 
                                size={84}
                                onChange={(e) => atualizarPropriedade(e, "endereco.numero")}
                                value={painelState.endereco.numero}
                            />
                        </div>
                        <Input
                            type="text"
                            label={"Logradouro (Rua)"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "endereco.logradouro")}
                            value={painelState.endereco.logradouro}
                        />                        
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Cidade"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "endereco.cidade")}
                            value={painelState.endereco.cidade}
                        />
                        <Input
                            type="text"
                            label={"Bairro"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "endereco.bairro")}
                            value={painelState.endereco.bairro}
                        />
                    </div>
                </form>
            </div>
        );
    };

export default ItemForm;