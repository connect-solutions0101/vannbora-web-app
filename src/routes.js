import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test/Test";
import LoginProprietarioServico from "./pages/LoginProprietarioServico/LoginProprietarioServico"
import CadastroProprietarioServico from "./pages/CadastroProprietarioServico/CadastroProprietarioServico"


function Rotas() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/cadastro" element={<CadastroProprietarioServico />} />
            <Route path="/login" element={<LoginProprietarioServico />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
    );
  }
  export default Rotas;