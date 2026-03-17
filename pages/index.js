import { useState } from "react";
import Layout from "../components/Layout";
import GameCard from "../components/GameCard";
import { getGames } from "../lib/api";

export default function Home({ games }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Extract unique categories
  const categories = ["All", ...new Set(games.map((g) => g.category))];

  // ✅ Filter games
  const filteredGames =
    selectedCategory === "All"
      ? games
      : games.filter((g) => g.category === selectedCategory);

  return (
    <Layout>
      <div className="container">
        
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <h2>Categories</h2>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main className="main">
          <h1>{selectedCategory} Games</h1>

          <div className="grid">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </main>

      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const games = await getGames();

  return {
    props: {
      games,
    },
  };
}
