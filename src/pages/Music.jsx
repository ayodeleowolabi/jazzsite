import { useFadeUp } from '../hooks/useFadeUp'
import { Link } from 'react-router-dom'
import albumCover from '../assets/album-cover.jpg'
import styles from './Music.module.css'

export default function Music() {
  const coverRef = useFadeUp()
  const infoRef  = useFadeUp()

  return (
    <main className={styles.page}>
      <div className="page-section">
        <div className="section-header">
          <span className="section-number">02</span>
          <div className="section-rule" />
        </div>
        <h2 className="section-title">The <em>Music</em></h2>

        <div className={styles.albumGrid}>

          <img
            ref={coverRef}
            src={albumCover}
            alt="Swing, Soul & Samba"
            className={`fade-up ${styles.cover}`}
          />

          <div ref={infoRef} className={`fade-up ${styles.info}`}>
            <p className={styles.albumEyebrow}>Debut Album · Forthcoming</p>
            <h2 className={styles.albumTitle}>Swing, Soul &amp; Samba</h2>
            <p className={styles.albumSub}>A Tribute to Washington, DC</p>

     <p className={styles.narrative}>
  Recorded at All Souls Church in Washington, DC, the very room where Stan Getz
  first recorded <em>Jazz Samba</em> in 1962 <em>Swing, Soul &amp; Samba</em> marks
  the 60th anniversary of that landmark album with a tribute rooted in the city that
  has always carried the tradition forward.
</p>
<p className={styles.narrative}>
  Performed with the historic Bohemian Caverns Jazz Orchestra, in collaboration with
  the DC Jazz Festival and funded in part by the DC Commission on the Arts and
  Humanities, the album features big band arrangements by Elijah Balbed: a cornerstone
  of the Washington, DC jazz scene. It is a document of place, of lineage, and of an
  artist fully inhabiting her voice.
</p>

            <div className={styles.comingSoon}>
              <p className={styles.comingSoonText}>
                Be the first to know when the album drops.
              </p>
              <Link to="/contact#join" className="btn-primary">
                Join the List
              </Link>
            </div>

          </div>

        </div>
      </div>
    </main>
  )
}