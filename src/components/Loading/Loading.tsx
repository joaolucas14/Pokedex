import "./Loading.css";

export default function Loading() {
  return (
    <div className="card_loading">
      <div className="loader">
        <p>Carregando</p>
        <div className="words">
          <span className="word">Pokemons</span>
          <span className="word">Pokebolas</span>
          <span className="word">Rotas</span>
          <span className="word">Berrys</span>
          <span className="word">Treinadores</span>
        </div>
      </div>
    </div>
  );
}
