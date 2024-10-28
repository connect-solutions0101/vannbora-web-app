import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./GenericMainPage.module.css";
import Botao from "../../components/Botao/Botao";
import Painel from "../../components/Painel/Painel";
import ItemList from "../../components/ItemList/ItemList";

const GenericMainPage = ({
    values,
    title,
    firstLabel,
    secondLabel,
    searchFunction,
    cadastrarFunction,
    editFunction,
    endpoint,
    setPainel,
    painel,
    children
}) => {

    return (
        <>
            <NavBar />
            <div className={styles["container"]}> 
                <div className={styles["painel"]}>
                    <div className={styles["left"]}>
                        <div className={styles["top-session"]}>
                            <h1>Buscar Por</h1>
                            <div className={styles["search-box"]}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <input type="text" placeholder={title} />
                            </div>
                        </div>
                        <div className={styles["bottom-session"]}>
                            <ItemList values={values} title={title} firstLabel={firstLabel} secondLabel={secondLabel} endpoint={endpoint} setPainelState={setPainel}/>
                        </div>
                    </div>
                    <div className={styles["right"]}>
                        <div className={styles["top-session"]}>
                            <Botao colorPreset={"blue"} hoverPreset={"yellow"} size={150} onClick={cadastrarFunction}> Cadastrar </Botao>
                        </div>
                        <div className={styles["bottom-session"]}>
                            <Painel editFunction={editFunction} painelItems={painel}>
                                {painel.id !== "" ? (
                                    children
                                ) : (
                                    null
                                )}
                            </Painel>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenericMainPage;