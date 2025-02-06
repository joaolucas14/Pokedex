import logo from "../../assets/imagens/logo.png";
import "./Cabecalho.css";
import favorito from "./img/favorito (2).png";
import logout from "./img/logout.png";
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalCadastro from "../ModalCadastro/ModalCadastro";
import useUsuario from "../../state/hooks/useUsuario";

export default function Cabecalho() {
  const navigate = useNavigate();

  const { buscarUsuario, usuario, setLogado, logado } = useUsuario();

  const aoEfetuarLogin = async () => {
    setLogado(true);
    buscarUsuario();
  };

  const EfetuarLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    setLogado(false);
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
        {logado && usuario ? (
          <>
            <p>{`Olá, ${usuario?.username}`}</p>

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
