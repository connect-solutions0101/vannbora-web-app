import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
import ItemFormAluno from "../../components/ItemFormAluno/ItemFormAluno";
import Cookies from 'js-cookie';
import api from "../../api";
import { toast } from "react-toastify";
import useStore from "../../store/dependenteStore";
import useViaCep from "../../utils/useViaCep";

const TelaListagemAlunos = () => {  
    const navigate = useNavigate();
    const { formData, updateFormData, resetFormData } = useStore();

    const [filtroNome, setFiltroNome] = React.useState("");

    useEffect(() => {
        handleGetDependentes()
    }, [filtroNome]);
    
    const [dependentes, setDependentes] = useState([]);
    const { dados, erro, buscarCep } = useViaCep();

    const handleBuscar = async (cep) => {
        buscarCep(cep)
    };

    useEffect(() => {
        debugger
        if (dados && !erro) {
            const responsaveis = [...formData.responsaveis];
            responsaveis[0].responsavel.endereco.logradouro = dados.logradouro;
            responsaveis[0].responsavel.endereco.bairro = dados.bairro;
            responsaveis[0].responsavel.endereco.cidade = dados.localidade;
            responsaveis[0].responsavel.endereco.uf = dados.uf;
            updateFormData({ responsaveis });
        } else {
            console.error("Erro ao buscar o CEP:", erro);
        }
    }
    , [dados, erro]);

    useEffect(()=>{
        const cep = formData.responsaveis[0].responsavel.endereco.cep;

        if(cep.length === 9){
            handleBuscar(cep);
        }
    },[formData.responsaveis[0].responsavel.endereco.cep]);

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

    function handleGetDependentes() {
        api.get("dependentes/full/"+Cookies.get('id')+"?nome="+filtroNome,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        ).then((response) => {      
            setDependentes(response.data);
        }
        ).catch((error) => {
            console.log(error);
        });
    }

    const handleCardClick = (id) => {
        console.log("handleCardClick");
        
        api.get("/dependentes/fullPorId/" + id, {
          headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
          }
        }).then((response) => {
            console.log(response.data);
            
            updateFormData(response.data);
        });
      };

    useEffect(() => {
        handleGetDependentes();
    }, []);

    function handleEditDependente() {     
        console.log("handleEditDependente");
        

        if(formData.escolaId === ""){
            formData.escolaId = formData.escola.id;
        }
        if(formData.responsaveis[1].responsavel.nome === ""
            && formData.responsaveis[1].responsavel.telefone === ""
            && formData.responsaveis[1].responsavel.parentesco === ""
        ){
            formData.responsaveis[1] = null;
        } else if(formData.responsaveis[1].responsavel.id === null){
            formData.responsaveis[1].responsavel.proprietarioServico = formData.responsaveis[0].responsavel.proprietarioServico;
            formData.responsaveis[1].responsavel.endereco = null;
        }

        formData.dataNascimento = formData.dataNascimento.split('/').reverse().join('-')

        console.log(formData);

        api.put("dependentes/full/" + formData.id, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        .then((response) => {
            toast.success("Aluno editado com sucesso!");
            updateFormData(response.data);
            handleGetDependentes();
        })
        .catch((error) => {
            console.log(error);
        })
       
    }

    const resetarObj = () => {
        resetFormData();
    }

    return (
        <>
            <GenericMainPage 
                values={dependentes} 
                title={""}
                firstLabel={"Escola:"} 
                secondLabel={"Responsável:"} 
                handleCardClick={handleCardClick}
                showForm={formData.id !== ""}
                editFunction={handleEditDependente}
                searchText={filtroNome}
                setSearchText={setFiltroNome}
                cadastrarFunction={() => navigate("/alunos/cadastro")}>
                <ItemFormAluno 
                    store={formData}
                    handleDependente={handleDependenteChange}
                    handleEndereco={handleEnderecoChange}
                    handleResponsavelFinanceiro={handleResponsavelFinanceiroChange}
                    handleResponsavelSecundario={handleResponsavelSecundarioChange}
                    handleFatura={handleFaturaChange}
                    resetarObj={resetarObj}
                    />
            </GenericMainPage>
        </>
    );
};

export default TelaListagemAlunos;