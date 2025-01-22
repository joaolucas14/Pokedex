import { useSetRecoilState } from "recoil";
import { IPokemon } from "../../interfaces/IPokemon";
import { http } from "../../api/http";
import { listaPokemonState, loadingState } from "../atom";
import { useCallback, useState } from "react";

const usePokemons = () => {
  const setListaPokemon = useSetRecoilState(listaPokemonState);
  const setLoading = useSetRecoilState(loadingState);
  const [filtro, setFiltro] = useState<string>("");
  const [pokemonsCompletos, setPokemonsCompletos] = useState<IPokemon[]>([]);

  const aplicarFiltro = (filtro: string) => {
    setFiltro(filtro.toLowerCase());
  };

  const pegarPokemons = useCallback(
    async () => {
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

        setPokemonsCompletos(detalhes);
        setListaPokemon(detalhes); // Inicialmente, mostramos todos os pokémons carregados
      } catch (erro) {
        console.error("Erro ao buscar Pokémon:", erro);
      } finally {
        setLoading(false);
      }
    },
    [setListaPokemon, setLoading] // Dependências para pegar os pokémons
  );

  // Filtrando os pokémons com base no filtro
  const pokemonsFiltrados = (pokemons: IPokemon[]) => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filtro)
    );
  };

  // Função para lidar com a paginação após aplicar o filtro
  const paginarPokemons = (pagina: number, pokemonsFiltrados: IPokemon[]) => {
    const inicio = (pagina - 1) * 12;
    const fim = inicio + 12;
    return pokemonsFiltrados.slice(inicio, fim); // Retorna apenas os 9 Pokémons da página atual
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
