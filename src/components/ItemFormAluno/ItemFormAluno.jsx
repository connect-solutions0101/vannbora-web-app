import React from 'react';
import styles from './ItemFormAluno.module.css';
import Input from '../Input/Input';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useRef, useState } from "react";
import Responsaveis from './Responsaveis/Responsaveis';
import Aluno from './Aluno/Aluno';
import Endereco from './Endereco/Endereco';
import Fatura from './Fatura/Fatura';
import NextLink from '../NextLink/NextLink';
import PreviousLink from '../PreviousLink/PreviousLink';
import Botao from '../Botao/Botao';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

function ItemFormAluno({endpoint, setPainelState, painelState}) {
    const responsavel1 = useRef({});
    const responsavel2 = useRef({});
    const aluno = useRef({});
    const endereco = useRef({});
    const fatura = useRef({});

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        <div style={{display:"flex", gap:"80px"}}>
            <Responsaveis responsaveisRef={responsavel1}/>
            <Responsaveis responsaveisRef={responsavel2}/>
        </div>,
        <Aluno alunoRef={aluno}/>,
        <Endereco enderecoRef={endereco}/>,
        <Fatura faturaRef={fatura}/>
    ];

    const handleNextLink = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    }

    const handlePreviousLink = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    }

    const resetarObj = () => {
        setPainelState({
            nome: "",
            dataNascimento: "",
            turno: "",
            condicao: "",
            turma: "",
            escolaId: "",
            responsavel1: {
                id: "",
                nome: "",
                telefone: "",
                email: "",
            },
            responsavel2: {
                id: "",
                nome: "",
                telefone: "",
                email: "",
            },
        });
    }



    return (
        <div className={styles['container']}>
            <RiCloseCircleLine className={styles.closeButton} onClick={resetarObj}/>
            <form className={styles['formulario']}>
                <div className={styles.formContent}>
                    <h1>Informações do <span style={{color:'#0D21A1'}}>aluno</span></h1>
                    <div style={{width:"432px", display:"flex", justifyContent:"center"}}>
                        {steps[currentStep]}
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%", marginTop:"36px"}}>
                        <div>
                            {currentStep > 0 && (
                                <PreviousLink onClickFunction={handlePreviousLink} size={"large"} color={"light"} />
                            )}
                        </div>
                        <div>
                            {currentStep < steps.length - 1 ? (
                                <NextLink onClickFunction={handleNextLink} size={"large"} color={"light"} />
                            ) : (
                                <Botao 
                                    colorPreset={"blue"} 
                                    hoverPreset={"yellow"}
                                    size={130} 
                                    onClickFunction={() => console.log("Salvando...")}>
                                        Salvar
                                </Botao>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ItemFormAluno;