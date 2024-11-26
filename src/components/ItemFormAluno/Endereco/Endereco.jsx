import React from "react";
import styles from "./Endereco.module.css";
import Input from "../../Input/Input";

const Endereco = ({enderecoRef}) => {
    return (
        <div className={styles['container']}>
            <div className={styles['inputs']}>
                <Input
                    label="CEP"
                    type="text"
                    value={enderecoRef.current.cep}
                    onChange={(e) => enderecoRef.current.cep = e.target.value}
                    styleNumber={1}
                    size={176}
                />
                <Input
                    label="Número"
                    type="text"
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