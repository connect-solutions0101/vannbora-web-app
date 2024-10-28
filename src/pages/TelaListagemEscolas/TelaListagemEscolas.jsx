import React from "react";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
import api from "../../api";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import ItemForm from "../../components/ItemForm/ItemForm";

const TelaListagemEscolas = () => {

    function handleGetEscolas() {
        api.get(process.env.REACT_APP_ESCOLAS_URI,
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

    useEffect(() => {
        handleGetEscolas();
    }, []);

    const [escolas, setEscolas] = React.useState([]);

    const [painelEscola, setPainelEscola] = React.useState({
        id: "",
        nome: "",
        telefone: "",
        representante: "",
        telRepresentante: "",
        cep: "",
        numero: "",
        logradouro: "",
        cidade: "",
        bairro: ""
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
                editFunction={console.log(painelEscola)}
                painel={painelEscola}>
                <ItemForm painelState={painelEscola} setPainelState={setPainelEscola}/>
            </GenericMainPage>
        </>
    );
};

export default TelaListagemEscolas;