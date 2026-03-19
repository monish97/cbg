import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

const GAMES_PER_PAGE = 20;

export default function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch from API
  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("https://api.gamemonetize.com/api/games?limit=2000");
        const data = await res.json();
        // Transform API data to expected fields
        const transformed = data.map((g) => ({
          id: g.id,
          title: g.title,
          slug: g.slug,
          thumb: g.thumbnail,
          url: g.url,
          category: g.category || "Other",
        }));
        setGames(transformed);
        setFilteredGames(transformed);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      }
    }
    fetchGames();
  }, []);

  // Filter by search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredGames(games);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredGames(
        games.filter(
          (g) =>
            g.title.toLowerCase().includes(query) ||
            g.category?.toLowerCase().includes(query)
        )
      );
    }
    setCurrentPage(1);
  }, [searchQuery, games]);

  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE
  );

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      )}
    </div>
  );
}
