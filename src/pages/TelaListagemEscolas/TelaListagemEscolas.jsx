import React from "react";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
import api from "../../api";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { toast } from "react-toastify";
import ItemForm from "../../components/ItemForm/ItemForm";

const TelaListagemEscolas = () => {

    function handleGetEscolas() {
        api.get("escolas/full/"+Cookies.get('id'),
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
        console.log(painelEscola);
        
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
                setPainel={setPainelEscola}
                editFunction={handleEditEscola}
                painel={painelEscola}>
                <ItemForm painelState={painelEscola} setPainelState={setPainelEscola}/>
            </GenericMainPage>
        </>
    );
};

export default TelaListagemEscolas;