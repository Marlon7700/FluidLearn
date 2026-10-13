import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { LandingFooter } from '../components/LandingFooter'
import { LandingMobileDrawer } from '../components/LandingMobileDrawer'
import { useTheme } from '../context/ThemeContext'
import { getLegalDoc, type LegalBlock } from '../lib/legalContent'

const NAV_LINKS = [
  { to: '/legal/condiciones-particulares', label: 'Condiciones particulares' },
  { to: '/legal/condiciones-generales', label: 'Condiciones generales' },
  { to: '/legal/privacidad', label: 'Política de privacidad' },
] as const

const EMAIL_PART = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function linkify(text: string) {
  const parts = text.split(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)
  return parts.map((part, i) =>
    EMAIL_PART.test(part) ? (
      <a
        key={`${part}-${i}`}
        href={`mailto:${part}`}
        className="font-medium text-[#1967D2] underline-offset-2 hover:underline dark:text-[#98E7FF]"
      >
        {part}
      </a>
    ) : (
      <span key={`t-${i}`}>{part}</span>
    ),
  )
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === 'h2') {
    return (
      <h2
        id={block.id}
        className="mt-12 scroll-mt-28 text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] first:mt-0 dark:text-white sm:text-2xl md:text-[1.65rem]"
      >
        {block.text}
      </h2>
    )
  }
  if (block.type === 'h3') {
    return (
      <h3 className="mt-7 text-base font-bold uppercase tracking-wide text-[#0D1B2E] dark:text-[#98E7FF] sm:text-lg">
        {block.text}
      </h3>
    )
  }
  if (block.type === 'ul') {
    return (
      <ul className="mt-4 space-y-3 text-[15px] leading-[1.75] text-[#334155] dark:text-[#CBD5E1] sm:text-base">
        {block.items.map((item) => (
          <li key={item.slice(0, 56)} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1967D2] dark:bg-[#98E7FF]" aria-hidden />
            <span>{linkify(item)}</span>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p className="mt-4 text-[15px] leading-[1.75] text-[#334155] dark:text-[#CBD5E1] sm:text-base">{linkify(block.text)}</p>
  )
}

export function LegalPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const doc = getLegalDoc(slug)
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggle } = useTheme()

  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [slug])

  if (!doc) return <Navigate to="/legal/condiciones-particulares" replace />

  const bannerTitle = `${doc.title} FluidLearn`.toUpperCase()

  return (
    <div className="min-h-svh bg-white text-[#0D1B2E] dark:bg-[#0F1728] dark:text-[#E8EEF8]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0D1B2E] text-white shadow-md">
        <div
          className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6"
          style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
        >
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2" aria-label="FluidLearn">
            <img
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-[#98E7FF]/40 sm:h-11 sm:w-11"
            />
            <span className="truncate text-lg font-bold tracking-tight sm:text-xl">FluidLearn</span>
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
            aria-label="Documentos legales"
          >
            {NAV_LINKS.map((item) => {
              const active = item.to.endsWith(doc.slug)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition xl:text-[15px] ${
                    active ? 'bg-white/15 text-white' : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/login"
              className="hidden rounded-full border border-white/50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:inline-flex"
            >
              Entra
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-[#FF6B2C] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[#e85f24] sm:px-3.5 sm:text-xs"
            >
              Empieza gratis
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="rounded-full p-2 hover:bg-white/10"
              aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="landing-side-drawer"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <LandingMobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sectionMode="route"
        activeLegalSlug={doc.slug}
      />

      <div className="bg-[#0D1B2E]">
        <div className="mx-auto flex min-h-[7.5rem] max-w-6xl items-center justify-center px-4 py-8 sm:min-h-[9rem] sm:px-6 sm:py-10 md:min-h-[10rem]">
          <h1 className="text-center text-xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-2xl md:text-3xl lg:text-[2.1rem]">
            {bannerTitle}
          </h1>
        </div>
      </div>

      <div className="h-1 bg-[#98E7FF]" aria-hidden />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14 md:py-16">
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-[15px]">{doc.subtitle}</p>
        <p className="mt-1 text-xs font-medium text-slate-400">{doc.updated}</p>

        <article className="mt-8 sm:mt-10">
          {doc.blocks.map((block, i) => (
            <Block key={`${block.type}-${i}`} block={block} />
          ))}
        </article>

        <div className="mt-14 border-t border-slate-200 pt-8 text-center dark:border-[#2A3650]">
          <Link
            to="/"
            className="inline-block text-sm font-semibold text-[#0D1B2E] underline-offset-2 hover:underline dark:text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
