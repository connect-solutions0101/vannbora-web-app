import { create } from "zustand";

const useStore = create((set) => ({
  formData: {
        id: "",
        nome: "",
        telefone: "",
        nomeResponsavel: "",
        telefoneResponsavel: "",
        endereco: {
            id: "",
            cep: "",
            numero: "",
            logradouro: "",
            cidade: "",
            bairro: ""
        }
    },
    updateFormData: (newData) => set((state) => ({
      formData: {
          ...state.formData,
          ...newData,
          endereco: {
              ...state.formData.endereco,
              ...newData.endereco
          }
      }
    })),
    replaceFormData: (newData) => set(() => ({
      formData: newData
    })),
    resetFormData: () => set(() => ({
      formData: {
          id: "",
          nome: "",
          telefone: "",
          nomeResponsavel: "",
          telefoneResponsavel: "",
          endereco: {
              id: "",
              cep: "",
              numero: "",
              logradouro: "",
              cidade: "",
              bairro: ""
          }
      }
    }))
}));

export default useStore;