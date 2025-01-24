import React from "react";
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
}

const Card = React.memo(
  ({ img, nome, tipos, back_img, altura, peso, id }: ICardProps) => {
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
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default Card;
