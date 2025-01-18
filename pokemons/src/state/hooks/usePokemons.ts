import { useSetRecoilState } from "recoil";
import { IPokemon } from "../../interfaces/IPokemon";
import { http } from "../../api/http";
import { listaPokemonState, loadingState } from "../atom";
import { useCallback } from "react";

const usePokemons = () => {
  const setListaPokemon = useSetRecoilState(listaPokemonState);
  const setLoading = useSetRecoilState(loadingState);

  const pegarPokemons = useCallback(
    async (pagina: number) => {
      setLoading(true);
      try {
        const resposta = await http.get("/pokemon", {
          params: {
            limit: 9,
            offset: (pagina - 1) * 9,
          },
        });

        const detalhes = await Promise.all(
          resposta.data.results.map((pokemon: IPokemon) =>
            http.get(pokemon.url).then((res) => res.data)
          )
        );

        detalhes.sort((a, b) => a.id - b.id);
        setListaPokemon(detalhes);
      } catch (erro) {
        console.error("Erro ao buscar Pokémon:", erro);
      } finally {
        setLoading(false);
      }
    },
    [setListaPokemon, setLoading]
  ); // Inclua dependências relevantes

  return { pegarPokemons };
};

export default usePokemons;
