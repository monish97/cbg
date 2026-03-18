import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import { getGames } from "../lib/api";

const categories = [
  "All",
  "IO",
  "2 Player",
  "3D",
  "Action",
  "Adventure",
  "Arcade",
  "Baby",
  "Bejeweled",
  "Boys",
  "Clicker",
  "Cooking",
  "Girls",
  "Hypercasual",
  "Multiplayer",
  "Puzzle",
  "Racing",
  "Shooting",
  "Soccer",
  "Sports",
  "Stickman",
];

export default function Home({ games, page, category }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (newPage) => {
    router.push(`/?page=${newPage}&category=${category}`);
  };

  const changeCategory = (cat) => {
    router.push(`/?page=1&category=${cat}`);
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
      <h1>{category === "All" ? "All Games" : `${category} Games`}</h1>

      {/* ✅ Categories */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === category ? "active" : ""}
            onClick={() => changeCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔍 Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🎮 Games Grid */}
      <div className="grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* 📄 Pagination */}
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

      {/* 🎨 Styles */}
      <style jsx>{`
        h1 {
          color: #fff;
          font-size: 32px;
          margin-bottom: 20px;
        }

        .categories {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .categories button {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          background: #1e293b;
          color: #cbd5f5;
        }

        .categories button.active {
          background: #3b82f6;
          color: #fff;
        }

        .search-bar {
          margin-bottom: 20px;
        }

        .search-bar input {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #1e293b;
          background: #0f172a;
          color: #fff;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .pagination {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .pagination button {
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background: #1e293b;
          color: #cbd5f5;
        }

        .pagination button.active {
          background: #3b82f6;
          color: #fff;
        }

        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}

// ✅ SSR
export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1");
  const category = context.query.category || "All";

  const games = await getGames(page, category);

  return {
    props: {
      games,
      page,
      category,
    },
  };
}
