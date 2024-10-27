import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test/Test";
import LoginProprietarioServico from "./pages/LoginProprietarioServico/LoginProprietarioServico"
import CadastroProprietarioServico from "./pages/CadastroProprietarioServico/CadastroProprietarioServico"
import TelaListagemEscolas from "./pages/TelaListagemEscolas/TelaListagemEscolas";
import TelaListagemAlunos from "./pages/TelaListagemAlunos/TelaListagemAlunos";
import Dashboard from "./pages/Dashboard/Dashboard";


function Rotas() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/cadastro" element={<CadastroProprietarioServico />} />
            <Route path="/login" element={<LoginProprietarioServico />} />
            <Route path="/escolas" element={<TelaListagemEscolas />} />
            <Route path="/alunos" element={<TelaListagemAlunos />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
    );
  }
  export default Rotas;