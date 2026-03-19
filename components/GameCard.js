import Link from "next/link";
import Image from "next/image";

export default function GameCard({ game }) {
  if (!game || !game.slug) return null;

  return (
    <div className="game-card">
      <Link href={`/play/${game.slug}`} passHref>
        <a>
          <Image
            src={game.thumb || "/placeholder.png"}
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
