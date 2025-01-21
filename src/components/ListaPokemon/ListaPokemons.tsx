import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../state/atom";
import usePokemons from "../../state/hooks/usePokemons";
import { IPokemon } from "../../interfaces/IPokemon";
import { Link } from "react-router-dom";

export default function ListaPokemon() {
  const [loading] = useRecoilState(loadingState);
  const { pegarPokemons, aplicarFiltro, pokemonsCompletos, paginarPokemons } =
    usePokemons();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroTexto, setFiltroTexto] = useState("");

  // Aplica o filtro quando o usuário digita no campo de filtro
  const aoDigitarFiltro = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const filtroDigitado = evento.target.value;
    setFiltroTexto(filtroDigitado);
    aplicarFiltro(filtroDigitado);
    setPaginaAtual(1); // Resetando a página ao digitar novo filtro
  };

  // Filtra e pagina os pokémons
  const pokemonsFiltrados = pokemonsCompletos.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filtroTexto.toLowerCase())
  );

  const pokemonsPaginados = paginarPokemons(paginaAtual, pokemonsFiltrados);

  useEffect(() => {
    if (pokemonsCompletos.length === 0) {
      pegarPokemons();
    }
  }, [paginaAtual, pegarPokemons, pokemonsCompletos.length]);

  const carregarMais = () => setPaginaAtual((prev) => prev + 1);
  const voltar = () => setPaginaAtual((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <h1>Lista de Pokémon</h1>

      <input
        type="text"
        value={filtroTexto}
        onChange={aoDigitarFiltro}
        placeholder="Filtrar por nome"
      />

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {pokemonsPaginados.map((pokemon: IPokemon) => (
            <div key={pokemon.id}>
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
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
