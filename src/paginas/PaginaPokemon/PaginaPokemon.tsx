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
  let corDaletra = "white";

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

  if (
    pokemonDetalhes?.color.name === "white" ||
    pokemonDetalhes?.color.name === "yellow"
  ) {
    corDaletra = "black";
  }
  if (!pokemon) {
    return <div>Carregando...</div>;
  }
  console.log("pokemon:", pokemon);
  console.log("pokemon detalhes:", pokemonDetalhes);
  return (
    <>
      <h1>
        {TransformarPrimeiraLetraMaiscula(nomePokemon)}
        <span className="numero_id">{`Nª${pokemon.id} ${
          pokemon.favorito ? "★" : "☆"
        }`}</span>
      </h1>
      <div className="container">
        <div className="imagem_pokemon">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <div
          className="informacoes_pokemon"
          style={{
            backgroundColor: pokemonDetalhes?.color.name,
            color: corDaletra,
          }}
        >
          <h2>Descrição</h2>
          <div className="descricao">
            <p>{formatarTexto(descricao)}! </p>
          </div>
          {pokemonDetalhes?.evolves_from_species?.name && (
            <div className="evolui_de">
              <span className="subtitulo">Evoulução de: </span>
              {TransformarPrimeiraLetraMaiscula(
                pokemonDetalhes.evolves_from_species.name
              )}
            </div>
          )}
          <div className="habilidades">
            <span className="subtitulo">Habilidades:</span>
            {pokemon.abilities.map(
              (ability) =>
                ` ${TransformarPrimeiraLetraMaiscula(ability.ability.name)} | `
            )}
          </div>
          <div className="peso_altura">
            <span className="subtitulo">Peso:</span> {pokemon.weight / 10} Kg
            <span className="subtitulo"> Altura:</span> {pokemon.height / 10} M
          </div>
        </div>
      </div>
      <div className="container_status_tipo">
        <div
          className="status"
          style={{
            backgroundColor: pokemonDetalhes?.color.name,
            color: corDaletra,
          }}
        >
          <ul>
            {pokemon.stats.map(
              (
                stat: { stat: { name: string }; base_stat: number },
                index: number
              ) => (
                <li key={index}>
                  <strong>
                    {TransformarPrimeiraLetraMaiscula(stat.stat.name)}:
                  </strong>{" "}
                  {stat.base_stat}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="tipos">
          <span className="subtitulo">Tipos:</span>
          <ul className="lista_tipos">
            {pokemon.types.map((type) => (
              <li key={type.type.name} className={`tipo ${type.type.name}`}>
                {TransformarPrimeiraLetraMaiscula(type.type.name)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        disabled={id === "1"}
        onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}
        className="botao_voltar"
        id="botao_voltar"
      >
        <img src={setaEsquerda} alt="Seta esquerda" />
      </button>
      <button
        onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
        className="botao_avancar"
        id="botao_avancar"
        disabled={id === "1025"}
      >
        <img src={setaDireita} alt="Seta direita" />
      </button>
    </>
  );
}
