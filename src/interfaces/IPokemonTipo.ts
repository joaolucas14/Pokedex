export interface IPokemonTipo {
  slot: number;
  type: {
    name: string; // Nome do tipo, como "fire", "water", etc.
    url: string; // URL para mais informações sobre o tipo.
  };
}
