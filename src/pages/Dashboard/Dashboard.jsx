import React from "react";
import styles from "./Dashboard.module.css";
import NavBar from "../../components/NavBar/NavBar";
import ItemList from "../../components/ItemList/ItemList";
import CardDash from "../../components/CardDash/CardDash";
import { useState } from "react";

const Dashboard = () => {

    const [values, setValues] = useState([
        {
            id: 1,
            name: "João",
            email: ""
        }
    ]);

    return (
        <div className={styles.dashboard}>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.left}>

                </div>

                <div className={styles.center}>
                    <CardDash title={"Usuários"} value={values.length} />
                </div>

                <div className={styles.right}>
                    <div className={styles["top-session"]}>
                        <h1>Buscar Por</h1>
                        <div className={styles["search-box"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input type="text" placeholder={"a"} />
                        </div>
                    </div>
                    <div className={styles["bottom-session"]}>
                        <ItemList values={values} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;