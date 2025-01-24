import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useUnicoPokemon from "../../state/hooks/useUnicoPokemon";
import "./PaginaPokemon.css";
import usePokemonDetalhes from "../../state/hooks/usePokemonDetalhes";
import TransformarPrimeiraLetraMaiscula from "../../utils/TransformarPrimeiraLetraMaiscula";
import { formatarTexto } from "../../utils/FormatarTexto";
import setaDireita from "../../assets/imagens/seta_direita.png";
import setaEsquerda from "../../assets/imagens/seta_esquerda.png";
import "./PaginaPokemon.css";

export default function PaginaPokemon() {
  const id = useParams<{ id: string }>().id;
  const { pokemon, buscarPokemonPorId } = useUnicoPokemon();
  const { pokemonDetalhes, buscarDetalhesPokemonPorNome } =
    usePokemonDetalhes();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      buscarPokemonPorId(id);
    }
  }, [id, buscarPokemonPorId]);

  useEffect(() => {
    if (pokemon?.name) {
      buscarDetalhesPokemonPorNome(pokemon.name);
    }
  }, [pokemon?.name, buscarDetalhesPokemonPorNome]);

  const descricao =
    pokemonDetalhes?.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text || "Descrição não disponível";

  const nomePokemon = pokemon?.name || "";

  if (!pokemon) {
    return <div>Carregando...</div>;
  }
  console.log(pokemon);
  return (
    <>
      <h1>{TransformarPrimeiraLetraMaiscula(nomePokemon)}</h1>
      <div className="container">
        <div className="imagem_pokemon">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <div className="informacoes_pokemon">
          <h2>Descrição</h2>
          <div className="descricao">
            <p>{formatarTexto(descricao)}! </p>
          </div>
          <div className="habilidades">
            Habilidades:
            {pokemon.abilities.map(
              (ability) =>
                ` ${TransformarPrimeiraLetraMaiscula(ability.ability.name)} | `
            )}
          </div>
          <div className="peso_altura">
            Peso: {pokemon.weight / 10} Kg Altura: {pokemon.height / 10} M
          </div>
          <div className="tipos">
            <p>Tipos:</p>
            <ul>
              {pokemon.types.map((type) => (
                <li key={type.type.name}>
                  {TransformarPrimeiraLetraMaiscula(type.type.name)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <button
        disabled={id === "1"}
        onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}
        className="botao_voltar"
        id="botao_voltar"
      >
        <img src={setaEsquerda} alt="" />
      </button>
      <button
        onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
        className="botao_avancar"
        id="botao_avancar"
      >
        <img src={setaDireita} alt="" />
      </button>
    </>
  );
}
