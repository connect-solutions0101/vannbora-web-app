import React from "react";
import ItemList from "../../components/ItemList/ItemList";
import CardItem from "../../components/CardItem/CardItem";
import Input from "../../components/Input/Input";
import Radio from "../../components/Radio/Radio";
import NavBar from "../../components/NavBar/NavBar";
import Botao from "../../components/Botao/Botao";

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
            <NavBar />
            <ItemList values={values} title={"Escola"} firstLabel={"Alunos:"} secondLabel={"Pagamentos Restantes:"}/>
            {/* <CardItem title="Escola 01" firstValue="Alunos: 12" secondValue="Pagamentos Restantes: 0" />
            <Input size={224} type="text" label="Nome" value="" onChange={() => { }} />
            <Radio size={224} label="Sexo" radioLabels={["Masculino", "Feminino"]} values={["M", "F"]} name="sexo" onChange={() => { }} />
            <Botao size={150} onClick={() => { }} colorPreset={"white"} hoverPreset={"yellow"}>Minhas Escolas</Botao> */}
        </div>

    );
};

export default Test;