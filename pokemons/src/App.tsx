import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import PaginaPokemon from "./paginas/PaginaPokemon/PaginaPokemon";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/pokemon/:id" element={<PaginaPokemon />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
