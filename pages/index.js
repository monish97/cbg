import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getGames } from "../lib/api";

export default function Home({ games, page, category }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (newPage) => {
    router.push(`/?page=${newPage}&category=${category}`);
  };

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
    <>
      <h1>
        {category === "All"
          ? "All Games"
          : `${category.charAt(0).toUpperCase() + category.slice(1)} Games`}
      </h1>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid */}
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

        <button onClick={() => goToPage(page + 1)}>Next</button>
      </div>
    </>
  );
}

// SSR
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
