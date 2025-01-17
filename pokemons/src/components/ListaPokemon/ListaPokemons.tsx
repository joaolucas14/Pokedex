import axios from "axios";
import { useEffect, useState } from "react";
import { IPokemon } from "../../interfaces/IPokemon";
import { Link } from "react-router-dom";

export default function ListaPokemon() {
  const [listaPokemon, setListaPokemon] = useState<IPokemon[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [loading, setLoading] = useState(false);

  const pegarPokemons = async (pagina: number) => {
    try {
      setLoading(true);

      const resposta = await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: 9,
          offset: (pagina - 1) * 9,
        },
      });

      const detalhes = await Promise.all(
        resposta.data.results.map((pokemon: IPokemon) =>
          axios.get(pokemon.url).then((res) => res.data)
        )
      );

      detalhes.sort((a, b) => a.id - b.id);

      setListaPokemon(detalhes);
      setLoading(false);
    } catch (erro) {
      console.error("Erro ao buscar Pokémon:", erro);
      setLoading(false);
    }
  };

  useEffect(() => {
    pegarPokemons(paginaAtual);
  }, [paginaAtual]);

  const carregarMais = () => setPaginaAtual((prev) => prev + 1);
  const voltar = () => setPaginaAtual((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <div>
      <h1>Lista de Pokémon</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {listaPokemon.map((pokemon) => (
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
