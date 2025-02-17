import { create } from "zustand";

const useStore = create((set) => ({
    id: "",
    nome: "",
    telefone: "",
    nomeResponsavel: "",
    telefoneResponsavel: "",
    endereco: {
      cep: "",
      numero: "",
      logradouro: "",
      cidade: "",
      bairro: ""
    },
    updateFormData: (newData) =>
        set((state) => ({ formData: { ...state.formData, ...newData } })),
}));

export default useStore;