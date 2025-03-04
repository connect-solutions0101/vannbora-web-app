import React from "react";
import styles from "./Fatura.module.css";
import Input from "../../Input/Input";

const Fatura = ({ handleChange, store }) => {
  return (
    <div className={styles["container"]}>
      <Input
        label="Valor da mensalidade (R$)"
        type="number"
        styleNumber={1}
        size={200}
        value={store.valor}
        onChange={handleChange}
        name="valor"
      />
      <Input
        label="Data do pagamento"
        type="number"
        styleNumber={1}
        size={200}
        value={store.diaPagamento}
        onChange={handleChange}
        name="diaPagamento"
      />
      <Input
        label="Quantidade de parcelas"
        type="number"
        styleNumber={1}
        size={200}
        value={store.quantidadeParcelas}
        onChange={handleChange}
        name="quantidadeParcelas}"
      />
    </div>
  );
};

export default Fatura;
