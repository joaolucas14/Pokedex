import { useRecoilState } from "recoil";
import { api } from "../../http";
import { IUsuario } from "../../interfaces/IUsuario";
import { userState } from "../atom";
import { useCallback } from "react";

export default function useUsuario() {
  const [usuario, setUsuario] = useRecoilState(userState);
  const buscarUsuario = useCallback(async () => {
    try {
      // ⚠️ Pegue o token DENTRO da função
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("❌ Token não encontrado! Usuário não está logado.");
        return null;
      }

      const response = await api.get<IUsuario>("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Token dinâmico
        },
      });

      setUsuario(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return null;
    }
  }, [setUsuario]);

  return { usuario, buscarUsuario };
}
