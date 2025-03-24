export default function handler(req, res) {
    const siteUrl = "https://casualbrowsergames.com";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>${siteUrl}/</loc><priority>1.0</priority></url>
        <url><loc>${siteUrl}/faq.html</loc><priority>0.8</priority></url>
        <url><loc>${siteUrl}/about.html</loc><priority>0.8</priority></url>
        <url><loc>${siteUrl}/contact.html</loc><priority>0.8</priority></url>
        <url><loc>${siteUrl}/privacy.html</loc><priority>0.8</priority></url>
    </urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
}

