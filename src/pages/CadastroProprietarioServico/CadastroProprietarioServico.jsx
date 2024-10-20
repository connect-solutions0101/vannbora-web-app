import React, { useState } from "react";
import styles from "./CadastroProprietarioServico.module.css";
import api from "../../api";
import { toast } from "react-toastify";


const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

const CadastroProprietarioServico = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [role, setRole] = useState("USER");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulário enviado:", { nome, email, cpf, senha, role });
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
            // sessionStorage.setItem("editado", JSON.stringify(objetoAdicionado));
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
            <h1>Cadastro de Proprietário de Serviço</h1>

            <form className={styles["formulario"]} onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input
                    type="text"
                    value={nome}
                    onChange={(e) => handleInputChange(e, setNome)}
                    />
                </div>
                <div>
                    <label>E-mail</label>
                    <input 
                    type="text" 
                    value={email}
                    onChange={(e) => handleInputChange(e, setEmail)}
                    />
                </div>
                <div>
                    <label>CPF</label>
                    <input 
                    type="text" 
                    value={cpf}
                    onChange={(e) => handleInputChange(e, setCpf)}
                    />
                </div>
                <div>
                    <label>Senha</label>
                    <input 
                    type="text" 
                    value={senha}
                    onChange={(e) => handleInputChange(e, setSenha)}
                    />
                </div>
                <div>
                    <label>Role</label>
                    <select
                    value={role}
                    onChange={(e) => handleInputChange(e, setRole)}>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">Usuário</option>
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </>
    );
};

export default CadastroProprietarioServico;