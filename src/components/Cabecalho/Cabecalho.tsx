import logo from "../../assets/imagens/logo.png";
import "./Cabecalho.css";
import login from "./img/login.png";
import cadastro from "./img/cadastro.png";
import favorito from "./img/favorito (2).png";
import { Link } from "react-router-dom";

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
        <Link to="#" className="link">
          <div className="entrar">
            <img src={login} alt="" />
            <h2>Entrar</h2>
          </div>
        </Link>
        <Link to="#" className="link">
          <div className="cadastrar">
            <img src={cadastro} alt="" />
            <h2>Cadastre-se</h2>
          </div>
        </Link>
      </div>
    </header>
  );
}
