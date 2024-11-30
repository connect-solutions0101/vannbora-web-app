import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericMainPage from "../../components/GenericMainPage/GenericMainPage";
import ItemFormAluno from "../../components/ItemFormAluno/ItemFormAluno";
import Cookies from 'js-cookie';
import api from "../../api";
import { transformarData } from "../../utils/global";
import { toast } from "react-toastify";

const TelaListagemAlunos = () => {  

    const navigate = useNavigate();
    
    const [dependentes, setDependentes] = useState([]);
    const [painelDependente, setPainelDependente] = useState({
        id: ""
    });
    const [firstRender, setFirstRender] = useState(true);
    const [shouldCallApi, setShouldCallApi] = useState(false);

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

    useEffect(() => {
        if(painelDependente.responsaveis === undefined || firstRender !== true) return;
        responsavel1.current = painelDependente.responsaveis[0].responsavel;
        responsavel2.current = painelDependente.responsaveis[1] ? painelDependente.responsaveis[1].responsavel : null;
        aluno.current = {
            nome: painelDependente.nome,
            dataNascimento: transformarData(painelDependente.dataNascimento),
            turno: painelDependente.turno,
            condicao: painelDependente.condicao,
            turma: painelDependente.turma,
            escolaId: painelDependente.escola.id,
        };
        endereco.current = painelDependente.responsaveis[0].responsavel.endereco;
        fatura.current = painelDependente.fatura;

        setFirstRender(false);
    }, [painelDependente]);

    useEffect(() => {
        if (shouldCallApi) {
            api.put("dependentes/full/" + painelDependente.id, painelDependente, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            })
            .then((response) => {
                toast.success("Aluno editado com sucesso!");
                setPainelDependente(response.data);
                handleGetDependentes();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setShouldCallApi(false);
            });
        }
    }, [shouldCallApi, painelDependente]);

    function handleEditDependente() {     
        setPainelDependente({
            id: painelDependente.id,
            nome: aluno.current.nome,
            dataNascimento: aluno.current.dataNascimento.split('/').reverse().join('-'),
            turno: aluno.current.turno,
            condicao: aluno.current.condicao,
            turma: aluno.current.turma,
            escolaId: aluno.current.escolaId,
            responsaveis: [
            {
                responsavel: responsavel1.current,
                dependenteId: painelDependente.id,
                tipoResponsavel: "FINANCEIRO"
            },
            (responsavel2.current === null) ? null :
            {
                responsavel: responsavel2.current,
                dependenteId: painelDependente.id,
                tipoResponsavel: "PADRAO"
            }
            ],
            fatura: fatura.current,
        });
  
        setShouldCallApi(true);
    }

    const responsavel1 = useRef({});
    const responsavel2 = useRef({});
    const aluno = useRef({});
    const endereco = useRef({});
    const fatura = useRef({});

    const resetarObj = () => {
        setPainelDependente({
            id: ""
        });
        setFirstRender(true);
    }

    return (
        <>
            <GenericMainPage 
                values={dependentes} 
                title={"Aluno"} 
                firstLabel={"Escola:"} 
                secondLabel={"Responsável:"} 
                endpoint={"dependentes/fullPorId"}
                setPainel={setPainelDependente}
                painel={painelDependente}
                editFunction={handleEditDependente}
                cadastrarFunction={() => navigate("/alunos/cadastro")}>
                <ItemFormAluno 
                    setPainelState={setPainelDependente} 
                    painelState={painelDependente}
                    responsavel1={responsavel1}
                    responsavel2={responsavel2}
                    aluno={aluno}
                    endereco={endereco}
                    fatura={fatura}
                    resetarObj={resetarObj}
                    />
            </GenericMainPage>
        </>
    );
};

export default TelaListagemAlunos;