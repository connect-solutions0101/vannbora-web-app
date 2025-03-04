import React, { useEffect, useState } from "react";
import styles from "./Endereco.module.css";
import Input from "../../../components/Input/Input";
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
                            placeholder="CEP"
                            type="text"
                            styleNumber={1}
                            size={176}
                            name="cep"
                        />
                    }
                </InputMask>
                <Input
                    placeholder="Número"
                    type="number"
                    value={store.numero}
                    onChange={handleChange}
                    name="numero"
                    styleNumber={1}
                    size={176}
                />
            </div>
            <div className={styles['inputs']}>
                <Input
                    placeholder="Logradouro"
                    type="text"
                    value={store.logradouro}
                    onChange={handleChange}
                    name="logradouro"
                    styleNumber={1}
                    size={176}
                />
                <Input
                    placeholder="Cidade"
                    type="text"
                    value={store.cidade}
                    onChange={handleChange}
                    name="cidade"
                    styleNumber={1}
                    size={176}
                />
            </div>
            <div className={styles['inputs']}>
                <Input
                    placeholder="Bairro"
                    type="text"
                    value={store.bairro}
                    onChange={handleChange}
                    name="bairro"
                    styleNumber={1}
                    size={176}
                />
                <Input
                    placeholder="Ponto de referência"
                    type="text"
                    value={store.pontoReferencia}
                    onChange={handleChange}
                    name="pontoReferencia"
                    styleNumber={1}
                    size={176}
                />
            </div>
        </div>
    );
}

export default Endereco;
