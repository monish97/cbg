// src/app/about/page.jsx
import Link from 'next/link'
import SeoPageLayout from '@/components/SeoPageLayout'
import prose from '@/components/Prose.module.css'
import styles from './page.module.css'

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Casual Browser Games — our mission to bring free, instant browser games to everyone, no downloads or accounts needed.',
  alternates: { canonical: 'https://casualbrowsergames.com/about' },
}

const VALUES = [
  { icon: '⚡', title: 'Instant Play',   body: 'Every game loads directly in your browser. No waiting for downloads or installs. Click and play in seconds.' },
  { icon: '🆓', title: 'Always Free',    body: 'Every game on our platform is 100% free. We\'re supported by non-intrusive advertising so you never have to pay.' },
  { icon: '🛡️', title: 'Safe & Clean',   body: 'We curate every game on the site. No inappropriate content, no shady downloads, no tricks — ever.' },
  { icon: '📱', title: 'Any Device',     body: 'Our games work on desktop, tablet, and mobile browsers. Play wherever you are, no app store needed.' },
]

export default function About() {
  return (
    <SeoPageLayout
      icon="👋"
      title="About Casual Browser Games"
      subtitle="We're on a mission to make free gaming accessible to everyone, everywhere, instantly."
    >
      <div className={prose.prose}>
        <h2>Who We Are</h2>
        <p>
          Casual Browser Games is a free online gaming platform built for people who just want to play —
          no downloads, no account creation, no friction. We believe the best gaming experiences should
          be accessible to everyone, regardless of device, connection speed, or technical knowledge.
        </p>
        <p>
          We curate and host hundreds of high-quality HTML5 games from talented developers around the world.
          Whether you have five minutes or five hours, you'll find something worth playing.
        </p>
      </div>

      <div className={styles.values}>
        {VALUES.map(v => (
          <div key={v.title} className={styles.valueCard}>
            <span className={styles.valueIcon}>{v.icon}</span>
            <h3>{v.title}</h3>
            <p>{v.body}</p>
          </div>
        ))}
      </div>

      <div className={prose.prose}>
        <h2>Our Game Catalog</h2>
        <p>
          We partner with leading game distribution networks including <strong>GameDistribution</strong> and{' '}
          <strong>Famobi</strong> to bring you a curated catalog of 500+ titles spanning action, puzzle,
          racing, sports, idle games and more. New games are added every week.
        </p>
        <p>
          All games are embedded via secure iframes from licensed sources. We work only with reputable
          game publishers who maintain high quality standards.
        </p>

        <h2>For Game Developers</h2>
        <p>
          Are you an HTML5 game developer interested in having your game featured on Casual Browser Games?
          We're always looking for new titles to add to our catalog. Please{' '}
          <Link href="/contact">get in touch</Link> — we'd love to hear from you.
        </p>

        <h2>Get in Touch</h2>
        <p>
          Have a question, suggestion, or found a broken game? Head over to our{' '}
          <Link href="/contact">contact page</Link> and drop us a message.
        </p>
      </div>
    </SeoPageLayout>
  )
}
