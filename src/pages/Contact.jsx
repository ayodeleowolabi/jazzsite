import { useState } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './Contact.module.css'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const formRef  = useFadeUp()
  const emailRef = useFadeUp()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
  }

  const handleEmailSignup = async (e) => {
    e.preventDefault()
    if (!emailInput) return

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScG0CMGRmtIReBV0kA_OZfxBZug79uLdKCWlO8LKcjsRbWvBg/formResponse'
    const formData = new FormData()
    formData.append('entry.1743792060', emailInput)

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
    } catch (err) {}

    setEmailSent(true)
    setEmailInput('')
  }

  return (
    <main className={styles.page}>
      <div className="page-section">

        <div className="section-header">
          <span className="section-number">05</span>
          <div className="section-rule" />
        </div>

        {/* ── CONTACT FORM — centered ── */}
        <div className={styles.formSection}>
          <h2 className={`section-title ${styles.centeredTitle}`}>
            Get in <em>Touch</em>
          </h2>
          <p className={styles.centeredIntro}>
            For booking, press, and professional inquiries, please use the form or reach
            out directly to management.
          </p>

          <form ref={formRef} className={`fade-up ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input type="text" required placeholder="First" />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input type="text" required placeholder="Last" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" required placeholder="your@email.com" />
            </div>

            <div className={styles.formGroup}>
              <label>Organization</label>
              <input type="text" placeholder="Venue, publication, agency…" />
            </div>

            <div className={styles.formGroup}>
              <label>Inquiry Type</label>
              <select required defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Booking / Performance</option>
                <option>Press / Media</option>
                <option>Festival / Event</option>
                <option>Collaboration</option>
                <option>Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea
                rows={5}
                placeholder="Please share details — proposed dates, venue capacity, etc."
              />
            </div>

            {sent ? (
              <p className={styles.confirm}>Thank you. We'll be in touch shortly.</p>
            ) : (
              <button type="submit" className="btn-primary">Send Message</button>
            )}
          </form>
        </div>

        {/* ── EMAIL LIST SIGNUP ── */}
        <div id="join" ref={emailRef} className={`fade-up ${styles.emailSignup}`}>
          <div className={styles.emailSignupInner}>
            <span className={styles.ornament}>✦</span>
            <h3 className={styles.emailSignupTitle}>Join the List</h3>
            <p className={styles.emailSignupSub}>
              New music, upcoming shows, and dispatches from the road — straight to your inbox.
            </p>
            {emailSent ? (
              <p className={styles.confirm}>You're on the list. Thank you.</p>
            ) : (
              <form className={styles.emailForm} onSubmit={handleEmailSignup}>
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.emailBtn}>Subscribe</button>
              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}