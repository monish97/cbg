'use client'
// src/app/faq/FaqAccordion.jsx
import { useState } from 'react'
import styles from './FaqAccordion.module.css'

export default function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null)

  function toggle(i) {
    setOpen(prev => (prev === i ? null : i))
  }

  return (
    <div className={styles.list}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`${styles.item} ${open === i ? styles.open : ''}`}
        >
          <button className={styles.question} onClick={() => toggle(i)} aria-expanded={open === i}>
            <span>{faq.q}</span>
            <span className={styles.icon} aria-hidden="true">+</span>
          </button>
          <div className={styles.answer} aria-hidden={open !== i}>
            <div className={styles.answerInner}>{faq.a}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
