import { useState } from "react";
import axios from "axios";

const useViaCep = () => {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarCep = async (cep) => {
    setErro(null);
    setLoading(true);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro("CEP não encontrado.");
      } else {
        setDados(response.data);
      }
    } catch (err) {
      setErro("Erro ao buscar o CEP. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return { dados, erro, loading, buscarCep };
};

export default useViaCep;
