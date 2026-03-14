import { useEffect, useRef } from 'react'

export function useFadeUp(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.0, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}