import React from "react";
import ItemList from "../../components/ItemList/ItemList";

const Test = () => {
    const values = [
        {
            title: "Escola 01",
            firstValue: "Alunos: 12",
            secondValue: "Pagamentos Restantes: 0"
        },
        {
            title: "Escola 02",
            firstValue: "Alunos: 12",
            secondValue: "Pagamentos Restantes: 0"
        },
        {
            title: "Escola 03",
            firstValue: "Alunos: 12",
            secondValue: "Pagamentos Restantes: 0"
        },
        {
            title: "Escola 04",
            firstValue: "Alunos: 12",
            secondValue: "Pagamentos Restantes: 0"
        }

    ];

    return (
        <div>
            <ItemList values={values} />
        </div>
    );
};

export default Test;