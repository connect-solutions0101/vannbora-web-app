import React, { useState, useEffect } from "react";
import styles from "./Endereco.module.css";
import Input from "../../Input/Input";
import InputMask from "react-input-mask";

const Endereco = ({handleChange, store}) => {

    return (
        <div className={styles['container']}>
            <div className={styles['inputs']}>
                <InputMask
                    mask="99999-999"
                    maskChar={null}
                    value={store.cep}
                    onChange={handleChange}
                >
                    {() =>
                        <Input
                            label="CEP"
                            type="text"
                            styleNumber={1}
                            size={176}
                            name="cep"
                        />
                    }
                </InputMask>
                <Input
                    label="Número"
                    type="number"
                    styleNumber={1}
                    size={176}
                    value={store.numero}
                    onChange={handleChange}
                    name="numero"
                />
            </div>
            <div className={styles['inputs']}>
                <Input
                    label="Logradouro"
                    type="text"
                    styleNumber={1}
                    size={176}
                    value={store.logradouro}
                    onChange={handleChange}
                    name="logradouro"
                />
                <Input
                    label="Cidade"
                    type="text"
                    styleNumber={1}
                    size={176}
                    value={store.cidade}
                    onChange={handleChange}
                    name="cidade"
                />
            </div>
            <div className={styles['inputs']}>
                <Input
                    label="Bairro"
                    type="text"
                    styleNumber={1}
                    size={176}
                    value={store.bairro}
                    onChange={handleChange}
                    name="bairro"
                />
                <Input
                    label="Ponto de referência"
                    type="text"
                    styleNumber={1}
                    size={176}
                    value={store.pontoReferencia}
                    onChange={handleChange}
                    name="pontoReferencia"
                />
            </div>
        </div>
    );
}

export default Endereco;