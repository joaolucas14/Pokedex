import { useRecoilState } from "recoil";
import { variantesPokemonsState } from "../atom";
import { useCallback } from "react";

import axios from "axios";
import { IVariantesPokemons } from "../../interfaces/IVariantesPokemons";

// export default function usePokemonTypes() {
//   const [pokemonTypes, setPokemonTypes] = useRecoilState(tiposPokemonState);

//   const buscarTiposPokemon = useCallback(async () => {
//     try {
//       const resposta = await http.get("type");
//       setPokemonTypes(resposta.data.results);
//     } catch (erro) {
//       console.log("Erro ao buscar tipos de pokémon:", erro);
//     }
//   }, [setPokemonTypes]);
//   return {
//     pokemonTypes,
//     buscarTiposPokemon,
//   };
// }

export default function useVariantesPokemons(lista: IVariantesPokemons[]) {
  const [variantesPokemons, setVariantesPokemons] = useRecoilState(
    variantesPokemonsState
  );
  const buscarVariantesPokemon = useCallback(async () => {
    try {
      lista.map(async (item) => {
        const resposta = await axios.get(`${item.pokemon.url}`);
        setVariantesPokemons(resposta.data.results);
      });
    } catch (erro) {
      console.log("Erro ao buscar Variante do pokémon", erro);
    }
  }, [lista, setVariantesPokemons]);
  return {
    variantesPokemons,
    buscarVariantesPokemon,
  };
}
