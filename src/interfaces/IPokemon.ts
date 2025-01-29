import { IPokemonHabilidade } from "./IPokemonHabilidade";
import { IPokemonImagem } from "./IPokemonImagem";
import { IPokemonStat } from "./IPokemonStat";
import { IPokemonTipo } from "./IPokemonTipo";

export interface IPokemon {
  id: number;
  name: string;
  url: string;
  sprites: IPokemonImagem;
  types: IPokemonTipo[];
  weight: number;
  height: number;
  abilities: IPokemonHabilidade[];
  stats: IPokemonStat[];
  favorito: boolean;
}
