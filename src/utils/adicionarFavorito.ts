import http from "../http";

export async function adicionarFavorito(idFavorito: number) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await http.post(
    `/user/favoritos`,
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

  const response = await http.delete(`/user/favoritos/${idFavorito}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.favoritos;
}
