import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import PaginaPokemon from "./paginas/PaginaPokemon/PaginaPokemon";
import { RecoilRoot } from "recoil";
import PaginaPadrao from "./paginas/PaginaPadrao/PaginaPadrao";
import "normalize.css";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaPadrao />}>
            <Route index element={<PaginaInicial />} />
            <Route path="/pokemon/:id" element={<PaginaPokemon />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
