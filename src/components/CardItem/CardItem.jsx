import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import styles from "./CardItem.module.css";

function CardItem(values) {
  const [items, setItems] = useState([values]);

 

  return (
    <>

      <div className={styles["container-card"]}>
        <div className={styles["item-list-container"]}>
          {items.map((item) => (
            <div key={item.id} className={styles["item-card"]}>
              <h3>{item.titulo}</h3>
              <p>ITENS: {item.itens}</p>
              <p>ITENS PENDENTES: {item.pendentes}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CardItem;
