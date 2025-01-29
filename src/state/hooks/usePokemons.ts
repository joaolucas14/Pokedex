import { useRecoilState, useSetRecoilState } from "recoil";
import { IPokemon } from "../../interfaces/IPokemon";
import { http } from "../../api/http";
import { listaFavoritosState, listaPokemonState, loadingState } from "../atom";
import { useCallback, useState } from "react";

const usePokemons = () => {
  const [pokemonsCompletos, setListaPokemon] =
    useRecoilState(listaPokemonState); // Agora usa Recoil
  const setLoading = useSetRecoilState(loadingState);
  const [filtro, setFiltro] = useState<string>(""); // Filtro por nome
  const [tipo, setTipo] = useState<string>(""); // Filtro por tipo
  const [favoritos, setFavoritos] = useRecoilState(listaFavoritosState); // Lista de IDs favoritos

  const aplicarFiltro = (filtro: string) => {
    setFiltro(filtro.toLowerCase());
  };

  const aplicarFiltroPorTipo = (tipo: string) => {
    setTipo(tipo);
  };

  const toggleFavorito = (id: number) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.includes(id)
        ? prevFavoritos.filter((favId) => favId !== id) // Remove da lista
        : [...prevFavoritos, id]
    );

    // Atualiza o campo favorito na lista global de Pokémon
    setListaPokemon((pokemons) =>
      pokemons.map((pokemon) =>
        pokemon.id === id
          ? { ...pokemon, favorito: !pokemon.favorito }
          : pokemon
      )
    );
  };

  const pegarPokemons = useCallback(async () => {
    if (pokemonsCompletos.length > 0) return; // Evita recarregar se já existem dados
    setLoading(true);
    try {
      const lotes = [
        { offset: 0, limit: 342 },
        { offset: 342, limit: 341 },
        { offset: 683, limit: 342 },
      ];

      const detalhes: IPokemon[] = [];

      for (const lote of lotes) {
        const resposta = await http.get("/pokemon", {
          params: {
            limit: lote.limit,
            offset: lote.offset,
          },
        });

        const detalhesLote = await Promise.all(
          resposta.data.results.map((pokemon: IPokemon) =>
            http.get(pokemon.url).then((res) => {
              const pokemonDetalhado = res.data;
              return {
                ...pokemonDetalhado,
                favorito: favoritos.includes(pokemonDetalhado.id), // Define favorito baseado na lista
              };
            })
          )
        );

        detalhes.push(...detalhesLote);

        // Aguarda um pequeno intervalo antes de buscar o próximo lote
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 segundo
      }

      detalhes.sort((a, b) => a.id - b.id);

      setListaPokemon(detalhes); // Atualiza o estado global com Recoil
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
    const fim = inicio + 12;
    return pokemonsFiltrados.slice(inicio, fim);
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
    favoritos, // Exponha a lista de favoritos caso precise em outros componentes
  };
};

export default usePokemons;
