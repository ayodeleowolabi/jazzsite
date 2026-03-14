import { useState, useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'
import cajasolVideo from '../assets/cajasol.mp4'
import styles from './About.module.css'

export default function About() {
  const [muted, setMuted] = useState(true)
  const vidRef   = useRef(null)
  const titleRef = useFadeUp()
  const textRef  = useFadeUp()
  const sectionVideoRef = useFadeUp()
  const ytRef    = useFadeUp()

  const toggleSound = () => {
    const newMuted = !muted
    setMuted(newMuted)
    if (vidRef.current) vidRef.current.muted = newMuted
  }

  return (
    <main className={styles.page}>
      <div className="page-section">

        <div className="section-header">
          <span className="section-number">01</span>
          <div className="section-rule" />
        </div>

        <h2 ref={titleRef} className={`section-title fade-up ${styles.title}`}>
          The <em>Artist</em>
        </h2>

        {/* ── TOP ROW: bio left, vertical video right ── */}
        <div className={styles.topRow}>

          <div ref={textRef} className={`fade-up ${styles.bio}`}>
           <p>
  Born in Atlanta, raised in the gospel church in Macon, Georgia, and shaped by six
  formative years in Nigeria. Ayodele Owolabi is Yoruba, and carries that inheritance
  in everything she sings. Her voice is a confluence of traditions: the Black American
  church, the jazz lineage of Washington, DC, and the rhythmic memory of West Africa.
</p>
<p>
  A graduate of Howard University home to Duke Ellington and Shirley Horn; Owolabi
  came of age at the center of Black American music. Her studies led her to the Kennedy
  Center's prestigious Betty Carter Jazz Ahead residency, where she collaborated with
  Jason Moran, Ralph Peterson, and Carmen Lundy. She portrayed Young Ella Fitzgerald
  in the celebrated <em>Ella 100: Live at the Apollo</em> alongside Lizz Wright, Patti
  Austin, and Ledisi a role later reprised for HBO's <em>The Apollo</em>. She has
  performed at the White House, sung at the opening of the National Museum of African
  American History and Culture, and collaborated with the Count Basie Orchestra, Cyrus
  Chestnut, and the Bohemian Caverns Jazz Orchestra.
</p>
<p>
  A featured songwriter for the Clinton Foundation, Artist in Residence at Strathmore,
  and guest instructor at the University of Pennsylvania; Owolabi is as committed to
  the future of jazz as she is to its legacy. With a voice steeped in the richness of
  Sarah Vaughan and the radical songwriting spirit of Nina Simone, she is not simply
  preserving a tradition. She is expanding it.
</p>

            <div className={styles.credentials}>
              <h4 className={styles.credLabel}>Selected Highlights</h4>
              <ul className={styles.credList}>
                {[
                  'Kennedy Center for the Performing Arts, Washington DC',
                  'Apollo Theater, New York City — Young Ella Fitzgerald Tribute',
                  'Blues Alley, Washington DC — New Year\'s Eve, featured collaborator with Cyrus Chestnut',
                  'Blues Alley, Washington DC — featured solo performer',
                  'Ubeda International Jazz Festival, Spain — opened for Paquito D\'Rivera (2025)',
                  'DC Jazz Festival — featured collaborator',
                  'Betty Carter Jazz Ahead — residency at Kennedy Center, Washington DC',
                  'BET\'s Sunday Best, Season 7 — Top 8 Finalist',
                  'International touring artist: USA, Spain, Portugal & beyond',
                  'Tribute to Jazz in DC — debut album, forthcoming',
                ].map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vertical video right */}
          <div ref={sectionVideoRef} className={`fade-up ${styles.verticalVideo}`}>
            <video
              ref={vidRef}
              src={cajasolVideo}
              autoPlay
              muted
              loop
              playsInline
              className={styles.verticalVideoEl}
            />
            <button className={styles.soundBtn} onClick={toggleSound}>
              {muted ? '🔇 Unmute' : '🔊 Mute'}
            </button>
          </div>

        </div>

        {/* ── BOTTOM: YouTube full width ── */}
        <div ref={ytRef} className={`fade-up ${styles.youtubeRow}`}>
          <p className={styles.mediaLabel}>Kennedy Center Performance</p>
          <div className={styles.ytWrap}>
            <iframe
              src="https://www.youtube.com/embed/iJFywCvW344?si=7ugYwMXz4CnfyhJ3"
              title="Ayodele Owolabi at the Kennedy Center"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </main>
  )
}