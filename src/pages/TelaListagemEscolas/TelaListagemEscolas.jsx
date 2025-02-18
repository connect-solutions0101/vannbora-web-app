import React from "react";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
import api from "../../api";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { toast } from "react-toastify";
import ItemForm from "../../components/ItemForm/ItemForm";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/escolaStore";

const TelaListagemEscolas = () => {

    const navigate = useNavigate();

    const { formData, updateFormData, replaceFormData, resetFormData } = useStore();

    const [filtroNome, setFiltroNome] = React.useState("");

    useEffect(() => {
        handleGetEscolas()
    }, [filtroNome]);

    function handleGetEscolas() {
        api.get("escolas/full/"+Cookies.get('id')+"?nome="+filtroNome,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        ).then((response) => {
            setEscolas(response.data);
        }
        ).catch((error) => {
            console.log(error);
        });
    }

    function handleEditEscola() {        
        api.put("escolas/"+painelEscola.id,
            painelEscola,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                },
            }
        ).then((response) => {
            setPainelEscola(response.data);
            toast.success("Escola editada com sucesso!");
        }
        ).catch((error) => {
            toast.error("Houve um problema na edição da escola, por favor, tente novamente.");
            console.log(error);
        });
    }

    useEffect(() => {
        handleGetEscolas();
    }, []);

    const [escolas, setEscolas] = React.useState([]);

    const [painelEscola, setPainelEscola] = React.useState({
        id: "",
        nome: "",
        telefone: "",
        nomeRepresentante: "",
        telefoneRepresentante: "",
        endereco:{
            id: "",
            cep: "",
            numero: "",
            logradouro: "",
            cidade: "",
            bairro: "",
            pontoReferencia: ""
        }
    });

    

    return (
        <>
           <GenericMainPage 
                values={escolas} 
                title={"Escola"} 
                firstLabel={"Alunos:"} 
                secondLabel={"Pagamentos Restantes:"} 
                endpoint={"escolas"}
                setPainel={replaceFormData}
                cadastrarFunction={() => navigate("/escolas/cadastro")}
                editFunction={handleEditEscola}
                searchText={filtroNome}
                setSearchText={setFiltroNome}
                painel={formData}>
                <ItemForm/>
            </GenericMainPage>
        </>
    );
};

export default TelaListagemEscolas;