import { create } from "zustand";

const useStore = create((set) => ({
    formData: {
        id: "",
        nome: "",
        dataNascimento: "",
        turno: "",
        condicao: "",
        turma: "",
        escolaId: "",
        responsaveis: [
            {
                responsavel: {
                    id: null,
                    nome: "",
                    telefone: "",
                    parentesco: "",
                    cpf: "",
                    endereco: {
                        id: "",
                        cep: "",
                        numero: "",
                        logradouro: "",
                        cidade: "",
                        bairro: "",
                        pontoReferencia: ""
                    },
                    proprietarioServico: {id: null}
                },
                tipoResponsavel: "FINANCEIRO"
            },
            {
                responsavel: {
                    id: null,
                    nome: "",
                    telefone: "",
                    parentesco: "",
                    cpf: "",
                    endereco: {
                        
                    },
                    proprietarioServico: {id: null}
                },
                tipoResponsavel: "PADRAO"
            }
        ],
        fatura: {
            valor: "",
            diaPagamento: "",
            quantidadeParcelas: "",
        }
    },
    updateFormData: (newData) => set((state) => ({
        formData: {
            ...state.formData,
            ...newData,
            responsaveis: [
                {
                    ...state.formData.responsaveis[0],
                    responsavel: {
                        ...state.formData.responsaveis[0].responsavel,
                        ...newData.responsaveis?.[0]?.responsavel,
                        endereco: {
                            ...state.formData.responsaveis[0].responsavel.endereco,
                            ...newData.responsaveis?.[0]?.responsavel?.endereco
                        }
                    }
                },
                newData.responsaveis?.[1] === null ? null :
                    {
                        ...state.formData.responsaveis[1],
                        responsavel: {
                            ...state.formData.responsaveis[1].responsavel,
                            ...newData.responsaveis?.[1]?.responsavel
                        }
                    }
            ],
            fatura: {
                ...state.formData.fatura,
                ...newData.fatura
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
            dataNascimento: "",
            turno: "",
            condicao: "",
            turma: "",
            escolaId: "",
            responsaveis: [
                {
                    responsavel: {
                        nome: "",
                        telefone: "",
                        parentesco: "",
                        cpf: "",
                        endereco: {
                            cep: "",
                            numero: "",
                            logradouro: "",
                            cidade: "",
                            bairro: "",
                            pontoReferencia: ""
                        }
                    },
                    tipoResponsavel: "FINANCEIRO"
                },
                {
                    responsavel: {
                        nome: "",
                        telefone: "",
                        parentesco: "",
                        cpf: ""
                    },
                    tipoResponsavel: "PADRAO"
                }
            ],
            fatura: {
                valor: "",
                diaPagamento: "",
                quantidadeParcelas: "",
            }
        }
    }))
}));

export default useStore;