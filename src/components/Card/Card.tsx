import TransformarPrimeiraLetraMaiscula from "../../utils/TransformarPrimeiraLetraMaiscula";
import "./Card.css";
interface ICardProps {
  img: string;
  back_img: string;
  nome: string;
  tipos: string;
}

export default function Card({ img, nome, tipos, back_img }: ICardProps) {
  return (
    <div className="card">
      <div className="content">
        <div className="back">
          <div className="back-content">
            <img src={img} alt="" />
            <strong>{TransformarPrimeiraLetraMaiscula(nome)}</strong>
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
                    Tipos:
                    <br />
                    {tipos}
                  </strong>
                </p>
                <svg
                  fillRule="nonzero"
                  height="15px"
                  width="15px"
                  viewBox="0,0,256,256"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    style={{ mixBlendMode: "normal" }}
                    textAnchor="none"
                    fontSize="none"
                    fontWeight="none"
                    fontFamily="none"
                    strokeDashoffset={0}
                    strokeMiterlimit={10}
                    strokeLinejoin="miter"
                    strokeLinecap="butt"
                    strokeWidth={1}
                    stroke="none"
                    fillRule="nonzero"
                    fill="#20c997"
                  >
                    <g transform="scale(8,8)">
                      <path d="M25,27l-9,-6.75l-9,6.75v-23h18z" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
