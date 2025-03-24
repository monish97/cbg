export default async function handler(req, res) {
    const siteUrl = "https://casualbrowsergames.com";

    try {
        const response = await fetch("https://feeds.gamepix.com/v2/json?sid=4B22B&pagination=96&page=1");
        const data = await response.json();
        const games = data.items;

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // Add main pages
        const mainPages = ["", "faq.html", "about.html", "contact.html", "privacy.html"];
        mainPages.forEach((page) => {
            sitemap += `   <url>\n`;
            sitemap += `       <loc>${siteUrl}/${page}</loc>\n`;
            sitemap += `       <priority>0.8</priority>\n`;
            sitemap += `   </url>\n`;
        });

        // Add game pages
        games.forEach((game) => {
            sitemap += `   <url>\n`;
            sitemap += `       <loc>${siteUrl}/play.html?game=${encodeURIComponent(game.url)}</loc>\n`;
            sitemap += `       <priority>0.6</priority>\n`;
            sitemap += `   </url>\n`;
        });

        sitemap += `</urlset>`;

        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(sitemap);
    } catch (error) {
        console.error("Error generating sitemap:", error);
        res.status(500).send("Error generating sitemap");
    }
}
