import React from "react";
import styles from "./ItemForm.module.css";
import Input from "../Input/Input";
import { RiCloseCircleLine } from "react-icons/ri";

function ItemForm({endpoint, setPainelState, values}) {

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
                representante: "",
                telRepresentante: "",
                cep: "",
                numero: "",
                logradouro: "",
                cidade: ""
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
                        />
                        <Input
                            type="text"
                            label={"Telefone da escola"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "telefone")}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Representante"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "representante")}
                        />
                        <Input
                            type="text"
                            label={"Tel representante"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "telefoneRepresentante")}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.doubleInput} style={{display:"flex"}}>
                            <Input
                                type="text"
                                label={"CEP"}
                                size={84}
                                onChange={(e) => atualizarPropriedade(e, "cep")}
                            />
                            <Input
                                type="text"
                                label={"Nº"} 
                                size={84}
                                onChange={(e) => atualizarPropriedade(e, "numero")}
                            />
                        </div>
                        <Input
                            type="text"
                            label={"Logradouro (Rua)"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "logradouro")}
                        />                        
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Cidade"} 
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "cidade")}
                        />
                        <Input
                            type="text"
                            label={"Bairro"}
                            size={176}
                            onChange={(e) => atualizarPropriedade(e, "bairro")}
                        />
                    </div>
                </form>
            </div>
        );
    };

export default ItemForm;