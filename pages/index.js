import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { category } = router.query;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch games
  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);

        let url = "https://feed.gamepix.com/v2/json?sid=demo";

        // If category selected, filter by tag
        if (category) {
          url += `&tags=${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setGames(data || []);
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [category]);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>
        {category ? `${category.toUpperCase()} Games` : "Casual Browser Games"}
      </h1>

      {loading ? (
        <p>Loading games...</p>
      ) : (
        <div className="games">
          {games.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.thumbnail} alt={game.title} />
              <p>{game.title}</p>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .games {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }

        .game-card {
          background: #020617;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .game-card:hover {
          transform: scale(1.05);
          background: #1e293b;
        }

        img {
          width: 100%;
          border-radius: 8px;
        }

        p {
          margin-top: 8px;
          font-size: 14px;
          color: #cbd5f5;
        }
      `}</style>
    </div>
  );
}
