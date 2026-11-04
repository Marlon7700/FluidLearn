import { useMemo, type CSSProperties, type MouseEvent } from 'react'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
  id?: string
  startDelayMs?: number
  charMs?: number
  /** Empieza al entrar en pantalla (títulos de sección). */
  whenVisible?: boolean
}

type Token = { word: string; start: number }

function tokensFrom(text: string): Token[] {
  const parts = text.split(/(\s+)/)
  let index = 0
  const out: Token[] = []
  for (const part of parts) {
    if (!part) continue
    out.push({ word: part, start: index })
    index += Array.from(part).length
  }
  return out
}

/** Texto letra a letra, cortando solo entre palabras. Hover mueve las letras cercanas. */
export function LetterReveal({
  text,
  as: Tag = 'span',
  className = '',
  id,
  startDelayMs = 0,
  charMs = 26,
  whenVisible = false,
}: Props) {
  const tokens = useMemo(() => tokensFrom(text), [text])

  function onMove(e: MouseEvent<HTMLElement>) {
    const letters = e.currentTarget.querySelectorAll<HTMLElement>('.landing-letter-inner')
    const mx = e.clientX
    const my = e.clientY
    const radius = 72
    for (const el of letters) {
      const box = el.getBoundingClientRect()
      const cx = box.left + box.width / 2
      const cy = box.top + box.height / 2
      const dx = mx - cx
      const dy = my - cy
      const dist = Math.hypot(dx, dy)
      if (dist >= radius) {
        el.style.setProperty('--hx', '0px')
        el.style.setProperty('--hy', '0px')
        el.style.setProperty('--hs', '1')
        el.style.color = ''
        continue
      }
      const force = 1 - dist / radius
      el.style.setProperty('--hx', `${(-dx * force * 0.22).toFixed(1)}px`)
      el.style.setProperty('--hy', `${(-dy * force * 0.28 - force * 6).toFixed(1)}px`)
      el.style.setProperty('--hs', `${(1 + force * 0.22).toFixed(3)}`)
      el.style.color = force > 0.35 ? '#98E7FF' : ''
    }
  }

  function onLeave(e: MouseEvent<HTMLElement>) {
    const letters = e.currentTarget.querySelectorAll<HTMLElement>('.landing-letter-inner')
    for (const el of letters) {
      el.style.setProperty('--hx', '0px')
      el.style.setProperty('--hy', '0px')
      el.style.setProperty('--hs', '1')
      el.style.color = ''
    }
  }

  return (
    <Tag
      id={id}
      className={`landing-letter-line ${className}`}
      aria-label={text}
      data-reveal={whenVisible ? '' : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {tokens.map((token, tIdx) => {
        if (/^\s+$/.test(token.word)) {
          return (
            <span key={`sp-${tIdx}`} className="landing-letter-space">
              {' '}
            </span>
          )
        }
        const chars = Array.from(token.word)
        return (
          <span key={`w-${tIdx}-${token.word}`} className="landing-word">
            {chars.map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className="landing-letter"
                aria-hidden
                style={
                  {
                    '--letter-delay': `${startDelayMs + (token.start + i) * charMs}ms`,
                  } as CSSProperties
                }
              >
                <span className="landing-letter-inner">{ch}</span>
              </span>
            ))}
          </span>
        )
      })}
    </Tag>
  )
}

export function letterRevealDurationMs(text: string, startDelayMs = 0, charMs = 26) {
  return startDelayMs + Math.max(0, Array.from(text).length - 1) * charMs + 280
}
