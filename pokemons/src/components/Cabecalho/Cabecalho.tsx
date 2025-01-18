import logo from "../../assets/imagens/logo.png";
import "./Cabecalho.css";
export default function Cabecalho() {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <p>Pokedex</p>
    </header>
  );
}
