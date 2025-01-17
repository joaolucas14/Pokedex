import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import PaginaPokemon from "./paginas/PaginaPokemon/PaginaPokemon";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/pokemon/:id" element={<PaginaPokemon />} />
      </Routes>
    </Router>
  );
};

export default App;
