import axios from "axios";
import { useEffect, useState } from "react";
import { IPokemon } from "../../paginas/interfaces/IPokemon";

export default function ListaPokemon() {
  const [listaPokemon, setListaPokemon] = useState<IPokemon[]>([]); // Inicialize como array vazio
  const [paginaAtual, setPaginaAtual] = useState(0); // Estado para controlar a página atual

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: 20, // Defina o número de Pokémon por requisição
          offset: paginaAtual * 20, // Calcula o deslocamento com base na página
        },
      })
      .then((resposta) => {
        setListaPokemon(resposta.data.results); // Concatena os resultados
      })
      .catch((erro) => console.log(erro));
  }, [paginaAtual]); // Atualiza sempre que a página mudar

  const carregarMais = () => setPaginaAtual((prev) => prev + 1);
  console.log(listaPokemon);
  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <ul>
        {listaPokemon?.map((pokemon: IPokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      <button onClick={carregarMais}>Carregar mais</button>{" "}
    </div>
  );
}
