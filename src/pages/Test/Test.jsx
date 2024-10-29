import React from 'react';
import Cookies from 'js-cookie';
import Botao from '../../components/Botao/Botao';

function Test() {

    return (
        <>
           <Botao 
                type="submit" 
                size={170}
                colorPreset="whiteBlue"
                hoverPreset="blue"
            >
            Cadastrar
            </Botao>
        </>
    );
}
export default Test;
