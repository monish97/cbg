// lib/api.js
let cachedGames = null;
let lastFetchTime = 0;
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export async function getAllGames() {
  const now = Date.now();

  // Return cached games if still valid
  if (cachedGames && now - lastFetchTime < CACHE_DURATION) {
    return cachedGames;
  }

  try {
    // Fetch all games from GameMonetize feed
    const res = await fetch("https://gamemonetize.com/feed.php?format=0&num=1000&page=1");
    const data = await res.json();

    const gamesArray = data.games || []; // make sure 'games' key matches their JSON

    // Map to our format
    cachedGames = gamesArray.map((game) => ({
      id: game.id,
      title: game.title,
      slug:
        (game.title || "game")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") + "-" + game.id,
      thumbnail: game.thumb,
      iframe: game.url,
      description: game.description,
      category: game.category,
      width: game.width,
      height: game.height,
    }));

    lastFetchTime = now;
    return cachedGames;

  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

// ✅ Helper function: paginate games
export function getGamesByPage(page = 1, perPage = 50) {
  if (!cachedGames) return [];
  const start = (page - 1) * perPage;
  return cachedGames.slice(start, start + perPage);
}

// ✅ Optional: get related games by category
export function getRelatedGames(game, max = 6) {
  if (!cachedGames) return [];
  return cachedGames
    .filter((g) => g.category === game.category && g.slug !== game.slug)
    .slice(0, max);
}
