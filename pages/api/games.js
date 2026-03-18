import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { page = 1, category = "All" } = req.query;

  const filePath = path.join(process.cwd(), "data", "games.json");
  const games = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const filtered =
    category === "All"
      ? games
      : games.filter((g) => g.category === category);

  const pageSize = 50;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  res.status(200).json({
    games: paginated,
    total: filtered.length,
  });
}
