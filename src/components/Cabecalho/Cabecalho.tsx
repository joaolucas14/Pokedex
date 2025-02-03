import logo from "../../assets/imagens/logo.png";
import "./Cabecalho.css";
import favorito from "./img/favorito (2).png";
import { Link } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalCadastro from "../ModalCadastro/ModalCadastro";

export default function Cabecalho() {
  return (
    <header>
      <Link to="/" className="link">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>Pokedex</h1>
        </div>
      </Link>
      <div className="menu">
        <Link to="/favoritos" className="link">
          <div className="entrar">
            <img src={favorito} alt="" />
            <h2>Favoritos</h2>
          </div>
        </Link>
        <ModalLogin />
        <ModalCadastro />
      </div>
    </header>
  );
}
