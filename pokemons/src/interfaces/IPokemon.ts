import { IPokemonImagem } from "./IPokemonImagem";
import { IPokemonTipo } from "./IPokemonTipo";

export interface IPokemon {
  id: number;
  name: string;
  url: string;
  sprites: IPokemonImagem;
  types: IPokemonTipo[];
}
