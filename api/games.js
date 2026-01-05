export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');
    
    try {
        console.log('Fetching games from GameMonetize...');
        
        const response = await fetch('https://gamemonetize.com/feed.php?format=1&page=1', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Response preview:', text.substring(0, 200));
        
        // Try to parse as JSON
        const data = JSON.parse(text);
        
        res.status(200).json(data);
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch games',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
