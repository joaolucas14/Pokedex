import { api } from ".";
import { IUsuario } from "../interfaces/IUsuario";

export const buscarUsuario = async (): Promise<IUsuario | null> => {
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

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
};
