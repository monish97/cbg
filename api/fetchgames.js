export default async function handler(req, res) {
    try {
        const response = await fetch('https://gamemonetize.com/feed.php?format=0&page=1');
        const data = await response.json();

        // Extract relevant game data
        const games = data.map(game => ({
            id: game.id,
            title: game.title,
            description: game.description,
            thumbnail: game.thumb_2, // Change to thumb_1 or thumb_2 depending on image preference
            url: game.game_url,
            category: game.category,
            tags: game.tags
        }));

        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache for 24 hours
        res.status(200).json(games);
    } catch (error) {
        console.error("Error fetching game data:", error);
        res.status(500).json({ error: 'Failed to fetch game data' });
    }
}
