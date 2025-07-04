import React from "react";
import styles from "./Dashboard.module.css";
import NavBar from "../../components/NavBar/NavBar";
import ItemList from "../../components/ItemList/ItemList";
import CardDash from "../../components/CardDash/CardDash";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import api from "../../api";
import Cookies from "js-cookie";
import { formatDate } from "../../utils/global";
import { TbFileDownload } from "react-icons/tb";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const [valoresEstaticos, setValoresEstaticos] = useState({
        totalDependentes: 0,
        devedoresMes: 0,
        pagantesMes: 0,
        recebimentoEsperadoMes: 0,
        recebimentoRealizadoMes: 0,
        rendaMesAnterior: 0,
        totalEscolas: 0,
        rendaMediaPorDependente: 0
    });

    const [valoresMes, setValoresMes] = useState({
        esperados: [],
        realizados: []
    });

    const [valoresDia, setValoresDia] = useState({
        esperados: [],
        realizados: []
    });

    const [dependentes, setDependentes] = useState([]);

    const convertDataForHighcharts = (data) => {
        return data.map(item => [item.periodo, item.valor]);
    };

    function handleGetDashboardEstatica() {
        let dataInicio = new Date();
        dataInicio.setDate(1)      

        let dataFim = new Date();
        dataFim.setMonth(dataFim.getMonth() + 1);
        dataFim.setDate(0);

        api.get("/dashboard/dados/"+Cookies.get("id")+"?dataInicio="+formatDate(dataInicio)+"&dataFim="+formatDate(dataFim),
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then((response) => {
            setValoresEstaticos(response.data);
        }).catch((error) => {
            console.log(error);
        });

        api.get("/dashboard/lista-dados-mes/"+Cookies.get("id"),
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then((response) => {
            
            let { esperados = [], realizados = [] } = response.data;

            esperados.forEach(esp => {
                const existe = realizados.some(real => real.periodo === esp.periodo);
                if (!existe) {
                    realizados.push({ periodo: esp.periodo, valor: 0 });
                }
            });

            const safeSortMes = arr =>
                (arr || [])
                    .filter(item => item && item.periodo !== undefined && item.periodo !== null)
                    .sort((a, b) => Number(a.periodo) - Number(b.periodo));

            const sortedDataMes = {
                esperados: safeSortMes(esperados),
                realizados: safeSortMes(realizados)
            };    

            setValoresMes(sortedDataMes);
        }).catch((error) => {
            console.log(error);
        });

        api.get("/dashboard/lista-dados-dia/"+Cookies.get("id"),
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then((response) => {
            const safeSort = arr =>
                (arr || [])
                    .filter(item => item && item.periodo !== undefined && item.periodo !== null)
                    .sort((a, b) => Number(a.periodo) - Number(b.periodo));

            const sortedData = {
                esperados: safeSort(response.data.esperados),
                realizados: safeSort(response.data.realizados)
            };
            
            setValoresDia(sortedData);
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleGetDependentes() {
        api.get("dependentes/full/"+Cookies.get('id')+"?nome=",
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        ).then((response) => {
            if(response.data.length === 0){
                Swal.fire({
                    icon: 'info',
                    title: 'Nenhum dependente encontrado',
                    text: 'Você pode cadastrar um novo dependente clicando no botão "Cadastrar".',
                    confirmButtonColor: '#011638',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    navigate("/alunos");
                });
                return;
            }
            
            setDependentes(response.data);
        }
        ).catch((error) => {
            console.log(error);
        });
    }

    function handleAtualizarPagamento(id, pago){
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
                api.put("/registros-faturas/"+id,
                {
                    faturaId: 0,
                    pago: pago === "NAO_PAGO" ? true : false
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                }).then((response) => {
                    handleGetDashboardEstatica();
                    handleGetDependentes();
                }).catch((error) => {
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
        handleGetDependentes();
        handleGetDashboardEstatica();
    }, []);

    const pieOptions = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
        },
        title: {
            text: "",
        },
        series: [
            {
            name: "Alunos",
            data: [
                {
                    name: "Pagos",
                    y: valoresEstaticos.pagantesMes,
                    color: "#50EB6C"
                },
                {
                    name: "Não pagos",
                    y: valoresEstaticos.devedoresMes,
                    color: "#FF5459"
                }
            ],
            
            },
        ],
    };

    const doubleBarOptions = {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            
        },
        title: {
            text: "Recebimentos mensais",
        },
        series: [
            {
                name: "Esperado",
                data: convertDataForHighcharts(valoresMes.esperados),
                color: "#50EB6C"
            },
            {
                name: "Real",
                data: convertDataForHighcharts(valoresMes.realizados),
                color: "#FF5459"
            },
        ],
        yAxis: {
            title: {
                text: "R$",
                style: {
                    color: "#141414"
                }
            },
            labels: {
                style:{
                    color: "#141414"
                }
            }
        },
        legend: {
            itemStyle: {
                color: "#141414"
            }
        }
    };

    const lineOptions = {
        chart: {
            type: "line",
            backgroundColor: "transparent",
        },
        title: {
            text: "Pagamentos diários",
        },
        series: [
            {
                name: "Pagamentos Esperados",
                data: convertDataForHighcharts(valoresDia.esperados),
                color: "#50EB6C"
            },
            {
                name: "Pagamentos Realizados",
                data: convertDataForHighcharts(valoresDia.realizados),
                color: "#FF5459"
            },

        ],
        yAxis: {
            title: {
                text: ""
            },
            labels: {
                style:{
                    color: "#141414"
                }
            }
        },
        legend: {
            itemStyle: {
                color: "#141414"
            }
        }
    };

    const downloadFile = async () => {
        try {
            const response = await fetch('http://localhost:8080/financas/download-csv/'+Cookies.get('id') , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Authorization': `Bearer ${ Cookies.get('token') }`,
                },
            });

            if (response.ok) {
                const blob = await response.blob();

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'VannBoraFinancas.csv'); // Nome do arquivo
                document.body.appendChild(link);
                link.click();

                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                console.error("Erro ao baixar o arquivo");
            }
        } catch (error) {
            console.error("Erro na requisição", error);
        }
    };

    return (
        <div className={styles.dashboard}>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.top}>
                        <div className={styles.downloadIcon}>
                            <TbFileDownload size={50} color="#011638" style={{cursor:"pointer"}} onClick={downloadFile}/>
                        </div>
                        <div className={styles.chart}>
                            <HighchartsReact highcharts={Highcharts} options={pieOptions} />   
                        </div>
                        <CardDash title={"Total de Alunos"} value={valoresEstaticos.totalDependentes} size={105}/>
                        <CardDash title={"Devedores do mês"} value={valoresEstaticos.devedoresMes} size={105}/>
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.chart}>
                            <HighchartsReact highcharts={Highcharts} options={doubleBarOptions} />
                        </div>
                        <div className={styles.chart}>
                            <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                        </div>
                    </div>
                </div>

                <div className={styles.center}>
                    <CardDash title={"Pagamentos do mês atual"} value={valoresEstaticos.pagantesMes} size={105}/>
                    <CardDash title={"Recebimento esperado do mês"} value={isNaN(valoresEstaticos.recebimentoEsperadoMes) ? "N/A" : "R$"+valoresEstaticos.recebimentoEsperadoMes} size={105}/>
                    <CardDash title={"Recebimento do mês"} value={isNaN(valoresEstaticos.recebimentoRealizadoMes) || valoresEstaticos.recebimentoRealizadoMes === null ? "N/A" : "R$"+valoresEstaticos.recebimentoRealizadoMes} size={75}/>
                    <CardDash title={"Renda total x Mês anterior"} value={
                        isNaN(valoresEstaticos.rendaMesAnterior) ? "N/A" :
                        isNaN(valoresEstaticos.recebimentoRealizadoMes) ? "N/A" :
                        "R$"+(Number(valoresEstaticos.recebimentoRealizadoMes) - Number(valoresEstaticos.rendaMesAnterior))
                        } size={75}/>
                    <CardDash title={"Quantidade de Escolas"} value={valoresEstaticos.totalEscolas} size={75}/>
                    <CardDash title={"Média de R$ por Aluno"} value={"R$"+valoresEstaticos.rendaMediaPorDependente.toFixed(2).replace(".", ",")} size={75}/>
                </div>

                <div className={styles.right}>
                    {/* <div className={styles["top-session"]}>
                        <h1>Buscar Por</h1>
                        <div className={styles["search-box"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input type="text" placeholder={"nome do aluno"} />
                        </div>
                    </div> */}
                    <div className={styles["bottom-session"]}>
                        <ItemList values={dependentes} title={""} firstLabel={"Escola"} secondLabel={"Responsável"} hasButton={true} buttonFunction={handleAtualizarPagamento}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;