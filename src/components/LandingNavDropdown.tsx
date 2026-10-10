import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuLink } from '../lib/landingMenuLinks'

type Props = {
  label: string
  items: MenuLink[]
}

export function LandingNavDropdown({ label, items }: Props) {
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

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        clearClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[15px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B2C]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <ChevronDown size={14} className={`shrink-0 opacity-80 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open && (
        <div
          id={panelId}
          className="landing-nav-dropdown absolute left-1/2 top-full z-50 mt-1.5 w-max min-w-[14rem] max-w-[min(100vw-2rem,22rem)] -translate-x-1/2 rounded-md bg-white py-2 shadow-[0_12px_40px_rgba(15,23,42,0.18)] ring-1 ring-black/5"
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
