import { IVariantesPokemons } from "./IVariantesPokemons";

export interface IPokemonDetalhes {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }[];
  color: {
    name: string;
  };
  evolves_from_species: {
    name: string;
  };
  varieties: IVariantesPokemons[];
}
