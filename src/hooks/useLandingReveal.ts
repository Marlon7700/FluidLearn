import { useEffect } from 'react'

function restartLetters(el: HTMLElement) {
  el.querySelectorAll<HTMLElement>('.landing-letter').forEach((letter) => {
    letter.style.animation = 'none'
    void letter.offsetWidth
    letter.style.animation = ''
  })
}

/**
 * Reproduce las animaciones cada vez que el bloque entra en pantalla (bajar o volver a subir).
 */
export function useLandingReveal(deps: unknown[] = []) {
  useEffect(() => {
    const root = document.querySelector('.landing-root, .a1-test-page')
    if (!root) return

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!nodes.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.remove('is-in')
            restartLetters(el)
            void el.offsetWidth
            el.classList.add('is-in')
          } else {
            el.classList.remove('is-in')
          }
        }
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
