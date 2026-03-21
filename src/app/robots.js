// src/app/robots.js
// Next.js generates /robots.txt from this file.

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://casualbrowsergames.com/sitemap.xml',
  }
}
