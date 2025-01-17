import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPokemon } from "../../interfaces/IPokemon";

export default function PaginaPokemon() {
  const id = useParams<{ id: string }>().id;
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((resposta) => setPokemon(resposta.data))
      .catch((erro) => console.error("Erro ao buscar Pokémon:", erro));
  }, [id]);

  if (!pokemon) {
    return <div>Carregando...</div>;
  }
  return (
    <>
      <h1>{pokemon?.name}</h1>
      <img src={pokemon.sprites.front_default} alt="" />
      <ul>
        {pokemon.types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>
      <Link to="/">Voltar</Link>
      <Link to={`/pokemon/${pokemon.id + 1}`}>Próximo</Link>
    </>
  );
}
