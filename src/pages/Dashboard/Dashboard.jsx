import React from "react";
import style from "./Dashboard.module.css";
import NavBar from "../../components/NavBar/NavBar";

const Dashboard = () => {
    return (
        <div className={style.dashboard}>
            <NavBar />
            
        </div>
    );
}

export default Dashboard;