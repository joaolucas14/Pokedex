import axios from "axios";

const API_URL = "http://localhost:8000";

export async function adicionarFavorito(idFavorito: number) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await axios.post(
    `${API_URL}/user/favoritos`,
    { idFavorito },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data.favoritos;
}

export async function removerFavorito(idFavorito: number) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await axios.delete(
    `${API_URL}/user/favoritos/${idFavorito}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.favoritos;
}

export async function buscarFavoritos() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await axios.get(`${API_URL}/user/favoritos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.favoritos; // Retorna a lista de IDs dos favoritos
}
