import React from "react";
import styles from "./Fatura.module.css";
import Input from "../../../components/Input/Input";

const Fatura = ({handleChange, store}) => {
return (
        <div className={styles['container']}>
                <Input
                    placeholder="Valor da mensalidade (R$)"
                    type="number"
                    value={store.valor}
                    onChange={handleChange}
                    name="valor"
                    styleNumber={1}
                    size={200}
                />
                <Input
                    placeholder="Data do pagamento"
                    type="number"
                    value={store.diaPagamento}
                    onChange={handleChange}
                    name="diaPagamento"
                    styleNumber={1}
                    size={200}
                />
                <Input
                    placeholder="Quantidade de parcelas"
                    type="number"
                    value={store.quantidadeParcelas}
                    onChange={handleChange}
                    name="quantidadeParcelas"
                    styleNumber={1}
                    size={200}
                />
        </div>
    );
}

export default Fatura;