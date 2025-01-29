import { useRecoilState } from "recoil";
import { unicoPokemonState, listaFavoritosState } from "../atom"; // Importando os favoritos
import { http } from "../../api/http";
import { useCallback } from "react";

export default function useUnicoPokemon() {
  const [pokemon, setPokemon] = useRecoilState(unicoPokemonState);
  const [favoritos] = useRecoilState(listaFavoritosState); // Pegamos a lista de favoritos

  const buscarPokemonPorId = useCallback(
    async (id: string) => {
      try {
        const resposta = await http.get(`pokemon/${id}`);

        // Verifica se o Pokémon já está nos favoritos
        const favorito = favoritos.some((fav) => fav === resposta.data.id);

        // Atualiza o estado mantendo o status de favorito
        setPokemon({ ...resposta.data, favorito });
      } catch (erro) {
        console.log("Erro ao buscar o pokemon:", erro);
      }
    },
    [setPokemon, favoritos] // Incluímos favoritos como dependência
  );

  const buscarPokemonPorNome = useCallback(
    async (nome: string) => {
      try {
        const resposta = await http.get(`pokemon/${nome}`);

        // Verifica se o Pokémon já está nos favoritos
        const favorito = favoritos.some((fav) => fav === resposta.data.id);

        // Atualiza o estado mantendo o status de favorito
        setPokemon({ ...resposta.data, favorito });
      } catch (erro) {
        console.log("Erro ao buscar o pokemon:", erro);
      }
    },
    [setPokemon, favoritos]
  );

  return { pokemon, buscarPokemonPorId, buscarPokemonPorNome };
}
