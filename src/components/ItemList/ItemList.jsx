import React from "react";
import styles from "./ItemList.module.css";
import CardItem from "../CardItem/CardItem";

function ItemList({values, title, firstLabel, secondLabel}) {
    return (
            <div className={styles["container"]}>
                    {values.map((item, index) => (
                        <CardItem 
                        key={index} 
                        title={title+" "+item.title} 
                        firstValue={firstLabel+" "+item.firstValue} 
                        secondValue={secondLabel+" "+item.secondValue} 
                        />
                    ))}
            </div>
    );
};

export default ItemList;