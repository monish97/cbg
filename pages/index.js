import { getGames } from "../lib/api";
import GameCard from "../components/GameCard";

export default function Home({ games }) {
  return (
    <div>
      <h1>Play Free Online Games</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const games = await getGames();

  return {
    props: { games },
  };
}
