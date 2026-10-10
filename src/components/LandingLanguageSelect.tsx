import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { LANDING_LANG_OPTIONS, type LandingLangCode } from '../lib/landingI18n'

export type { LandingLangCode }
export const LANDING_LANGUAGES = LANDING_LANG_OPTIONS

const SHORT: Record<LandingLangCode, string> = {
  es: 'ES',
  pt: 'PT',
  en: 'EN',
  it: 'IT',
  'en-US': 'US',
  'en-CA': 'CA',
  de: 'DE',
  'en-GB': 'UK',
  'pt-BR': 'BR',
}

type Props = {
  className?: string
  value: LandingLangCode
  onChange: (code: LandingLangCode) => void
  disabled?: boolean
  selectLabel?: string
  /** Borde derecho: muestra código corto (IT, EN…) */
  compact?: boolean
  /** Panel fijo derecho: botones más grandes */
  rail?: boolean
  /** Lista hacia arriba (barra inferior fija) */
  dropUp?: boolean
}

export function LandingLanguageSelect({
  className = '',
  value,
  onChange,
  disabled,
  selectLabel = 'Select language',
  compact = false,
  rail = false,
  dropUp = false,
}: Props) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const current = LANDING_LANG_OPTIONS.find((l) => l.code === value) ?? LANDING_LANG_OPTIONS[1]

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-1 font-bold uppercase tracking-wide text-[#98E7FF] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B2C] disabled:opacity-50 ${
          rail
            ? 'h-12 w-full min-w-[3.25rem] rounded-xl bg-white/15 px-2 text-[15px]'
            : compact
              ? 'max-w-[100px] rounded-lg bg-white/10 px-2 py-2 text-sm sm:max-w-none'
              : 'max-w-[100px] rounded-lg px-1.5 py-1.5 text-xs sm:max-w-none sm:px-2'
        }`}
        title={current.label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={selectLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={compact ? 'truncate' : ''}>{compact ? SHORT[value] : current.label}</span>
        <ChevronDown size={14} className={`shrink-0 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {open && !disabled && (
        <ul
          id={listId}
          role="listbox"
          aria-label={selectLabel}
          className={`absolute right-0 z-50 min-w-[200px] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-[#2A3650] dark:bg-[#1A2438] ${
            dropUp ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]'
          }`}
        >
          {LANDING_LANG_OPTIONS.map((item) => {
            const selected = item.code === value
            return (
              <li key={item.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`block w-full px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide transition ${
                    selected
                      ? 'bg-[#E8F0FE] text-[#1967D2] dark:bg-[#243044] dark:text-[#98E7FF]'
                      : 'text-[#334155] hover:bg-slate-50 dark:text-[#E8EEF8] dark:hover:bg-[#243044]'
                  }`}
                  onClick={() => {
                    setOpen(false)
                    if (item.code !== value) onChange(item.code)
                  }}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
