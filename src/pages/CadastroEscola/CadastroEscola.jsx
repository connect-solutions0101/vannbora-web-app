import React, { useState } from "react";
import styles from "./CadastroEscola.module.css";
import Input from "../../components/Input/Input";
import Botao from "../../components/Botao/Botao";

const CadastroEscola = () => {
  const [nomeEscola, setNomeEscola] = useState("");
  const [representante, setRepresentante] = useState("");
  const [cep, setCep] = useState("");
  const [n, setN] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefoneEscola, setTelefoneEscola] = useState("");
  const [telefoneRepresentante, setTelefoneRepresentante] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");

  const [painelEscola, setPainelEscola] = useState({
    id: "",
    nome: "",
    telefone: "",
    nomeRepresentante: "",
    telefoneRepresentante: "",
    endereco: {
      cep: "",
      numero: "",
      logradouro: "",
      cidade: "",
      bairro: "",
    },
  });

  const atualizarPropriedade = (e, prop) => {
    setPainelEscola((prevState) => ({
      ...prevState,
      [prop]: e.target.value,
    }));
  };

  return (
    <div className={styles["fundo"]}>
      <div className={styles["container"]}>
        <form className={styles["formulario"]}>
          <h1>
            Cadastrar nova <span style={{ color: "#0D21A1" }}>Escola</span>
          </h1>
          <div className={styles.inputs}>
            <Input
              type="text"
              label={"Nome da escola"}
              size={176}
              onChange={(e) => atualizarPropriedade(e, "nome")}
            />
            <Input
              type="text"
              label={"Telefone da escola"}
              size={176}
              onChange={(e) => atualizarPropriedade(e, "telefone")}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              type="text"
              label={"Representante"}
              size={176}
              onChange={(e) => atualizarPropriedade(e, "representante")}
            />
            <Input
              type="text"
              label={"Tel representante"}
              size={176}
              onChange={(e) => atualizarPropriedade(e, "telefoneRepresentante")}
            />
          </div>
          <div className={styles.inputs}>
            <div className={styles.doubleInput} style={{ display: "flex" }}>
              <Input
                type="text"
                label={"CEP"}
                size={84}
                onChange={(e) => atualizarPropriedade(e, "cep")}
              />
              <Input
                type="text"
                label={"Nº"}
                size={84}
                onChange={(e) => atualizarPropriedade(e, "numero")}
              />
            </div>
            <Input
              type="text"
              label={"Logradouro (Rua)"}
              size={176}
              onChange={(e) => atualizarPropriedade(e, "logradouro")}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              type="text"
              label={"Cidade"}
              size={176}
              onChange={(e) => atualizarPropriedade(e, "cidade")}
            />
            <Input
              type="text"
              label={"Bairro"}
              size={176}
              onChange={(e) => atualizarPropriedade(e, "bairro")}
            />
          </div>
          <div className={styles.Botao["botoes"]}>
            <button>Cancelar</button>

            <button>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CadastroEscola;
