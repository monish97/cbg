let cachedGames = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 4; // 4 hours cache

export async function getAllGames() {
  try {
    // Return cache if recent
    if (cachedGames && Date.now() - lastFetchTime < CACHE_DURATION) {
      return cachedGames;
    }

    const res = await fetch(
      "https://gamemonetize.com/feed.php?format=0&num=1000&page=1"
    );

    if (!res.ok) {
      console.error("GameMonetize feed returned status:", res.status);
      return cachedGames || [];
    }

    const data = await res.json();
    const gamesArray = data.games || [];

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

    lastFetchTime = Date.now();
    return cachedGames;
  } catch (err) {
    console.error("Error fetching GameMonetize feed:", err);
    return cachedGames || [];
  }
}

// Get games for a specific page
export async function getGames(page = 1, perPage = 50) {
  const allGames = await getAllGames();
  const start = (page - 1) * perPage;
  return allGames.slice(start, start + perPage);
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
