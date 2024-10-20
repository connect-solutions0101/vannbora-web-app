import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroProprietarioServico from "./pages/CadastroProprietarioServico/CadastroProprietarioServico";
import Test from "./pages/Test/Test";


function Rotas() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/cadastro" element={<CadastroProprietarioServico />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
    );
  }
  export default Rotas;