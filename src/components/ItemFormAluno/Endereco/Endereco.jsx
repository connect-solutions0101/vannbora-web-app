import React, { useState, useEffect } from "react";
import styles from "./Endereco.module.css";
import Input from "../../Input/Input";
import InputMask from "react-input-mask";
import useViaCep from "../../../utils/useViaCep";

const Endereco = ({enderecoRef}) => {

    const [cep, setCep] = useState(enderecoRef.current.cep);
    const { dados, erro, loading, buscarCep } = useViaCep();
    const [updateKey, setUpdateKey] = useState(0); 

    const handleBuscar = async () => {
        if (cep.length === 8 && !isNaN(cep)) {
            buscarCep(cep)
        }
    };

    useEffect(() => {
        if (dados && !erro) {
            enderecoRef.current.cep = dados.cep || "";
            enderecoRef.current.logradouro = dados.logradouro || "";
            enderecoRef.current.bairro = dados.bairro || "";
            enderecoRef.current.cidade = dados.localidade || "";
            setUpdateKey((prevKey) => prevKey + 1);
        } else {
            console.error("Erro ao buscar o CEP:", erro);
        }
    }
    , [dados, erro]);

    useEffect(()=>{
        if(cep.length === 8 && !isNaN(cep)){
            handleBuscar()
        }
    },[cep])


    return (
        <div className={styles['container']} key={updateKey}>
            <div className={styles['inputs']}>
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
                            size={176}
                        />
                    }
                </InputMask>
                <Input
                    label="Número"
                    type="number"
                    value={enderecoRef.current.numero}
                    onChange={(e) => enderecoRef.current.numero = e.target.value}
                    styleNumber={1}
                    size={176}
                />
            </div>
            <div className={styles['inputs']}>
                <Input
                    label="Logradouro"
                    type="text"
                    value={enderecoRef.current.logradouro}
                    onChange={(e) => enderecoRef.current.logradouro = e.target.value}
                    styleNumber={1}
                    size={176}
                />
                <Input
                    label="Cidade"
                    type="text"
                    value={enderecoRef.current.cidade}
                    onChange={(e) => enderecoRef.current.cidade = e.target.value}
                    styleNumber={1}
                    size={176}
                />
            </div>
            <div className={styles['inputs']}>
                <Input
                    label="Bairro"
                    type="text"
                    value={enderecoRef.current.bairro}
                    onChange={(e) => enderecoRef.current.bairro = e.target.value}
                    styleNumber={1}
                    size={176}
                />
                <Input
                    label="Ponto de referência"
                    type="text"
                    value={enderecoRef.current.pontoReferencia}
                    onChange={(e) => enderecoRef.current.pontoReferencia = e.target.value}
                    styleNumber={1}
                    size={176}
                />
            </div>
        </div>
    );
}

export default Endereco;