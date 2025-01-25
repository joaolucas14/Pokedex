import { useEffect } from "react";
import usePokemonTypes from "../../state/hooks/usePokemonTypes";

export default function FiltroPorTipo() {
  const { buscarTiposPokemon, pokemonTypes } = usePokemonTypes();

  useEffect(() => {
    buscarTiposPokemon();
  }, [buscarTiposPokemon]);
  return (
    <select>
      {pokemonTypes.map((tipo) => (
        <option key={tipo.id} value={tipo.name}>
          {tipo.name}
        </option>
      ))}
    </select>
  );
}
