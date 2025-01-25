import { useEffect } from "react";
import usePokemonTypes from "../../state/hooks/usePokemonTypes";

interface IFiltroPorTipoProps {
  aoDigitarFiltroPorTipo: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filtroTipo: string;
}

export default function FiltroPorTipo({
  aoDigitarFiltroPorTipo,
}: IFiltroPorTipoProps) {
  const { buscarTiposPokemon, pokemonTypes } = usePokemonTypes();

  useEffect(() => {
    buscarTiposPokemon();
  }, [buscarTiposPokemon]);

  return (
    <select onChange={aoDigitarFiltroPorTipo} className="select-tipo">
      <option value="">Selecione um tipo</option>
      {pokemonTypes.map((tipo, index) => (
        <option key={`${tipo.id}-${index}`} value={tipo.name}>
          {tipo.name}
        </option>
      ))}
    </select>
  );
}
