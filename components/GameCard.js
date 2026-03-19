import Link from "next/link";
import Image from "next/image";

export default function GameCard({ game }) {
  return (
    <div className="game-card">
      <Link href={`/games/${game.url}`}>
        <a>
          <Image
            src={game.thumb}
            alt={game.title}
            width={220}
            height={140}
            style={{ borderRadius: "8px 8px 0 0" }}
          />
          <h3>{game.title}</h3>
        </a>
      </Link>
    </div>
  );
}
