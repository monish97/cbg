import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getGames } from "../lib/api";

export default function Home({ games, page, category }) {
  const router = useRouter();

  // ✅ Sync category with URL
  const [selectedCategory, setSelectedCategory] = useState(category);

  // ✅ Fixed category list (matches GamePix API)
 const categories = [
  "All",
  "action",
  "arcade",
  "puzzle",
  "racing",
  "sports",
  "shooter",
  "multiplayer",
  "adventure",
  "strategy",
  "simulation",
  "idle",
  "hyper casual",
  "match 3",
  "platformer"
];

  const categoryIcons = {
  All: "🎮",
  action: "⚔️",
  adventure: "🗺️",
  arcade: "🕹️",
  puzzle: "🧩",
  sports: "🏅",
  racing: "🏎️",
  strategy: "♟️",
  shooting: "🔫",
  multiplayer: "👥",
  "2048": "🔢",
  idle: "⏳",
  "hyper casual": "🎯",
  "match 3": "💎",
  platformer: "🧱"
};
  
  // ✅ Pagination navigation (preserve category)
  const goToPage = (newPage) => {
    router.push(`/?page=${newPage}&category=${selectedCategory}`);
  };

  // ✅ Dynamic pagination numbers
  const getPageNumbers = () => {
    const totalVisible = 5;
    const pages = [];

    let start = Math.max(1, page - 2);
    let end = start + totalVisible - 1;

    if (page <= 3) {
      start = 1;
      end = totalVisible;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const featuredGames = games.slice(0, 10);
  const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Categories</h2>
        {categories.map((cat) => (
          <button
  key={cat}
  className={`category-btn ${
    selectedCategory === cat ? "active" : ""
  }`}
  onClick={() => {
    setSelectedCategory(cat);
    router.push(`/?page=1&category=${cat}`);
  }}
>
  <span className="category-content">
    <span className="icon">{categoryIcons[cat] || "🎲"}</span>
    <span className="label">
      {cat === "All"
        ? "All"
        : cat.charAt(0).toUpperCase() + cat.slice(1)}
    </span>
  </span>
</button>
        ))}
      </aside>

      {/* Main */}
      <main className="main">
        <h1>
          {selectedCategory === "All"
            ? "All Games"
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Games`}
        </h1>

        {/* 🔍 SEARCH BAR */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 🔥 FEATURED SECTION */}
        <section className="featured">
          <h2>🔥 Featured Games</h2>
        
          <div className="featured-row">
            {featuredGames.map((game) => (
              <div
                key={game.id}
                className="featured-card"
                onClick={() => router.push(`/game/${game.slug}`)}
              >
                <img src={game.thumbnail} alt={game.title} />
                <p>{game.title}</p>
              </div>
            ))}
          </div>
        </section>
      
        <div className="grid">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
          >
            Prev
          </button>

          {getPageNumbers().map((p) => (
            <button
              key={p}
              className={p === page ? "active" : ""}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          ))}

          <button onClick={() => goToPage(page + 1)}>
            Next
          </button>
        </div>

      </main>

    </div>
  );
}

// ✅ SSR (page + category)
export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1");
  const category = context.query.category || "All";

  const apiCategory = category === "All" ? null : category;

  const games = await getGames(page, apiCategory);

  return {
    props: {
      games,
      page,
      category,
    },
  };
}
