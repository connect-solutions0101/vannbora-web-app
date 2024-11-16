import React from 'react';
import Cookies from 'js-cookie';
import Input from '../../components/Input/Input';
import NextLink from '../../components/NextLink/NextLink';
import PreviousLink from '../../components/PreviousLink/PreviousLink';
import Botao from '../../components/Botao/Botao';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemFormAluno from '../../components/ItemFormAluno/ItemFormAluno';
import SelectItems from '../../components/SelectItems/SelectItems';

function Test() {

    // const downloadFile = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/financas/download-csv ', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/octet-stream',
    //                 'Authorization': `Bearer ${ Cookies.get('token') }`,
    //             },
    //         });

    //         if (response.ok) {
    //             // Converte o byte[] em um Blob
    //             const blob = await response.blob();

    //             // Cria uma URL para o Blob e simula o clique para download
    //             const url = window.URL.createObjectURL(blob);
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', 'VannBoraFinancas.csv'); // Nome do arquivo
    //             document.body.appendChild(link);
    //             link.click();

    //             // Limpa a URL e remove o link criado
    //             link.parentNode.removeChild(link);
    //             window.URL.revokeObjectURL(url);
    //         } else {
    //             console.error("Erro ao baixar o arquivo");
    //         }
    //     } catch (error) {
    //         console.error("Erro na requisição", error);
    //     }
    // };

    const navigate = useNavigate();

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
        }
      ]);

    return (
        <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
            {/* <NextLink size={"small"} color={"light"}/>
            <PreviousLink size={"small"} color={"light"}/> */}

            {/* <Breadcrumb items={breadcrumbItems} /> */}

            <ItemFormAluno />
            {/* <SelectItems items={[{id:1, nome:"Escola 1"}, {id:2, nome:"Escola 2"}, {id:3, nome:"Escola 3"}]} label={"Escola"} size={176} styleNumber={1} /> */}
        </div>
    );
}
export default Test;
