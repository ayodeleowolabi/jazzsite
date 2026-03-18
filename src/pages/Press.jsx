import { useFadeUp } from '../hooks/useFadeUp'
import pressItems from '../data/press.js'
import styles from './Press.module.css'
import graciagata from '../assets/graciagata.jpg'
import pepemateos from '../assets/pepemateos.jpg'
import ayo2 from '../assets/ayo-2.jpg'

const downloads = [
  { name: 'Press Photo — Ayo Piano Shot', desc: 'Hi-res JPEG · 300dpi', onClick: () => window.open(graciagata, '_blank') },
  { name: 'Press Photo — Ayo Head Shot',  desc: 'Hi-res JPEG · 300dpi', onClick: () => window.open(pepemateos, '_blank') },
  { name: 'Press Photo — Ayo Full Body',  desc: 'Hi-res JPEG · 300dpi', onClick: () => window.open(ayo2, '_blank') },
]

export default function Press() {
  const dlRef    = useFadeUp()
  const cardsRef = useFadeUp()

  return (
    <main className={styles.page}>
      <div className="page-section">
        <div className="section-header">
          <div className="section-rule" />
        </div>
        <h2 className="section-title">Press &amp; <em>Media</em></h2>

          <div className={styles.downloadsSection}>
          <h3 className={styles.colLabel}>Downloads</h3>
          <div ref={dlRef} className={`fade-up ${styles.downloads}`}>
            {downloads.map(({ name, desc, onClick }) => (
              <button key={name} className={styles.dlItem} onClick={onClick}>
                <div className={styles.dlIcon}>↓</div>
                <div className={styles.dlMeta}>
                  <span className={styles.dlName}>{name}</span>
                  <span className={styles.dlDesc}>{desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── PRESS CARDS ── */}
        <div ref={cardsRef} className={`fade-up ${styles.cardsGrid}`}>
          {pressItems.map(({ publication, category, quote, context, url }) => (
            <div key={publication} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardCategory}>{category}</span>
                <h3 className={styles.cardPublication}>{publication}</h3>
              </div>
              {quote && (
                <blockquote className={styles.cardQuote}>
                  &ldquo;{quote}&rdquo;
                </blockquote>
              )}
              <p className={styles.cardContext}>{context}</p>
              {url && (
                
                <a  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.cardLink}
                >
                  Read Coverage →
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}