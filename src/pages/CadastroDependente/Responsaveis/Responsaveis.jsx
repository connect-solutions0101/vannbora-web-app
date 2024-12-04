import React from "react";
import styles from "./Responsaveis.module.css";
import Input from "../../../components/Input/Input";
import InputMask from 'react-input-mask';

const Responsaveis = ({responsaveisRef, label}) => {    
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1 className={styles.formLabel}>{label}</h1>
            <div className={styles["inputs"]}>
                <Input
                    type="text"
                    placeholder={"Nome Completo"}
                    size={279}
                    styleNumber={1}
                    value={responsaveisRef.current.nome}
                    onChange={(e) => responsaveisRef.current.nome = e.target.value}
                />
                <InputMask
                    mask="(99) 99999-9999"
                    maskChar={null}
                    value={responsaveisRef.current.telefone}
                    onChange={(e) => responsaveisRef.current.telefone = e.target.value}>
                    {() =>
                        <Input
                            type="text"
                            placeholder={"Telefone"}
                            size={279}
                            styleNumber={1}
                        />
                    }
                </InputMask>
                <Input
                    type="text"
                    placeholder={"Parentesco"}
                    size={279}
                    styleNumber={1}
                    value={responsaveisRef.current.parentesco}
                    onChange={(e) => responsaveisRef.current.parentesco = e.target.value}
                />

                <InputMask
                    mask="999.999.999-99"
                    maskChar={null}
                    value={responsaveisRef.current.cpf}
                    onChange={(e) => responsaveisRef.current.cpf = e.target.value}>
                    {() =>
                        <Input
                            type="text"
                            placeholder={"CPF"}
                            size={279}
                            styleNumber={1}
                        />
                    }
                </InputMask>
            </div>
        </div>
    );
}

export default Responsaveis;