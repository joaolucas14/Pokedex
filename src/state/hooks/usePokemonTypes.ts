import { useRecoilState } from "recoil";
import { tiposPokemonState } from "../atom";
import { useCallback } from "react";
import { http } from "../../api/http";

export default function usePokemonTypes() {
  const [pokemonTypes, setPokemonTypes] = useRecoilState(tiposPokemonState);

  const buscarTiposPokemon = useCallback(async () => {
    try {
      const resposta = await http.get("type");
      setPokemonTypes(resposta.data.results);
    } catch (erro) {
      console.log("Erro ao buscar tipos de pokémon:", erro);
    }
  }, [setPokemonTypes]);
  return {
    pokemonTypes,
    buscarTiposPokemon,
  };
}
