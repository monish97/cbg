import { useState } from "react";
import { useRouter } from "next/router";
import GameCard from "../components/GameCard";
import fs from "fs";
import path from "path";

export default function Home({ games, page, category, hasMore }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (newPage) => {
    router.push(`/?page=${newPage}&category=${encodeURIComponent(category)}`);
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

  // ✅ Prevent going beyond last page
  if (!hasMore) {
    end = page;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

  return (
    <>
      <h1>{category === "All" ? "All Games" : `${category} Games`}</h1>

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

        <button onClick={() => goToPage(page + 1)} disabled={!hasMore}>
          Next
        </button>
      </div>
    </>
  );
}

// SSR
export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1");
  const category = context.query.category || "All";

  const filePath = path.join(process.cwd(), "data", "games.json");
  const allGames = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const filtered =
    category === "All"
      ? allGames
      : allGames.filter((game) =>
          game.category.includes(category)
        );

  const PAGE_SIZE = 50;
  const start = (page - 1) * PAGE_SIZE;
  const games = filtered.slice(start, start + PAGE_SIZE);

  const hasMore = start + PAGE_SIZE < filtered.length;

  return {
    props: {
      games,
      page,
      category,
      hasMore,
    },
  };
}
