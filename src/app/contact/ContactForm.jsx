'use client'
// src/app/contact/ContactForm.jsx
import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      // ─────────────────────────────────────────────────────────────
      // TO WIRE UP EMAIL: use Formspree (free tier = 50 submissions/month)
      // 1. Go to https://formspree.io and create a free account
      // 2. Create a new form — you'll get an endpoint like:
      //    https://formspree.io/f/YOUR_FORM_ID
      // 3. Replace the URL below with your Formspree endpoint
      // ─────────────────────────────────────────────────────────────
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.group}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name" name="name" type="text"
          placeholder="John Smith" required
          value={form.name} onChange={handleChange}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email" name="email" type="email"
          placeholder="you@example.com" required
          value={form.email} onChange={handleChange}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="subject">Subject</label>
        <select id="subject" name="subject" value={form.subject} onChange={handleChange} required>
          <option value="">Select a topic…</option>
          <option value="broken-game">Broken / not loading game</option>
          <option value="suggest-game">Suggest a new game</option>
          <option value="partnership">Developer / Partnership</option>
          <option value="privacy">Privacy / Data request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.group}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message" name="message"
          placeholder="Tell us what's on your mind…" required
          rows={5}
          value={form.message} onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.submit} disabled={status === 'sending' || status === 'sent'}>
        {status === 'sending' ? 'Sending…' : status === 'sent' ? '✅ Sent!' : 'Send Message →'}
      </button>

      {status === 'sent' && (
        <p className={styles.success}>Thanks! We'll get back to you within 2–3 business days.</p>
      )}
      {status === 'error' && (
        <p className={styles.error}>Something went wrong. Please email us directly at hello@casualbrowsergames.com</p>
      )}
    </form>
  )
}
