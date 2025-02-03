import { useEffect } from "react";
import usePokemonTypes from "../../state/hooks/usePokemonTypes";
import "./FiltroPorTipo.css";

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
    <select onChange={aoDigitarFiltroPorTipo} className="select-tipo select">
      <option value="">Selecione um tipo</option>
      {pokemonTypes.map((tipo) => (
        <option key={tipo.name} value={tipo.name}>
          {tipo.name}
        </option>
      ))}
    </select>
  );
}
