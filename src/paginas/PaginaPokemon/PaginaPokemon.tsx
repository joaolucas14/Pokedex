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
import estrelaPreenchido from "../../assets/imagens/estrela (1).png";
import estrela from "../../assets/imagens/estrela (2).png";
import StatusBar from "../../components/StatusBar/StatusBar";
import shinyImg from "../../assets/imagens/shyni.png";
import useVariantesPokemons from "../../state/hooks/useVariantesPokemons";
import {
  adicionarFavorito,
  removerFavorito,
} from "../../utils/adicionarFavorito";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom";

export default function PaginaPokemon() {
  const id = useParams<{ id: string }>().id;
  const { pokemon, buscarPokemonPorId } = useUnicoPokemon();
  const { pokemonDetalhes, buscarDetalhesPokemonPorNome } =
    usePokemonDetalhes();
  const { buscarVariantePorNome, variantePokemon, setVariantePokemon } =
    useVariantesPokemons();
  const [usuario, setUser] = useRecoilState(userState);

  const navigate = useNavigate();
  let corDaletra = "white";

  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    if (id) {
      buscarPokemonPorId(id);
      setShiny(false);
      setVariantePokemon(null);
    }
  }, [id, buscarPokemonPorId, setVariantePokemon]);

  useEffect(() => {
    if (pokemon?.name) {
      buscarDetalhesPokemonPorNome(pokemon.name);
    }
  }, [pokemon?.name, buscarDetalhesPokemonPorNome]);

  const eHShiny = () => {
    setShiny(!shiny);
  };

  const pegandoVariante = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    buscarVariantePorNome(evento.target.value);
  };
  const pokemonFav = usuario?.favoritos.includes(pokemon!.id);

  const alternarFavorito = async (id: number) => {
    if (usuario) {
      try {
        let novosFavoritos;
        if (pokemonFav) {
          novosFavoritos = await removerFavorito(id);
        } else {
          novosFavoritos = await adicionarFavorito(id);
        }
        setUser({ ...usuario, favoritos: novosFavoritos });
      } catch (error) {
        console.error("Erro ao alterar favoritos:", error);
      }
    } else {
      alert("Você precisa estar logado para adicionar aos favoritos");
    }
  };

  const descricao =
    pokemonDetalhes?.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text || "Descrição não disponível";

  if (
    pokemonDetalhes?.color.name === "white" ||
    pokemonDetalhes?.color.name === "yellow"
  ) {
    corDaletra = "black";
  }
  if (!pokemon) {
    return <div>Carregando...</div>;
  }
  // console.log("pokemon:", pokemon);
  // console.log("pokemon detalhes:", pokemonDetalhes);
  return (
    <div className="main">
      <h1
        className="titulo"
        style={{
          color:
            pokemonDetalhes?.color.name === "white"
              ? "black"
              : pokemonDetalhes?.color.name,
        }}
      >
        {variantePokemon
          ? TransformarPrimeiraLetraMaiscula(variantePokemon.name)
          : TransformarPrimeiraLetraMaiscula(pokemon.name)}
        <span className="numero_id">
          {`Nª${pokemon.id}`}
          <button onClick={() => alternarFavorito(pokemon.id)}>
            <img
              src={
                usuario?.favoritos.includes(pokemon.id)
                  ? estrelaPreenchido
                  : estrela
              }
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
                ? variantePokemon?.sprites?.other["official-artwork"]
                    ?.front_default ||
                  pokemon.sprites.other["official-artwork"].front_default
                : variantePokemon?.sprites?.other["official-artwork"]
                    ?.front_shiny ||
                  pokemon.sprites.other["official-artwork"].front_shiny
            }
            alt={pokemon.name}
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
            {variantePokemon
              ? variantePokemon.abilities.map(
                  (ability) =>
                    ` ${TransformarPrimeiraLetraMaiscula(
                      ability.ability.name
                    )} | `
                )
              : pokemon.abilities.map(
                  (ability) =>
                    ` ${TransformarPrimeiraLetraMaiscula(
                      ability.ability.name
                    )} | `
                )}
          </div>
          <div className="peso_altura">
            <span className="peso">
              <span className="subtitulo">Peso:</span>{" "}
              {variantePokemon
                ? variantePokemon.weight / 10
                : pokemon.weight / 10}{" "}
              Kg
            </span>
            <span className="altura">
              <span className="subtitulo"> Altura:</span>{" "}
              {variantePokemon
                ? variantePokemon.height / 10
                : pokemon.height / 10}{" "}
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
            pokemon={variantePokemon ? variantePokemon : pokemon}
            corPokemon={pokemonDetalhes?.color.name}
          />
        </div>
        <div className="tipo_variantes">
          <div className="tipos">
            <span className="subtitulo">Tipos:</span>
            <ul className="lista_tipos">
              {variantePokemon
                ? variantePokemon.types.map((type) => (
                    <li
                      key={type.type.name}
                      className={`tipo ${type.type.name}`}
                    >
                      {TransformarPrimeiraLetraMaiscula(type.type.name)}
                    </li>
                  ))
                : pokemon.types.map((type) => (
                    <li
                      key={type.type.name}
                      className={`tipo ${type.type.name}`}
                    >
                      {TransformarPrimeiraLetraMaiscula(type.type.name)}
                    </li>
                  ))}
            </ul>
          </div>
          <div className="variantes">
            <h3>Variantes:</h3>

            {pokemonDetalhes?.varieties &&
              pokemonDetalhes.varieties.length > 1 && (
                <div className="variedades">
                  <select onChange={pegandoVariante} className="select">
                    {pokemonDetalhes.varieties.map((variedade) => (
                      <option
                        key={variedade.pokemon.name}
                        value={variedade.pokemon.name}
                      >
                        {TransformarPrimeiraLetraMaiscula(
                          variedade.pokemon.name
                        )}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            <button onClick={eHShiny}>
              <img src={shinyImg} alt="Pokemon shiny" />
            </button>
          </div>
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
