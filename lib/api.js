// lib/api.js
const CACHE = {};
const CACHE_EXPIRY = 1000 * 60 * 60 * 2; // 2 hours

// Category mapping (GameMonetize IDs)
const categoryMap = {
  "All": null,
  "IO": 1,
  "2 Player": 2,
  "3D": 3,
  "Action": null,
  "Adventure": 4,
  "Arcade": 5,
  "Baby": 19,
  "Bejeweled": 6,
  "Boys": 7,
  "Clicker": 8,
  "Cooking": 9,
  "Girls": 10,
  "Hypercasual": 11,
  "Multiplayer": 12,
  "Puzzle": 13,
  "Racing": 14,
  "Shooting": 15,
  "Soccer": 16,
  "Sports": 17,
  "Stickman": 18,
};

export async function getGames(page = 1, category = "All") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/games`);
  const allGames = await res.json();

  let filtered = allGames;

  if (category && category !== "All") {
    filtered = allGames.filter(
      (g) => g.category.toLowerCase() === category.toLowerCase()
    );
  }

  const PAGE_SIZE = 50;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return filtered.slice(start, end);
}

export async function getMultiplePages(pages = 3, categoryName = "All") {
  let allGames = [];
  for (let i = 1; i <= pages; i++) {
    const pageGames = await getGames(i, categoryName);
    allGames = allGames.concat(pageGames);
  }
  return allGames;
}
