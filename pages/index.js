import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getGames } from "../lib/api";

export default function Home({ games, page }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  const getPageNumbers = () => {
    const totalVisible = 5;
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = start + totalVisible - 1;
    if (page <= 3) start = 1;
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <>
      <h1>All Games</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

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

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1");
  const games = await getGames(page);
  return {
    props: { games, page },
  };
}
