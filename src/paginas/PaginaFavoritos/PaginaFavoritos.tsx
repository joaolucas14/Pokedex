import usePokemons from "../../state/hooks/usePokemons";
import { IPokemon } from "../../interfaces/IPokemon";

export default function PaginaFavoritos() {
  const { pokemonsCompletos, favoritos } = usePokemons();

  // Filtra apenas os Pokémons que estão marcados como favoritos
  const pokemonsFavoritos = pokemonsCompletos.filter((pokemon) =>
    favoritos.includes(pokemon.id)
  );
  console.log(pokemonsCompletos);
  return (
    <div className="favoritos-page">
      <h1>Meus Favoritos</h1>
      {pokemonsFavoritos.length > 0 ? (
        <div className="card-grid">
          {pokemonsFavoritos.map((pokemon: IPokemon) => (
            <div key={pokemon.id}>{pokemon.name}</div>
          ))}
        </div>
      ) : (
        <p>Você ainda não marcou nenhum Pokémon como favorito.</p>
      )}
    </div>
  );
}
