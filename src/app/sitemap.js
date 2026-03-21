// src/app/sitemap.js
// Next.js auto-generates /sitemap.xml from this at build time.
// Submit https://casualbrowsergames.com/sitemap.xml to Google Search Console.

import { getAllSlugs, ALL_CATEGORIES, SITE_URL } from '@/lib/games'

export const revalidate = 21600

export default async function sitemap() {
  const now   = new Date().toISOString()
  const slugs = await getAllSlugs()

  const staticPages = [
    { url: SITE_URL,               lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`,  lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/faq`,      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const categoryPages = ALL_CATEGORIES.map(cat => ({
    url: `${SITE_URL}/games/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const gamePages = slugs.map(slug => ({
    url: `${SITE_URL}/game/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticPages, ...categoryPages, ...gamePages]
}
