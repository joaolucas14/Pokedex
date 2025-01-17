import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaginaInicial from "./paginas/PaginaInicial";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
      </Routes>
    </Router>
  );
};

export default App;
