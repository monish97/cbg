export async function getGames(page = 1, category = null) {
  try {
    let allGames = [];

    // 🔥 Fetch multiple pages from GameMonetize
    for (let i = 1; i <= 5; i++) {
      const res = await fetch(
        `https://gamemonetize.com/feed.php?format=0&page=${i}`
      );

      const data = await res.json();

      const mapped = data.map((game) => ({
        id: game.url, // ✅ unique ID substitute
        title: game.title,
        slug: game.url.split("/").pop(), // ✅ stable slug
        thumbnail: game.thumb,
        iframe: game.url,
        description:
          game.description ||
          "Play this exciting browser game online for free!",
        category: game.category || "casual",
      }));

      allGames = [...allGames, ...mapped];
    }

    // 🔥 OPTIONAL: Category filter (like GamePix)
    if (category && category !== "All") {
      allGames = allGames.filter(
        (g) => g.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // 🔥 PAGINATION (simulate GamePix)
    const gamesPerPage = 48;
    const start = (page - 1) * gamesPerPage;
    const end = start + gamesPerPage;

    return allGames.slice(start, end);

  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}
