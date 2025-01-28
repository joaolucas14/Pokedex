import React, { useState } from "react";
import TransformarPrimeiraLetraMaiscula from "../../utils/TransformarPrimeiraLetraMaiscula";
import "./Card.css";
interface ICardProps {
  img: string;
  back_img: string;
  nome: string;
  tipos: string;
  altura: number;
  peso: number;
  id: number;
  onClick: () => void;
  pokemonFav: boolean;
}

const Card = React.memo(
  ({
    img,
    nome,
    tipos,
    back_img,
    altura,
    peso,
    id,
    pokemonFav,
    onClick,
  }: ICardProps) => {
    const [favorito, setFavorito] = useState(false);
    const toggleFavorito = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation(); // Impede a propagação do evento para o link
      setFavorito(!favorito);
    };
    return (
      <div className="card" onClick={onClick}>
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
                style={{
                  backgroundImage: `url(${back_img})`,
                }}
              ></div>
            </div>
            <div className="front-content">
              <small className="badge">
                {TransformarPrimeiraLetraMaiscula(nome)}
              </small>
              <div className="description">
                <div className="title">
                  <p className="title">
                    <strong>
                      Altura: {altura / 10} M <br />
                      Peso: {peso / 10} Kg <br />
                      Tipos:
                      <br />
                      {tipos}
                      <br />
                      {`Favorito?${pokemonFav}`}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <button
              className={`favorito-button ${favorito ? "favorito" : ""}`}
              onClick={toggleFavorito}
              aria-label={favorito ? "Desfavoritar" : "Favoritar"}
            >
              {favorito ? "★" : "☆"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);
export default Card;
