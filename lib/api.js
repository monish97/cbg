// lib/api.js
let cachedPages = {}; // Cache: pageNumber => games array
let cacheTimestamps = {}; // When each page was cached
const CACHE_DURATION = 1000 * 60 * 60 * 4; // 4 hours

export async function getGames(page = 1) {
  try {
    const now = Date.now();

    // Return cache if fresh
    if (cachedPages[page] && now - cacheTimestamps[page] < CACHE_DURATION) {
      return cachedPages[page];
    }

    // Fetch page from GameMonetize
    const url = `https://gamemonetize.com/feed.php?format=0&num=50&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    const gamesArray = data.items || [];

    const formattedGames = gamesArray.map((game) => ({
      id: game.id,
      title: game.title,
      slug:
        (game.title || "game")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") + "-" + game.id,
      thumbnail: game.thumb,
      iframe: game.url,
      description: game.description || "Play this game online for free!",
      category: game.category || "All",
      width: game.width,
      height: game.height,
    }));

    // Cache the result
    cachedPages[page] = formattedGames;
    cacheTimestamps[page] = now;

    return formattedGames;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

// Helper: get all cached pages for slug lookup
export function getAllCachedGames() {
  return Object.values(cachedPages).flat();
}
