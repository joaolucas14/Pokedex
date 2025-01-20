import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useUnicoPokemon from "../../state/hooks/useUnicoPokemon";
import "./PaginaPokemon.css";

export default function PaginaPokemon() {
  const id = useParams<{ id: string }>().id;
  const { pokemonDetalhe, buscarPokemonPorId } = useUnicoPokemon();

  useEffect(() => {
    buscarPokemonPorId(id!);
  }, [id, buscarPokemonPorId]);

  if (!pokemonDetalhe) {
    return <div>Carregando...</div>;
  }
  return (
    <div>
      <h1>{pokemonDetalhe?.name}</h1>
      <img src={pokemonDetalhe.sprites.front_default} alt="" />
      <ul>
        {pokemonDetalhe.types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>
      <Link to="/">Voltar</Link>
      <Link to={`/pokemon/${pokemonDetalhe.id + 1}`}>Próximo</Link>
    </div>
  );
}
