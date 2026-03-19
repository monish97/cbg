import Link from "next/link";
import Image from "next/image";

export default function GameCard({ game }) {
  if (!game.slug) return null; // prevent broken links

  const thumbSrc = game.thumb || "/placeholder.png";

  return (
    <Link href={`/games/${game.slug}`} passHref>
      <div className="game-card">
        <Image
          src={thumbSrc}
          alt={game.title}
          width={220}
          height={140}
          style={{ borderRadius: "8px 8px 0 0" }}
        />
        <h3>{game.title}</h3>
      </div>
    </Link>
  );
}
