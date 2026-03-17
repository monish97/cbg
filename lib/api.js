export async function getGames() {
  try {
    const res = await fetch("https://feeds.gamepix.com/v2/json?sid=4B22B&pagination=48&page=1");

    const data = await res.json();

    console.log("GamePix Data:", data);

    // ⚠️ IMPORTANT: GamePix usually wraps data inside "data"
    const gamesArray = data.data || data.games || data;

    return gamesArray.map((game) => ({
      id: game.id,
      title: game.title,
      slug:
        (game.title || "game")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") + "-" + game.id,
      thumbnail: game.thumbnail || game.image,
      iframe: game.url || game.gameUrl,
      description: game.description || "Play this game online for free!",
    }));

  } catch (error) {
    console.error("Error fetching games:", error);
    return []; // prevent crash
  }
}
