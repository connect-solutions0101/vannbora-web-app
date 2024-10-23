import React from "react";
import ItemList from "../../components/ItemList/ItemList";
import CardItem from "../../components/CardItem/CardItem";
import CardDash from "../../components/CardDash/CardDash";
import MiniCardDash from "../../components/MiniCardDash/MiniCardDash";
import Input from "../../components/Input/Input";
import Radio from "../../components/Radio/Radio";
import NavBar from "../../components/NavBar/NavBar";
import Botao from "../../components/Botao/Botao";
import { FaMoneyBill } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";


const Test = () => {
    const values = [
        {
            title: "01",
            firstValue: "12",
            secondValue: "0"
        },
        {
            title: "02",
            firstValue: "12",
            secondValue: "0"
        },
        {
            title: "03",
            firstValue: "12",
            secondValue: "0"
        },
        {
            title: "04",
            firstValue: "12",
            secondValue: "0"
        },
        {
            title: "05",
            firstValue: "12",
            secondValue: "0"
        },
        {
            title: "06",
            firstValue: "12",
            secondValue: "0"
        }
    ];

    return (
        <div>
            <CardDash title={"Renda Total"} value={"R$5.000,00"} icon={<FaMoneyBill size={32}/>}/>
            <CardDash title={"Quantidade de Alunos"} value={"42"} icon={<FaUsers size={32} />}/>
            <MiniCardDash title={"Alunos Novos do mês"} value={"13"} icon={<FiUserPlus size={24}/>}/>
        </div>

    );
};

export default Test;