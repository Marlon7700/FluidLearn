import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { ArrowRight, CheckCircle2, ChevronDown, Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import { GrammarQuizLaunch } from './GrammarTopicQuizPage'
import { getAdjectivesCopy } from '../lib/adjectivesI18n'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { A1MotionCard, A1Title } from './LevelTestPage'

const HERO_IMG = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80'

const SCENE: Record<string, { en: string; es: string }> = {
  bright: { en: 'a bright room', es: 'una habitación luminosa' },
  curious: { en: 'a curious room', es: 'una habitación curiosa' },
  focused: { en: 'a focused room', es: 'una habitación concentrada' },
  friendly: { en: 'a friendly room', es: 'una habitación acogedora' },
}

export function AdjectivesPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const [chip, setChip] = useState('bright')
  const [openFaq, setOpenFaq] = useState(-1)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getAdjectivesCopy(lang), [lang])
  const scene = SCENE[chip] ?? SCENE.bright

  useLandingReveal([lang, filter, query])

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

  const filtered = copy.words.filter((word) => {
    const q = query.trim().toLowerCase()
    const matchQ = !q || word.en.toLowerCase().includes(q) || word.es.toLowerCase().includes(q) || word.cat.includes(q)
    const matchF = filter === 'all' || word.cat === filter
    return matchQ && matchF
  })
  const catLabel = (id: string) => copy.filters.find((item) => item.id === id)?.label ?? id

  return (
    <div className="a1-test-page min-h-svh bg-white text-[#0D1B2E] dark:bg-[#0F1728] dark:text-[#E8EEF8]">
      <FluidLearnLoadingOverlay show={langLoading} message={t.loadingLang} />
      <LandingNavbar lang={lang} onLangChange={changeLanguage} langLoading={langLoading} sectionMode="route" />
      <div className="shrink-0 bg-[#0D1B2E] sm:hidden" style={{ height: 'calc(68px + env(safe-area-inset-top, 0px))' }} aria-hidden />
      <div className="hidden shrink-0 bg-[#0D1B2E] sm:block" style={{ height: 'calc(76px + env(safe-area-inset-top, 0px))' }} aria-hidden />

      <section className="relative overflow-hidden bg-[#0D1B2E] text-white">
        <img src={HERO_IMG} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/90 to-[#0D1B2E]/40" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#00AEEF]">{copy.kicker}</p>
            <LetterReveal as="h1" text={copy.heroTitle} whenVisible charMs={12} className="mt-3 max-w-xl text-[26px] font-extrabold leading-tight tracking-tight sm:text-[36px]" />
            <p className="landing-reveal mt-4 max-w-xl text-[15px] leading-[1.75] text-white/75" data-reveal>
              {copy.heroLead}
            </p>
            <div className="landing-reveal mt-6 flex flex-wrap gap-3" data-reveal>
              <Link to="/register" className="fl-cta-glow inline-flex rounded-full bg-[#00AEEF] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]">
                {copy.startCta}
              </Link>
              <Link
                to="/adjetivos/test"
                className="inline-flex rounded-full border border-white/30 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:border-[#00AEEF] hover:text-[#00AEEF]"
              >
                {copy.heroTestCta}
              </Link>
            </div>
            <p className="landing-reveal mt-4 text-sm text-white/60" data-reveal>
              {copy.heroNote}
            </p>
          </div>
          <div className="landing-reveal rounded-2xl border border-white/15 bg-[#0D1B2E]/80 p-5 backdrop-blur" data-reveal>
            <p className="text-sm font-semibold text-[#00AEEF]">{copy.sceneKicker}</p>
            <p className="mt-1 text-sm text-white/65">{copy.sceneLead}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.chips.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setChip(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${chip === item ? 'bg-[#00AEEF] text-[#0D1B2E]' : 'bg-white/10 text-white'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="rounded-xl bg-white/10 px-3 py-2">
                <p className="text-sm font-extrabold">{copy.sceneNoun}</p>
                <p className="text-xs text-white/60">{copy.sceneNounEs}</p>
              </div>
              <ArrowRight size={16} className="text-[#00AEEF]" />
              <div className="rounded-xl bg-[#00AEEF] px-3 py-2 text-[#0D1B2E]">
                <p className="text-sm font-extrabold">{scene.en}</p>
                <p className="text-xs opacity-80">{lang === 'es' ? scene.es : scene.en}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="border-b border-slate-200 bg-white dark:border-[#2A3650] dark:bg-[#0F1728]">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-5 gap-y-2 px-4 py-3 text-sm">
          {copy.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="font-medium text-[#00AEEF] hover:underline">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section id="que-son" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.whatKicker}</p>
          <A1Title text={copy.whatTitle} className="mt-2 max-w-4xl text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
          <p className="landing-reveal mt-4 max-w-4xl text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]" data-reveal>
            {copy.whatLead}
          </p>
          <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] md:grid-cols-3" data-reveal>
            {[
              { title: copy.attrTitle, items: copy.attrItems },
              { title: copy.predTitle, items: copy.predItems },
            ].map((card, i) => (
              <A1MotionCard key={card.title} as="article" className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]" style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}>
                <h3 className="font-extrabold">{card.title}</h3>
                {card.items.map((item) => (
                  <div key={item.en} className="mt-3 rounded-xl bg-[#F4F8FB] p-3 dark:bg-[#0F1728]">
                    <p className="text-sm font-extrabold">{item.en}</p>
                    <p className="text-sm text-[#64748B]">{item.es}</p>
                  </div>
                ))}
              </A1MotionCard>
            ))}
            <A1MotionCard as="article" className="rounded-2xl bg-[#0D1B2E] p-5 text-white" style={{ '--reveal-delay': '180ms' } as CSSProperties}>
              <h3 className="font-extrabold text-[#00AEEF]">{copy.invTitle}</h3>
              {copy.invItems.map((item) => (
                <p key={item} className="mt-3 text-sm font-semibold">
                  {item}
                </p>
              ))}
              <p className="mt-4 text-sm text-white/70">{copy.invNote}</p>
            </A1MotionCard>
          </div>
        </section>

        <section id="posicion" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.posKicker}</p>
            <A1Title text={copy.posTitle} className="mt-2 max-w-4xl text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.posLead}
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="font-extrabold">{copy.beforeTitle}</h3>
                <div className="landing-reveal-group mt-4 space-y-3" data-reveal>
                  {copy.beforeItems.map((item, i) => (
                    <A1MotionCard key={item.en} as="article" className="rounded-2xl bg-white p-4 dark:bg-[#1A2438]" style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}>
                      <p className="font-extrabold">{item.en}</p>
                      <p className="text-sm text-[#64748B]">{item.es}</p>
                    </A1MotionCard>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-extrabold">{copy.afterTitle}</h3>
                <p className="mt-2 text-sm text-[#64748B]">{copy.afterLead}</p>
                <div className="landing-reveal-group mt-4 space-y-3" data-reveal>
                  {copy.afterItems.map((item, i) => (
                    <A1MotionCard key={item.en} as="article" className="rounded-2xl bg-white p-4 dark:bg-[#1A2438]" style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}>
                      <p className="font-extrabold">{item.en}</p>
                      <p className="text-sm text-[#64748B]">{item.es}</p>
                    </A1MotionCard>
                  ))}
                </div>
              </div>
            </div>
            <div className="landing-reveal mt-8 rounded-2xl border border-[#00AEEF]/30 bg-white p-5 dark:bg-[#1A2438]" data-reveal>
              <h3 className="font-extrabold text-[#00AEEF]">{copy.careTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{copy.careLead}</p>
              <ul className="mt-3 space-y-1 text-sm font-semibold">
                {copy.careItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{copy.careNote}</p>
            </div>
          </div>
        </section>

        <section id="orden" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.orderKicker}</p>
            <A1Title text={copy.orderTitle} className="mt-2 max-w-4xl text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.orderLead}
            </p>
            <div className="landing-reveal-group mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8" data-reveal>
              {copy.osascomp.map((item, i) => (
                <A1MotionCard key={item.title} as="article" className="rounded-2xl border border-slate-200 p-3 text-center dark:border-[#2A3650]" style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}>
                  <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[#0D1B2E] text-sm font-extrabold text-white">{item.letter}</span>
                  <p className="mt-2 text-xs font-extrabold">{item.title}</p>
                  <p className="text-xs text-[#00AEEF]">{item.example}</p>
                </A1MotionCard>
              ))}
            </div>
            <div className="landing-reveal mt-6 rounded-2xl bg-[#0D1B2E] p-5 text-white" data-reveal>
              <p className="font-extrabold text-[#00AEEF]">{copy.orderPhrase}</p>
              <p className="mt-1 text-sm text-white/70">{copy.orderPhraseEs}</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl bg-[#F4F8FB] p-4 dark:bg-[#121C2E]">
                <h3 className="font-extrabold">{copy.orderQ}</h3>
                <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">{copy.orderA}</p>
              </article>
              <article className="rounded-2xl bg-[#F4F8FB] p-4 dark:bg-[#121C2E]">
                <h3 className="font-extrabold">{copy.commasTitle}</h3>
                <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">{copy.commasBody}</p>
              </article>
              <article className="rounded-2xl bg-[#F4F8FB] p-4 dark:bg-[#121C2E]">
                <h3 className="font-extrabold">{copy.opinionTitle}</h3>
                <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">{copy.opinionBody}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="tipos" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.typesKicker}</p>
            <A1Title text={copy.typesTitle} className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.typesLead}
            </p>
            <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.types.map((item, i) => (
                <A1MotionCard key={item.title} as="article" className="rounded-2xl bg-white p-5 dark:bg-[#1A2438]" style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}>
                  <h3 className="font-extrabold text-[#00AEEF]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                  <p className="mt-3 text-sm font-extrabold">{item.example}</p>
                </A1MotionCard>
              ))}
            </div>
            <p className="landing-reveal mt-6 text-sm leading-relaxed text-[#64748B]" data-reveal>
              {copy.typesNote}
            </p>
          </div>
        </section>

        <section id="ed-ing" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.edKicker}</p>
            <A1Title text={copy.edTitle} className="mt-2 max-w-4xl text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.edLead}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 p-5 dark:border-[#2A3650]">
                <h3 className="font-extrabold text-[#00AEEF]">{copy.edColTitle}</h3>
                {copy.edItems.map((item) => (
                  <div key={item.en} className="mt-3">
                    <p className="font-extrabold">{item.en}</p>
                    <p className="text-sm text-[#64748B]">{item.es}</p>
                  </div>
                ))}
                <p className="mt-4 text-sm text-[#475569] dark:text-[#94A3B8]">{copy.edNote}</p>
              </article>
              <article className="rounded-2xl border border-slate-200 p-5 dark:border-[#2A3650]">
                <h3 className="font-extrabold text-[#FF6B2C]">{copy.ingColTitle}</h3>
                {copy.ingItems.map((item) => (
                  <div key={item.en} className="mt-3">
                    <p className="font-extrabold">{item.en}</p>
                    <p className="text-sm text-[#64748B]">{item.es}</p>
                  </div>
                ))}
                <p className="mt-4 text-sm text-[#475569] dark:text-[#94A3B8]">{copy.ingNote}</p>
              </article>
            </div>
            <p className="landing-reveal mt-6 rounded-xl bg-[#E8F7FC] px-4 py-3 text-sm font-semibold text-[#0D1B2E]" data-reveal>
              {copy.edTip}
            </p>
            <A1Title text={copy.degTitle} className="mt-14 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.degLead}
            </p>
            <div className="landing-reveal mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-[#2A3650]" data-reveal>
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <thead className="bg-[#0D1B2E] text-white">
                  <tr>
                    {copy.degHeaders.map((header) => (
                      <th key={header} className="px-3 py-3 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.degRows.map((row) => (
                    <tr key={row[1]} className="border-t border-slate-100 dark:border-[#2A3650]">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[#334155] dark:text-[#CBD5E1]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-[#64748B]">{copy.degNote}</p>
          </div>
        </section>

        <section id="lista" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.listKicker}</p>
            <A1Title text={copy.listTitle} className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.listLead}
            </p>
            <label className="mt-6 block text-sm font-semibold">{copy.searchLabel}</label>
            <div className="relative mt-2 max-w-md">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.searchPh}
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#00AEEF] dark:border-[#2A3650] dark:bg-[#1A2438]"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${filter === item.id ? 'bg-[#00AEEF] text-[#0D1B2E]' : 'bg-white text-[#475569] dark:bg-[#1A2438] dark:text-[#CBD5E1]'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#2A3650] dark:bg-[#1A2438]">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <thead className="bg-[#0D1B2E] text-white">
                  <tr>
                    {copy.listHeaders.map((header) => (
                      <th key={header} className="px-4 py-3 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((word) => (
                    <tr key={word.en} className="border-t border-slate-100 dark:border-[#2A3650]">
                      <td className="px-4 py-2.5 font-extrabold text-[#00AEEF]">{word.en}</td>
                      <td className="px-4 py-2.5">{word.es}</td>
                      <td className="px-4 py-2.5 text-[#64748B]">{catLabel(word.cat)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <A1Title text={copy.exTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.exLead}
            </p>
            <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.examples.map((item, i) => (
                <A1MotionCard key={item.en} as="article" className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]" style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}>
                  <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{item.tag}</p>
                  <p className="mt-2 font-extrabold">{item.en}</p>
                  <p className="text-sm text-[#64748B]">{item.es}</p>
                </A1MotionCard>
              ))}
            </div>
            <A1Title text={copy.errorsTitle} className="mt-14 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.errorsLead}
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-[#2A3650]">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <thead className="bg-[#0D1B2E] text-white">
                  <tr>
                    {copy.errorHeaders.map((header) => (
                      <th key={header} className="px-3 py-3 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.errors.map((item) => (
                    <tr key={item.issue} className="border-t border-slate-100 dark:border-[#2A3650]">
                      <td className="px-3 py-3 font-semibold">{item.issue}</td>
                      <td className="px-3 py-3 text-[#DC2626]">{item.wrong}</td>
                      <td className="px-3 py-3 font-extrabold text-[#059669]">{item.right}</td>
                      <td className="px-3 py-3 text-[#64748B]">{item.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="ejercicios" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <GrammarQuizLaunch to="/adjetivos/test" kicker={copy.quizKicker} title={copy.quizTitle} lead={copy.quizLead} cta={copy.heroTestCta} />
          </div>
        </section>

        <section id="recursos" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <A1Title text={copy.pdfTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.pdfLead}
            </p>
            <p className="mt-2 text-sm text-[#64748B]">{copy.pdfNote}</p>
            <Link to="/register" className="fl-cta-glow mt-6 inline-flex rounded-full bg-[#00AEEF] px-6 py-2.5 text-xs font-extrabold uppercase text-[#0D1B2E] transition hover:bg-[#33c0f5]">
              {copy.pdfCta}
            </Link>
            <p className="mt-14 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.moreKicker}</p>
            <A1Title text={copy.moreTitle} className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.moreLead}
            </p>
            <div className="landing-reveal-group mt-8 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.more.map((item, i) => (
                <A1MotionCard key={item.to} as="article" className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]" style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}>
                  <Link to={item.to} className="block">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{item.tag}</p>
                    <p className="mt-1 font-extrabold">{item.title} →</p>
                  </Link>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section id="preguntas" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.faqKicker}</p>
            <A1Title text={copy.faqTitle} className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <div className="landing-reveal mt-8 divide-y divide-slate-200 dark:divide-[#2A3650]" data-reveal>
              {copy.faq.map((item, i) => {
                const open = openFaq === i
                return (
                  <article key={item.q}>
                    <button type="button" className="flex w-full items-center justify-between gap-3 py-4 text-left" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : i)}>
                      <span className="font-semibold">{item.q}</span>
                      {open ? <ChevronDown size={18} className="text-[#00AEEF]" /> : <Plus size={18} className="text-[#00AEEF]" />}
                    </button>
                    {open && <p className="pb-4 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.a}</p>}
                  </article>
                )
              })}
            </div>
            <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-extrabold text-[#0D1B2E] dark:text-white">{copy.closeLead}</p>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]">{copy.closeBody}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/register" className="fl-cta-glow inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-7 py-3 text-sm font-extrabold uppercase text-[#0D1B2E] transition hover:bg-[#33c0f5]">
                <CheckCircle2 size={16} />
                {copy.startCta}
              </Link>
              <Link to="/test" className="inline-flex rounded-full border-2 border-[#0D1B2E] px-7 py-3 text-sm font-extrabold uppercase dark:border-white">
                {copy.testCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter lang={lang} />
    </div>
  )
}
