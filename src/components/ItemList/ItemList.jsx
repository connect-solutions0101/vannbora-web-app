import React from "react";
import styles from "./ItemList.module.css";
import CardItem from "../CardItem/CardItem";

function ItemList({values}) {
    return (
            <div className={styles["container"]}>
                    {values.map((item, index) => (
                        <CardItem 
                        key={index} 
                        title={item.title} 
                        firstValue={item.firstValue} 
                        secondValue={item.secondValue} 
                        />
                    ))}
            </div>
    );
};

export default ItemList;