import React, { useState, useEffect } from "react";
import styles from "./ItemForm.module.css";
import Input from "../Input/Input";
import InputMask from "react-input-mask";
import { RiCloseCircleLine } from "react-icons/ri";
import useViaCep from "../../utils/useViaCep";
import useStore from "../../store/escolaStore";

const ItemForm = () => {

    const { formData, updateFormData, resetFormData } = useStore();

    const [cep, setCep] = useState("");
    const { dados, erro, buscarCep } = useViaCep();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };
  
    const handleEnderecoChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ endereco: { [name]: value } });
    };

    const handleBuscar = async () => {
        if (cep.length === 8 && !isNaN(cep)) {
            buscarCep(cep)
        }
    };

    const handleReset = () => {
        resetFormData();
    }

    useEffect(()=>{
        handleBuscar()
    },[cep])

    useEffect(() => {
        if (dados && !erro) {
            updateFormData({
                endereco: {
                    cep: dados.cep || "",
                    logradouro: dados.logradouro || "",
                    bairro: dados.bairro || "",
                    cidade: dados.localidade || ""
                }
            });
        } else {
            console.error("Erro ao buscar o CEP:", erro);
        }
    }, [dados, erro]);
    
    return (
        <div className={styles["container"]}>
            <RiCloseCircleLine className={styles.closeButton} onClick={handleReset}/>
            <form className={styles["formulario"]}>
                <h1>Informações da <span style={{color:"#0D21A1"}}>escola</span></h1>
                <div className={styles.inputs}>
                    <Input
                        type="text"
                        label={"Nome da escola"}
                        size={176}
                        onChange={handleChange}
                        value={formData.nome}
                        name="nome"
                        styleNumber={1}
                        />
                    <Input
                        type="text"
                        label={"Telefone da escola"} 
                        size={176}
                        onChange={handleChange}
                        value={formData.telefone}
                        name="telefone"
                        styleNumber={1}
                    />
                </div>
                <div className={styles.inputs}>
                    <Input
                        type="text"
                        label={"Representante"}
                        size={176}
                        onChange={handleChange}
                        value={formData.nomeResponsavel}
                        name="nomeResponsavel"
                        styleNumber={1}
                    />
                    <Input
                        type="text"
                        label={"Tel representante"} 
                        size={176}
                        onChange={handleChange}
                        value={formData.telefoneResponsavel}
                        name="telefoneResponsavel"
                        styleNumber={1}
                    />
                </div>
                <div className={styles.inputs}>
                    <div className={styles.doubleInput} style={{display:"flex"}}>
                        <InputMask
                            mask="99999-999"
                            maskChar={null}
                            value={formData.endereco.cep}
                            onChange={(e) => setCep(e.target.value.replace("-", ""))}
                        >
                            {() =>
                                <Input
                                    label="CEP"
                                    type="text"
                                    styleNumber={1}
                                    size={84}
                                    name="cep"
                                />
                            }
                        </InputMask>
                        <Input
                            type="text"
                            label={"Nº"} 
                            size={84}
                            onChange={handleEnderecoChange}
                            value={formData.endereco.numero}
                            name="numero"
                            styleNumber={1}
                        />
                    </div>
                    <Input
                        type="text"
                        label={"Logradouro (Rua)"}
                        size={176}
                        onChange={handleEnderecoChange}
                        value={formData.endereco.logradouro}
                        name="logradouro"
                        styleNumber={1}
                    />                        
                </div>
                <div className={styles.inputs}>
                    <Input
                        type="text"
                        label={"Cidade"} 
                        size={176}
                        onChange={handleEnderecoChange}
                        value={formData.endereco.cidade}
                        name="cidade"
                        styleNumber={1}
                    />
                    <Input
                        type="text"
                        label={"Bairro"}
                        size={176}
                        onChange={handleEnderecoChange}
                        value={formData.endereco.bairro}
                        name="bairro"
                        styleNumber={1}
                    />
                </div>
            </form>
        </div>
    );
};

export default ItemForm;