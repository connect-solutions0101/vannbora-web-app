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
        console.log(cep)
        if (cep.length === 8 && !isNaN(cep)) {
            buscarCep(cep)
            .then((response) => {
                console.log(response); // Verifique se você está recebendo os dados esperados
                if (response && !erro) {
                    responsavelRef.current.endereco.logradouro = response.logradouro || "";
                    responsavelRef.current.endereco.bairro = response.bairro || "";
                    responsavelRef.current.endereco.cidade = response.localidade || "";
                    setUpdateKey((prevKey) => prevKey + 1);
                } else {
                   
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar o CEP:", error);
                alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
            });
        } else {
            
        }
    };

    useEffect(()=>{
        handleBuscar()
    },[cep])
    return (
        <div className={styles['container']} key={updateKey}>
            <div className={styles['inputs']}>
                <InputMask
                    mask="99999-999"
                    maskChar={null}
                    // value={responsavelRef.current.endereco.cep}
                    // onChange={(e) => responsavelRef.current.endereco.cep = e.target.value}
                
                    value={cep}
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
