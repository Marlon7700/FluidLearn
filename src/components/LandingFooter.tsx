import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import {
  getLandingDict,
  readLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { START_HREFS, zipMenuLinks } from '../lib/landingMenuLinks'

type Props = {
  /** Si se pasa, usa ese idioma; si no, lee el de la landing */
  lang?: LandingLangCode
}

export function LandingFooter({ lang: langProp }: Props) {
  const lang = langProp ?? readLandingLang()
  const t = useMemo(() => getLandingDict(lang), [lang])
  const [startOpen, setStartOpen] = useState(false)
  const startLinks = useMemo(() => zipMenuLinks(t.menuStartItems, START_HREFS), [t])

  return (
    <footer
      id="contacto"
      className="relative overflow-hidden bg-[#141820] text-white"
      style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_1.6fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" width={48} height={48} className="rounded-full object-cover" />
              <div>
                <p className="text-lg font-bold">FluidLearn</p>
                <p className="text-[11px] uppercase tracking-wide text-white/60">{t.brandTagline}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5" aria-label="Social">
              <SocialHref label="Facebook" href="https://facebook.com">
                <SocialSvg path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </SocialHref>
              <SocialHref label="Instagram" href="https://instagram.com">
                <SocialSvg path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" circle />
              </SocialHref>
              <SocialHref label="X" href="https://x.com">
                <SocialSvg path="M4 4l7.5 9L4 20h2.5l6-7.2L18.5 20H20l-7.8-9.4L20 4h-2.5l-5.7 6.8L5.5 4H4z" />
              </SocialHref>
              <SocialHref label="YouTube" href="https://youtube.com">
                <SocialSvg path="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.7 4.8 12 4.8 12 4.8s-6.7 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.2 12a29 29 0 0 0 .3 4.8 2.8 2.8 0 0 0 2 2c1.8.4 8.5.4 8.5.4s6.7 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .3-4.8 29 29 0 0 0-.3-4.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
              </SocialHref>
              <SocialHref label="LinkedIn" href="https://linkedin.com">
                <SocialSvg path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </SocialHref>
            </div>
            <a
              className="mt-4 inline-block text-sm text-white/70 underline-offset-2 hover:text-white hover:underline"
              href="mailto:info@fluidlearn.com"
            >
              info@fluidlearn.com
            </a>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{t.footerWhoTitle}</p>
            <ul className="space-y-2.5 text-sm text-white/65">
              {t.footerWhoLinks.map((label) => (
                <li key={label}>
                  <Link to="/" className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="relative mt-6">
              <button
                type="button"
                className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-left text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
                aria-expanded={startOpen}
                onClick={() => setStartOpen((o) => !o)}
              >
                {t.menuStartTitle}
                <ChevronDown size={18} className={`shrink-0 transition ${startOpen ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              {startOpen && (
                <ul className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-white py-1 text-[#334155] shadow-xl">
                  {startLinks.map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith('/') ? (
                        <Link
                          to={item.href}
                          className="block px-4 py-2.5 text-sm transition hover:bg-slate-50"
                          onClick={() => setStartOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <Link
                          to="/"
                          className="block px-4 py-2.5 text-sm transition hover:bg-slate-50"
                          onClick={() => setStartOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{t.footerResourcesTitle}</p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-white/65 sm:grid-cols-2 md:grid-cols-3">
              {t.footerResourceLinks.map((label) => (
                <Link key={label} to="/" className="transition hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">{t.footerCopyright}</p>
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-wide text-white/80"
            aria-label="Legal"
          >
            {t.footerLegal.map((item) => (
              <Link key={item.to + item.label} to={item.to} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

function SocialHref({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#FF6B2C]"
    >
      {children}
    </a>
  )
}

function SocialSvg({ path, circle }: { path: string; circle?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {circle ? (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d={path} />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      ) : (
        <path d={path} />
      )}
    </svg>
  )
}
