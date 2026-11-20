import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import {
  BookOpen,
  Bot,
  CheckCircle2,
  Headphones,
  LayoutDashboard,
  Mic,
  PenLine,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import { getNaturalMethodCopy } from '../lib/naturalMethodI18n'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'

const IMG = {
  hero: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
  teacher: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
  t1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  t2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  t3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  t4: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center text-[22px] font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-[28px]">
      {children}
    </h2>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function NaturalMethodPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getNaturalMethodCopy(lang), [lang])

  useLandingReveal([lang])

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('legal-page')
    document.body.style.backgroundColor = '#0D1B2E'
    window.scrollTo(0, 0)
    return () => {
      root.classList.remove('legal-page')
      document.body.style.backgroundColor = ''
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = htmlLangFor(lang)
    saveLandingLang(lang)
  }, [lang])

  function changeLanguage(next: LandingLangCode) {
    if (next === lang || langLoading) return
    setLangLoading(true)
    window.setTimeout(() => {
      setLang(next)
      window.setTimeout(() => setLangLoading(false), 280)
    }, 400)
  }

  return (
    <div className="a1-test-page min-h-svh bg-white text-[#0D1B2E] dark:bg-[#0F1728] dark:text-[#E8EEF8]">
      <FluidLearnLoadingOverlay show={langLoading} message={t.loadingLang} />
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

      <section className="relative overflow-hidden bg-[#0D1B2E] text-white">
        <img
          src={IMG.hero}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-45"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/88 to-[#0D1B2E]/25" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <LetterReveal
            as="h1"
            text={copy.heroTitle}
            whenVisible
            charMs={16}
            className="max-w-2xl text-[28px] font-extrabold uppercase leading-tight tracking-tight sm:text-[40px]"
          />
          <p className="landing-reveal mt-4 max-w-xl text-[15px] leading-[1.75] text-white/75" data-reveal>
            {copy.heroLead}
          </p>
          <Link
            to="/test"
            className="landing-reveal mt-7 inline-flex rounded-full bg-[#00AEEF] px-7 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0D1B2E] transition hover:bg-[#33c0f5]"
            data-reveal
          >
            {copy.startCta}
          </Link>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          {copy.intro.map((p, i) => (
            <p
              key={p}
              className="landing-reveal mt-5 text-[15px] leading-[1.85] text-[#475569] first:mt-0 dark:text-[#94A3B8]"
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
            >
              {p}
            </p>
          ))}
        </section>

        <section className="bg-[#0D1B2E] px-4 py-12 text-center text-white sm:py-14">
          <h2 className="text-xl font-extrabold uppercase sm:text-2xl">{copy.startTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">{copy.startLead}</p>
          <Link
            to="/test"
            className="mt-6 inline-flex rounded-full bg-[#00AEEF] px-7 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0D1B2E]"
          >
            {copy.startCta}
          </Link>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <Heading>{copy.contentsTitle}</Heading>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {copy.contents.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-[#F4F8FB] px-4 py-2 text-sm font-semibold text-[#0D1B2E] dark:border-[#2A3650] dark:bg-[#1A2438] dark:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="text-[22px] font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-[26px]">
                {copy.firstTitle}
              </h2>
              {copy.firstLead.map((p) => (
                <p key={p} className="mt-4 text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]">
                  {p}
                </p>
              ))}
            </div>
            <div className="relative mx-auto h-80 w-full max-w-sm">
              <img src={IMG.teacher} alt="" className="fl-float h-72 w-full rounded-3xl object-cover shadow-xl" />
              <img src={IMG.t1} alt="" className="absolute left-0 top-8 h-12 w-12 rounded-xl object-cover shadow-lg ring-2 ring-white" />
              <img src={IMG.t2} alt="" className="absolute right-2 top-4 h-12 w-12 rounded-xl object-cover shadow-lg ring-2 ring-white" />
              <img src={IMG.t3} alt="" className="absolute bottom-10 left-2 h-12 w-12 rounded-xl object-cover shadow-lg ring-2 ring-white" />
              <img src={IMG.t4} alt="" className="absolute bottom-8 right-0 h-14 w-14 rounded-xl object-cover shadow-lg ring-2 ring-white" />
              <span className="absolute right-6 top-6 rounded-full bg-[#00AEEF] px-2 py-0.5 text-[10px] font-extrabold text-[#0D1B2E]">
                LIVE
              </span>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                <Headphones className="text-[#00AEEF]" size={22} />
                {copy.listenTitle}
              </h2>
              {copy.listenLead.map((p) => (
                <p key={p} className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">
                  {p}
                </p>
              ))}
              <CheckList items={copy.listenItems} />
              <p className="mt-4 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{copy.listenClose}</p>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                <Bot className="text-[#00AEEF]" size={22} />
                {copy.aiTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.aiLead}</p>
              <CheckList items={copy.aiItems} />
              <p className="mt-4 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{copy.aiClose}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <Heading>{copy.thenTitle}</Heading>
            <p className="mx-auto mt-5 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">
              {copy.thenLead}
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {copy.skills.map((item, i) => {
                const Icon = [BookOpen, PenLine, Mic][i]
                return (
                  <article key={item.title} className="text-center">
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm dark:bg-[#1A2438]">
                      <Icon className="text-[#00AEEF]" size={22} />
                    </span>
                    <h3 className="mt-4 font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B] dark:text-[#94A3B8]">{item.body}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <Heading>{copy.grammarTitle}</Heading>
            <p className="mx-auto mt-5 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">
              {copy.grammarLead}
            </p>
            <ul className="mx-auto mt-8 grid max-w-2xl gap-2 sm:grid-cols-2">
              {copy.grammarItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[#475569] dark:text-[#94A3B8]">
              {copy.grammarClose}
            </p>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                {copy.teachersTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.teachersLead}</p>
              <CheckList items={copy.teachersItems} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                {copy.microTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.microLead}</p>
              <CheckList items={copy.microItems} />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                <LayoutDashboard className="text-[#00AEEF]" size={22} />
                {copy.dashTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.dashLead}</p>
              <CheckList items={copy.dashItems} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                {copy.accessTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.accessLead}</p>
              <CheckList items={copy.accessItems} />
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Heading>{copy.whyTitle}</Heading>
            <p className="mt-5 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">{copy.whyLead}</p>
            <ul className="mx-auto mt-8 grid max-w-2xl gap-2 text-left sm:grid-cols-2">
              {copy.whyItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-8 max-w-2xl text-[15px] font-semibold leading-[1.8] text-[#0D1B2E] dark:text-white">
              {copy.whyGoal}
            </p>
          </div>
        </section>

        <section className="px-4 py-16 text-center sm:py-20">
          <Heading>{copy.closeTitle}</Heading>
          <p className="landing-reveal mx-auto mt-5 max-w-2xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
            {copy.closeLead}
          </p>
          <Link
            to="/register"
            className="landing-reveal mt-8 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
            data-reveal
          >
            {copy.closeCta}
          </Link>
        </section>
      </main>

      <LandingFooter lang={lang} />
    </div>
  )
}
