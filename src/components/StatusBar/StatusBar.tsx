import { IPokemon } from "../../interfaces/IPokemon";
import TransformarPrimeiraLetraMaiscula from "../../utils/TransformarPrimeiraLetraMaiscula";
import "./StatusBar.css";

interface StatusBarProps {
  pokemon: IPokemon;
  corPokemon: string | undefined;
}

export default function StatusBar({ pokemon, corPokemon }: StatusBarProps) {
  return (
    <div className="skills">
      <h1>Status</h1>
      <ul>
        {pokemon.stats.map(
          (
            stat: { stat: { name: string }; base_stat: number },
            index: number
          ) => (
            <li key={index}>
              <h3>{`${TransformarPrimeiraLetraMaiscula(stat.stat.name)}: ${
                stat.base_stat
              }`}</h3>
              <span className="barras">
                <span
                  className={stat.stat.name}
                  style={{
                    width: `${stat.base_stat}px`,
                    backgroundColor: `${
                      corPokemon == "white" ? "black" : "white"
                    }`,
                  }}
                ></span>
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
