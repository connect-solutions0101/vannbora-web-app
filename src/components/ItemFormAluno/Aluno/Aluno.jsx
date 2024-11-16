import React from 'react';
import styles from './Aluno.module.css';
import Input from '../../Input/Input';
import SelectItems from '../../SelectItems/SelectItems';
import { useEffect, useState } from 'react';
import api from '../../../api';
import Cookies from 'js-cookie';

const Aluno = ({alunoRef}) => {
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

    return (
                <div className={styles.container}>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Nome do aluno"}
                            size={176}
                            styleNumber={1}
                            ref={(el) => (alunoRef.current.nome = el)}
                            />
                        <Input
                            type="text"
                            label={"Data de nascimento"}
                            size={176}
                            styleNumber={1}
                            ref={(el) => (alunoRef.current.dataNascimento = el)}
                            />
                    </div>
                    <div className={styles.inputs}>
                        <SelectItems
                            items={escolas}
                            label={"Escola"}
                            size={176}
                            styleNumber={1}
                            ref={(el) => (alunoRef.current.escolaId = el)}
                        />
                        <Input
                            type="text"
                            label={"Turma"}
                            size={176}
                            styleNumber={1}
                            ref={(el) => (alunoRef.current.turma = el)}
                        />
                    </div> 
                    <div className={styles.inputs}>
                        <SelectItems
                            items={[{id:"PADRAO", nome:"Padrão"}, {id:"INTEGRAL", nome:"Integral"}]}
                            label={"Turno"}
                            size={176}
                            styleNumber={1}
                            ref={(el) => (alunoRef.current.turno = el)}
                        />
                        <Input
                            type="text"
                            label={"Condição"}
                            size={176}
                            styleNumber={1}
                            ref={(el) => (alunoRef.current.condicao = el)}
                        />
                    </div>
                </div>
    );
}

export default Aluno;