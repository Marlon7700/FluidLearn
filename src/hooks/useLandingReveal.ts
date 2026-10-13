import { useEffect } from 'react'

/**
 * Activa `.is-in` en elementos `[data-reveal]` al entrar en viewport.
 * Una sola observación por nodo → fluido y barato.
 */
export function useLandingReveal(deps: unknown[] = []) {
  useEffect(() => {
    const root = document.querySelector('.landing-root')
    if (!root) return

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!nodes.length) return

    nodes.forEach((n) => n.classList.remove('is-in'))

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    )

    for (const node of nodes) {
      // Hero ya visible: dispara en el siguiente frame
      const rect = node.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        requestAnimationFrame(() => node.classList.add('is-in'))
      } else {
        io.observe(node)
      }
    }

    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps controlan re-scan (idioma, etc.)
  }, deps)
}
