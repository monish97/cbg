import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getGames } from "../lib/api";

export default function Home({ games, page }) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(games.map((g) => g.category))];

  const filteredGames =
    selectedCategory === "All"
      ? games
      : games.filter((g) => g.category === selectedCategory);

  const getPageNumbers = () => {
  const totalVisible = 5;
  const pages = [];

  let start = Math.max(1, page - 2);
  let end = start + totalVisible - 1;

  // Adjust if near beginning
  if (page <= 3) {
    start = 1;
    end = totalVisible;
  }

  // Generate pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};
  
  // 🔥 Pagination handler
  const goToPage = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

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
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </aside>

      {/* Main */}
      <main className="main">
        <h1>{selectedCategory} Games</h1>

        <div className="grid">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {/* 🔥 PAGINATION */}
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
  );
}

// 🔥 SSR WITH PAGE
export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1");

  const games = await getGames(page);

  return {
    props: {
      games,
      page,
    },
  };
}
