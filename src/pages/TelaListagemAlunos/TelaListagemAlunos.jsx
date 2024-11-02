import React from "react";
import { useEffect } from "react";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
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
            console.log(response.data);
            
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
    const [painelDependente, setPainelDependente] = React.useState({});

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
            </GenericMainPage>
        </>
    );
};

export default TelaListagemAlunos;