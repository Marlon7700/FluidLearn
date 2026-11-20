import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import { GrammarQuizLaunch } from './GrammarTopicQuizPage'
import { getAdverbsCopy } from '../lib/adverbsI18n'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { A1MotionCard, A1Title } from './LevelTestPage'

const HERO_IMG = 'https://images.unsplash.com/photo-1456513080800-7d93d16e6986?auto=format&fit=crop&w=1600&q=80'

const LEVEL_COLORS = ['#2DD4BF', '#FB923C', '#F59E8B', '#F43F5E', '#64748B', '#A78BFA']

export function AdverbsPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const [showFill, setShowFill] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getAdverbsCopy(lang), [lang])

  useLandingReveal([lang, showFill])

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
                to="/adverbios/test"
                className="inline-flex rounded-full border border-white/30 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:border-[#00AEEF] hover:text-[#00AEEF]"
              >
                {copy.ctaButton}
              </Link>
            </div>
          </div>
          <A1MotionCard as="aside" className="rounded-2xl border border-white/15 bg-[#0D1B2E]/80 p-5 backdrop-blur">
            <p className="text-sm leading-relaxed text-white/80">{copy.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.typesNav.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white hover:bg-[#00AEEF] hover:text-[#0D1B2E]">
                  {item.label}
                </a>
              ))}
            </div>
          </A1MotionCard>
        </div>
      </section>

      <nav className="sticky top-[calc(76px+env(safe-area-inset-top,0px))] z-20 hidden border-b border-slate-200 bg-white/95 backdrop-blur sm:block dark:border-[#2A3650] dark:bg-[#0F1728]/95">
        <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-6 py-3 text-xs font-extrabold uppercase tracking-wide">
          {copy.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="shrink-0 text-[#64748B] hover:text-[#00AEEF]">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section id="que-son" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <A1Title text={copy.whatTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.whatLead}
            </p>
            <ul className="landing-reveal-group mt-8 space-y-4" data-reveal>
              {copy.whatExamples.map((item, i) => (
                <A1MotionCard key={item.en} as="li" className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]" style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}>
                  <p className="font-semibold">{item.en}</p>
                  <p className="mt-1 text-sm text-[#64748B]">{item.es}</p>
                </A1MotionCard>
              ))}
            </ul>
          </div>
        </section>

        <section id="tipos" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {copy.groups.map((group) => (
              <article key={group.id} id={group.id} className="mb-16 scroll-mt-28 last:mb-0">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{group.id}</p>
                <A1Title text={group.title} className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
                <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
                  {group.lead}
                </p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#2A3650] dark:bg-[#1A2438]">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#0D1B2E] text-white">
                      <tr>
                        <th className="px-4 py-3 font-extrabold">Adverbio</th>
                        <th className="px-4 py-3 font-extrabold">Significado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((row) => (
                        <tr key={row.en} className="border-t border-slate-100 dark:border-[#2A3650]">
                          <td className="px-4 py-2.5 font-semibold text-[#00AEEF]">{row.en}</td>
                          <td className="px-4 py-2.5">{row.es}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="mt-5 space-y-3">
                  {group.examples.map((item) => (
                    <li key={item.en} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-[#2A3650] dark:bg-[#1A2438]">
                      <p className="font-semibold">{item.en}</p>
                      <p className="mt-1 text-[#64748B]">{item.es}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.ctaKicker}</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-4xl">
                {copy.ctaTitle}
                <span className="mt-2 block">
                  <span className="bg-[#00AEEF] px-2 py-0.5 text-[#0D1B2E]">{copy.ctaHighlight}</span>
                </span>
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">{copy.ctaLead}</p>
              <Link
                to="/adverbios/test"
                className="fl-cta-glow mt-6 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]"
              >
                {copy.ctaButton}
              </Link>
            </div>
            <div className="relative mx-auto grid max-w-sm grid-cols-3 gap-3">
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8F7FC] dark:bg-[#1A2438]" />
              {copy.levels.map((level, i) => (
                <div key={level} className="grammar-level-badge relative flex aspect-square items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(13,27,46,0.08)] dark:bg-[#1A2438]" style={{ animationDelay: `${i * 90}ms` }}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 text-sm font-extrabold" style={{ borderColor: LEVEL_COLORS[i], color: LEVEL_COLORS[i] }}>
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="formacion" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text={copy.formTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <div className="landing-reveal-group mt-8 grid gap-4 md:grid-cols-2" data-reveal>
              {copy.forms.map((form, i) => (
                <A1MotionCard key={form.title} as="article" className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]" style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}>
                  <h3 className="font-extrabold">{form.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{form.body}</p>
                  <ul className="mt-3 space-y-1 text-sm font-semibold text-[#0D1B2E] dark:text-white">
                    {form.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section id="posicion" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <A1Title text={copy.placeTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.placeLead}
            </p>
            <ol className="landing-reveal-group mt-8 space-y-4" data-reveal>
              {copy.places.map((item, i) => (
                <A1MotionCard key={item.title} as="li" className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]" style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}>
                  <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{item.title}</p>
                  <p className="mt-1 font-semibold">{item.example}</p>
                  <p className="mt-1 text-sm text-[#64748B]">{item.es}</p>
                </A1MotionCard>
              ))}
            </ol>
          </div>
        </section>

        <section className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <A1Title text={copy.fillTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.fillLead}
            </p>
            <p className="landing-reveal mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-[15px] leading-[1.9] dark:border-[#2A3650] dark:bg-[#1A2438]" data-reveal>
              {copy.fillText}
            </p>
            <button type="button" className="mt-4 text-sm font-semibold text-[#00AEEF]" onClick={() => setShowFill((v) => !v)}>
              {showFill ? copy.fillHide : copy.fillShow}
            </button>
            {showFill && (
              <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm font-semibold text-[#059669]">
                {copy.fillAnswers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )}
          </div>
        </section>

        <section id="ejercicios" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <GrammarQuizLaunch to="/adverbios/test" kicker={copy.quizKicker} title={copy.quizTitle} lead={copy.quizLead} cta={copy.ctaButton} />
          </div>
        </section>

        <section id="recursos" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text={copy.moreTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <div className="landing-reveal-group mt-8 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.more.map((item, i) => (
                <A1MotionCard key={item.to} as="article" className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#2A3650] dark:bg-[#1A2438]" style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}>
                  <Link to={item.to} className="block">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{item.tag}</p>
                    <p className="mt-1 font-extrabold">{item.title} →</p>
                  </Link>
                </A1MotionCard>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-extrabold">{copy.closeLead}</p>
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
