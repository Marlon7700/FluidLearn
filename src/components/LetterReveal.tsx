import { useMemo, type CSSProperties } from 'react'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
  id?: string
  /** Retraso antes de la primera letra (ms) */
  startDelayMs?: number
  /** Tiempo entre letras (ms) */
  charMs?: number
}

/** Texto que aparece letra por letra (ligero, CSS). */
export function LetterReveal({
  text,
  as: Tag = 'span',
  className = '',
  id,
  startDelayMs = 0,
  charMs = 26,
}: Props) {
  const chars = useMemo(() => Array.from(text), [text])

  return (
    <Tag id={id} className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="landing-letter"
          aria-hidden
          style={
            {
              '--letter-delay': `${startDelayMs + i * charMs}ms`,
            } as CSSProperties
          }
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  )
}

/** Duración aproximada de la animación (para encadenar CTAs, etc.). */
export function letterRevealDurationMs(text: string, startDelayMs = 0, charMs = 26) {
  return startDelayMs + Math.max(0, Array.from(text).length - 1) * charMs + 280
}
