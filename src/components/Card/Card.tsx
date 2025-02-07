import React from "react";
import TransformarPrimeiraLetraMaiscula from "../../utils/TransformarPrimeiraLetraMaiscula";
import "./Card.css";
import { useRecoilState } from "recoil";
import {
  adicionarFavorito,
  removerFavorito,
} from "../../utils/adicionarFavorito";
import estrelaPreenchido from "../../assets/imagens/estrela (1).png";
import estrela from "../../assets/imagens/estrela (2).png";
import { userState } from "../../state/atom";

interface ICardProps {
  img: string;
  back_img: string;
  nome: string;
  tipos: string;
  altura: number;
  peso: number;
  id: number;
  onClick: () => void;
}

const Card = React.memo(
  ({ img, nome, tipos, back_img, altura, peso, id, onClick }: ICardProps) => {
    const [usuario, setUsuario] = useRecoilState(userState);

    const pokemonFav = usuario?.favoritos.includes(id);

    const alternarFavorito = async () => {
      if (usuario) {
        try {
          let novosFavoritos;
          if (pokemonFav) {
            novosFavoritos = await removerFavorito(id);
          } else {
            novosFavoritos = await adicionarFavorito(id);
          }

          setUsuario({ ...usuario, favoritos: novosFavoritos });
        } catch (error) {
          console.error("Erro ao alterar favoritos:", error);
        }
      } else {
        alert("Você previsa está logado para adicionar aos favoritos");
      }
    };

    return (
      <div className="card">
        <div className="content">
          <div className="back">
            <div className="back-content">
              <img src={img} alt={nome} />
              <strong>
                {TransformarPrimeiraLetraMaiscula(nome)}
                <span className="numero">{`Nº${id}`}</span>
              </strong>
            </div>
          </div>
          <div className="front">
            <div className="img">
              <div
                className="pokemon"
                id="bottom"
                style={{ backgroundImage: `url(${back_img})` }}
              ></div>
            </div>
            <div className="front-content">
              <small className="badge">
                {TransformarPrimeiraLetraMaiscula(nome)}
              </small>
              <div className="description" onClick={onClick}>
                <div className="title">
                  <p className="title">
                    <strong>
                      Altura: {altura / 10} M <br />
                      Peso: {peso / 10} Kg <br />
                      Tipos:
                      <br />
                      {tipos}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <button onClick={alternarFavorito} className="favorito-button">
              <img
                src={pokemonFav ? estrelaPreenchido : estrela}
                alt="Favorito"
                className="img_favorito"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
