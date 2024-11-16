import React from "react";
import { useEffect } from "react";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
import ItemFormAluno from "../../components/ItemFormAluno/ItemFormAluno";
import Cookies from 'js-cookie';
import api from "../../api";

const TelaListagemAlunos = () => {  

    function handleGetDependentes() {
        api.get("dependentes/full/"+Cookies.get('id'),
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

    useEffect(() => {
        handleGetDependentes();
    }, []);

    const [dependentes, setDependentes] = React.useState([]);
    const [painelDependente, setPainelDependente] = React.useState({
        id: "",
        nome: "",
        dataNascimento: "",
        turno: "",
        condicao: "",
        turma: "",
        escolaId: "",
        responsavel1: {
            id: "",
            nome: "",
            telefone: "",
            email: "",
        },
        responsavel2: {
            id: "",
            nome: "",
            telefone: "",
            email: "",
        },
        endereco: {
            id: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: "",
        },
        fatura: {
            id: "",
            valor: "",
            dataVencimento: "",
            status: "",
        }
    });

    return (
        <>
            <GenericMainPage 
                values={dependentes} 
                title={"Aluno"} 
                firstLabel={"Escola:"} 
                secondLabel={"Responsável:"} 
                endpoint={"dependentes"}
                setPainel={setPainelDependente}
                painel={painelDependente}>
                <ItemFormAluno 
                    setPainelState={setPainelDependente} 
                    painelState={painelDependente}/>
            </GenericMainPage>
        </>
    );
};

export default TelaListagemAlunos;