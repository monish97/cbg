export async function getGames(page = 1) {
  try {
    const res = await fetch(
      `https://feeds.gamepix.com/v2/json?sid=4B22B&pagination=48&page=${page}`
    );

    const data = await res.json();

    const gamesArray = data.items || [];

    return gamesArray.map((game) => ({
      id: game.id,
      title: game.title,
      slug:
        (game.title || "game")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") + "-" + game.id,
      thumbnail: game.banner_image || game.image,
      iframe: game.url,
      description: game.description,
      category: game.category,
      width: game.width,
      height: game.height,
    }));

  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}
