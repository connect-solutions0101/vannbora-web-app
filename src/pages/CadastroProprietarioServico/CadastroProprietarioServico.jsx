import React, { useState } from "react";
import styles from "./CadastroProprietarioServico.module.css";
import api from "../../api";
import logotipo from "../../utils/assets/Logotipo.svg";
import Input from "../../components/Input/Input";
import Radio from "../../components/Radio/Radio";
import Botao from "../../components/Botao/Botao";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

const CadastroProprietarioServico = () => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [role, setRole] = useState("USER");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setNome(nome + " " + sobrenome);
        handleSave();
    };

    const handleSave = async () => {
        const proprietario = {
            nome, 
            email, 
            cpf, 
            senha, 
            role
        };
        
        api
          .post(`auth/registrar`, proprietario)
          .then((r) => {
            console.log(r);
            toast.success("Usuário cadastrado com sucesso!");
            navigate("/login");
          })
          .catch((e) => {
            console.error(e);
            toast.error(
              "Ocorreu um erro ao salvar os dados, por favor, tente novamente."
            );
          });
      };

    return (
        <>
            <div className={styles["container"]}>
                    <form className={styles["formulario"]} onSubmit={handleSubmit}>
                        <img src={logotipo} alt="Logotipo Vannbora" />
                        <h1>Cadastro de novo <span>usuário</span></h1>
                        <div className={styles["inputs"]}>
                            <Input
                                type="text"
                                label="Nome"
                                value={nome}
                                onChange={(e) => handleInputChange(e, setNome)}
                            />
                            
                            <Input
                                type="text"
                                label="Sobrenome"
                                value={sobrenome}
                                onChange={(e) => handleInputChange(e, setSobrenome)}
                            />
                        </div>
                        
                        <div className={styles["inputs"]}>
                            <Input
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                            />

                            <Input
                                type="text"
                                label="CPF"
                                value={cpf}
                                onChange={(e) => handleInputChange(e, setCpf)}  
                            />
                        </div>
                        <div className={styles["inputs"]}>
                            <Input
                                type="password"
                                label="Senha"
                                value={senha}
                                onChange={(e) => handleInputChange(e, setSenha)}
                            />
                            <Radio
                                label="Tipo de usuário"
                                radioLabels={["Usuário", "Admin"]}
                                values={["USER", "ADMIN"]}
                                name="role"
                                onChange={(e) => handleInputChange(e, setRole)}
                            />
                        </div>
                        
                        <Botao 
                            type="submit" 
                            size={170}
                            colorPreset="yellow"
                            hoverPreset="blue"
                        >
                        Cadastrar
                        </Botao>

                        <div className={styles["footer"]}>
                            <p>Já possui uma conta?</p>
                            <a href="/login">Faça login</a>
                        </div>
                    </form>
            </div>

            
        </>
    );
};

export default CadastroProprietarioServico;