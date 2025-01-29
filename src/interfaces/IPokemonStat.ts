export interface IPokemonStat {
  base_stat: number; // O valor numérico do status
  stat: {
    name: string; // Nome do status (ex: "speed", "attack", "defense")
  };
}
