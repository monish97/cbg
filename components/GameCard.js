import { useRouter } from "next/router";

export default function GameCard({ game }) {
  const router = useRouter();

  return (
    <div
      className="card"
      onClick={() => router.push(`/game/${game.slug}`)}
    >
      <img src={game.thumbnail} alt={game.title} />
      <h3>{game.title}</h3>
    </div>
  );
}
