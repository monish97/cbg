'use client'
// src/app/game/[slug]/GamePlayer.jsx
// This is a Client Component because it needs onClick / state for the iframe loader.
// The parent page.jsx is a Server Component — SEO metadata lives there.

import { useState, useRef } from 'react'
import styles from './GamePlayer.module.css'

export default function GamePlayer({ game }) {
  const [started, setStarted]   = useState(false)
  const [loaded, setLoaded]     = useState(false)
  const iframeRef               = useRef(null)

  function startGame() {
    setStarted(true)
  }

  function handleLoad() {
    setLoaded(true)
  }

  function restartGame() {
    if (iframeRef.current) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src
      setLoaded(false)
    }
  }

  function goFullscreen() {
    const container = iframeRef.current?.parentElement
    if (!container) return
    if (container.requestFullscreen) container.requestFullscreen()
    else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen()
  }

  return (
    <div className={styles.wrap}>
      {/* Loader / splash — shown until user clicks Play */}
      {!started && (
        <div className={styles.splash}>
          <div className={styles.splashEmoji}>{game.emoji}</div>
          <div className={styles.splashTitle}>{game.title}</div>
          <button className={styles.playBig} onClick={startGame}>
            ▶ Play Now
          </button>
          <p className={styles.splashNote}>Free · No login · No download</p>
        </div>
      )}

      {/* Loading spinner — shown after click, before iframe fires onLoad */}
      {started && !loaded && (
        <div className={styles.loading}>
          <div className={styles.loadEmoji}>{game.emoji}</div>
          <div className={styles.loadBar}><div className={styles.loadFill} /></div>
          <p className={styles.loadText}>Loading {game.title}…</p>
        </div>
      )}

      {/* The iframe — only added to DOM when user clicks Play */}
      {started && (
        <div className={styles.iframeWrap} style={{ opacity: loaded ? 1 : 0 }}>
          <iframe
            ref={iframeRef}
            src={game.embedUrl}
            title={`Play ${game.title} online free`}
            allow="autoplay; fullscreen"
            allowFullScreen
            onLoad={handleLoad}
            className={styles.iframe}
          />
        </div>
      )}

      {/* Controls bar */}
      <div className={styles.controls}>
        {!started
          ? <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={startGame}>▶ Play Now</button>
          : <button className={styles.btn} onClick={restartGame}>↺ Restart</button>
        }
        <button className={`${styles.btn} ${styles.btnFullscreen}`} onClick={goFullscreen}>⛶ Fullscreen</button>
      </div>
    </div>
  )
}
