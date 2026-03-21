import Link from "next/link";

const games = [
  { id: "1", title: "Game 1", slug: "game-1", img: "https://via.placeholder.com/300" },
  { id: "2", title: "Game 2", slug: "game-2", img: "https://via.placeholder.com/300" },
  { id: "3", title: "Game 3", slug: "game-3", img: "https://via.placeholder.com/300" },
  { id: "4", title: "Game 4", slug: "game-4", img: "https://via.placeholder.com/300" },
];

export default function Home() {
  return (
    <main style={{ padding: "20px", background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* Navbar */}
      <div style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "bold" }}>
        🎮 Casual Browser Games
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "15px",
        }}
      >
        {games.map((game) => (
          <Link key={game.id} href={`/game/${game.slug}`}>
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img src={game.img} style={{ width: "100%" }} />
              <div style={{ padding: "8px", fontSize: "14px" }}>
                {game.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}
