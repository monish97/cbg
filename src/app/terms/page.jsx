// src/app/terms/page.jsx
import Link from 'next/link'
import SeoPageLayout from '@/components/SeoPageLayout'
import prose from '@/components/Prose.module.css'

export const metadata = {
  title: 'Terms of Service',
  description:
    'Read the Terms of Service for Casual Browser Games. By using our site you agree to these terms governing use of our free online game platform.',
  alternates: { canonical: 'https://casualbrowsergames.com/terms' },
}

export default function Terms() {
  return (
    <SeoPageLayout
      icon="📜"
      title="Terms of Service"
      subtitle="Please read these terms carefully before using Casual Browser Games."
      badge="Effective: January 1, 2025"
    >
      <div className={prose.prose}>
        <div className={prose.callout}>
          <p>
            By accessing or using <strong>casualbrowsergames.com</strong>, you agree to be bound by
            these Terms of Service. If you do not agree, please do not use our site.
          </p>
        </div>

        <h2>1. About the Service</h2>
        <p>Casual Browser Games ("the Site") is a free online gaming platform that aggregates and embeds browser-based HTML5 games from third-party game publishers. We do not develop the games ourselves. Games are provided by licensed networks including GameDistribution, Famobi, and GameMonetize.</p>

        <h2>2. Eligibility</h2>
        <p>You must be at least 13 years old to use this site. By using the site, you represent that you meet this age requirement. If you are under 18, you should use this site only with parental supervision.</p>

        <h2>3. Acceptable Use</h2>
        <p>When using Casual Browser Games, you agree not to:</p>
        <ul>
          <li>Attempt to circumvent, hack, or interfere with the site or any game</li>
          <li>Use automated tools, bots, or scripts to interact with the site</li>
          <li>Copy, scrape, or republish content from our site without permission</li>
          <li>Use the site in any way that violates applicable laws or regulations</li>
          <li>Attempt to reverse engineer any game embedded on the site</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>All games embedded on this site are owned by their respective developers and publishers. The Casual Browser Games name, logo, and site design are our intellectual property. Games are licensed to us for distribution — we do not own them.</p>
        <p>You may not reproduce, copy, distribute, or create derivative works from any content on this site without explicit written permission.</p>

        <h2>5. Advertising</h2>
        <p>Casual Browser Games is free to use and is supported by advertising. You will see display advertisements on the site and/or within games. By using the site, you acknowledge and accept that advertisements are part of the experience.</p>
        <p>We are not responsible for the content of third-party advertisements. If you encounter an ad you believe is inappropriate, please <Link href="/contact">report it</Link>.</p>

        <h2>6. Disclaimers</h2>
        <p>The site and all games are provided <strong>"as is"</strong> without warranties of any kind. We do not guarantee that the site will be available at all times, that games will function without errors, or that the site is free from viruses or other harmful components.</p>
        <p>Game availability may change at any time as third-party publishers may update or remove games from their networks.</p>

        <h2>7. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, Casual Browser Games shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of — or inability to use — the site or any game on it.</p>

        <h2>8. Third-Party Links and Games</h2>
        <p>Our site may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of those sites. Games are hosted and delivered by third-party networks — their terms and conditions apply to the games themselves.</p>

        <h2>9. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Continued use of the site after changes constitutes your acceptance of the updated Terms.</p>

        <h2>10. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with applicable law. Any disputes will be resolved through good-faith negotiation first.</p>

        <h2>11. Contact</h2>
        <p>For questions about these Terms, please use our <Link href="/contact">contact form</Link>.</p>
      </div>
    </SeoPageLayout>
  )
}
