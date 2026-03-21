// src/components/Footer.jsx
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>🕹️</span>
              Casual<span>Browser</span>
            </Link>
            <p>Free browser games for everyone. No download, no login — just instant fun. New games added every week.</p>
          </div>
          <div className={styles.col}>
            <h4>Games</h4>
            <Link href="/games/action">Action</Link>
            <Link href="/games/puzzle">Puzzle</Link>
            <Link href="/games/racing">Racing</Link>
            <Link href="/games/sports">Sports</Link>
            <Link href="/games/idle">Idle</Link>
          </div>
          <div className={styles.col}>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div className={styles.col}>
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {year} Casual Browser Games. All rights reserved.</span>
          <span>Made with ❤️ for gamers everywhere</span>
        </div>
      </div>
    </footer>
  )
}
