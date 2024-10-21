import React, { useState } from "react";
import styles from "./LoginProprietarioServico.module.css";
import api from "../../api";
import logotipo from "../../utils/assets/Logotipo.svg";
import Input from "../../components/Input/Input";
import Radio from "../../components/Radio/Radio";
import Botao from "../../components/Botao/Botao";
import { toast } from "react-toastify";


const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

const LoginProprietarioServico = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulário enviado:", { email, senha});
        handleSave();
    };

    const handleSave = async () => {
        const proprietario = {
            email, 
            senha, 
        };
        
        api
          .post(`auth/registrar`, proprietario)
          .then((r) => {
            console.log(r);
            toast.success("Login realizado com sucesso!");
          })
          .catch((e) => {
            console.error(e);
            toast.error(
              "Houve um problema na realização do Login, por favor, tente novamente."
            );
          });
      };

    return (
        <>
            <div className={styles["container"]}>
                    <form className={styles["formulario"]} onSubmit={handleSubmit}>
                        <img src={logotipo} alt="Logotipo Vannbora" />
                        <h1>Login <span>usuário</span></h1>

                        
                        <div className={styles["inputs"]}>
                            <Input
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => handleInputChange(e, setEmail)}
                            />

                        </div>
                        <div className={styles["inputs"]}>
                            <Input
                                type="password"
                                label="Senha"
                                value={senha}
                                onChange={(e) => handleInputChange(e, setSenha)}
                            />
                            
                        </div>
                        
                        <Botao 
                            type="submit" 
                            size={170}
                            colorPreset="yellow"
                            hoverPreset="blue"
                        >
                        Entrar
                        </Botao>

                        <div className={styles["footer"]}>
                            <p>Ainda não possui uma conta?</p>
                            <a href="/login">Cadastre-se</a>
                        </div>
                    </form>
            </div>

            
        </>
    );
};

export default LoginProprietarioServico;