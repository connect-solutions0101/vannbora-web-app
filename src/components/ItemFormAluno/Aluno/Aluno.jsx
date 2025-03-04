import React from 'react';
import styles from './Aluno.module.css';
import Input from '../../Input/Input';
import InputMask from 'react-input-mask';
import SelectItems from '../../SelectItems/SelectItems';
import { baseDateToBrDate } from '../../../utils/global';

const Aluno = ({handleChange, store, escolas}) => {
    return (
                <div className={styles.container}>
                    <div className={styles.inputs}>
                        <Input
                            type="text"
                            label={"Nome do aluno"}
                            size={176}
                            styleNumber={1}
                            value={store.nome}
                            onChange={handleChange}
                            name="nome"
                            />
                        <InputMask
                            mask="99/99/9999"
                            maskChar={null}
                            value={baseDateToBrDate(store.dataNascimento)}
                            onChange={handleChange}
                        >
                            {() => 
                                <Input
                                        type="text"
                                        label={"Data de nascimento"}
                                        size={176}
                                        styleNumber={1}
                                        name="dataNascimento"
                                />
                            }
                        </InputMask>
                    </div>
                    <div className={styles.inputs}>
                        <SelectItems
                            items={escolas}
                            label={"Escola"}
                            size={176}
                            styleNumber={1}
                            selected={store.escola.id}
                            onChange={handleChange}
                            name="escolaId"
                        />
                        <Input
                            type="text"
                            label={"Turma"}
                            size={176}
                            styleNumber={1}
                            value={store.turma}
                            onChange={handleChange}
                            name="turma"
                        />
                    </div> 
                    <div className={styles.inputs}>
                        <SelectItems
                            items={[{id:"PADRAO", nome:"Padrão"}, {id:"INTEGRAL", nome:"Integral"}]}
                            label={"Turno"}
                            size={176}
                            styleNumber={1}
                            selected={store.turno}
                            onChange={handleChange}
                            name="turno"
                        />
                        <Input
                            type="text"
                            label={"Condição"}
                            size={176}
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