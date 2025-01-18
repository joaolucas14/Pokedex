import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { listaPokemonState, loadingState } from "../../state/atom";
import usePokemons from "../../state/hooks/usePokemons";
import { IPokemon } from "../../interfaces/IPokemon";

export default function ListaPokemon() {
  const listaPokemon = useRecoilValue(listaPokemonState);
  const [loading] = useRecoilState(loadingState);
  const { pegarPokemons } = usePokemons();
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    pegarPokemons(paginaAtual);
  }, [paginaAtual, pegarPokemons]);

  const carregarMais = () => setPaginaAtual((prev) => prev + 1);
  const voltar = () => setPaginaAtual((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <div>
      <h1>Lista de Pokémon</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {listaPokemon.map((pokemon: IPokemon) => (
            <div key={pokemon.id}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ width: "100px", height: "100px" }}
              />
              <h3>{pokemon.name}</h3>
              <Link to={`/pokemon/${pokemon.id}`}>Ver detalhes</Link>
            </div>
          ))}
        </div>
      )}
      <div>
        <button onClick={voltar} disabled={paginaAtual === 1}>
          Voltar
        </button>
        <button onClick={carregarMais}>Avançar</button>
      </div>
    </div>
  );
}
