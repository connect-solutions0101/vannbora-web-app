import React from "react";
import styles from "./ItemList.module.css";
import CardItem from "../CardItem/CardItem";

function ItemList({values, title, firstLabel, secondLabel, hasButton, buttonFunction, handleCardClick}) {

    return (
            <div className={styles["container"]}>
                    {values.length !== 0 && values.map((item, index) => (
                        <CardItem 
                            key={index} 
                            title={title+" "+item.nome} 
                            firstValue={firstLabel+" "+ (item.escola !== undefined ? item.escola.nome : item.quantidadeAlunos)} 
                            secondValue={secondLabel+" "+ (item.turma !== undefined ? item.responsaveis[0].responsavel.nome : item.pagamentosPendentes)} 
                            handleCardClick={handleCardClick}
                            id={item.id}
                            hasButton={hasButton}
                            buttonColor={item.ultimaFaturaPaga === "PAGO" ? "#50EB6C" : "#FF5459"}
                            buttonFunction={() => buttonFunction(item.ultimaFaturaId, item.ultimaFaturaPaga)}
                        />
                    ))}
            </div>
    );
};

export default ItemList;