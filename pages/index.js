import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getGames, getAllCategories } from "../lib/api";

export default function Home({ games, page, category, categories }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (newPage) => {
    router.push(`/?page=${newPage}&category=${encodeURIComponent(category)}`);
  };

  const getPageNumbers = () => {
    const totalVisible = 5;
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = start + totalVisible - 1;

    if (page <= 3) start = 1;

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleCategoryClick = (cat) => {
    router.push(`/?page=1&category=${encodeURIComponent(cat)}`);
  };

  return (
    <>
      <h1>{category === "All" ? "All Games" : `${category} Games`}</h1>

      {/* Category Buttons */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={cat === category ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Games Grid */}
      <div className="grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => goToPage(page - 1)} disabled={page <= 1}>
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
        <button
          onClick={() => goToPage(page + 1)}
          disabled={filteredGames.length < 50}
        >
          Next
        </button>
      </div>
    </>
  );
}

// SSR
export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1");
  const category = context.query.category || "All";

  const [games, categories] = await Promise.all([
    getGames(page, category),
    getAllCategories(),
  ]);

  return {
    props: {
      games,
      page,
      category,
      categories,
    },
  };
}
