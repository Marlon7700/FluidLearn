import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { getLegalDoc, type LegalBlock } from '../lib/legalContent'

const NAV_LINKS = [
  { to: '/legal/privacidad', label: 'Política de privacidad' },
  { to: '/legal/condiciones-generales', label: 'Condiciones generales' },
  { to: '/legal/condiciones-particulares', label: 'Condiciones particulares' },
  { to: '/legal/cookies', label: 'Política de cookies' },
] as const

const EMAIL_PART = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function linkify(text: string) {
  const parts = text.split(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)
  return parts.map((part, i) =>
    EMAIL_PART.test(part) ? (
      <a
        key={`${part}-${i}`}
        href={`mailto:${part}`}
        className="font-medium text-brand underline-offset-2 hover:underline dark:text-cyan"
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
      <h3 className="mt-7 text-base font-bold uppercase tracking-wide text-[#0D1B2E] dark:text-cyan sm:text-lg">
        {block.text}
      </h3>
    )
  }
  if (block.type === 'ul') {
    return (
      <ul className="mt-4 space-y-3 text-[15px] leading-[1.75] text-[#334155] dark:text-[#CBD5E1] sm:text-base">
        {block.items.map((item) => (
          <li key={item.slice(0, 56)} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand dark:bg-cyan" aria-hidden />
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
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('legal-page')
    document.body.style.backgroundColor = '#0D1B2E'
    return () => {
      root.classList.remove('legal-page')
      document.body.style.backgroundColor = ''
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = htmlLangFor(lang)
    saveLandingLang(lang)
  }, [lang])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  function changeLanguage(next: LandingLangCode) {
    if (next === lang || langLoading) return
    setLangLoading(true)
    window.setTimeout(() => {
      setLang(next)
      window.setTimeout(() => setLangLoading(false), 280)
    }, 400)
  }

  if (!doc) return <Navigate to="/legal/condiciones-particulares" replace />

  const bannerTitle = `${doc.title} FluidLearn`.toUpperCase()

  return (
    <div className="legal-page-root min-h-svh bg-white text-[#0D1B2E] dark:bg-[#0F1728] dark:text-[#E8EEF8]">
      <LandingNavbar lang={lang} onLangChange={changeLanguage} langLoading={langLoading} sectionMode="route" />

      <div
        className="shrink-0 bg-[#0D1B2E] sm:hidden"
        style={{ height: 'calc(68px + env(safe-area-inset-top, 0px))' }}
        aria-hidden
      />
      <div
        className="hidden shrink-0 bg-[#0D1B2E] sm:block"
        style={{ height: 'calc(76px + env(safe-area-inset-top, 0px))' }}
        aria-hidden
      />

      <div className="bg-[#0D1B2E]">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="text-center text-xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-2xl md:text-3xl">
            {bannerTitle}
          </h1>
        </div>
      </div>
      <div className="h-1 bg-cyan" aria-hidden />

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14 md:py-16">
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-[15px]">{doc.subtitle}</p>
        <p className="mt-1 text-xs font-medium text-slate-400">{doc.updated}</p>

        <article className="mt-8 sm:mt-10">
          {doc.blocks.map((block, i) => (
            <Block key={`${block.type}-${i}`} block={block} />
          ))}
        </article>

        <aside className="mt-12 rounded-2xl border border-slate-200 bg-[#F7F9FC] p-5 text-[#0D1B2E] dark:border-[#2A3650] dark:bg-[#141820] dark:text-white sm:p-6">
          <p className="text-lg font-bold">FluidLearn</p>
          <p className="mt-1 text-sm uppercase tracking-wide text-slate-500 dark:text-white/60">
            EdTech · Universidad Simón Bolívar – MacondoLab
          </p>
          <a
            className="mt-3 inline-block text-sm text-brand underline-offset-2 hover:underline dark:text-cyan"
            href="mailto:info@fluidlearn.com"
          >
            info@fluidlearn.com
          </a>
          <nav
            className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-white/80"
            aria-label={t.footerLegal[0]?.label ? 'Otras políticas' : 'Legal'}
          >
            {NAV_LINKS.filter((item) => !item.to.endsWith(doc.slug)).map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-brand dark:hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="mt-14 border-t border-slate-200 pt-8 text-center dark:border-[#2A3650]">
          <Link
            to="/"
            className="inline-block text-sm font-semibold text-[#0D1B2E] underline-offset-2 hover:underline dark:text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </main>

      <LandingFooter lang={lang} />
    </div>
  )
}
