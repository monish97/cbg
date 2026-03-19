import Link from "next/link";
import Image from "next/image";

export default function GameCard({ game }) {
  // If game object is missing essential data, skip rendering
  if (!game || !game.id) return null;

  // Use thumbnail if available, else fallback placeholder
  const thumbSrc = game.thumb || "/placeholder.png";

  return (
    <div className="game-card">
      <Link href={`/play?id=${game.url}`}>
        <a>
          <Image
            src={thumbSrc}
            alt={game.title}
            width={220}
            height={140}
            style={{ borderRadius: "8px 8px 0 0" }}
          />
          <h3>{game.title}</h3>
        </a>
      </Link>

      {/* Debug info: optionally log to console */}
      {typeof window !== "undefined" &&
        console.log(
          "GameCard:",
          game.id,
          game.title,
          game.thumb,
          game.url
        )}
    </div>
  );
}
