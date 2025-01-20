export function formatarTexto(texto: string): string {
  if (!texto) return "Sem descrição disponível.";
  const textoFormatado = texto
    .replace(/[\n\f\r\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return textoFormatado || "Sem descrição disponível.";
}
