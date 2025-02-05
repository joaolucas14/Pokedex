import logo from "../../assets/imagens/logo.png";
import "./Cabecalho.css";
import favorito from "./img/favorito (2).png";
import logout from "./img/logout.png";
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalCadastro from "../ModalCadastro/ModalCadastro";
import { useState } from "react";

export default function Cabecalho() {
  const token = sessionStorage.getItem("token");
  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(
    token != null
  );
  const navigate = useNavigate();

  const aoEfetuarLogin = () => {
    setUsuarioEstaLogado(true);
  };
  const EfetuarLogout = () => {
    setUsuarioEstaLogado(false);
    sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header>
      <Link to="/" className="link">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>Pokedex</h1>
        </div>
      </Link>
      <div className="menu">
        {usuarioEstaLogado && (
          <>
            <Link to="/favoritos" className="link">
              <div className="entrar">
                <img src={favorito} alt="" />
                <h2>Favoritos</h2>
              </div>
            </Link>
            <div className="logout" onClick={EfetuarLogout}>
              <img src={logout} alt="" />
              <h2>Deslogar</h2>
            </div>
          </>
        )}

        {!usuarioEstaLogado && (
          <>
            <ModalLogin aoEfetuarLogin={aoEfetuarLogin} />
            <ModalCadastro />
          </>
        )}
      </div>
    </header>
  );
}
