import { useRecoilState, useSetRecoilState } from "recoil";
import { IPokemon } from "../../interfaces/IPokemon";
import { http } from "../../api/http";
import { listaFavoritosState, listaPokemonState, loadingState } from "../atom";
import { useCallback, useState } from "react";

const usePokemons = () => {
  const [pokemonsCompletos, setListaPokemon] =
    useRecoilState(listaPokemonState);
  const setLoading = useSetRecoilState(loadingState);
  const [filtro, setFiltro] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [favoritos, setFavoritos] = useRecoilState(listaFavoritosState);

  const aplicarFiltro = (filtro: string) => {
    setFiltro(filtro.toLowerCase());
  };

  const aplicarFiltroPorTipo = (tipo: string) => {
    setTipo(tipo);
  };

  const toggleFavorito = (id: number) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.includes(id)
        ? prevFavoritos.filter((favId) => favId !== id)
        : [...prevFavoritos, id]
    );

    setListaPokemon((pokemons) =>
      pokemons.map((pokemon) =>
        pokemon.id === id
          ? { ...pokemon, favorito: !pokemon.favorito }
          : pokemon
      )
    );
  };

  const pegarPokemons = useCallback(async () => {
    if (pokemonsCompletos.length > 0) return;
    setLoading(true);
    try {
      const lotes = [
        { offset: 0, limit: 342 },
        { offset: 342, limit: 341 },
        { offset: 683, limit: 342 },
      ];

      const detalhes: IPokemon[] = [];

      for (const lote of lotes) {
        const resposta = await http.get("/pokemon", { params: lote });

        const detalhesLote = await Promise.all(
          resposta.data.results.map(async (pokemon: { url: string }) => {
            const res = await http.get(pokemon.url);

            return {
              ...res.data,
              favorito: favoritos.includes(res.data.id),
            };
          })
        );

        detalhes.push(...detalhesLote);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      detalhes.sort((a, b) => a.id - b.id);
      setListaPokemon(detalhes);
    } catch (erro) {
      console.error("Erro ao buscar Pokémon:", erro);
    } finally {
      setLoading(false);
    }
  }, [pokemonsCompletos, setListaPokemon, setLoading, favoritos]);

  const pokemonsFiltrados = (pokemons: IPokemon[]) => {
    return pokemons
      .filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(filtro) ||
          pokemon.id.toString().includes(filtro)
      )
      .filter((pokemon) =>
        tipo ? pokemon.types.some((t) => t.type.name === tipo) : true
      );
  };

  const paginarPokemons = (pagina: number, pokemonsFiltrados: IPokemon[]) => {
    const inicio = (pagina - 1) * 12;
    return pokemonsFiltrados.slice(inicio, inicio + 12);
  };

  return {
    pegarPokemons,
    aplicarFiltro,
    aplicarFiltroPorTipo,
    filtro,
    tipo,
    pokemonsCompletos,
    pokemonsFiltrados,
    paginarPokemons,
    toggleFavorito,
    favoritos,
  };
};

export default usePokemons;
