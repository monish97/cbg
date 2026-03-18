const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const categories = [
  { name: "All", id: null },
  { name: "Action", id: null },
  { name: "Adventure", id: 4 },
  { name: "Arcade", id: 5 },
  { name: "Puzzle", id: 13 },
  { name: "Racing", id: 14 },
  { name: "Shooting", id: 15 },
  { name: "Sports", id: 17 },
  { name: "Soccer", id: 16 },
  { name: "Stickman", id: 18 },
  { name: "Girls", id: 10 },
  { name: "Boys", id: 7 },
  { name: "Hypercasual", id: 11 },
  { name: "Multiplayer", id: 12 },
  { name: "2 Player", id: 2 },
  { name: "3D", id: 3 },
  { name: "Clicker", id: 8 },
  { name: "Cooking", id: 9 },
  { name: "Bejeweled", id: 6 },
  { name: "Baby", id: 19 },
  { name: "IO", id: 1 },
];

async function fetchAllGames() {
  let allGames = [];

  for (const category of categories) {
    let page = 1;

    while (true) {
      const url = category.id
        ? `https://gamemonetize.com/feed.php?format=0&category=${category.id}&num=50&page=${page}`
        : `https://gamemonetize.com/feed.php?format=0&num=50&page=${page}`;

      console.log(`Fetching ${category.name} - Page ${page}`);

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data || data.length === 0) break;

        const enriched = data.map((game) => ({
          ...game,
          category: category.name,
        }));

        allGames.push(...enriched);

        page++;
      } catch (err) {
        console.log("Error:", err);
        break;
      }
    }
  }

  // Remove duplicates
  const uniqueGames = Array.from(
    new Map(allGames.map((g) => [g.id, g])).values()
  );

  console.log("Total unique games:", uniqueGames.length);

  const filePath = path.join(process.cwd(), "data", "games.json");
  fs.writeFileSync(filePath, JSON.stringify(uniqueGames, null, 2));

  console.log("✅ games.json updated!");
}

fetchAllGames();
