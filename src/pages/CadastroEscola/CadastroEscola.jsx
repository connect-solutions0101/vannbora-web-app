import React, { useState, useEffect } from "react";
import styles from "./CadastroEscola.module.css";
import Input from "../../components/Input/Input";
import InputMask from "react-input-mask";
import Botao from "../../components/Botao/Botao";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import useViaCep from "../../utils/useViaCep";
import useStore from "../../store/escolaStore";

const CadastroEscola = () => {

  const navigate = useNavigate();
  const { formData, updateFormData, resetFormData } = useStore();

  const handleChange = (e) => {
      const { name, value } = e.target;
      updateFormData({ [name]: value });
  };

  const handleEnderecoChange = (e) => {
      const { name, value } = e.target;
      updateFormData({ endereco: { [name]: value } });
  };

  function handleCancel(){
    resetFormData();
    navigate("/escolas");
  } 

  function handleSave(event) {
    event.preventDefault();    
    api.post("/escolas/"+Cookies.get('id'),
        formData,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
        }
    ).then((response) => {
        resetFormData();
        toast.success("Escola cadastrada com sucesso!");
        navigate("/escolas");
    }
    ).catch((error) => {
        toast.error("Houve um problema no cadastro da escola, por favor, tente novamente.");
        console.log(error);
    });
  }

    const [cep, setCep] = useState("");
    const { dados, erro, loading, buscarCep } = useViaCep();

    const handleBuscar = async () => {
        if (cep.length === 8 && !isNaN(cep)) {
            buscarCep(cep)
        }
    };

    useEffect(() => {
        if (dados && !erro) {
            updateFormData({
                endereco: {
                    cep: dados.cep || "",
                    logradouro: dados.logradouro || "",
                    bairro: dados.bairro || "",
                    cidade: dados.localidade || ""
                }
            });
        } else {
            console.error("Erro ao buscar o CEP:", erro);
        }
    }
    , [dados, erro]);

    useEffect(()=>{
        handleBuscar()
    },[cep])

  return (
    <div className={styles["fundo"]}>
      <div className={styles["container"]}>
        <div className={styles["formulario"]} onSubmit={handleSave}>
          <h1>
            Cadastrar nova <span style={{ color: "#0D21A1" }}>Escola</span>
          </h1>
          <div className={styles.inputs}>
            <Input
              type="text"
              placeholder={"Nome da escola"}
              size={280}
              onChange={handleChange}
              value={formData.nome}
              name="nome"
              styleNumber={5}
            />
            <InputMask  
              mask="(99) 99999-9999"
              maskChar={null}
              onChange={handleChange}
              value={formData.telefone}
            >
              {() =>
                <Input
                  type="text"
                  placeholder={"Telefone"}
                  size={280}
                  styleNumber={5}
                  name="telefone"
                />
              }
            </InputMask>
          </div>
          <div className={styles.inputs}>
            <Input
              type="text"
              placeholder={"Representante"}
              size={280}
              onChange={handleChange}
              value={formData.nomeResponsavel}
              name="nomeResponsavel"
              styleNumber={5}
            />
            <InputMask
              mask="(99) 99999-9999"
              maskChar={null}
              onChange={handleChange}
              value={formData.telefoneResponsavel}
            >
              {() =>
                <Input
                  type="text"
                  placeholder={"Telefone do representante"}
                  size={280}
                  styleNumber={5}
                  name="telefoneResponsavel"
                />
              }
            </InputMask>
          </div>
          <div className={styles.inputs}>
            <div className={styles.doubleInput}>
              <InputMask
                mask="99999-999"
                maskChar={null}
                onChange={(e) => setCep(e.target.value.replace("-", ""))}
                value={cep}
                name="cep"
              >
                {() =>
                  <Input
                    type="text"
                    placeholder={"CEP"}
                    size={130}
                    styleNumber={5}
                  />
                }
              </InputMask>
              <Input
                type="number"
                placeholder={"Nº"}
                size={130}
                onChange={handleEnderecoChange}
                value={formData.endereco.numero}
                name="numero"
                styleNumber={5}
              />
            </div>
            <Input
              type="text"
              placeholder={"Logradouro (Rua)"}
              size={280}
              onChange={handleEnderecoChange}
              value={formData.endereco.logradouro}
              name="logradouro"
              styleNumber={5}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              type="text"
              placeholder={"Cidade"}
              size={280}
              onChange={handleEnderecoChange}
              value={formData.endereco.cidade}
              name="cidade"
              styleNumber={5}
            />
            <Input
              type="text"
              placeholder={"Bairro"}
              size={280}
              onChange={handleEnderecoChange}
              value={formData.endereco.bairro}
              name="bairro"
              styleNumber={5}
            />
          </div>
          <div className={styles["botoes"]}>
            <Botao size={140} colorPreset="whiteRed" hoverPreset="red" onClick={handleCancel}>
              Cancelar
            </Botao>

            <Botao size={140} colorPreset="whiteBlue" hoverPreset="blue" onClick={handleSave}>
              Cadastrar
            </Botao>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroEscola;
