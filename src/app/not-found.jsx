// src/app/not-found.jsx
import Link from 'next/link'
import styles from './not-found.module.css'

export const metadata = { title: '404 – Page Not Found' }

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.emoji}>🕹️</div>
      <h1 className={styles.code}>404</h1>
      <p className={styles.msg}>Oops — this page doesn't exist.</p>
      <p className={styles.sub}>The game you're looking for may have moved or been removed.</p>
      <div className={styles.actions}>
        <Link href="/" className={styles.btnPrimary}>← Back to Homepage</Link>
        <Link href="/games/action" className={styles.btnSecondary}>Browse Games</Link>
      </div>
    </div>
  )
}
