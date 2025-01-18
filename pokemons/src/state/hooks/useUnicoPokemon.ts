import { useRecoilState } from "recoil";
import { unicoPokemonState } from "../atom";
import { http } from "../../api/http";

export default function useUnicoPokemon() {
  const [pokemonDetalhe, setPokemonDetalhe] = useRecoilState(unicoPokemonState);

  const buscarPokemonPorId = async (id: string) => {
    try {
      const resposta = await http.get(`pokemon/${id}`);
      setPokemonDetalhe(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar detalhes do pokemon:", erro);
    }
  };
  return { pokemonDetalhe, buscarPokemonPorId };
}
