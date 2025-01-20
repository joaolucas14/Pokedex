import { useRecoilState } from "recoil";
import { detalhesPokemonState } from "../atom";
import { http } from "../../api/http";
import { useCallback } from "react";

export default function usePokemonDetalhes() {
  const [pokemonDetalhes, setPokemonDetalhes] =
    useRecoilState(detalhesPokemonState);

  const buscarDetalhesPokemonPorId = useCallback(
    async (id: string) => {
      try {
        const resposta = await http.get(`pokemon-species/${id}`);
        setPokemonDetalhes(resposta.data);
      } catch (erro) {
        console.log("Erro ao buscar detalhes do pokemon:", erro);
      }
    },
    [setPokemonDetalhes]
  );
  const buscarDetalhesPokemonPorNome = useCallback(
    async (nome: string) => {
      try {
        const resposta = await http.get(`pokemon-species/${nome}`);
        setPokemonDetalhes(resposta.data);
      } catch (erro) {
        console.log("Erro ao buscar detalhes do pokemon:", erro);
      }
    },
    [setPokemonDetalhes]
  );
  return {
    pokemonDetalhes,
    buscarDetalhesPokemonPorId,
    buscarDetalhesPokemonPorNome,
  };
}
