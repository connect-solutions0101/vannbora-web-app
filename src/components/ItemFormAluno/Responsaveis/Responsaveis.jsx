import React from "react";
import styles from "./Responsaveis.module.css";
import Input from "../../Input/Input";
import InputMask from "react-input-mask";

const Responsaveis = ({handleChange, store}) => {    
    return (
            <div className={styles["inputs"]}>
                <Input
                    type="text"
                    label={"Nome Completo"}
                    size={176}
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
                            label={"Telefone"}
                            size={176}
                            styleNumber={1}
                            name="telefone"
                        />
                    }
                </InputMask>
                <Input
                    type="text"
                    label={"Parentesco"}
                    size={176}
                    styleNumber={1}
                    value={store.parentesco}
                    onChange={handleChange}
                    name="parentesco"
                />
            </div>
    );
}

export default Responsaveis;