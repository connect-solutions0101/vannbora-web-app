import React from "react";
import styles from "./Fatura.module.css";
import Input from "../../../components/Input/Input";
import InputMask from "react-input-mask";

const Fatura = ({faturaRef}) => {
return (
        <div className={styles['container']}>
                <Input
                    placeholder="Valor da mensalidade (R$)"
                    type="number"
                    value={faturaRef.current.valor}
                    onChange={(e) => faturaRef.current.valor = e.target.value}
                    styleNumber={1}
                    size={200}
                />
                <Input
                    placeholder="Data do pagamento"
                    type="number"
                    value={faturaRef.current.diaPagamento}
                    onChange={(e) => faturaRef.current.diaPagamento = e.target.value}
                    styleNumber={1}
                    size={200}
                />
                <Input
                    placeholder="Quantidade de parcelas"
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