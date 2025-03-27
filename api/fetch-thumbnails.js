const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const API_URL = "https://gamemonetize.com/feed.php?format=0&page=1";
const THUMBNAIL_DIR = path.join(__dirname, "../public/thumbnails");

// Ensure the thumbnails directory exists
if (!fs.existsSync(THUMBNAIL_DIR)) {
    fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
}

async function downloadImage(url, filename) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);

        const buffer = await response.buffer();
        fs.writeFileSync(path.join(THUMBNAIL_DIR, filename), buffer);
        console.log(`✅ Saved: ${filename}`);
    } catch (error) {
        console.error(`❌ Error downloading ${url}:`, error.message);
    }
}

async function fetchGamesAndDownloadThumbnails() {
    try {
        const response = await fetch(API_URL);
        const games = await response.json();

        if (!Array.isArray(games)) throw new Error("Invalid API response");

        for (const game of games) {
            if (game.thumbnail) {
                const fileName = game.title.toLowerCase().replace(/\s+/g, "-") + ".jpg";
                await downloadImage(game.thumbnail, fileName);
            }
        }
    } catch (error) {
        console.error("❌ Error fetching game data:", error.message);
    }
}

// Run the script
fetchGamesAndDownloadThumbnails();
