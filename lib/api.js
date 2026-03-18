export async function getAllGames() {
  let allGames = [];

  for (let i = 1; i <= 5; i++) {
    const res = await fetch(
      `https://gamemonetize.com/feed.php?format=0&page=${i}`
    );

    const data = await res.json();

    const mapped = data.map((game) => ({
      title: game.title,
      description:
        game.description ||
        "Play this exciting browser game online for free!",
      thumbnail: game.thumb,
      iframe: game.url,
      category: game.category || "casual",

      slug: game.url.split("/").pop(),
    }));

    allGames = [...allGames, ...mapped];
  }

  return allGames;
}
