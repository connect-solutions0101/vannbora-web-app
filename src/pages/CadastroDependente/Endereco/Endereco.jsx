import React from "react";
import styles from "./Endereco.module.css";
import Input from "../../../components/Input/Input";

const Endereco = ({responsavelRef}) => {
    return (
        <div className={styles['container']}>
            <div className={styles['inputs']}>
                <Input
                    placeholder="CEP"
                    type="text"
                    value={responsavelRef.current.endereco.cep}
                    onChange={(e) => responsavelRef.current.endereco.cep = e.target.value}
                    styleNumber={1}
                    size={176}
                />
                <Input
                    placeholder="Número"
                    type="text"
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