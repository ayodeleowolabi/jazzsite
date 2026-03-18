import { Link } from 'react-router-dom'
import { useFadeUp } from '../hooks/useFadeUp'
import styles from './Live.module.css'
import dates from '../data/dates.js'




export default function Live() {
  const listRef = useFadeUp()

  return (
    <main className={styles.page}>
      <div className="page-section">
        <div className="section-header">
          <div className="section-rule" />
        </div>
        <h2 className="section-title">Live <em>Dates</em></h2>

        <div ref={listRef} className={`fade-up ${styles.dateList}`}>
          {dates.length > 0 ? dates.map(({ date, venue, location, ticketUrl }) => (
            <div key={date + venue} className={styles.dateRow}>
              <span className={styles.date}>{date}</span>
              <span className={styles.venue}>{venue}</span>
              <span className={styles.location}>{location}</span>
              <a href={ticketUrl} className={styles.ticket} target="_blank" rel="noreferrer">
                TBD
              </a>
            </div>
          )) : (
            <div className={styles.dateRow}>
              <span className={styles.date}>TBA 2026</span>
              <span className={styles.venue}>Upcoming Tour</span>
              <span className={styles.location}>Dates to be announced</span>
              <span className={`${styles.ticket} ${styles.soon}`}>Coming Soon</span>
            </div>
          )}
        </div>

        <div className={styles.bookingCta}>
          <p>For performance inquiries and bookings —</p>
          <Link to="/contact" className="btn-primary">Contact Booking</Link>
        </div>
      </div>
    </main>
  )
}