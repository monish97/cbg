import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getGames } from "../lib/api";

export default function Home({ games, page, category }) {
  const router = useRouter();

  // ✅ Category state synced with URL
  const [selectedCategory, setSelectedCategory] = useState(category);

  // ✅ Extract categories
  const categories = ["All", ...new Set(games.map((g) => g.category))];

  // ✅ Filter games
  const filteredGames =
    selectedCategory === "All"
      ? games
      : games.filter((g) => g.category === selectedCategory);

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

// ✅ SSR (reads page + category from URL)
export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1");
  const category = context.query.category || "All";

  const games = await getGames(page);

  return {
    props: {
      games,
      page,
      category,
    },
  };
}
