import { useRecoilState } from "recoil";
import { http } from "../../api/http";
import { useCallback } from "react";
import { variantesPokemonState } from "../atom";

export default function useVariantesPokemons() {
  const [variantePokemon, setVariantePokemon] = useRecoilState(
    variantesPokemonState
  );
  const buscarVariantePorNome = useCallback(
    async (nome: string) => {
      try {
        const resposta = await http.get(`pokemon/${nome}`);
        setVariantePokemon(resposta.data);
      } catch (erro) {
        console.log("Erro ao buscar o pokemon:", erro);
      }
    },
    [setVariantePokemon]
  );
  return { buscarVariantePorNome, variantePokemon, setVariantePokemon };
}
