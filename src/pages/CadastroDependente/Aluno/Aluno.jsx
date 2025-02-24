import React from 'react';
import styles from './Aluno.module.css';
import Input from '../../../components/Input/Input';
import InputMask from 'react-input-mask';
import SelectItems from '../../../components/SelectItems/SelectItems';

const Aluno = ({handleChange, store, escolas}) => {
    return (
                <div className={styles.container}>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            placeholder={"Nome do aluno"}
                            size={279}
                            styleNumber={1}
                            value={store.nome}
                            onChange={handleChange}
                            name="nome"
                            />
                        <InputMask
                            mask="99/99/9999"
                            maskChar={null}
                            value={store.dataNascimento}
                            onChange={handleChange}
                        >
                            {() => 
                                <Input
                                        type="text"
                                        placeholder={"Data de nascimento"}
                                        size={279}
                                        styleNumber={1}
                                        name="dataNascimento"
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
                            selected={0}
                            onChange={handleChange}
                            name="escolaId"
                        />
                        <Input
                            type="text"
                            placeholder={"Turma"}
                            size={279}
                            styleNumber={1}
                            value={store.turma}
                            onChange={handleChange}
                            name="turma"
                        />
                    </div> 
                    <div className={styles.inputs}>
                        <SelectItems
                            items={[{id:"PADRAO", nome:"Padrão"}, {id:"INTEGRAL", nome:"Integral"}]}
                            placeholder={"Turno"}
                            size={279}
                            styleNumber={1}
                            selected={0}
                            onChange={handleChange}
                            name="turno"
                        />
                        <Input
                            type="text"
                            placeholder={"Condição"}
                            size={279}
                            styleNumber={1}
                            value={store.condicao}
                            onChange={handleChange}
                            name="condicao"
                        />
                    </div>
                </div>
    );
}

export default Aluno;