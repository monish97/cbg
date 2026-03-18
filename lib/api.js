export async function getGames(page = 1) {
  try {
    const res = await fetch(
      `https://gamemonetize.com/feed.php?format=0&page=${page}`
    );

    const data = await res.json();

    return data.map((game) => ({
      title: game.title,
      description:
        game.description ||
        "Play this exciting browser game online for free!",
      thumbnail: game.thumb,
      iframe: game.url,
      category: game.category || "casual",

      // ✅ Stable unique slug
      slug: game.url.split("/").pop(),
    }));
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}
