import Link from "next/link";
import Image from "next/image";

export default function GameCard({ game }) {
  return (
    <div className="card">
      <Link href={game.url} target="_blank">
        <Image src={game.thumb} alt={game.title} width={220} height={140} />
        <h3>{game.title}</h3>
      </Link>
    </div>
  );
}
