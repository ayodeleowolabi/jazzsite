import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.name}>Ayodele Owolabi</span>
      <p className={styles.copy}>© {new Date().getFullYear()} Ayodele Owolabi. All rights reserved.</p>
      <nav className={styles.footerNav}>
        <Link to="/press">Press</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </footer>
  )
}