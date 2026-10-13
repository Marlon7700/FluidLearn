import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuLink } from '../lib/landingMenuLinks'

type Props = {
  label: string
  items: MenuLink[]
  /** Estilo navbar tipo curso-inglés: mayúsculas */
  uppercase?: boolean
}

export function LandingNavDropdown({ label, items, uppercase }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function scheduleClose() {
    clearClose()
    closeTimer.current = setTimeout(() => setOpen(false), 160)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [open])

  useEffect(() => () => clearClose(), [])

  const linkClass =
    'block px-5 py-2.5 text-[15px] text-[#334155] transition hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none'

  const triggerClass = uppercase
    ? 'inline-flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:text-[#98E7FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98E7FF] xl:px-2.5 xl:text-[12px]'
    : 'inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[15px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B2C]'

  return (
    <div
      ref={rootRef}
      className="relative z-50"
      onMouseEnter={() => {
        clearClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={triggerClass}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <ChevronDown size={14} className={`shrink-0 opacity-80 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open && items.length > 0 && (
        <div
          id={panelId}
          className="landing-nav-dropdown absolute left-0 top-full z-[60] mt-1 w-max min-w-[16rem] max-w-[22rem] rounded-md bg-white py-2 text-left shadow-[0_12px_40px_rgba(15,23,42,0.22)] ring-1 ring-black/5"
          role="menu"
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          <ul className="max-h-[min(70vh,28rem)] overflow-y-auto">
            {items.map((item) => (
              <li key={item.label} role="none">
                {item.href.startsWith('/') ? (
                  <Link to={item.href} role="menuitem" className={linkClass} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} role="menuitem" className={linkClass} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
