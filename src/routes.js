import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroProprietarioServico from "./pages/CadastroProprietarioServico/CadastroProprietarioServico";


function Rotas() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/cadastro" element={<CadastroProprietarioServico />} />
          </Routes>
        </BrowserRouter>
    );
  }
  export default Rotas;