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

const Dashboard = () => {

    const [valoresEstaticos, setValoresEstaticos] = useState({
        totalDependentes: 0,
        devedoresMes: 0,
        pagantesMes: 0,
        recebimentoEsperadoMes: 0,
        recebimentoRealizadosMes: 0,
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
            setValoresMes(response.data);
        }).catch((error) => {
            console.log(error);
        });

        api.get("/dashboard/lista-dados-dia/"+Cookies.get("id"),
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then((response) => {
            setValoresDia(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

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

    function handleAtualizarPagamento(id, pago){
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
            console.log(error);
        });
    }

    useEffect(() => {
        handleGetDashboardEstatica();
        handleGetDependentes();
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

    return (
        <div className={styles.dashboard}>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.top}>
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
                    <CardDash title={"Recebimento do mês"} value={isNaN(valoresEstaticos.recebimentoRealizadosMes) ? "N/A" : "R$"+valoresEstaticos.recebimentoRealizadosMes} size={75}/>
                    <CardDash title={"Renda total x Mês anterior"} value={
                        isNaN(valoresEstaticos.rendaMesAnterior) ? "N/A" :
                        isNaN(valoresEstaticos.recebimentoRealizadosMes) ? "N/A" :
                        "R$"+(Number(valoresEstaticos.rendaMesAnterior) - Number(valoresEstaticos.recebimentoRealizadosMes))
                        } size={75}/>
                    <CardDash title={"Quantidade de Escolas"} value={valoresEstaticos.totalEscolas} size={75}/>
                    <CardDash title={"Média de R$ por Aluno"} value={"R$"+valoresEstaticos.rendaMediaPorDependente} size={75}/>
                </div>

                <div className={styles.right}>
                    <div className={styles["top-session"]}>
                        <h1>Buscar Por</h1>
                        <div className={styles["search-box"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input type="text" placeholder={"nome do aluno"} />
                        </div>
                    </div>
                    <div className={styles["bottom-session"]}>
                        <ItemList values={dependentes} title={""} firstLabel={"Escola"} secondLabel={"Responsável"} hasButton={true} buttonFunction={handleAtualizarPagamento}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;