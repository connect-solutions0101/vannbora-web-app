import React from "react";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Radio from "../../components/Radio/Radio";
import { inputSomenteTexto } from "../../utils/global";

const Test = () => {

const [inputValue, setInputValue] = useState("");
const [inputValue2, setInputValue2] = useState("");

const handleInputChange = (event) => {
    inputSomenteTexto(event);
    setInputValue(event.target.value);
};

const handleInputChange2 = (event) => {
    console.log(event.target.value);
    console.log(inputValue2);
    setInputValue2(event.target.value);
}

    return (
        <>
            <Input
                type="text"
                label="Input"
                value={inputValue}
                onChange={handleInputChange}
            />
            <Radio 
                size={250}
                label="Radio"
                radioLabels={["Usuário", "Admin"]}
                values={["Opção 1", "Opção 2"]}
                name="radio"
                onChange={handleInputChange2}
            />
        </>
    );
};

export default Test;