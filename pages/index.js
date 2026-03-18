import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getAllGames, getGamesByPage } from "../lib/api";

export default function Home({ games, page, totalPages }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <>
      <h1>All Games</h1>

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
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={page === i + 1 ? "active" : ""}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(page + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1");
  const perPage = 50;

  // Fetch all games (from cache if available)
  await getAllGames();
  const games = getGamesByPage(page, perPage);

  const totalPages = Math.ceil(cachedGames.length / perPage);

  return {
    props: {
      games,
      page,
      totalPages,
    },
  };
}
