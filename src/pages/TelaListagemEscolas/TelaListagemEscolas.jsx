import React from "react";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
import api from "../../api";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { toast } from "react-toastify";
import ItemForm from "../../components/ItemForm/ItemForm";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const TelaListagemEscolas = () => {

    const navigate = useNavigate();

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
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter esta ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#011638',
            cancelButtonColor: '#E21F1F',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (!result.isConfirmed) { 
                return;
            } else {
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
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: '#011638',
                        confirmButtonText: 'Ok',
                        text: 'Algo deu errado! Tente novamente.',
                    });
                    console.log(error);
                });
            }
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
                cadastrarFunction={() => navigate("/escolas/cadastro")}
                editFunction={handleEditEscola}
                searchText={filtroNome}
                setSearchText={setFiltroNome}
                painel={painelEscola}>
                <ItemForm painelState={painelEscola} setPainelState={setPainelEscola}/>
            </GenericMainPage>
        </>
    );
};

export default TelaListagemEscolas;