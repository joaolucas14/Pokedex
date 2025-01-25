import { useEffect } from "react";
import usePokemonTypes from "../../state/hooks/usePokemonTypes";
import usePokemons from "../../state/hooks/usePokemons";

export default function FiltroPorTipo() {
  const { buscarTiposPokemon, pokemonTypes } = usePokemonTypes();
  const { aplicarFiltroPorTipo } = usePokemons();

  useEffect(() => {
    buscarTiposPokemon();
  }, [buscarTiposPokemon]);

  const aoAlterarTipo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    aplicarFiltroPorTipo(evento.target.value);
    console.log(evento.target.value);
  };
  return (
    <select onChange={aoAlterarTipo}>
      <option value="" disabled>
        Selecione um tipo
      </option>
      {pokemonTypes.map((tipo, index) => (
        <option key={`${tipo.id}-${index}`} value={tipo.name}>
          {tipo.name}
        </option>
      ))}
    </select>
  );
}
