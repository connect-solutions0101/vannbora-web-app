import React from 'react';
import styles from './Aluno.module.css';
import Input from '../../../components/Input/Input';
import InputMask from 'react-input-mask';
import SelectItems from '../../../components/SelectItems/SelectItems';
import { useEffect, useState } from 'react';
import api from '../../../api';
import Cookies from 'js-cookie';

const Aluno = ({alunoRef, escolas}) => {
    

    return (
                <div className={styles.container}>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            placeholder={"Nome do aluno"}
                            size={279}
                            styleNumber={1}
                            value={alunoRef.current.nome}
                            onChange={(e) => alunoRef.current.nome = e.target.value}
                            />
                        <InputMask
                            mask="99/99/9999"
                            maskChar={null}
                            value={alunoRef.current.dataNascimento}
                            onChange={(e) => alunoRef.current.dataNascimento = e.target.value}
                        >
                            {() => 
                                <Input
                                        type="text"
                                        placeholder={"Data de nascimento"}
                                        size={279}
                                        styleNumber={1}
                                />
                            }
                        </InputMask>
                    </div>
                    <div className={styles.inputs}>
                        <SelectItems
                            items={escolas}
                            placeholder={"Escola"}
                            size={279}
                            styleNumber={1}
                            selected={alunoRef.current.escolaId}
                            onChange={(e) => alunoRef.current.escolaId = e.target.value}
                        />
                        <Input
                            type="text"
                            placeholder={"Turma"}
                            size={279}
                            styleNumber={1}
                            value={alunoRef.current.turma}
                            onChange={(e) => alunoRef.current.turma = e.target.value}
                        />
                    </div> 
                    <div className={styles.inputs}>
                        <SelectItems
                            items={[{id:"PADRAO", nome:"Padrão"}, {id:"INTEGRAL", nome:"Integral"}]}
                            placeholder={"Turno"}
                            size={279}
                            styleNumber={1}
                            selected={alunoRef.current.turno}
                            onChange={(e) => alunoRef.current.turno = e.target.value}
                        />
                        <Input
                            type="text"
                            placeholder={"Condição"}
                            size={279}
                            styleNumber={1}
                            value={alunoRef.current.condicao}
                            onChange={(e) => alunoRef.current.condicao = e.target.value}
                        />
                    </div>
                </div>
    );
}

export default Aluno;