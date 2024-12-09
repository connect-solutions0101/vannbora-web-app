import React, { useEffect, useState } from "react";
import styles from "./Endereco.module.css";
import Input from "../../../components/Input/Input";
import InputMask from "react-input-mask";
import useViaCep from "../../../utils/useViaCep";



const Endereco = ({responsavelRef}) => {

    const [cep, setCep] = useState("");
    const { dados, erro, loading, buscarCep } = useViaCep();
    const [updateKey, setUpdateKey] = useState(0); 

    const handleBuscar = async () => {
        if (cep.length === 8 && !isNaN(cep)) {
            buscarCep(cep)
        }
    };

    useEffect(() => {
        if (dados && !erro) {
            responsavelRef.current.endereco.cep = dados.cep || "";
            responsavelRef.current.endereco.logradouro = dados.logradouro || "";
            responsavelRef.current.endereco.bairro = dados.bairro || "";
            responsavelRef.current.endereco.cidade = dados.localidade || "";
            setUpdateKey((prevKey) => prevKey + 1);
        } else {
            console.error("Erro ao buscar o CEP:", erro);
        }
    }
    , [dados, erro]);

    useEffect(()=>{
        handleBuscar()
    },[cep])
    
    return (
        <div className={styles['container']} key={updateKey}>
            <div className={styles['inputs']}>
                <InputMask
                    mask="99999-999"
                    maskChar={null}             
                    value={responsavelRef.current.endereco.cep}
                    onChange={(e) => setCep(e.target.value.replace("-", ""))}
                    >
                    {() =>
                        <Input
                            placeholder="CEP"
                            type="text"
                            styleNumber={1}
                            size={176}
                        />
                    }
                </InputMask>
                <Input
                    placeholder="Número"
                    type="number"
                    value={responsavelRef.current.endereco.numero}
                    onChange={(e) => responsavelRef.current.endereco.numero = e.target.value}
                    styleNumber={1}
                    size={176}
                />
            </div>
            <div className={styles['inputs']}>
                <Input
                    placeholder="Logradouro"
                    type="text"
                    value={responsavelRef.current.endereco.logradouro}
                    onChange={(e) => responsavelRef.current.endereco.logradouro = e.target.value}
                    styleNumber={1}
                    size={176}
                />
                <Input
                    placeholder="Cidade"
                    type="text"
                    value={responsavelRef.current.endereco.cidade}
                    onChange={(e) => responsavelRef.current.endereco.cidade = e.target.value}
                    styleNumber={1}
                    size={176}
                />
            </div>
            <div className={styles['inputs']}>
                <Input
                    placeholder="Bairro"
                    type="text"
                    value={responsavelRef.current.endereco.bairro}
                    onChange={(e) => responsavelRef.current.endereco.bairro = e.target.value}
                    styleNumber={1}
                    size={176}
                />
                <Input
                    placeholder="Ponto de referência"
                    type="text"
                    value={responsavelRef.current.endereco.pontoReferencia}
                    onChange={(e) => responsavelRef.current.endereco.pontoReferencia = e.target.value}
                    styleNumber={1}
                    size={176}
                />
            </div>
        </div>
    );
}

export default Endereco;
