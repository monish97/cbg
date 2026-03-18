// lib/api.js
export async function getGames(page = 1) {
  try {
    // Fetch 50 games per page
    const url = `https://gamemonetize.com/feed.php?format=0&num=50&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    // Map to our site format
    const gamesArray = data || [];

    return gamesArray.map((game) => ({
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
  } catch (error) {
    console.error("Error fetching GameMonetize games:", error);
    return [];
  }
}
