import React from "react";
import styles from "./CardItem.module.css";
import api from "../../api";
import Cookies from 'js-cookie';

function CardItem({title, firstValue, secondValue, endpoint, id, setPainelState}) {
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
      <div className={styles["container-card"]} onClick={handleClick}>
            <div className={styles["item-card"]}>
              <h3>{title}</h3>
              <p>{firstValue}</p>
              <p>{secondValue}</p>
            </div>
      </div>
  );
}

export default CardItem;
