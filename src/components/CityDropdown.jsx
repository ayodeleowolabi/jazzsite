import styles from './CityDropdown.module.css'

import { useState, useRef, useEffect } from 'react'

const CITIES = [
  'Washington DC', 'New York City', 'Atlanta',
  'Madrid', 'Sevilla', 'Paris', 'London', 'Other'
]

export function CityDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={styles.dropdownWrapper} ref={ref}>
      <button
        type="button"
        className={styles.dropdownTrigger}
        onClick={() => setOpen(prev => !prev)}
      >
        <span className={value ? styles.dropdownSelected : styles.dropdownPlaceholder}>
          {value || 'Nearest City'}
        </span>
        <span className={`${styles.dropdownArrow} ${open ? styles.dropdownArrowOpen : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <ul className={styles.dropdownMenu}>
          {CITIES.map(city => (
            <li
              key={city}
              className={`${styles.dropdownItem} ${value === city ? styles.dropdownItemActive : ''}`}
              onClick={() => { onChange(city); setOpen(false) }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}