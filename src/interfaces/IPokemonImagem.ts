export interface IPokemonImagem {
  front_default: string; // Imagem do Pokémon em uma resolução padrão
  other: {
    dream_world: {
      front_default: string; // Imagem do Pokémon no "dream world"
    };
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      front_default: string;
    };
  };
}
