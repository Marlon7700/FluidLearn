import { useEffect, useState } from 'react'

/** Dirección de scroll para animar barra y panel al bajar/subir (mouse o dedo). */
export function useScrollChrome() {
  const [down, setDown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let last = window.scrollY
    let ticking = false

    const update = () => {
      const y = Math.max(0, window.scrollY)
      const dy = y - last
      setScrolled(y > 12)
      setOffset(Math.min(48, y * 0.12))
      document.documentElement.style.setProperty('--landing-scroll', String(y))
      if (y < 36) setDown(false)
      else if (dy > 6) setDown(true)
      else if (dy < -6) setDown(false)
      last = y
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.documentElement.style.removeProperty('--landing-scroll')
    }
  }, [])

  return { down, scrolled, offset }
}
