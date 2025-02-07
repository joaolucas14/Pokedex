import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../state/atom";
import usePokemons from "../../state/hooks/usePokemons";
import { IPokemon } from "../../interfaces/IPokemon";
import Card from "../Card/Card";
import setaDireita from "../../assets/imagens/seta_direita.png";
import setaEsquerda from "../../assets/imagens/seta_esquerda.png";
import "./ListaPokemonFavortios.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import pikachu from "../../assets/imagens/pikachu.png";
import useUsuario from "../../state/hooks/useUsuario";

export default function ListaPokemonFavoritos() {
  const [loading] = useRecoilState(loadingState);
  const { pegarPokemons, pokemonsCompletos, paginarPokemons } = usePokemons();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const navigate = useNavigate();
  const { usuario } = useUsuario();

  useEffect(() => {
    if (pokemonsCompletos.length === 0) {
      pegarPokemons();
    }
  }, [pegarPokemons, pokemonsCompletos.length]);

  // Filtra apenas os Pokémon favoritados
  const pokemonsFavoritos = pokemonsCompletos.filter((pokemon) =>
    usuario?.favoritos.includes(pokemon.id)
  );

  // Aplica a paginação apenas nos favoritos
  const pokemonsPaginados = paginarPokemons(paginaAtual, pokemonsFavoritos);

  const carregarMais = () => setPaginaAtual((prev) => prev + 1);
  const voltar = () => setPaginaAtual((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="titulo">Meus Pokémon Favoritos</h1>
          {pokemonsFavoritos.length === 0 ? (
            <p className="mensagem">
              Nenhum Pokémon foi favoritado ainda
              <img
                src={pikachu}
                alt="Pikachu triste"
                style={{ width: "40px" }}
              />
              .
            </p>
          ) : (
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
              <button
                onClick={carregarMais}
                className="botao_avancar"
                disabled={pokemonsPaginados.length < 12}
              >
                <img src={setaDireita} alt="Seta para a direita" />
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
