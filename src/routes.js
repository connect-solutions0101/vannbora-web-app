import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test/Test";
import LoginProprietarioServico from "./pages/LoginProprietarioServico/LoginProprietarioServico"
import CadastroProprietarioServico from "./pages/CadastroProprietarioServico/CadastroProprietarioServico"
import TelaListagemEscolas from "./pages/TelaListagemEscolas/TelaListagemEscolas";
import TelaListagemAlunos from "./pages/TelaListagemAlunos/TelaListagemAlunos";
import Dashboard from "./pages/Dashboard/Dashboard";
import CadastroEscola from "./pages/CadastroEscola/CadastroEscola"
import CadastroDependente from "./pages/CadastroDependente/CadastroDependente"


function Rotas() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginProprietarioServico />} />
            <Route path="/login" element={<LoginProprietarioServico />} />
            <Route path="/cadastro" element={<CadastroProprietarioServico />} />
            <Route path="/escolas" element={<TelaListagemEscolas />} />
            <Route path="/alunos" element={<TelaListagemAlunos />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={<Test />} />
            <Route path="/download-csv" element={<Test />} />
            <Route path="/escolas/cadastro" element={<CadastroEscola />} />
            <Route path="/dependentes/cadastro" element={<CadastroDependente />} />
          </Routes>
        </BrowserRouter>
    );
  }
  export default Rotas;