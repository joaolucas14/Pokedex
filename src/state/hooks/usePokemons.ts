import { useRecoilState, useSetRecoilState } from "recoil";
import { IPokemon } from "../../interfaces/IPokemon";
import { http } from "../../api/http";
import { listaPokemonState, loadingState } from "../atom";
import { useCallback, useState } from "react";

const usePokemons = () => {
  const [pokemonsCompletos, setListaPokemon] =
    useRecoilState(listaPokemonState); // Agora usa Recoil
  const setLoading = useSetRecoilState(loadingState);
  const [filtro, setFiltro] = useState<string>("");

  const aplicarFiltro = (filtro: string) => {
    setFiltro(filtro.toLowerCase());
  };

  const pegarPokemons = useCallback(async () => {
    if (pokemonsCompletos.length > 0) return; // Evita recarregar se já existem dados
    setLoading(true);
    try {
      const resposta = await http.get("/pokemon", {
        params: {
          limit: 1025,
        },
      });

      const detalhes = await Promise.all(
        resposta.data.results.map((pokemon: IPokemon) =>
          http.get(pokemon.url).then((res) => res.data)
        )
      );

      detalhes.sort((a, b) => a.id - b.id);

      setListaPokemon(detalhes); // Atualiza o estado global com Recoil
    } catch (erro) {
      console.error("Erro ao buscar Pokémon:", erro);
    } finally {
      setLoading(false);
    }
  }, [pokemonsCompletos, setListaPokemon, setLoading]);

  const pokemonsFiltrados = (pokemons: IPokemon[]) => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filtro)
    );
  };

  const paginarPokemons = (pagina: number, pokemonsFiltrados: IPokemon[]) => {
    const inicio = (pagina - 1) * 12;
    const fim = inicio + 12;
    return pokemonsFiltrados.slice(inicio, fim);
  };

  return {
    pegarPokemons,
    aplicarFiltro,
    filtro,
    pokemonsCompletos,
    pokemonsFiltrados,
    paginarPokemons,
  };
};

export default usePokemons;
