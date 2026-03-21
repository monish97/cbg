// src/app/privacy-policy/page.jsx
import Link from 'next/link'
import SeoPageLayout from '@/components/SeoPageLayout'
import prose from '@/components/Prose.module.css'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'We take your privacy seriously. Read our Privacy Policy to understand how Casual Browser Games collects, uses, and protects your data.',
  alternates: { canonical: 'https://casualbrowsergames.com/privacy-policy' },
}

export default function PrivacyPolicy() {
  return (
    <SeoPageLayout
      icon="🔒"
      title="Privacy Policy"
      subtitle="We respect your privacy and are committed to protecting your data."
      badge="Last updated: January 1, 2025"
    >
      <div className={prose.prose}>
        <div className={prose.callout}>
          <p>
            This Privacy Policy explains how <strong>Casual Browser Games</strong> ("we", "us", or "our")
            collects, uses, and shares information when you visit <strong>casualbrowsergames.com</strong>.
          </p>
        </div>

        <h2>1. Information We Collect</h2>
        <p>We collect limited information to operate our site effectively:</p>
        <ul>
          <li><strong>Usage data:</strong> Pages visited, games played, time on site, browser type, device type, and referring URLs — collected automatically via analytics tools.</li>
          <li><strong>Game interaction data:</strong> Which games you click and play. We do not collect your scores or in-game actions.</li>
          <li><strong>Contact form data:</strong> If you contact us, we collect your name, email address, and message content.</li>
          <li><strong>Cookies and tracking:</strong> We use cookies for analytics and advertising purposes (see Section 4).</li>
        </ul>
        <p>We do not require you to create an account. We do not collect your name, email, or personal details unless you voluntarily contact us.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Operate and improve our website and game catalog</li>
          <li>Understand which games are most popular</li>
          <li>Display relevant advertisements via Google AdSense and in-game ad networks</li>
          <li>Respond to your messages if you contact us</li>
          <li>Monitor site performance and prevent abuse</li>
        </ul>

        <h2>3. Third-Party Services</h2>
        <p>Our website uses third-party services that may collect data independently:</p>
        <ul>
          <li><strong>Google Analytics:</strong> Tracks site usage. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's privacy policy</a>.</li>
          <li><strong>Google AdSense:</strong> Serves display advertisements. Google may use cookies to show personalised ads.</li>
          <li><strong>GameDistribution / Famobi / GameMonetize:</strong> Our embedded games are served by third-party game networks. These services may serve their own ads and collect gameplay data under their own privacy policies.</li>
        </ul>
        <p>We are not responsible for the privacy practices of these third-party services.</p>

        <h2>4. Cookies</h2>
        <p>We use cookies to improve your experience. Types of cookies we use:</p>
        <ul>
          <li><strong>Strictly necessary:</strong> Required for the site to function.</li>
          <li><strong>Analytics:</strong> Help us understand how visitors use the site (Google Analytics).</li>
          <li><strong>Advertising:</strong> Used to display relevant ads (Google AdSense).</li>
        </ul>
        <p>You can control cookie preferences through your browser settings. Disabling cookies may affect some site functionality and ad personalisation.</p>

        <h2>5. Children's Privacy</h2>
        <p>Our website is intended for general audiences. We do not knowingly collect personal information from children under the age of 13. If you believe we have inadvertently collected information from a child, please <Link href="/contact">contact us</Link> immediately and we will delete it.</p>

        <h2>6. Data Retention</h2>
        <p>We retain analytics data for up to 26 months. Contact form messages are deleted after we resolve your inquiry, typically within 90 days. We do not sell your data to third parties.</p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have rights including:</p>
        <ul>
          <li>The right to access data we hold about you</li>
          <li>The right to have your data deleted</li>
          <li>The right to opt out of personalised advertising via Google Ads settings</li>
        </ul>
        <p>To exercise any of these rights, please <Link href="/contact">contact us</Link>.</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will update the "Last updated" date at the top of this page when we make changes. Continued use of the site after changes constitutes acceptance of the new policy.</p>

        <h2>9. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please <Link href="/contact">reach out to us</Link> through our contact form.</p>
      </div>
    </SeoPageLayout>
  )
}
