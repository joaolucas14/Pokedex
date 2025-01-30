import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useUnicoPokemon from "../../state/hooks/useUnicoPokemon";
import "./PaginaPokemon.css";
import usePokemonDetalhes from "../../state/hooks/usePokemonDetalhes";
import TransformarPrimeiraLetraMaiscula from "../../utils/TransformarPrimeiraLetraMaiscula";
import { formatarTexto } from "../../utils/FormatarTexto";
import setaDireita from "../../assets/imagens/seta_direita.png";
import setaEsquerda from "../../assets/imagens/seta_esquerda.png";
import "./PaginaPokemon.css";
import usePokemons from "../../state/hooks/usePokemons";
import estrelaPreenchido from "../../assets/imagens/estrela (1).png";
import estrela from "../../assets/imagens/estrela (2).png";
import StatusBar from "../../components/StatusBar/StatusBar";
import shinyImg from "../../assets/imagens/shyni.png";
// import useVariantesPokemons from "../../state/hooks/useVariantesPokemons";

export default function PaginaPokemon() {
  const id = useParams<{ id: string }>().id;
  const { pokemon, buscarPokemonPorId } = useUnicoPokemon();
  const { pokemonDetalhes, buscarDetalhesPokemonPorNome } =
    usePokemonDetalhes();
  // const { buscarVariantesPokemon, variantesPokemons } = useVariantesPokemons();
  const { toggleFavorito } = usePokemons();

  const navigate = useNavigate();
  let corDaletra = "white";

  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    if (id) {
      buscarPokemonPorId(id);
      setShiny(false);
    }
  }, [id, buscarPokemonPorId]);

  useEffect(() => {
    if (pokemon?.name) {
      buscarDetalhesPokemonPorNome(pokemon.name);
    }
  }, [pokemon?.name, buscarDetalhesPokemonPorNome]);

  // useEffect(()=>{
  //   if(pokemonDetalhes?.varieties.length > 1){
  //     buscarVariantesPokemon(pokemonDetalhes?.varieties)
  //   }
  // })

  const eHShiny = () => {
    setShiny(!shiny);
  };

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
    <div>
      <h1>
        {TransformarPrimeiraLetraMaiscula(nomePokemon)}
        <span className="numero_id">
          {`Nª${pokemon.id}`}
          <button onClick={() => toggleFavorito(pokemon.id)}>
            <img
              src={pokemon.favorito ? estrelaPreenchido : estrela}
              alt="estrela favorito"
              style={{ width: "30px" }}
            />
          </button>
        </span>
      </h1>
      <div className="container">
        <div className="imagem_pokemon">
          <img
            src={
              !shiny
                ? pokemon.sprites.other["official-artwork"].front_default
                : pokemon.sprites.other["official-artwork"].front_shiny
            }
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
          <div className="descricao ">
            <p>{formatarTexto(descricao)}</p>
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
            <span className="peso">
              <span className="subtitulo">Peso:</span> {pokemon.weight / 10} Kg
            </span>
            <span className="altura">
              <span className="subtitulo"> Altura:</span> {pokemon.height / 10}{" "}
              M
            </span>
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
          <StatusBar
            pokemon={pokemon}
            corPokemon={pokemonDetalhes?.color.name}
          />
        </div>
        <div className="tipo_variantes">
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
          <div>
            <h3>Variantes:</h3>
            <button onClick={eHShiny}>
              <img src={shinyImg} alt="Pokemon shiny" />
            </button>
          </div>
          {/* {pokemonDetalhes?.varieties &&
            pokemonDetalhes.varieties.length > 1 && (
              <div className="variedades">
                <h3>Variedades:</h3>
                <ul>
                  {pokemonDetalhes.varieties.map((variedade) => (
                    <li key={variedade.pokemon.name}>
                      {TransformarPrimeiraLetraMaiscula(variedade.pokemon.name)}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
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
    </div>
  );
}
