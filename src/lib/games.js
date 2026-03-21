// src/lib/games.js
// ─────────────────────────────────────────────────────────────────────────────
// GameMonetize Feed Integration
//
// The feed URL returns a JSON array. Each item has these fields:
//   title        - Game name
//   description  - Short description
//   instructions - How to play text
//   url          - The iframe embed URL  (use this as embedUrl)
//   thumb        - Thumbnail image URL
//   category     - Comma-separated category string e.g. "Action" or "Puzzle,Arcade"
//   tags         - Comma-separated tags
//   width        - Game width in px
//   height       - Game height in px
//
// FEED URL format:
//   https://gamemonetize.com/feed.php?format=0&num=200&page=1
//   format=0  → JSON (format=1 is RSS/XML)
//   num=200   → games per page (max per request)
//   page=1    → page number (paginate with page=2, page=3 etc.)
//
// We fetch on the SERVER at build time (and refresh every 6 hours with ISR).
// No API call ever happens in the user's browser. Pages are pre-rendered & fast.
// ─────────────────────────────────────────────────────────────────────────────

// ── CONFIG ────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://casualbrowsergames.com' // ← change to your domain

const FEED_BASE      = 'https://gamemonetize.com/feed.php'
const GAMES_PER_PAGE = 200          // max per request
const TOTAL_PAGES    = 3            // fetches up to 600 games (3 × 200)
const REVALIDATE_SEC = 60 * 60 * 6  // re-fetch every 6 hours (ISR)

// ── CATEGORY CONFIG ───────────────────────────────────────────────────────────

export const CAT_META = {
  action:    { label: 'Action',    emoji: '⚔️',  color: '#ff4d6d', bg: 'rgba(255,77,109,0.15)'  },
  puzzle:    { label: 'Puzzle',    emoji: '🧩',  color: '#6c63ff', bg: 'rgba(108,99,255,0.15)'  },
  racing:    { label: 'Racing',    emoji: '🏎️',  color: '#ffb830', bg: 'rgba(255,184,48,0.15)' },
  sports:    { label: 'Sports',    emoji: '⚽',  color: '#00d4aa', bg: 'rgba(0,212,170,0.15)'   },
  shooter:   { label: 'Shooter',   emoji: '🔫', color: '#ff6b35', bg: 'rgba(255,107,53,0.15)'  },
  idle:      { label: 'Idle',      emoji: '💤',  color: '#c084fc', bg: 'rgba(192,132,252,0.15)' },
  adventure: { label: 'Adventure', emoji: '🗺️',  color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
  arcade:    { label: 'Arcade',    emoji: '🕹️',  color: '#f472b6', bg: 'rgba(244,114,182,0.15)' },
  casual:    { label: 'Casual',    emoji: '🎈',  color: '#60a5fa', bg: 'rgba(96,165,250,0.15)'  },
  io:        { label: '.io',       emoji: '🌐',  color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
  other:     { label: 'Other',     emoji: '🎮',  color: '#8888a8', bg: 'rgba(136,136,168,0.15)' },
}

// Categories shown in the main nav and homepage pills
export const FEATURED_CATEGORIES = ['action', 'puzzle', 'racing', 'sports', 'shooter', 'idle', 'adventure', 'arcade']

// All possible category slugs (used for generateStaticParams)
export const ALL_CATEGORIES = Object.keys(CAT_META)

// ── SLUG HELPERS ──────────────────────────────────────────────────────────────

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function normaliseCategory(raw = '') {
  const first = raw.split(',')[0].trim().toLowerCase()
  const MAP = {
    'action': 'action', 'shooter': 'shooter', 'shooting': 'shooter',
    'puzzle': 'puzzle', 'racing': 'racing', 'driving': 'racing', 'car': 'racing',
    'sports': 'sports', 'sport': 'sports', 'football': 'sports', 'soccer': 'sports',
    'basketball': 'sports', 'idle': 'idle', 'clicker': 'idle',
    'adventure': 'adventure', 'arcade': 'arcade', 'casual': 'casual',
    '.io': 'io', 'io': 'io', '2 player': 'arcade', '2player': 'arcade',
    'multiplayer': 'arcade', '3d': 'action', 'bejeweled': 'puzzle',
    'match3': 'puzzle', 'match 3': 'puzzle', 'strategy': 'puzzle',
    'tower defense': 'action', 'defense': 'action', 'running': 'action',
    'skill': 'action', 'girls': 'casual', 'dress up': 'casual',
    'cooking': 'casual', 'baby': 'casual', 'kids': 'casual',
    'boys': 'action', 'zombie': 'shooter', 'horror': 'action',
    'escape': 'adventure', 'rpg': 'adventure',
  }
  return MAP[first] ?? 'other'
}

// ── FETCH ─────────────────────────────────────────────────────────────────────

async function fetchPage(page) {
  const url = `${FEED_BASE}?format=0&num=${GAMES_PER_PAGE}&page=${page}`
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SEC } })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    console.error(`[games] Failed to fetch page ${page}`)
    return []
  }
}

export async function getAllGames() {
  const pages = await Promise.all(
    Array.from({ length: TOTAL_PAGES }, (_, i) => fetchPage(i + 1))
  )
  const raw  = pages.flat()
  const seen = new Set()
  const games = []

  for (const item of raw) {
    if (!item.title || !item.url) continue
    const slug = slugify(item.title)
    if (seen.has(slug)) continue
    seen.add(slug)

    const category = normaliseCategory(item.category)
    const tags = item.tags
      ? item.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
      : []

    games.push({
      id: slug, slug, category, tags,
      title:        item.title,
      description:  item.description  || '',
      instructions: item.instructions || '',
      embedUrl:     item.url,
      thumb:        item.thumb  || null,
      width:        item.width  || 800,
      height:       item.height || 600,
    })
  }
  return games
}

// ── DERIVED QUERIES ───────────────────────────────────────────────────────────

export async function getGameBySlug(slug) {
  const all = await getAllGames()
  return all.find(g => g.slug === slug) ?? null
}

export async function getGamesByCategory(category) {
  const all = await getAllGames()
  return all.filter(g => g.category === category)
}

export async function getFeaturedGames(limit = 12) {
  const all = await getAllGames()
  return all.slice(0, limit)
}

export async function getTrendingGames(limit = 12) {
  const all = await getAllGames()
  return all.slice(12, 12 + limit)
}

export async function getNewGames(limit = 8) {
  const all = await getAllGames()
  return all.slice(-limit)
}

export async function getRelatedGames(game, limit = 4) {
  const all = await getAllGames()
  return all.filter(g => g.slug !== game.slug && g.category === game.category).slice(0, limit)
}

export async function getAllSlugs() {
  const all = await getAllGames()
  return all.map(g => g.slug)
}
