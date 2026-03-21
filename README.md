# Casual Browser Games — Next.js Project

A free browser game portal built with Next.js 14 (App Router).  
Designed to deploy on Vercel and connect to GameDistribution for game content.

---

## Project Structure

```
src/
├── app/
│   ├── layout.jsx              ← Root layout (fonts, header, footer, blobs)
│   ├── globals.css             ← Global CSS variables and base styles
│   ├── page.jsx                ← Homepage (featured, trending, new arrivals)
│   ├── page.module.css
│   ├── not-found.jsx           ← 404 page
│   ├── sitemap.js              ← Auto-generates /sitemap.xml at build time
│   ├── robots.js               ← Auto-generates /robots.txt at build time
│   │
│   ├── game/[slug]/
│   │   ├── page.jsx            ← Individual game page (SSG, SEO metadata)
│   │   ├── page.module.css
│   │   ├── GamePlayer.jsx      ← Client component: iframe loader + controls
│   │   └── GamePlayer.module.css
│   │
│   ├── games/[category]/
│   │   ├── page.jsx            ← Category pages (action, puzzle, racing…)
│   │   └── page.module.css
│   │
│   ├── about/
│   ├── contact/                ← ContactForm.jsx handles Formspree submission
│   ├── faq/                    ← FaqAccordion.jsx handles open/close
│   ├── privacy-policy/
│   └── terms/
│
├── components/
│   ├── Header.jsx / .module.css
│   ├── Footer.jsx / .module.css
│   ├── GameCard.jsx / .module.css   ← Reusable game card (thumbnail + info)
│   ├── SeoPageLayout.jsx / .module.css  ← Shared layout for legal/info pages
│   └── Prose.module.css             ← Typography styles for long-form content
│
└── lib/
    └── games.js                ← ALL game data lives here. Add games here.
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open http://localhost:3000

### 3. Build for production
```bash
npm run build
npm start
```

---

## Adding Games

All game data is in **`src/lib/games.js`**.

Copy an existing entry and fill in the fields:

```js
{
  id: 'my-new-game',           // unique ID
  title: 'My New Game',
  slug: 'my-new-game',         // used in the URL: /game/my-new-game
  category: 'puzzle',          // action | puzzle | racing | sports | shooter | idle
  emoji: '🎯',                 // placeholder until you have a real thumbnail
  badge: 'new',                // 'hot' | 'new' | 'top' | null
  rating: 4.5,
  plays: '100K',
  description: `Write 2–3 paragraphs here. This is what Google indexes.
Be descriptive. Mention gameplay, features, controls.`,
  howToPlay: [
    'Step one instruction',
    'Step two instruction',
  ],
  tags: ['puzzle', 'casual', 'mouse'],
  controls: 'Mouse / Touch',
  embedUrl: 'https://html5.gamedistribution.com/YOUR_GAME_ID/?gd_sdk_referrer_url=https://casualbrowsergames.com/game/my-new-game',
}
```

After saving, run `npm run dev` — the new game page and sitemap entry are created automatically.

---

## Getting GameDistribution Embed URLs

1. Sign up at https://gamedistribution.com as a publisher
2. Browse the game catalog and find a game you want
3. Copy the Game ID from the game's detail page
4. Build the embed URL:
   ```
   https://html5.gamedistribution.com/GAME_ID/?gd_sdk_referrer_url=https://casualbrowsergames.com/game/YOUR-GAME-SLUG
   ```
5. Paste it into the `embedUrl` field in `games.js`

---

## Wiring Up the Contact Form (Formspree)

The contact form at `/contact` uses Formspree (free tier: 50 submissions/month).

1. Go to https://formspree.io and create a free account
2. Create a new form — you'll get an endpoint like:
   `https://formspree.io/f/abcdefgh`
3. Open `src/app/contact/ContactForm.jsx`
4. Replace `YOUR_FORM_ID` with your actual endpoint:
   ```js
   const res = await fetch('https://formspree.io/f/abcdefgh', {
   ```

---

## Deploying to Vercel

### One-time setup

1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. Go to https://vercel.com and sign in with GitHub

3. Click **"Add New Project"** → select your repository

4. Vercel auto-detects Next.js. Leave all settings as default.

5. Click **Deploy**. Your site will be live in ~60 seconds.

### Connect your custom domain

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `casualbrowsergames.com`)
3. Vercel shows you two DNS records to add at your registrar:
   - An **A record** pointing to Vercel's IP
   - A **CNAME record** for `www`
4. Add them in your domain registrar's DNS settings
5. Wait 5–30 minutes for DNS propagation

### Every future deploy

Just push to GitHub:
```bash
git add .
git commit -m "Add 10 new games"
git push
```
Vercel automatically rebuilds and redeploys. Zero manual steps.

---

## Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Click **Add Property** → choose **Domain** → enter `casualbrowsergames.com`
3. Google gives you a TXT record to add to your DNS (same place as above)
4. Once verified, click **Sitemaps** in the left sidebar
5. Enter `sitemap.xml` and click **Submit**

Your sitemap URL is: `https://casualbrowsergames.com/sitemap.xml`  
It's auto-generated by Next.js and includes every game page, category page, and static page.

---

## Adding Google Analytics

1. Create a GA4 property at https://analytics.google.com
2. Get your Measurement ID (looks like `G-XXXXXXXXXX`)
3. In `src/app/layout.jsx`, add before `</head>`:
   ```jsx
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
   <script dangerouslySetInnerHTML={{ __html: `
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   `}} />
   ```

---

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/game/[slug]` | Individual game (e.g. `/game/snake-classic`) |
| `/games/[category]` | Category page (e.g. `/games/puzzle`) |
| `/about` | About Us |
| `/contact` | Contact (with Formspree form) |
| `/faq` | FAQ with accordion |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots.txt |

---

## Things to Update Before Launch

- [ ] Replace all `casualbrowsergames.com` references with your real domain (global search & replace)
- [ ] Replace `hello@casualbrowsergames.com` with your real email in `contact/page.jsx`
- [ ] Replace `YOUR_FORM_ID` in `contact/ContactForm.jsx` with Formspree endpoint
- [ ] Replace all `embedUrl` values in `games.js` with real GameDistribution URLs
- [ ] Add Google Analytics Measurement ID to `layout.jsx`
- [ ] Update `badge` dates in Privacy Policy and Terms pages
- [ ] Add a real `favicon.ico` to the `/public` folder
