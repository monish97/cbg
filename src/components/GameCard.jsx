// src/components/GameCard.jsx
import Link from 'next/link'
import Image from 'next/image'
import { CAT_META } from '@/lib/games'
import styles from './GameCard.module.css'

export default function GameCard({ game, big = false }) {
  const cat = CAT_META[game.category] || CAT_META.other

  return (
    <Link
      href={`/game/${game.slug}`}
      className={`${styles.card} ${big ? styles.big : ''}`}
    >
      <div className={styles.thumb}>
        {game.thumb ? (
          <Image
            src={game.thumb}
            alt={`${game.title} screenshot`}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className={styles.img}
            unoptimized  // GameMonetize images are already CDN-hosted
          />
        ) : (
          <div className={styles.placeholder}>🎮</div>
        )}

        <div className={styles.overlay}>
          <div className={styles.playBtn}>
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{game.title}</div>
        <div className={styles.meta}>
          <span
            className={styles.catTag}
            style={{ background: cat.bg, color: cat.color }}
          >
            {cat.label}
          </span>
          <span className={styles.plays}>{cat.emoji}</span>
        </div>
      </div>
    </Link>
  )
}
