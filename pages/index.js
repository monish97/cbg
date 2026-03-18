import { useEffect, useState } from "react";
import gamesData from "../data/games.json"; 
import GameCard from "../components/GameCard"; // optional if using separate component
import { useRouter } from "next/router";

const GAMES_PER_PAGE = 20;

export default function Home() {
  const router = useRouter();
  const { page = 1, category = "All", search = "" } = router.query;

  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [searchQuery, setSearchQuery] = useState(search);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  useEffect(() => {
    let filtered = games;

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
  }, [games, category, searchQuery]);

  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE
  );

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const goToPage = (p) => {
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

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
