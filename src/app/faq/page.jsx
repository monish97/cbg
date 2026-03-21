// src/app/faq/page.jsx
import Link from 'next/link'
import SeoPageLayout from '@/components/SeoPageLayout'
import prose from '@/components/Prose.module.css'
import FaqAccordion from './FaqAccordion'

export const metadata = {
  title: 'FAQ – Frequently Asked Questions',
  description:
    'Frequently asked questions about Casual Browser Games. Learn how to play, what devices are supported, how ads work, and more.',
  alternates: { canonical: 'https://casualbrowsergames.com/faq' },
}

// FAQ structured data for Google rich results
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Are the games really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, 100%. Every game on Casual Browser Games is completely free to play. We are supported by non-intrusive display advertising. You will never be asked to pay or create an account.' } },
    { '@type': 'Question', name: 'Do I need to download anything?', acceptedAnswer: { '@type': 'Answer', text: 'Never. All games run directly in your web browser using HTML5 technology. There is nothing to install or download. Just click a game and it starts within seconds.' } },
    { '@type': 'Question', name: 'Do I need to create an account?', acceptedAnswer: { '@type': 'Answer', text: 'No account is required. You can play any game on the site without registering or signing in.' } },
    { '@type': 'Question', name: 'What devices are supported?', acceptedAnswer: { '@type': 'Answer', text: 'Most games work on desktop computers, tablets, and modern smartphones. All modern browsers including Chrome, Firefox, Safari, and Edge are supported.' } },
  ],
}

export const FAQS = [
  {
    q: 'Are the games really free?',
    a: 'Yes, 100%. Every game on Casual Browser Games is completely free to play. We are supported by non-intrusive display advertising and in-game ads from our distribution partners. You will never be asked to pay or create an account.',
  },
  {
    q: 'Do I need to download anything?',
    a: 'Never. All games run directly in your web browser using HTML5 technology. There is nothing to install, no plugins required, and no app store needed. Just click a game and it starts within seconds.',
  },
  {
    q: 'Do I need to create an account to play?',
    a: 'No account is required. You can play any game on the site without registering or signing in. In the future we may offer optional accounts for features like saving progress and leaderboards.',
  },
  {
    q: 'What devices and browsers are supported?',
    a: 'Most games work on desktop computers (Windows, Mac, Linux), tablets, and modern smartphones. Games are built in HTML5 and supported by all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience on action and keyboard games, we recommend a desktop.',
  },
  {
    q: 'Why do I see ads?',
    a: 'Ads are how we keep the site free for everyone. We show display ads on the site and our game distribution partners show ads within some games. If you encounter an ad that is inappropriate or malicious, please report it via the contact page.',
  },
  {
    q: "A game isn't loading. What should I do?",
    a: 'Try refreshing the page first. If it still does not load, try: clearing your browser cache, disabling your ad blocker (some blockers also block game scripts), or switching to a different browser. If the problem persists, please let us know via the contact page with the game name and your browser version.',
  },
  {
    q: 'Can I suggest a game to add?',
    a: 'Absolutely! Use the contact form and select "Suggest a new game". Let us know the game name and a link if you have one. We will review it and add it to the catalog if it meets our quality standards.',
  },
  {
    q: 'Are your games safe for children?',
    a: 'We curate all games on the site and aim for content suitable for ages 13 and above. We do not host violent, adult, or inappropriate content. However, games are ad-supported and some ads may not always be perfectly age-appropriate. Parental supervision is always recommended for younger users.',
  },
  {
    q: 'How often do you add new games?',
    a: 'We aim to add new games every week. Check the "New Arrivals" section on the homepage to see the latest additions. Our catalog currently features 500+ games across action, puzzle, racing, sports, idle, and more categories.',
  },
  {
    q: 'How do I go fullscreen?',
    a: 'On the game page, click the "⛶ Fullscreen" button below the game window. You can also press F11 in most browsers for a full browser fullscreen. Press Escape to exit.',
  },
  {
    q: 'I found a bug or security issue. Who do I tell?',
    a: 'Please report bugs or security issues through our contact form. For security issues, please include as much detail as possible. We take all reports seriously and will respond promptly.',
  },
]

export default function Faq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoPageLayout
        icon="❓"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Casual Browser Games."
      >
        {/* Client component handles open/close accordion */}
        <FaqAccordion faqs={FAQS} />

        <div className={prose.prose} style={{ marginTop: '48px' }}>
          <h2>Still have a question?</h2>
          <p>
            Can't find the answer you're looking for?{' '}
            <Link href="/contact">Send us a message</Link> and we'll get back to you within
            a couple of business days.
          </p>
        </div>
      </SeoPageLayout>
    </>
  )
}
