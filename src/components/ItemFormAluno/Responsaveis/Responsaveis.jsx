import React from "react";
import styles from "./Responsaveis.module.css";
import Input from "../../Input/Input";

const Responsaveis = ({responsaveisRef}) => {    
    return (
            <div className={styles["inputs"]}>
                <Input
                    type="text"
                    label={"Nome Completo"}
                    size={176}
                    styleNumber={1}
                    value={responsaveisRef.current.nome}
                    onChange={(e) => responsaveisRef.current.nome = e.target.value}
                />
                <Input
                    type="text"
                    label={"Telefone"}
                    size={176}
                    styleNumber={1}
                    value={responsaveisRef.current.telefone}
                    onChange={(e) => responsaveisRef.current.telefone = e.target.value}
                />
                <Input
                    type="text"
                    label={"Parentesco"}
                    size={176}
                    styleNumber={1}
                    value={responsaveisRef.current.parentesco}
                    onChange={(e) => responsaveisRef.current.parentesco = e.target.value}
                />
            </div>
    );
}

export default Responsaveis;