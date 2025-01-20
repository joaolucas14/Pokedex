import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useUnicoPokemon from "../../state/hooks/useUnicoPokemon";
import "./PaginaPokemon.css";
import usePokemonDetalhes from "../../state/hooks/usePokemonDetalhes";
import TransformarPrimeiraLetraMaiscula from "../../utils/TransformarPrimeiraLetraMaiscula";
import { formatarTexto } from "../../utils/FormatarTexto";

export default function PaginaPokemon() {
  const id = useParams<{ id: string }>().id;
  const { pokemon, buscarPokemonPorId } = useUnicoPokemon();
  const { pokemonDetalhes, buscarDetalhesPokemonPorNome } =
    usePokemonDetalhes();

  useEffect(() => {
    if (id) {
      buscarPokemonPorId(id);
    }
  }, [id, buscarPokemonPorId]);

  useEffect(() => {
    if (pokemon?.name) {
      buscarDetalhesPokemonPorNome(pokemon.name);
    }
  }, [pokemon?.name, buscarDetalhesPokemonPorNome]);

  const descricaoOriginal =
    pokemonDetalhes?.flavor_text_entries[0]?.flavor_text || "";

  const nomePokemon = pokemon?.name || "";

  if (!pokemon) {
    return <div>Carregando...</div>;
  }
  return (
    <div>
      <h1>{TransformarPrimeiraLetraMaiscula(nomePokemon)}</h1>
      <img src={pokemon.sprites.front_default} alt="" />
      <div>
        <h2>Descrição</h2>
        <p>{formatarTexto(descricaoOriginal)}! </p>
      </div>
      <ul>
        {pokemon.types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>
      <Link to="/">Voltar</Link>
      <Link to={`/pokemon/${pokemon.id + 1}`}>Próximo</Link>
    </div>
  );
}
