// src/app/contact/page.jsx
import SeoPageLayout from '@/components/SeoPageLayout'
import ContactForm from './ContactForm'
import styles from './page.module.css'

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Casual Browser Games team. Report a broken game, suggest a new game, or just say hello.',
  alternates: { canonical: 'https://casualbrowsergames.com/contact' },
}

const METHODS = [
  {
    icon: '🎮',
    title: 'Report a broken game',
    body: "Found a game that won't load or has issues? Let us know the game name and what's happening.",
  },
  {
    icon: '➕',
    title: 'Suggest a game',
    body: "Know a great HTML5 game we should add? Send us the name or a link and we'll check it out.",
  },
  {
    icon: '🤝',
    title: 'Developer / Partnership',
    body: 'Game developer or advertiser? Tell us about your proposal and we\'ll get back to you.',
  },
  {
    icon: '📧',
    title: 'Email us directly',
    body: 'hello@casualbrowsergames.com — we reply within 2–3 business days.',
    email: 'hello@casualbrowsergames.com',
  },
]

export default function Contact() {
  return (
    <SeoPageLayout
      icon="✉️"
      title="Contact Us"
      subtitle="Got a question, bug report, or game suggestion? We'd love to hear from you."
    >
      <div className={styles.grid}>
        {/* Info panel */}
        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>How can we help?</h2>
          {METHODS.map(m => (
            <div key={m.title} className={styles.method}>
              <span className={styles.methodIcon}>{m.icon}</span>
              <div>
                <h3 className={styles.methodTitle}>{m.title}</h3>
                <p className={styles.methodBody}>
                  {m.email
                    ? <><a href={`mailto:${m.email}`}>{m.email}</a> — we reply within 2–3 business days.</>
                    : m.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client component handles form interactivity */}
        <ContactForm />
      </div>
    </SeoPageLayout>
  )
}
