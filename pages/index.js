import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import gamesData from "../data/games.json";
import GameCard from "../components/GameCard";

const GAMES_PER_PAGE = 50;

export default function Home() {
  const router = useRouter();
  const { page = 1, category = "All", search = "" } = router.query;

  const [filteredGames, setFilteredGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [searchQuery, setSearchQuery] = useState(search);

  useEffect(() => {
    let filtered = gamesData;

    if (category !== "All") {
      filtered = filtered.filter((g) => g.category === category);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(query) ||
          g.tags?.some((t) => t.toLowerCase().includes(query))
      );
    }

    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [category, searchQuery]);

  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE
  );

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    router.push(
      `/?page=${p}&category=${encodeURIComponent(category)}&search=${encodeURIComponent(searchQuery)}`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="grid">
        {paginatedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => 
      p === 1 ||
      p === totalPages ||
      (p >= currentPage - 2 && p <= currentPage + 2)
    )
    .map((p, idx, arr) => (
      <span key={p}>
        {idx > 0 && p - arr[idx - 1] > 1 && <>…</>} {/* ellipsis for skipped pages */}
        <button
          onClick={() => goToPage(p)}
          className={currentPage === p ? "active" : ""}
        >
          {p}
        </button>
      </span>
  ))}

  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
    Next
  </button>
</div>
  );
}
