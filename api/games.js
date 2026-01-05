export default async function handler(req, res) {
    try {
        const response = await fetch('https://gamemonetize.com/feed.php?format=1&page=1');
        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch games' });
    }
}
