export async function getGames() {
  try {
    const res = await fetch("https://feeds.gamepix.com/v2/json?sid=4B22B&pagination=48&page=1");

    const data = await res.json();

    // ✅ CORRECT FIELD
    const gamesArray = data.items || [];

    return gamesArray.map((game) => ({
      id: game.id,
      title: game.title,
      slug:
        (game.title || "game")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") + "-" + game.id,

      // ✅ correct fields from docs
      thumbnail: game.banner_image || game.image,
      iframe: game.url,
      description: game.description,
      category: game.category
    }));

  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}
