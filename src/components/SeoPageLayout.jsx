// src/components/SeoPageLayout.jsx
// Shared layout used by About, Privacy, Terms, Contact, FAQ
import Link from 'next/link'
import styles from './SeoPageLayout.module.css'

export default function SeoPageLayout({ icon, title, subtitle, badge, children }) {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.icon} aria-hidden="true">{icon}</span>
          <h1 className={styles.h1}>{title}</h1>
          {subtitle && <p className={styles.sub}>{subtitle}</p>}
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </>
  )
}
