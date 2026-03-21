// src/app/page.jsx
import Link from 'next/link'
import Image from 'next/image'
import GameCard from '@/components/GameCard'
import { getFeaturedGames, getTrendingGames, getNewGames, CAT_META, FEATURED_CATEGORIES } from '@/lib/games'
import styles from './page.module.css'

export const revalidate = 21600 // 6 hours — matches feed revalidation

export const metadata = {
  title: 'Casual Browser Games – Free Online Games, No Download',
  description:
    'Play hundreds of free browser games instantly – no download, no login required. Action, puzzle, racing, sports and more.',
  alternates: { canonical: 'https://casualbrowsergames.com' },
}

export default async function HomePage() {
  // All three run in parallel — one cached fetch powers all of them
  const [featured, trending, newest] = await Promise.all([
    getFeaturedGames(12),
    getTrendingGames(12),
    getNewGames(8),
  ])

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.badge} fade-up`}>🎮 100% Free · No Login · No Download</div>
        <h1 className={`${styles.h1} fade-up-1`}>
          Play <em>Free</em> Games<br />Right in Your <strong>Browser</strong>
        </h1>
        <p className={`${styles.sub} fade-up-2`}>500+ games. Pick one. Play instantly.</p>
        <div className={`${styles.stats} fade-up-3`}>
          <div className={styles.stat}><span className={styles.statNum}>500+</span><span className={styles.statLabel}>Games</span></div>
          <div className={styles.stat}><span className={styles.statNum}>0</span><span className={styles.statLabel}>Downloads</span></div>
          <div className={styles.stat}><span className={styles.statNum}>Free</span><span className={styles.statLabel}>Always</span></div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ── */}
      <div className={styles.categories}>
        {FEATURED_CATEGORIES.map(cat => {
          const m = CAT_META[cat]
          return (
            <Link
              key={cat}
              href={`/games/${cat}`}
              className={styles.catPill}
              style={{ background: m.color, color: cat === 'racing' || cat === 'sports' ? '#111' : '#fff' }}
            >
              {m.emoji} {m.label}
            </Link>
          )
        })}
      </div>

      {/* ── FEATURED ── */}
      <Section title="Featured Games" dot href="/games/action">
        <div className={`${styles.grid} ${styles.gridFeatured}`}>
          {featured.map(g => <GameCard key={g.id} game={g} big />)}
        </div>
      </Section>

      {/* ── HOT RIGHT NOW ── */}
      <Section title="🔥 Hot Right Now" href="/games/action">
        <div className={styles.grid}>
          {trending.map(g => <GameCard key={g.id} game={g} />)}
        </div>
      </Section>

      {/* ── BANNER ── */}
      <div className={styles.bannerWrap}>
        <div className={styles.banner}>
          <div className={styles.bannerText}>
            <h2>No account needed.<br />Just hit Play.</h2>
            <p>Every game runs in your browser. No downloads, no installs, no sign-ups — ever. Pick a game and start in seconds.</p>
          </div>
          <div className={styles.bannerIcons} aria-hidden="true">🎯🏆🕹️</div>
        </div>
      </div>

      {/* ── NEW ARRIVALS ── */}
      <Section title="✨ New Arrivals" href="/games/action">
        <div className={styles.grid}>
          {newest.map(g => <GameCard key={g.id} game={g} />)}
        </div>
      </Section>
    </>
  )
}

function Section({ title, dot, href, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {dot && <span className={styles.dot} />}
          {title}
        </h2>
        <Link href={href} className={styles.seeAll}>See all →</Link>
      </div>
      {children}
    </div>
  )
}
