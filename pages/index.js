import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getGames } from "../lib/api";
import { getAllGames } from "../lib/api";

export default function Home({ games, currentPage, category }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (newPage) => {
    if (newPage < 1) return;
    router.push(`/?page=${newPage}`);
  };

  const getPageNumbers = () => {
    const totalVisible = 5;
    const pages = [];

    let start = Math.max(1, currentPage - 2);
    let end = start + totalVisible - 1;

    if (currentPage <= 3) {
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
      <h1>All Games</h1>

      {/* 🔍 Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🎮 Grid */}
      <div className="grid">
        {filteredGames.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>

      {/* 📄 Pagination */}
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Prev
        </button>

        {getPageNumbers().map((p) => (
          <button
            key={p}
            className={p === currentPage ? "active" : ""}
            onClick={() => goToPage(p)}
          >
            {p}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </>
  );
}

// ✅ SSR
export async function getServerSideProps(context) {
  const page = context.query.page ? parseInt(context.query.page) : 1;

  const allGames = await getAllGames();

  const gamesPerPage = 20;

  const start = (page - 1) * gamesPerPage;
  const end = start + gamesPerPage;

  const paginatedGames = allGames.slice(start, end);

  return {
    props: {
      games: paginatedGames,
      currentPage: page,
    },
  };
}
