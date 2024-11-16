import React from "react";
import styles from "./Responsaveis.module.css";
import Input from "../../Input/Input";

function Responsaveis({ responsaveisRef }) {
    
    return (
            <div className={styles["inputs"]}>
                <Input
                    type="text"
                    label={"Nome Completo"}
                    size={176}
                    styleNumber={1}
                    ref={(el) => (responsaveisRef.current.nome = el)}
                />
                <Input
                    type="text"
                    label={"Telefone"}
                    size={176}
                    styleNumber={1}
                    ref={(el) => (responsaveisRef.current.telefone = el)}
                />
                <Input
                    type="text"
                    label={"Parentesco"}
                    size={176}
                    styleNumber={1}
                />
            </div>
    );
}

export default Responsaveis;