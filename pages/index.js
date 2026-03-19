import { useState } from "react";
import GameCard from "../components/GameCard";
import Layout from "../components/Layout";
import xml2js from "xml2js";

const GAMES_PER_PAGE = 20;

export default function Home({ games }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGames = games.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / GAMES_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE
  );

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  };

  return (
    <Layout>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
    </Layout>
  );
}

// SERVER SIDE FETCH
export async function getServerSideProps() {
  try {
    const res = await fetch("https://gamemonetize.com/feed.php?format=0&page=1");
    const xmlText = await res.text();

    // Parse XML to JS object
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlText);

    // Extract games
    const games = result.games.game.map((g) => ({
      id: g.id[0],
      title: g.title[0],
      url: g.url[0],
      thumb: g.thumbnail[0],
    }));

    return { props: { games } };
  } catch (err) {
    console.error(err);
    return { props: { games: [] } };
  }
}
