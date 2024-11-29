import React, { useState, useEffect, useRef } from "react";
import styles from "./CadastroDependente.module.css";
import Input from "../../components/Input/Input";
import Botao from "../../components/Botao/Botao";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import NextLink from "../../components/NextLink/NextLink";
import PreviousLink from "../../components/PreviousLink/PreviousLink";
import Responsaveis from "./Responsaveis/Responsaveis";
import Aluno from "./Aluno/Aluno";
import Endereco from "./Endereco/Endereco";
import Fatura from "./Fatura/Fatura";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCoin } from "react-icons/tb";

const CadastroDependente = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [step, setStep] = useState();

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    {
      icon: <HiOutlineUsers size={30} color="#fff" />,
      onClick: () => navigate("/responsaveis"),
      label: "Responsável",
      state: "completed",
    },
    {
      icon: <HiOutlineUser size={30} color="#3F3F46" />,
      onClick: () => navigate("/alunos"),
      label: "Aluno",
      state: "uncompleted",
    },
    {
      icon: <HiOutlineLocationMarker size={30} color="#3F3F46" />,
      onClick: () => navigate("/endereco"),
      label: "Endereço",
      state: "uncompleted",
    },
    {
      icon: <TbCoin size={30} color="#3F3F46" />,
      onClick: () => navigate("/fatura"),
      label: "Fatura",
      state: "uncompleted",
    },
  ]);

  const responsavel1 = useRef({});
  const responsavel2 = useRef({});
  const aluno = useRef({});
  const endereco = useRef({});
  const fatura = useRef({});

  const [escolas, setEscolas] = useState([]);

  function getSteps() {
    switch (currentStep) {
      case 0:
        return (
          <div style={{ display: "flex", gap: "80px" }}>
            <Responsaveis
              responsaveisRef={responsavel1}
              label={"Responsável Financeiro"}
            />
            {responsavel2.current !== null ? (
              <Responsaveis
                responsaveisRef={responsavel2}
                label={"Responsável Secundário"}
              />
            ) : null}
          </div>
        );
      case 1:
        return <Aluno alunoRef={aluno} escolas={escolas} />;
      case 2:
        return <Endereco enderecoRef={endereco} />;
      case 3:
        return <Fatura faturaRef={fatura} />;
    }
  }

  function getBreadcrumbItems() {
    switch (currentStep) {
      case 0:
        return [
          {
            icon: <HiOutlineUsers size={30} color="#fff" />,
            label: "Responsável",
            state: "completed",
          },
          {
            icon: <HiOutlineUser size={30} color="#3F3F46" />,
            label: "Aluno",
            state: "uncompleted",
          },
          {
            icon: <HiOutlineLocationMarker size={30} color="#3F3F46" />,
            label: "Endereço",
            state: "uncompleted",
          },
          {
            icon: <TbCoin size={30} color="#3F3F46" />,
            label: "Fatura",
            state: "uncompleted",
          },
        ];
      case 1:
        return [
          {
            icon: <HiOutlineUsers size={30} color="#fff" />,
            label: "Responsável",
            state: "completed",
          },
          {
            icon: <HiOutlineUser size={30} color="#fff" />,
            label: "Aluno",
            state: "completed",
          },
          {
            icon: <HiOutlineLocationMarker size={30} color="#3F3F46" />,
            label: "Endereço",
            state: "uncompleted",
          },
          {
            icon: <TbCoin size={30} color="#3F3F46" />,
            label: "Fatura",
            state: "uncompleted",
          },
        ];
      case 2:
        return [
          {
            icon: <HiOutlineUsers size={30} color="#fff" />,
            label: "Responsável",
            state: "completed",
          },
          {
            icon: <HiOutlineUser size={30} color="#fff" />,
            label: "Aluno",
            state: "completed",
          },
          {
            icon: <HiOutlineLocationMarker size={30} color="#fff" />,
            label: "Endereço",
            state: "completed",
          },
          {
            icon: <TbCoin size={30} color="#3F3F46" />,
            label: "Fatura",
            state: "uncompleted",
          },
        ];
      case 3:
        return [
          {
            icon: <HiOutlineUsers size={30} color="#fff" />,
            label: "Responsável",
            state: "completed",
          },
          {
            icon: <HiOutlineUser size={30} color="#fff" />,
            label: "Aluno",
            state: "completed",
          },
          {
            icon: <HiOutlineLocationMarker size={30} color="#fff" />,
            label: "Endereço",
            state: "completed",
          },
          {
            icon: <TbCoin size={30} color="#fff" />,
            label: "Fatura",
            state: "completed",
          },
        ];
    }
  }

  const handleNextLink = async () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePreviousLink = async () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  function handleGetEscolas() {
    api
      .get("escolas/proprietario/" + Cookies.get("id"), {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          toast.error(
            "Você não possui escolas cadastradas, por favor, cadastre uma escola antes de cadastrar um aluno."
          );
          navigate("/escolas/cadastro");
        }
        setEscolas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGetEscolas();
  }, []);

  useEffect(() => {
    setStep(getSteps());
    setBreadcrumbItems(getBreadcrumbItems());
  }, [currentStep]);

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave();
  };

  const handleCancel = () => {
    navigate("/alunos");
  };

  const handleSave = async () => {
    api
      .post(`dependente`)
      .then((r) => {
        console.log(r);
        toast.success("Dependente cadastrado com sucesso!");
        navigate("/dependentes/cadastro");
      })
      .catch((e) => {
        console.error(e);
        toast.error(
          "Ocorreu um erro ao salvar os dados, por favor, tente novamente."
        );
      });
  };

  return (
    <div className={styles["fundo"]}>
      <div className={styles["container"]}>
        <form className={styles["formulario"]}>
          <h1>
            Cadastrar novo <span style={{ color: "#0D21A1" }}>Aluno</span>
          </h1>
          <BreadCrumb items={breadcrumbItems} />
          {step}
          <div className={styles["navigation-links"]}>
            {currentStep > 0 ? (
              <PreviousLink
                onClickFunction={handlePreviousLink}
                size={"big"}
                color={"dark"}
              />
            ) : (
              <Botao
                size={140}
                colorPreset="whiteRed"
                hoverPreset="red"
                onClick={handleCancel}
              >
                Cancelar
              </Botao>
            )}
            {currentStep < 3 ? (
              <NextLink
                onClickFunction={handleNextLink}
                size={"big"}
                color={"dark"}
              />
            ) : (
              <div className={styles.doubleButton}>
                <Botao
                  size={140}
                  colorPreset="whiteRed"
                  hoverPreset="red"
                  onClick={handleCancel}
                >
                  Cancelar
                </Botao>
                <Botao
                  size={140}
                  colorPreset="blue"
                  hoverPreset="yellow"
                  onClick={handleSave}
                >
                  Finalizar
                </Botao>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroDependente;
