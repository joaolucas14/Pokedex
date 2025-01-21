import { formatarTexto } from "../../utils/FormatarTexto";
import TransformarPrimeiraLetraMaiscula from "../../utils/TransformarPrimeiraLetraMaiscula";
import "./Card.css";
interface ICardProps {
  img: string;
  nome: string;
  descricao: string;
  tipos: string;
}

export default function Card({ img, nome, descricao, tipos }: ICardProps) {
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
            <div className="circle" id="bottom"></div>
          </div>
          <div className="front-content">
            <small className="badge">
              {TransformarPrimeiraLetraMaiscula(nome)}
            </small>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>{formatarTexto(descricao)}</strong>
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
              <p className="card-footer">{tipos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
