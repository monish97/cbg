// src/app/layout.jsx
import { Nunito, Syne } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://casualbrowsergames.com'),
  title: {
    default: 'Casual Browser Games – Free Online Games, No Download',
    template: '%s | Casual Browser Games',
  },
  description:
    'Play hundreds of free browser games instantly – no download, no login. Action, puzzle, racing, sports and more at Casual Browser Games.',
  keywords: ['free online games', 'browser games', 'no download games', 'html5 games', 'casual games'],
  openGraph: {
    siteName: 'Casual Browser Games',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${syne.variable}`}>
      <body>
        {/* Decorative background blobs */}
        <div className="bg-blobs" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
