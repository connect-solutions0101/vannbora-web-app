import React from 'react';
import styles from './ItemFormAluno.module.css';
import Input from '../Input/Input';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useRef, useState, useEffect } from "react";
import Responsaveis from './Responsaveis/Responsaveis';
import Aluno from './Aluno/Aluno';
import Endereco from './Endereco/Endereco';
import Fatura from './Fatura/Fatura';
import NextLink from '../NextLink/NextLink';
import PreviousLink from '../PreviousLink/PreviousLink';
import Botao from '../Botao/Botao';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import api from '../../api';
import Cookies from 'js-cookie';

const ItemFormAluno = ({
        painelState,
        setPainelState,
        responsavel1,
        responsavel2,
        aluno,
        endereco,
        fatura,
        resetarObj
    }) => {
        
    const [currentStep, setCurrentStep] = useState(0);
    const [step, setStep] = useState();

    function getSteps(){
        switch(currentStep){
            case 0:
                return (
                    <div style={{display:"flex", gap:"80px"}}>
                        <Responsaveis responsaveisRef={responsavel1}/>
                        {
                            responsavel2.current !== null ? (
                                <Responsaveis responsaveisRef={responsavel2}/>
                            ) : (
                                null
                            )
                        }
                    </div>
                );
            case 1:
                return <Aluno alunoRef={aluno} escolas={escolas}/>;
            case 2:
                return <Endereco enderecoRef={endereco}/>;
            case 3:
                return <Fatura faturaRef={fatura}/>;
        }
    }

    const handleNextLink = async () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
    
    const handlePreviousLink = async() => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    }

    function handleGetEscolas(){
        api.get("escolas/proprietario/"+Cookies.get('id'),
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            }
        ).then((response) => {
            setEscolas(response.data);
        }
        ).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        handleGetEscolas();
    }, []);

    const [escolas, setEscolas] = useState([]);

    useEffect(() => {
        setStep(getSteps());
    }, [currentStep]);

    return (
        <div className={styles['container']}>
            <RiCloseCircleLine className={styles.closeButton} onClick={resetarObj}/>
            <form className={styles['formulario']}>
                <div className={styles.formContent}>
                    <h1>Informações do <span style={{color:'#0D21A1'}}>aluno</span></h1>
                    <div style={{width:"432px", display:"flex", justifyContent:"center"}}>
                        {step}
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%", marginTop:"36px"}}>
                        <div>
                            {currentStep > 0 ? (
                                <PreviousLink onClickFunction={handlePreviousLink} size={"big"} color={"light"} />
                            ) : (
                                <div style={{width:"130px"}}></div>
                            )}
                        </div>
                        <div>
                            {currentStep < 3 ? (
                                <NextLink onClickFunction={handleNextLink} size={"big"} color={"light"} />
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ItemFormAluno;