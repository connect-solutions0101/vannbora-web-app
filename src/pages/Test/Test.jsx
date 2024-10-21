import React from "react";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Radio from "../../components/Radio/Radio";
import { inputSomenteTexto } from "../../utils/global";
import NavBar from "../../components/NavBar/NavBar";
import CardItem from "../../components/CardItem/CardItem"

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
            

            <CardItem></CardItem>
        </>
    );
};

export default Test;