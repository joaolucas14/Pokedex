import { useRecoilState, useSetRecoilState } from "recoil";
import { IPokemon } from "../../interfaces/IPokemon";
import { http } from "../../api/http";
import { listaPokemonState, loadingState } from "../atom";
import { useCallback, useState } from "react";

const usePokemons = () => {
  const [pokemonsCompletos, setListaPokemon] =
    useRecoilState(listaPokemonState); // Agora usa Recoil
  const setLoading = useSetRecoilState(loadingState);
  const [filtro, setFiltro] = useState<string>(""); // Filtro por nome
  const [tipo, setTipo] = useState<string>(""); // Filtro por tipo

  const aplicarFiltro = (filtro: string) => {
    setFiltro(filtro.toLowerCase());
  };

  const aplicarFiltroPorTipo = (tipo: string) => {
    setTipo(tipo);
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
                favorito: false, // Adiciona o campo favorito com valor padrão
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
  }, [pokemonsCompletos, setListaPokemon, setLoading]);

  const pokemonsFiltrados = (pokemons: IPokemon[]) => {
    return pokemons
      .filter((pokemon) => pokemon.name.toLowerCase().includes(filtro))
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
  };
};

export default usePokemons;
