// lib/api.js
const CACHE = {}; // cache per page
const CACHE_EXPIRY = 1000 * 60 * 60 * 2; // 2 hours

// Map category names to GameMonetize category IDs
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

export async function getGames(page = 1, categoryName = "All") {
  const cacheKey = `${page}-${categoryName}`;

  // Return from cache if fresh
  if (CACHE[cacheKey] && Date.now() - CACHE[cacheKey].timestamp < CACHE_EXPIRY) {
    return CACHE[cacheKey].data;
  }

  try {
    const categoryId = categoryMap[categoryName];
    let url = `https://gamemonetize.com/feed.php?format=0&num=50&page=${page}`;
    if (categoryId) {
      url += `&category=${categoryId}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    const gamesArray = data.games || [];

    const games = gamesArray.map((game) => ({
      id: game.id,
      title: game.title,
      slug: `${(game.title || "game").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${game.id}`,
      thumbnail: game.thumb,
      iframe: game.url,
      description: game.description || "",
      category: game.category || "Other",
      width: game.width || 800,
      height: game.height || 600,
    }));

    // Store in cache
    CACHE[cacheKey] = { data: games, timestamp: Date.now() };

    return games;
  } catch (err) {
    console.error("Error fetching games:", err);
    return [];
  }
}

// Fetch multiple pages (for slug page / related games)
export async function getMultiplePages(pages = 3, categoryName = "All") {
  let allGames = [];
  for (let i = 1; i <= pages; i++) {
    const pageGames = await getGames(i, categoryName);
    allGames = allGames.concat(pageGames);
  }
  return allGames;
}
