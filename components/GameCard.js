import Link from "next/link";

export default function GameCard({ game }) {
  return (
    <Link href={`/game/${game.slug}`} className="card">
      <img src={game.thumbnail} alt={game.title} />
      <h3>{game.title}</h3>

      <style jsx>{`
        .card {
          display: block;
          cursor: pointer;
          background: #0f172a;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #1e293b;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }

        h3 {
          padding: 10px;
          font-size: 14px;
          color: #e2e8f0;
        }
      `}</style>
    </Link>
  );
}
