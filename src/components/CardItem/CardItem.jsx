import React from "react";
import styles from "./CardItem.module.css";

function CardItem({title, firstValue, secondValue}) {

  return (
      <div className={styles["container-card"]}>
            <div className={styles["item-card"]}>
              <h3>{title}</h3>
              <p>{firstValue}</p>
              <p>{secondValue}</p>
            </div>
      </div>
  );
}

export default CardItem;
