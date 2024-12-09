import React from "react";
import styles from "./CardItem.module.css";
import api from "../../api";
import Cookies from 'js-cookie';
import { FaRegCheckCircle } from "react-icons/fa";

function CardItem({title, firstValue, secondValue, endpoint, id, setPainelState, hasButton, buttonColor, buttonFunction}) {
  const handleClick = () => {
    api.get("/" + endpoint + "/" + id, {
      headers: {
      Authorization: `Bearer ${Cookies.get('token')}`
      }
    }).then((response) => {
      setPainelState(response.data);
    });
  };

  return (
      <div className={styles["container-card"]} onClick={hasButton ? null : handleClick}>
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
