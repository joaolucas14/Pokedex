import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../state/atom";
import usePokemons from "../../state/hooks/usePokemons";
import { IPokemon } from "../../interfaces/IPokemon";
import Card from "../Card/Card";
import setaDireita from "../../assets/imagens/seta_direita.png";
import setaEsquerda from "../../assets/imagens/seta_esquerda.png";
import "./ListaPokemon.css";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Loading from "../Loading/Loading";
import FiltroPorTipo from "../FiltroPorTipo/FiltroPorTipo";

export default function ListaPokemon() {
  const [loading] = useRecoilState(loadingState);
  const {
    pegarPokemons,
    aplicarFiltro,
    pokemonsCompletos,
    paginarPokemons,
    pokemonsFiltrados,
    aplicarFiltroPorTipo,
  } = usePokemons();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const navigate = useNavigate();

  const aoDigitarFiltro = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const filtroDigitado = evento.target.value;
    setFiltroTexto(filtroDigitado);
    aplicarFiltro(filtroDigitado);
    setPaginaAtual(1);
  };

  const aoDigitarFiltroPorTipo = (
    evento: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const filtroTipoDigitado = evento.target.value;
    setFiltroTipo(filtroTipoDigitado);
    aplicarFiltroPorTipo(filtroTipoDigitado);
    setPaginaAtual(1);
  };

  const pokemonsFitltrados = pokemonsFiltrados(pokemonsCompletos);

  const pokemonsPaginados = paginarPokemons(paginaAtual, pokemonsFitltrados);

  useEffect(() => {
    if (pokemonsCompletos.length === 0) {
      pegarPokemons();
    }
  }, [pegarPokemons, pokemonsCompletos.length]);

  const carregarMais = () => setPaginaAtual((prev) => prev + 1);
  const voltar = () => setPaginaAtual((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="titulo_input">
            <h1 className="titulo">Lista de Pokémon</h1>
            <Input
              aoDigitarFiltro={aoDigitarFiltro}
              filtroTexto={filtroTexto}
            />
          </div>
          <div className="filtro_tipo">
            <FiltroPorTipo
              aoDigitarFiltroPorTipo={aoDigitarFiltroPorTipo}
              filtroTipo={filtroTipo}
            />
          </div>
          <div className="container_lista_pokemon">
            <button
              onClick={voltar}
              className="botao_voltar"
              disabled={paginaAtual === 1}
            >
              <img src={setaEsquerda} alt="Seta para a esquerda" />
            </button>
            <div className="lista_pokemon">
              {pokemonsPaginados.map((pokemon: IPokemon) => (
                <div key={pokemon.id}>
                  <Card
                    onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                    img={pokemon.sprites.front_default}
                    back_img={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    nome={pokemon.name}
                    id={pokemon.id}
                    tipos={pokemon.types
                      .map((type) => type.type.name)
                      .join(" | ")}
                    altura={pokemon.height}
                    peso={pokemon.weight}
                  />
                </div>
              ))}
            </div>
            <button onClick={carregarMais} className="botao_avancar">
              <img src={setaDireita} alt="Seta para a direita" />
            </button>
          </div>
        </>
      )}
    </main>
  );
}
