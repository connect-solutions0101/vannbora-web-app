import React from "react";
import styles from "./Responsaveis.module.css";
import Input from "../../../components/Input/Input";
import InputMask from 'react-input-mask';

const Responsaveis = ({handleChange, store, label}) => {    
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1 className={styles.formLabel}>{label}</h1>
            <div className={styles["inputs"]}>
                <Input
                    type="text"
                    placeholder={"Nome Completo"}
                    size={279}
                    styleNumber={1}
                    value={store.nome}
                    onChange={handleChange}
                    name="nome"
                />
                <InputMask
                    mask="(99) 99999-9999"
                    maskChar={null}
                    value={store.telefone}
                    onChange={handleChange}>
                    {() =>
                        <Input
                            type="text"
                            placeholder={"Telefone"}
                            size={279}
                            styleNumber={1}
                            name="telefone"
                        />
                    }
                </InputMask>
                <Input
                    type="text"
                    placeholder={"Parentesco"}
                    size={279}
                    styleNumber={1}
                    value={store.parentesco}
                    onChange={handleChange}
                    name="parentesco"
                />

                <InputMask
                    mask="999.999.999-99"
                    maskChar={null}
                    value={store.cpf}
                    onChange={handleChange}>
                    {() =>
                        <Input
                            type="text"
                            placeholder={"CPF"}
                            size={279}
                            styleNumber={1}
                            name="cpf"
                        />
                    }
                </InputMask>
            </div>
        </div>
    );
}

export default Responsaveis;