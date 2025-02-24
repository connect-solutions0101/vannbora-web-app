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
import useStore from "../../store/dependenteStore";

const CadastroDependente = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, resetFormData } = useStore();
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

  const responsavel1 = useRef({
    endereco: {},
  });
  const responsavel2 = useRef({
    endereco: {},
  });
  const aluno = useRef({});
  const fatura = useRef({});

  const [escolas, setEscolas] = useState([]);
  const [dependente, setDependente] = useState({});
  const [shouldCallApi, setShouldCallApi] = useState(false);

  function getSteps() {
    switch (currentStep) {
      case 0:
        return (
          <div style={{ display: "flex", gap: "80px" }}>
            <Responsaveis
              handleChange={handleResponsavelFinanceiroChange}
              store={formData.responsaveis[0]}
              label={"Responsável Financeiro"}
            />
            {responsavel2.current !== null ? (
              <Responsaveis
                handleChange={handleResponsavelSecundarioChange}
                store={formData.responsaveis[1]}
                label={"Responsável Secundário"}
              />
            ) : null}
          </div>
        );
      case 1:
        return <Aluno handleChange={handleDependenteChange} store={formData} escolas={escolas} />;
      case 2:
        return <Endereco handleChange={handleEnderecoChange} store={formData.responsaveis[0].responsavel.endereco} />;
      case 3:
        return <Fatura handleChange={handleFaturaChange} store={formData.fatura} />;
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

  const handleDependenteChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleEnderecoChange = (e) => {
      const { name, value } = e.target;
      const responsaveis = [...formData.responsaveis];
      responsaveis[0].responsavel.endereco[name] = value;
      updateFormData({ responsaveis });
  };

  const handleResponsavelFinanceiroChange = (e) => {
    const { name, value } = e.target;
    const responsaveis = [...formData.responsaveis];
    responsaveis[0].responsavel[name] = value;
    updateFormData({ responsaveis });
  };

  const handleResponsavelSecundarioChange = (e) => {
    const { name, value } = e.target;
    const responsaveis = [...formData.responsaveis];
    responsaveis[1].responsavel[name] = value;
    updateFormData({ responsaveis });
  };

  const handleFaturaChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ fatura: { [name]: value } });
  };

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

  useEffect(() => {
    if (shouldCallApi) {
      handleSave();
      setShouldCallApi(false);
    }
  }, [setDependente, shouldCallApi]);

  const handleCancel = () => {
    navigate("/alunos");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    
    setDependente({
        nome: formData.nome,
        dataNascimento: formData.dataNascimento.split('/').reverse().join('-'),
        turno: formData.turno,
        condicao: formData.condicao,
        turma: formData.turma,
        escolaId: formData.escolaId,
        responsaveis: [
        {
            responsavel: formData.responsaveis[0].responsavel,
            tipoResponsavel: "FINANCEIRO",
        },
        (formData.responsaveis[1].nome === ""
          && formData.responsaveis[1].telefone === ""
          && formData.responsaveis[1].parentesco === ""
          && formData.responsaveis[1].cpf === ""
        ) ? null :
        {
            responsavel: formData.responsaveis[1].responsavel,
            tipoResponsavel: "PADRAO",
        }
        ],
        fatura: formData.fatura,
    });
    setShouldCallApi(true);
  };

  const handleSave = async () => {
    console.log(dependente);
    
    api
      .post("dependentes/full/"+Cookies.get("id"), dependente, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        toast.success("Aluno cadastrado com sucesso!");
        navigate("/alunos");
      })
      .catch((error) => {
        console.log(error);
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
                  onClick={handleSubmit}
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
