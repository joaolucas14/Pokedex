import axios from "axios";
import { useEffect, useState } from "react";
import { IPokemon } from "../../paginas/interfaces/IPokemon";

export default function ListaPokemon() {
  const [listaPokemon, setListaPokemon] = useState<IPokemon[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1); // Páginas começam a partir de 1 (para paginar corretamente)
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento

  const pegarPokemons = async (pagina: number) => {
    try {
      setLoading(true); // Ativa o estado de carregamento

      // Requisição para obter a lista de Pokémon
      const resposta = await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: 10, // Número de Pokémon por requisição
          offset: (pagina - 1) * 10, // Calcula o deslocamento com base na página
        },
      });

      // Requisição detalhada para cada Pokémon da lista
      const detalhes = await Promise.all(
        resposta.data.results.map((pokemon: IPokemon) =>
          axios.get(pokemon.url).then((res) => res.data)
        )
      );

      // Ordena os Pokémons pelo ID
      detalhes.sort((a, b) => a.id - b.id);

      setListaPokemon(detalhes); // Atualiza a lista de Pokémons
      setLoading(false); // Desativa o estado de carregamento
    } catch (erro) {
      console.error("Erro ao buscar Pokémon:", erro);
      setLoading(false);
    }
  };

  useEffect(() => {
    pegarPokemons(paginaAtual); // Carrega os Pokémons da página inicial
  }, [paginaAtual]);

  const carregarMais = () => setPaginaAtual((prev) => prev + 1); // Função para avançar para a próxima página
  const voltar = () => setPaginaAtual((prev) => (prev > 1 ? prev - 1 : 1)); // Função para voltar para a página anterior

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {listaPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                width: "150px",
                textAlign: "center",
              }}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ width: "100px", height: "100px" }}
              />
              <h3>{pokemon.name}</h3>
              <a href={`/pokemon/${pokemon.id}`}>Ver detalhes</a>
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
