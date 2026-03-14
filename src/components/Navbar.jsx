import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { to: '/',        label: 'Home'    },
  { to: '/about',   label: 'About'   },
  { to: '/music',   label: 'Music'   },
  { to: '/live',    label: 'Live'    },
  { to: '/press',   label: 'Press'   },
  { to: '/contact', label: 'Contact' },
]
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
        Ayodele Owolabi
      </Link>

      <ul className={styles.links}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span /><span /><span />
      </button>

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={styles.drawerLink}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}