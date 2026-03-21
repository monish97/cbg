// src/app/game/[slug]/page.jsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getGameBySlug, getRelatedGames, getAllSlugs, CAT_META, SITE_URL } from '@/lib/games'
import GamePlayer from './GamePlayer'
import GameCard from '@/components/GameCard'
import styles from './page.module.css'

export const revalidate = 21600

// Pre-build a static page for every game slug
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

// Dynamic SEO metadata per game
export async function generateMetadata({ params }) {
  const game = await getGameBySlug(params.slug)
  if (!game) return {}
  const cat = CAT_META[game.category] || CAT_META.other
  const desc = game.description
    ? game.description.slice(0, 155)
    : `Play ${game.title} free online in your browser. No download, no login required.`
  return {
    title: `${game.title} – Free Browser Game`,
    description: desc,
    alternates: { canonical: `${SITE_URL}/game/${game.slug}` },
    openGraph: {
      title: `${game.title} – Play Free Online`,
      description: desc,
      images: game.thumb ? [{ url: game.thumb }] : [],
    },
  }
}

export default async function GamePage({ params }) {
  const game = await getGameBySlug(params.slug)
  if (!game) notFound()

  const related = await getRelatedGames(game, 4)
  const cat = CAT_META[game.category] || CAT_META.other

  // Parse instructions into list items if they look like sentences
  const howToItems = game.instructions
    ? game.instructions
        .split(/[.\n]/)
        .map(s => s.trim())
        .filter(s => s.length > 10)
        .slice(0, 6)
    : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description || `Play ${game.title} free in your browser.`,
    genre: [cat.label, 'Browser Game'],
    gamePlatform: 'Web Browser',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(game.thumb && { image: game.thumb }),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${cat.label} Games`, item: `${SITE_URL}/games/${game.category}` },
      { '@type': 'ListItem', position: 3, name: game.title },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link> ›&nbsp;
        <Link href={`/games/${game.category}`}>{cat.label} Games</Link> ›&nbsp;
        <span>{game.title}</span>
      </nav>

      <div className={styles.layout}>

        {/* LEFT: game + description */}
        <div className={styles.gameCol}>
          <div className={styles.gameHeader}>
            <h1>{game.title}</h1>
            <div className={styles.gameMeta}>
              <span className={styles.tag} style={{ background: cat.bg, color: cat.color }}>
                {cat.emoji} {cat.label}
              </span>
            </div>
          </div>

          {/* Client component — handles iframe splash/loading/fullscreen */}
          <GamePlayer game={game} />

          {/* SEO description block — critical for ranking */}
          <article className={styles.desc}>
            <h2>About {game.title}</h2>

            {game.description ? (
              <p>{game.description}</p>
            ) : (
              <p>
                {game.title} is a free browser game you can play instantly — no download or login needed.
                Enjoy this {cat.label.toLowerCase()} game right here on Casual Browser Games.
              </p>
            )}

            {howToItems.length > 0 && (
              <>
                <h3>How to Play</h3>
                <ul className={styles.howTo}>
                  {howToItems.map((step, i) => <li key={i}>{step}</li>)}
                </ul>
              </>
            )}

            <h3>Game Details</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}><span>Genre</span><strong>{cat.label}</strong></div>
              <div className={styles.infoCard}><span>Platform</span><strong>Web Browser</strong></div>
              <div className={styles.infoCard}><span>Controls</span><strong>Keyboard / Mouse / Touch</strong></div>
              <div className={styles.infoCard}><span>Download</span><strong>Not Required</strong></div>
            </div>

            {game.tags.length > 0 && (
              <div className={styles.tagCloud}>
                {game.tags.map(tag => (
                  <span key={tag} className={styles.tagPill}>{tag}</span>
                ))}
              </div>
            )}
          </article>
        </div>

        {/* RIGHT: sidebar */}
        <aside className={styles.sidebar}>
          {related.length > 0 && (
            <div className={styles.sideCard}>
              <h3>🔥 More {cat.label} Games</h3>
              <div className={styles.relatedList}>
                {related.map(g => {
                  const rc = CAT_META[g.category] || CAT_META.other
                  return (
                    <Link key={g.id} href={`/game/${g.slug}`} className={styles.relatedItem}>
                      <div className={styles.relatedThumb}>
                        {g.thumb ? (
                          <Image src={g.thumb} alt={g.title} fill sizes="56px" className={styles.relatedImg} unoptimized />
                        ) : (
                          <span>{rc.emoji}</span>
                        )}
                      </div>
                      <div>
                        <div className={styles.relatedName}>{g.title}</div>
                        <div className={styles.relatedMeta}>{rc.label}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <div className={styles.sideCard}>
            <h3>🏷️ Tags</h3>
            <div className={styles.tags}>
              <Link href={`/games/${game.category}`} className={styles.tagBtn}>{cat.label}</Link>
              {game.tags.slice(0, 8).map(tag => (
                <span key={tag} className={styles.tagBtn}>{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
