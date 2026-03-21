// src/app/games/[category]/page.jsx
import { notFound } from 'next/navigation'
import { getGamesByCategory, CAT_META, ALL_CATEGORIES, SITE_URL } from '@/lib/games'
import GameCard from '@/components/GameCard'
import styles from './page.module.css'

export const revalidate = 21600

export async function generateStaticParams() {
  return ALL_CATEGORIES.map(category => ({ category }))
}

export async function generateMetadata({ params }) {
  const meta = CAT_META[params.category]
  if (!meta) return {}
  return {
    title: `Free ${meta.label} Games – Play Online`,
    description: `Play free ${meta.label.toLowerCase()} games online in your browser. No download, no login required. The best ${meta.label.toLowerCase()} browser games all in one place.`,
    alternates: { canonical: `${SITE_URL}/games/${params.category}` },
  }
}

export default async function CategoryPage({ params }) {
  const meta = CAT_META[params.category]
  if (!meta) notFound()

  const games = await getGamesByCategory(params.category)

  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <span className={styles.heroEmoji}>{meta.emoji}</span>
        <h1 className={styles.h1}>Free {meta.label} Games</h1>
        <p className={styles.sub}>
          {games.length > 0
            ? `${games.length} free ${meta.label.toLowerCase()} games — play instantly in your browser, no download needed.`
            : `${meta.label} games — play instantly in your browser, no download needed.`}
        </p>
      </div>

      {games.length === 0 ? (
        <p className={styles.empty}>No games in this category yet — check back soon!</p>
      ) : (
        <div className={styles.grid}>
          {games.map(g => <GameCard key={g.id} game={g} />)}
        </div>
      )}
    </div>
  )
}
