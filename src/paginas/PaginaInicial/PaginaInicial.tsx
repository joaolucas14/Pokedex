import { useEffect } from "react";
import ListaPokemon from "../../components/ListaPokemon/ListaPokemons";
import useUsuario from "../../state/hooks/useUsuario";

export default function PaginaInicial() {
  const { logado, buscarUsuario, usuario } = useUsuario();
  useEffect(() => {
    const carregarUsuario = () => {
      if (logado) {
        buscarUsuario();
      }
    };

    carregarUsuario();
  }, [logado, buscarUsuario, usuario]);
  return (
    <>
      <ListaPokemon />
    </>
  );
}
