export default function TransformarPrimeiraLetraMaiscula(nome: string) {
  if (!nome) return "";
  return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}
