import fs from "fs";
import path from "path";

const PAGE_SIZE = 50;

export async function getGames(page = 1, category = "All") {
  const filePath = path.join(process.cwd(), "data", "games.json");
  const allGames = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Filter by category if not "All"
  const filtered = category === "All"
    ? allGames
    : allGames.filter((game) => game.category === category);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return filtered.slice(start, end);
}

export async function getAllCategories() {
  const filePath = path.join(process.cwd(), "data", "games.json");
  const allGames = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const categories = Array.from(
    new Set(allGames.map((game) => game.category))
  ).sort();

  return ["All", ...categories];
}
