let CACHE = null;
let LAST_FETCH = 0;
const CACHE_DURATION = 1000 * 60 * 30; // 30 mins

async function fetchAllGames() {
  let allGames = [];

  // Fetch multiple pages
  for (let page = 1; page <= 10; page++) {
    try {
      const res = await fetch(
        `https://gamemonetize.com/feed.php?format=0&num=50&page=${page}`
      );
      const data = await res.json();

      const gamesArray = Array.isArray(data)
        ? data
        : data?.games || [];      

      allGames = allGames.concat(gamesArray);
    } catch (err) {
      console.error("Fetch failed page:", page);
    }
  }

  return allGames.map((game) => ({
    id: game.id,
    title: game.title,
    slug: `${(game.title || "game")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${game.id}`,
    thumbnail: game.thumb,
    iframe: game.url,
    category: game.category || "Other",
  }));
}

export default async function handler(req, res) {
  const now = Date.now();

  // Serve from cache
  if (CACHE && now - LAST_FETCH < CACHE_DURATION) {
    return res.status(200).json(CACHE);
  }

  // Fetch fresh
  const games = await fetchAllGames();

  CACHE = games;
  LAST_FETCH = now;

  return res.status(200).json(games);
}
