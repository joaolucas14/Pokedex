import logo from "../../assets/imagens/logo.png";
import "./Cabecalho.css";
import favorito from "./img/favorito (2).png";
import logout from "./img/logout.png";
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalCadastro from "../ModalCadastro/ModalCadastro";
import { useEffect, useState } from "react";
import { IUsuario } from "../../interfaces/IUsuario";
import useUsuario from "../../state/hooks/useUsuario";

export default function Cabecalho() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(
    token != null
  );
  const [user, setUsuario] = useState<IUsuario | null>(null);
  const { buscarUsuario, usuario } = useUsuario();

  useEffect(() => {
    const carregarUsuario = () => {
      if (usuarioEstaLogado) {
        buscarUsuario();
        setUsuario(usuario);
      } else {
        setUsuario(null);
      }
    };

    carregarUsuario();
  }, [usuarioEstaLogado, buscarUsuario, usuario]);

  const aoEfetuarLogin = async () => {
    setUsuarioEstaLogado(true);
    buscarUsuario();
    setUsuario(usuario);
  };

  const EfetuarLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    setUsuarioEstaLogado(false);
    setUsuario(null);
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
        {usuarioEstaLogado && user ? (
          <>
            <p>{`Olá, ${user.username}`}</p>

            <Link to="/favoritos" className="link">
              <div className="entrar">
                <img src={favorito} alt="Favoritos" />
                <h2>Favoritos</h2>
              </div>
            </Link>
            <div className="logout" onClick={EfetuarLogout}>
              <img src={logout} alt="Logout" />
              <h2>Deslogar</h2>
            </div>
          </>
        ) : (
          <>
            <ModalLogin aoEfetuarLogin={aoEfetuarLogin} />
            <ModalCadastro />
          </>
        )}
      </div>
    </header>
  );
}
