import React from "react";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
import api from "../../api";
import Cookies from 'js-cookie';
import { useEffect } from "react";

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
    const [painelEscola, setPainelEscola] = React.useState({});

    return (
        <>
           <GenericMainPage 
                values={escolas} 
                title={"Escola"} 
                firstLabel={"Alunos:"} 
                secondLabel={"Pagamentos Restantes:"} 
                endpoint={"escolas"}
                setPainel={setPainelEscola}
                painel={painelEscola}>
            </GenericMainPage>
        </>
    );
};

export default TelaListagemEscolas;