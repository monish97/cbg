export default function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.thumb} alt={game.title} width={game.width} height={game.height} />
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      <a href={game.url} target="_blank" rel="noopener noreferrer">
        Play Game
      </a>
    </div>
  );
}
