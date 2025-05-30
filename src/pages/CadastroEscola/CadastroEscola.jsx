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

const CadastroEscola = () => {

  const navigate = useNavigate();

  const [painelEscola, setPainelEscola] = useState({
    id: "",
    nome: "",
    telefone: "",
    nomeResponsavel: "",
    telefoneResponsavel: "",
    endereco: {
      cep: "",
      numero: "",
      logradouro: "",
      cidade: "",
      bairro: ""
    }
  });

  const atualizarPropriedade = (e, prop) => {
    const props = prop.split(".");
    if(props.length === 1){
        setPainelEscola((prevState) => ({
            ...prevState,
            [prop]: e.target.value,
        }));
    }
    else if(props.length === 2){
        setPainelEscola((prevState) => ({
            ...prevState,
            [props[0]]: {
                ...prevState[props[0]],
                [props[1]]: e.target.value,
            }
        }));
    }
  };

  function handleCancel(){
    setPainelEscola({
      id: "",
      nome: "",
      telefone: "",
      nomeResponsavel: "",
      telefoneResponsavel: "",
      endereco: {
        cep: "",
        numero: "",
        logradouro: "",
        cidade: "",
        bairro: ""
      }
    });
    
    navigate("/escolas");
  } 

  function handleSave(event) {
    event.preventDefault();
    api.post("/escolas/"+Cookies.get('id'),
        painelEscola,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
        }
    ).then((response) => {
        setPainelEscola(response.data);
        toast.success("Escola cadastrada com sucesso!");
        navigate("/escolas");
    }
    ).catch((error) => {
        toast.error("Houve um problema no cadastro da escola, por favor, tente novamente.");
        console.log(error);
    });
  }

    const [cep, setCep] = useState(painelEscola.endereco.cep);
    const { dados, erro, loading, buscarCep } = useViaCep();
    const [updateKey, setUpdateKey] = useState(0); 

    const handleBuscar = async () => {
        if (cep.length === 8 && !isNaN(cep)) {
            buscarCep(cep)
        }
    };

    useEffect(() => {
        if (dados && !erro) {
            setPainelEscola((prevState) => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    cep: dados.cep || "",
                    logradouro: dados.logradouro || "",
                    bairro: dados.bairro || "",
                    cidade: dados.localidade || ""
                }
            }));
            setUpdateKey((prevKey) => prevKey + 1);
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
      <div className={styles["textos"]}>
        <h1>
          Sobre o Cadastro de Escola
        </h1>
        <span>
          O cadastro da escola é um passo importante para garantir que todas as informações necessárias estejam disponíveis para o gerenciamento adequado. Ao preencher os dados, certifique-se de que todas as informações estejam corretas e atualizadas. Isso ajudará a manter um registro preciso e facilitará a comunicação com a escola.
        </span>
        <span>
          Estas informações estarão disponíveis para consulta e edição a qualquer momento. Também estarão disponíveis no aplicativo para a gerencia dos trajetos.
        </span>
      </div>
      <div className={styles["container"]} key={updateKey}>
        <div className={styles["formulario"]} onSubmit={handleSave}>
          <h1>
            Cadastrar nova <span style={{ color: "#0D21A1" }}>Escola</span>
          </h1>
          <div className={styles.inputs}>
            <Input
              type="text"
              placeholder={"Nome da escola"}
              size={280}
              onChange={(e) => atualizarPropriedade(e, "nome")}
              value={painelEscola.nome}
              styleNumber={5}
            />
            <InputMask  
              mask="(99) 99999-9999"
              maskChar={null}
              value={painelEscola.telefone}
              onChange={(e) => atualizarPropriedade(e, "telefone")}
            >
              {() =>
                <Input
                  type="text"
                  placeholder={"Telefone"}
                  size={280}
                  styleNumber={5}
                />
              }
            </InputMask>
          </div>
          <div className={styles.inputs}>
            <Input
              type="text"
              placeholder={"Representante"}
              size={280}
              onChange={(e) => atualizarPropriedade(e, "nomeResponsavel")}
              value={painelEscola.nomeResponsavel}
              styleNumber={5}
            />
            <InputMask
              mask="(99) 99999-9999"
              maskChar={null}
              value={painelEscola.telefoneResponsavel}
              onChange={(e) => atualizarPropriedade(e, "telefoneResponsavel")}
            >
              {() =>
                <Input
                  type="text"
                  placeholder={"Telefone do representante"}
                  size={280}
                  styleNumber={5}
                />
              }
            </InputMask>
          </div>
          <div className={styles.inputs}>
            <div className={styles.doubleInput}>
              <InputMask
                mask="99999-999"
                maskChar={null}
                value={cep}
                onChange={(e) => setCep(e.target.value.replace("-", ""))}
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
                onChange={(e) => atualizarPropriedade(e, "endereco.numero")}
                value={painelEscola.endereco.numero}
                styleNumber={5}
              />
            </div>
            <Input
              type="text"
              placeholder={"Logradouro (Rua)"}
              size={280}
              onChange={(e) => atualizarPropriedade(e, "endereco.logradouro")}
              value={painelEscola.endereco.logradouro}
              styleNumber={5}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              type="text"
              placeholder={"Cidade"}
              size={280}
              onChange={(e) => atualizarPropriedade(e, "endereco.cidade")}
              value={painelEscola.endereco.cidade}
              styleNumber={5}
            />
            <Input
              type="text"
              placeholder={"Bairro"}
              size={280}
              onChange={(e) => atualizarPropriedade(e, "endereco.bairro")}
              value={painelEscola.endereco.bairro}
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
