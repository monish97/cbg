// lib/api.js
const CACHE = {}; // cache per page
const CACHE_EXPIRY = 1000 * 60 * 60 * 2; // 2 hours

export async function getGames(page = 1, category = null) {
  const cacheKey = `${page}-${category || "All"}`;

  // Return from cache if fresh
  if (CACHE[cacheKey] && Date.now() - CACHE[cacheKey].timestamp < CACHE_EXPIRY) {
    return CACHE[cacheKey].data;
  }

  try {
    let url = `https://gamemonetize.com/feed.php?format=0&num=50&page=${page}`;
    if (category && category !== "All") {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    const gamesArray = data || [];

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

// Fetch multiple pages (for slug page)
export async function getMultiplePages(pages = 3, category = null) {
  let allGames = [];
  for (let i = 1; i <= pages; i++) {
    const pageGames = await getGames(i, category);
    allGames = allGames.concat(pageGames);
  }
  return allGames;
}
