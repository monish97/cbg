export async function getGames() {
  const res = await fetch("https://feeds.gamepix.com/v2/json?sid=4B22B&pagination=48&page=1");
  const data = await res.json();

  return data.map((game) => ({
    id: game.id,
    title: game.title,
    slug:
      (game.title || "game")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") + "-" + game.id,
    thumbnail: game.thumbnail,
    iframe: game.url,
    description: game.description || "Play this game online for free!",
    category: game.category || "casual",
  }));
}
