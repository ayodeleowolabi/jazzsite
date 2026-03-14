import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import heroImg from '../assets/albertoroman.jpg'
import albumCover from '../assets/album-cover.jpg'
import styles from './Home.module.css'

export default function Home() {
  const [emailSent, setEmailSent] = useState(false)
  const emailRef = useRef(null)

  const handleEmail = (e) => {
    e.preventDefault()
    setEmailSent(true)
    emailRef.current.value = ''
  }

  return (
    <main>

    
      <section className={styles.hero}>
        <img src={heroImg} alt="Ayodele Owolabi" className={styles.heroImg} />
        <div className={styles.heroBg} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Vocalist &amp; Composer</p>
          <h1 className={styles.heroName}>
            Ayodele Owolabi 
          </h1>
        
          <div className={styles.heroCta}>
            <Link to="/music" className="btn-primary">New Album</Link>
            <Link to="/live" className="btn-ghost">Upcoming Dates</Link>
            <Link to="/contact#join" className="btn-ghost">Join the List</Link>

          </div>
        </div>
      </section>

      {/* ── ALBUM STRIP ── */}
      <div className={styles.albumStrip}>
        <img src={albumCover} alt="Swing, Soul & Samba" className={styles.stripCover} />
        <div className={styles.stripInfo}>
          <h3 className={styles.stripEyebrow}>New Release</h3>
          <h2 className={styles.stripTitle}>Swing, Soul &amp; Samba</h2>
          <p className={styles.stripSub}>A Tribute to Washington, DC</p>
          <Link to="/music" className="btn-ghost">Listen Now</Link>
        </div>
      </div>

      {/* ── EMAIL CAPTURE ── */}
      <div className={styles.emailSection}>
        <span className={styles.ornament}>✦</span>
        <h2 className={styles.emailHeading}>Stay Close</h2>
        <p className={styles.emailSub}>
          Be first to hear about new music, shows, and dispatches from the road.
        </p>
        {emailSent ? (
          <p className={styles.emailConfirm}>Thank you. You're on the list.</p>
        ) : (
          <form className={styles.emailForm} onSubmit={handleEmail}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Your email address"
              required
              className={styles.emailInput}
            />
            <button type="submit" className={styles.emailBtn}>Subscribe</button>
          </form>
        )}
      </div>

    </main>
  )
}