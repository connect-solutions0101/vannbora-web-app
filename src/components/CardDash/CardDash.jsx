import React from "react";
import style from "./CardDash.module.css";

const CardDash = ({ title, value, icon, size }) => {
    return (
        <div className={style.card} style={{height:size}}>
            <div className={style.title}>
                {icon}
                <span>{title}</span>
            </div>
            <span>{value}</span>
        </div>
    );
};

export default CardDash;