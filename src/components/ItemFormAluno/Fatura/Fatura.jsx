import React from "react";
import styles from "./Fatura.module.css";
import Input from "../../Input/Input";

const Fatura = ({faturaRef}) => {
return (
        <div className={styles['container']}>
                <Input
                    label="Valor da mensalidade (R$)"
                    type="text"
                    value={faturaRef.current.valor}
                    onChange={(e) => faturaRef.current.valor = e.target.value}
                    styleNumber={1}
                    size={200}
                />
                <Input
                    label="Data do pagamento"
                    type="text"
                    value={faturaRef.current.diaPagamento}
                    onChange={(e) => faturaRef.current.diaPagamento = e.target.value}
                    styleNumber={1}
                    size={200}
                />
                <Input
                    label="Quantidade de parcelas"
                    type="number"
                    value={faturaRef.current.quantidadeParcelas}
                    onChange={(e) => faturaRef.current.quantidadeParcelas = e.target.value}
                    styleNumber={1}
                    size={200}
                />
        </div>
    );
}

export default Fatura;