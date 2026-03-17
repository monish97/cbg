import Link from "next/link";

export default function GameCard({ game }) {
  return (
    <Link href={`/game/${game.slug}`}>
      <div
        style={{
          cursor: "pointer",
          border: "1px solid #ddd",
          borderRadius: "10px",
          overflow: "hidden",
          transition: "0.2s",
          background: "#fff",
        }}
      >
        <img src={game.thumbnail} alt={game.title} width="100%" />
        <div style={{ padding: "10px" }}>
          <h4>{game.title}</h4>
        </div>
      </div>
    </Link>
  );
}
