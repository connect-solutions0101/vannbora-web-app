import React from "react";
import styles from "./CardItem.module.css";
import api from "../../api";
import Cookies from 'js-cookie';
import { FaRegCheckCircle } from "react-icons/fa";

function CardItem({title, firstValue, secondValue, handleCardClick, id, hasButton, buttonColor, buttonFunction}) {

  return (
      <div className={styles["container-card"]} onClick={hasButton ? null : (e) => handleCardClick(id)}>
            <div className={styles["item-card"]}>
              <h3>{title}</h3>
              <p>{firstValue}</p>
              <p>{secondValue}</p>
            </div>
            {hasButton && <FaRegCheckCircle color={buttonColor} className={styles["icon"]} onClick={buttonFunction} />}
      </div>
  );
}

export default CardItem;
