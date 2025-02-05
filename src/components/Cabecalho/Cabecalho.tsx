import logo from "../../assets/imagens/logo.png";
import "./Cabecalho.css";
import favorito from "./img/favorito (2).png";
import { Link } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalCadastro from "../ModalCadastro/ModalCadastro";
import { useEffect, useState } from "react";

export default function Cabecalho() {
  const token = sessionStorage.getItem("token");
  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(
    token != null
  );
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);

  useEffect(() => {
    if (usuarioEstaLogado) {
      const usuario = sessionStorage.getItem("username");
      if (usuario) {
        setNomeUsuario(usuario);
      }
    }
  }, [usuarioEstaLogado]);

  const aoEfetuarLogin = () => {
    setUsuarioEstaLogado(true);
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
          <Link to="/favoritos" className="link">
            <div>
              <p>{`Ola ${nomeUsuario}`}</p>
            </div>
            <div className="entrar">
              <img src={favorito} alt="" />
              <h2>Favoritos</h2>
            </div>
          </Link>
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
