'use client'
// src/components/Header.jsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

const NAV_LINKS = [
  { href: '/games/action',  label: 'Action'  },
  { href: '/games/puzzle',  label: 'Puzzle'  },
  { href: '/games/racing',  label: 'Racing'  },
  { href: '/games/sports',  label: 'Sports'  },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🕹️</span>
          Casual<span className={styles.logoAccent}>Browser</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
