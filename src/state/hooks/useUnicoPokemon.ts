import { useRecoilState } from "recoil";
import { unicoPokemonState } from "../atom";
import { http } from "../../api/http";
import { useCallback } from "react";

export default function useUnicoPokemon() {
  const [pokemon, setPokemon] = useRecoilState(unicoPokemonState);

  const buscarPokemonPorId = useCallback(
    async (id: string) => {
      try {
        const resposta = await http.get(`pokemon/${id}`);
        setPokemon(resposta.data);
      } catch (erro) {
        console.log("Erro ao buscar o pokemon:", erro);
      }
    },
    [setPokemon]
  );

  const buscarPokemonPorNome = useCallback(
    async (nome: string) => {
      try {
        const resposta = await http.get(`pokemon/${nome}`);
        setPokemon(resposta.data);
      } catch (erro) {
        console.log("Erro ao buscar o pokemon:", erro);
      }
    },
    [setPokemon]
  );

  return { pokemon, buscarPokemonPorId, buscarPokemonPorNome };
}
