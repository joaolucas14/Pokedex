import { atom } from "recoil";
import { IPokemon } from "../interfaces/IPokemon";
import { IPokemonDetalhes } from "../interfaces/IPokemonDetalhes";
import { ITipoPokemon } from "../interfaces/ITipoPokemon";

export const listaPokemonState = atom<IPokemon[]>({
  key: "listaPokemonState",
  default: [],
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const unicoPokemonState = atom<IPokemon | null>({
  key: "unicoPokemon",
  default: null,
});

export const detalhesPokemonState = atom<IPokemonDetalhes | null>({
  key: "detalhesPokemon",
  default: null,
});

export const tiposPokemonState = atom<ITipoPokemon[]>({
  key: "tiposPokemon",
  default: [],
});

export const listaFavoritosState = atom<number[]>({
  key: "listaFavoritosState",
  default: [],
});
