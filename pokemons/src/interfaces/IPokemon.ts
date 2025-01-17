import { IPokemonTipo } from "./IPokemonTipo";

export interface IPokemon {
  id: number;
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: IPokemonTipo[];
}
