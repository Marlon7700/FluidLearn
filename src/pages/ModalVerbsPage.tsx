import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { CheckCircle2, ChevronDown, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import { getModalsCopy } from '../lib/modalsI18n'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { A1MotionCard, A1Title } from './LevelTestPage'

const HERO_IMG = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80'

export function ModalVerbsPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const [intent, setIntent] = useState('capacidad')
  const [openFaq, setOpenFaq] = useState<number>(-1)
  const [picked, setPicked] = useState<number[]>(() => Array(8).fill(-1))
  const [checked, setChecked] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getModalsCopy(lang), [lang])
  const selected = copy.intents.find((item) => item.id === intent) ?? copy.intents[0]

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
      setPicked(Array(copy.quiz.length).fill(-1))
      setChecked(false)
      setShowAnswers(false)
      window.setTimeout(() => setLangLoading(false), 280)
    }, 400)
  }

  const score = copy.quiz.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0)

  return (
    <div className="a1-test-page min-h-svh bg-white text-[#0D1B2E] dark:bg-[#0F1728] dark:text-[#E8EEF8]">
      <FluidLearnLoadingOverlay show={langLoading} message={t.loadingLang} />
      <LandingNavbar lang={lang} onLangChange={changeLanguage} langLoading={langLoading} sectionMode="route" />
      <div className="shrink-0 bg-[#0D1B2E] sm:hidden" style={{ height: 'calc(68px + env(safe-area-inset-top, 0px))' }} aria-hidden />
      <div className="hidden shrink-0 bg-[#0D1B2E] sm:block" style={{ height: 'calc(76px + env(safe-area-inset-top, 0px))' }} aria-hidden />

      <section className="relative overflow-hidden bg-[#0D1B2E] text-white">
        <img src={HERO_IMG} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/90 to-[#0D1B2E]/40" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#00AEEF]">{copy.kicker}</p>
            <LetterReveal
              as="h1"
              text={copy.heroTitle}
              whenVisible
              charMs={12}
              className="mt-3 max-w-xl text-[26px] font-extrabold leading-tight tracking-tight sm:text-[36px]"
            />
            <p className="landing-reveal mt-4 max-w-xl text-[15px] leading-[1.75] text-white/75" data-reveal>
              {copy.heroLead}
            </p>
            <div className="landing-reveal mt-6 flex flex-wrap gap-3" data-reveal>
              <Link
                to="/register"
                className="fl-cta-glow inline-flex rounded-full bg-[#00AEEF] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]"
              >
                {copy.startCta}
              </Link>
              <a href="#usos" className="inline-flex rounded-full border border-white/30 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white">
                {copy.chooseCta}
              </a>
            </div>
            <p className="landing-reveal mt-4 text-sm text-white/60" data-reveal>
              {copy.heroNote}
            </p>
          </div>
          <div className="landing-reveal rounded-2xl border border-white/15 bg-[#0D1B2E]/80 p-5 backdrop-blur" data-reveal>
            <p className="font-extrabold">{copy.pickerTitle}</p>
            <p className="mt-1 text-sm text-white/65">{copy.pickerLead}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.intents.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIntent(item.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${intent === item.id ? 'bg-[#00AEEF] text-[#0D1B2E]' : 'bg-white/10 text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-[#00AEEF]">{selected.family}</p>
            <p className="mt-2 text-sm font-extrabold">{selected.example}</p>
            <p className="text-sm text-white/65">{selected.exampleEs}</p>
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
        <section id="que-son" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:grid lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.conceptKicker}</p>
            <A1Title
              text={copy.conceptTitle}
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <p className="landing-reveal mt-4 text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]" data-reveal>
              {copy.conceptLead}
            </p>
            <p
              className="landing-reveal mt-4 text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]"
              data-reveal
              style={{ '--reveal-delay': '100ms' } as CSSProperties}
            >
              {copy.conceptBody}
            </p>
            <div className="landing-reveal mt-6 rounded-2xl bg-[#0D1B2E] p-5 text-white" data-reveal>
              <p className="text-xs font-bold uppercase tracking-wide text-[#00AEEF]">{copy.ruleTitle}</p>
              <p className="mt-2 font-extrabold">{copy.ruleFormula}</p>
              <p className="mt-1 text-sm text-white/70">{copy.ruleExamples}</p>
            </div>
          </div>
          <ol className="landing-reveal-group mt-8 space-y-3 lg:mt-10" data-reveal>
            {copy.rules.map((item, i) => (
              <A1MotionCard
                key={item}
                as="li"
                className="flex gap-3 text-sm text-[#334155] dark:text-[#CBD5E1]"
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#00AEEF] text-xs font-extrabold text-[#0D1B2E]">{i + 1}</span>
                {item}
              </A1MotionCard>
            ))}
          </ol>
        </section>

        <section id="usos" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.mapKicker}</p>
            <A1Title
              text={copy.mapTitle}
              className="mt-2 max-w-3xl text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.mapLead}
            </p>
            <div className="landing-reveal-group mt-10 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.intents.map((item, i) => (
                <A1MotionCard
                  key={item.id}
                  as="article"
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]"
                  style={{
                    '--reveal-delay': `${i * 90}ms`,
                    borderTopWidth: 4,
                    borderTopColor: ['#00AEEF', '#1A6FE8', '#FF6B2C', '#0D1B2E', '#00AEEF', '#1A6FE8'][i],
                  } as CSSProperties}
                >
                  <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">
                    {lang === 'es' ? `Intención ${i + 1}` : `Intention ${i + 1}`}
                  </p>
                  <h3 className="mt-2 font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                  <p className="mt-3 text-sm font-semibold text-[#00AEEF]">{item.family}</p>
                  <div className="mt-3 rounded-xl bg-[#F4F8FB] p-3 dark:bg-[#0F1728]">
                    <p className="text-sm font-extrabold">{item.example}</p>
                    <p className="text-sm text-[#64748B]">{item.exampleEs}</p>
                  </div>
                </A1MotionCard>
              ))}
            </div>
            <h3 className="mt-14 text-xl font-extrabold text-[#0D1B2E] dark:text-white">{copy.stepsTitle}</h3>
            <div className="landing-reveal-group mt-6 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-4" data-reveal>
              {copy.steps.map((item, i) => (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl bg-white p-5 dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0D1B2E] text-sm font-extrabold text-white">{i + 1}</span>
                  <h4 className="mt-3 font-extrabold">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                  <p className="mt-3 text-sm font-semibold text-[#00AEEF]">{item.note}</p>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section id="lista" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.listKicker}</p>
            <A1Title
              text={copy.listTitle}
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.listLead}
            </p>
            <div className="landing-reveal mt-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#2A3650]" data-reveal>
              <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                <thead className="bg-[#0D1B2E] text-white">
                  <tr>
                    {copy.tableHeaders.map((header) => (
                      <th key={header} className="px-4 py-3 font-semibold">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.rows.map((row) => (
                    <tr key={row.id} id={`guia-${row.id}`} className="scroll-mt-28 border-t border-slate-100 dark:border-[#2A3650]">
                      <td className="px-4 py-4 align-top">
                        <p className="font-extrabold text-[#00AEEF]">{row.verb}</p>
                        <p className="text-xs text-[#64748B]">Negativa: {row.negative}</p>
                      </td>
                      <td className="px-4 py-4 text-[#334155] dark:text-[#CBD5E1]">{row.uses}</td>
                      <td className="px-4 py-4 text-[#334155] dark:text-[#CBD5E1]">{row.tone}</td>
                      <td className="px-4 py-4">
                        <p className="font-extrabold">{row.example}</p>
                        <p className="text-[#64748B]">{row.exampleEs}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-10 font-extrabold text-[#0D1B2E] dark:text-white">{copy.semiTitle}</h3>
            <div className="landing-reveal-group mt-4 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-5" data-reveal>
              {copy.semis.map((item, i) => (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]"
                  style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
                >
                  <p className="font-extrabold text-[#00AEEF]">{item.title}</p>
                  <p className="mt-1 text-sm text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.guideKicker}</p>
            <A1Title
              text={copy.guideTitle}
              className="mt-2 max-w-3xl text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.guideLead}
            </p>
            <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2" data-reveal>
              {copy.rows.map((row, i) => (
                <A1MotionCard
                  key={row.id}
                  as="article"
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-extrabold text-[#0D1B2E] dark:text-white">{row.verb}</h3>
                    <span className="text-xs font-semibold text-[#00AEEF]">{row.tone}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                    {row.uses}. Negativa: {row.negative}.
                  </p>
                  <div className="mt-3 rounded-xl bg-[#F4F8FB] p-3 dark:bg-[#0F1728]">
                    <p className="text-sm font-extrabold">{row.example}</p>
                    <p className="text-sm text-[#64748B]">{row.exampleEs}</p>
                  </div>
                  <a href={`#guia-${row.id}`} className="mt-3 inline-block text-sm font-semibold text-[#00AEEF] hover:underline">
                    {copy.guideCta} → {row.verb}
                  </a>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section id="estructura" className="scroll-mt-28 bg-[#0D1B2E] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.structKicker}</p>
            <A1Title text={copy.structTitle} className="mt-2 max-w-3xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-sm leading-relaxed text-white/70" data-reveal>
              {copy.structLead}
            </p>
            <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] md:grid-cols-3" data-reveal>
              {copy.structures.map((item, i) => (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl border border-white/15 bg-white/5 p-5"
                  style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                >
                  <h3 className="font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#00AEEF]">{item.formula}</p>
                  <p className="mt-3 font-extrabold">{item.example}</p>
                  <p className="text-sm text-white/65">{item.exampleEs}</p>
                </A1MotionCard>
              ))}
            </div>
            <p className="landing-reveal mt-6 rounded-xl bg-white px-4 py-3 text-sm text-[#0D1B2E]" data-reveal>
              {copy.structNote}
            </p>
          </div>
        </section>

        <section id="diferencias" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.diffKicker}</p>
            <A1Title
              text={copy.diffTitle}
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <div className="landing-reveal-group mt-8 divide-y divide-slate-200 dark:divide-[#2A3650]" data-reveal>
              {copy.diffs.map((item, i) => (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="grid gap-3 py-6 sm:grid-cols-[0.9fr_1.2fr_0.7fr]"
                  style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
                >
                  <h3 className="font-extrabold text-[#00AEEF]">{item.title}</h3>
                  <div>
                    <p className="text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                    <p className="mt-2 text-sm font-semibold">{item.example}</p>
                  </div>
                  <a href="#usos" className="text-sm font-semibold text-[#00AEEF] hover:underline sm:text-right">{item.cta}</a>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title
              text={copy.pastTitle}
              className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.pastLead}
            </p>
            <div className="landing-reveal mt-6 rounded-2xl bg-[#0D1B2E] p-5 text-white" data-reveal>
              <p className="text-xs font-bold uppercase tracking-wide text-[#00AEEF]">{copy.pastFormulaTitle}</p>
              <p className="mt-2 font-extrabold">{copy.pastFormula}</p>
              <p className="mt-1 text-sm text-white/70">{copy.pastExamples}</p>
            </div>
            <div className="landing-reveal-group mt-4 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-5" data-reveal>
              {copy.perfects.map((item, i) => (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl border border-[#00AEEF]/40 bg-white p-4 dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
                >
                  <p className="font-extrabold text-[#00AEEF]">{item.title}</p>
                  <p className="mt-1 text-sm text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section id="ejemplos" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.examplesKicker}</p>
            <A1Title
              text={copy.examplesTitle}
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.examplesLead}
            </p>
            <div className="landing-reveal-group mt-8 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.examples.map((item, i) => (
                <A1MotionCard
                  key={item.en}
                  as="article"
                  className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]"
                  style={{ '--reveal-delay': `${(i % 6) * 70}ms` } as CSSProperties}
                >
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-[#00AEEF] text-xs font-extrabold text-[#0D1B2E]">{i + 1}</span>
                  <p className="mt-3 font-extrabold">{item.en}</p>
                  <p className="text-sm text-[#64748B]">{item.es}</p>
                  <p className="mt-2 text-sm font-semibold text-[#00AEEF]">{item.tag}</p>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.errorsKicker}</p>
            <A1Title
              text={copy.errorsTitle}
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2" data-reveal>
              {copy.errors.map((item, i) => (
                <A1MotionCard
                  key={item.wrong}
                  as="article"
                  className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#2A3650] dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
                >
                  <p className="text-sm text-[#DC2626]">✗ {item.wrong}</p>
                  <p className="mt-1 text-sm font-extrabold text-[#059669]">✓ {item.right}</p>
                  <p className="mt-2 text-sm text-[#64748B]">{item.why}</p>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section id="ejercicios" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.quizKicker}</p>
            <A1Title
              text={copy.quizTitle}
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <p className="landing-reveal mt-4 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.quizLead}
            </p>
            <ol className="landing-reveal-group mt-8 space-y-6" data-reveal>
              {copy.quiz.map((item, i) => (
                <A1MotionCard
                  key={item.q}
                  as="li"
                  className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]"
                  style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
                >
                  <p className="font-semibold">
                    {i + 1}. {item.q}
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {item.options.map((option, oi) => {
                      const active = picked[i] === oi
                      const correct = checked && oi === item.answer
                      const wrong = checked && active && oi !== item.answer
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setChecked(false)
                            setPicked((prev) => {
                              const next = [...prev]
                              next[i] = oi
                              return next
                            })
                          }}
                          className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
                            correct
                              ? 'border-[#059669] bg-[#ECFDF5] text-[#047857]'
                              : wrong
                                ? 'border-[#DC2626] bg-[#FEF2F2] text-[#B91C1C]'
                                : active
                                  ? 'border-[#00AEEF] bg-[#E8F7FC] text-[#0D1B2E]'
                                  : 'border-slate-200 dark:border-[#2A3650]'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                  {showAnswers && <p className="mt-3 text-sm text-[#00AEEF]">{item.why}</p>}
                </A1MotionCard>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-[#0D1B2E] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white"
                onClick={() => setChecked(true)}
              >
                {copy.quizCheck}
              </button>
              <p className="text-sm text-[#64748B]">
                {checked ? copy.quizScore.replace('{score}', String(score)).replace('{total}', String(copy.quiz.length)) : copy.quizPending}
              </p>
            </div>
            <button type="button" className="mt-4 text-sm font-semibold text-[#00AEEF]" onClick={() => setShowAnswers((v) => !v)}>
              {showAnswers ? copy.quizHide : copy.quizShow}
            </button>
          </div>
        </section>

        <section id="preguntas" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.faqKicker}</p>
            <A1Title
              text={copy.faqTitle}
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            />
            <div className="landing-reveal mt-8 divide-y divide-slate-200 dark:divide-[#2A3650]" data-reveal>
              {copy.faq.map((item, i) => {
                const open = openFaq === i
                return (
                  <article key={item.q}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 py-4 text-left"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      <span className="font-semibold">{item.q}</span>
                      {open ? <ChevronDown size={18} className="text-[#00AEEF]" /> : <Plus size={18} className="text-[#00AEEF]" />}
                    </button>
                    {open && <p className="pb-4 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.a}</p>}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.moreKicker}</p>
                <A1Title
                  text={copy.moreTitle}
                  className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
                />
              </div>
              <Link
                to="/register"
                className="landing-reveal fl-cta-glow inline-flex rounded-full bg-[#00AEEF] px-6 py-2.5 text-xs font-extrabold uppercase text-[#0D1B2E] transition hover:bg-[#33c0f5]"
                data-reveal
              >
                {copy.moreCta}
              </Link>
            </div>
            <div className="landing-reveal-group mt-8 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.more.map((item, i) => (
                <A1MotionCard
                  key={item.to}
                  as="article"
                  className="rounded-2xl border border-slate-200 p-4 transition hover:border-[#00AEEF] dark:border-[#2A3650]"
                  style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
                >
                  <Link to={item.to} className="block">
                    <p className="font-extrabold">{item.title}</p>
                    <p className="mt-1 text-sm text-[#64748B]">{item.text} →</p>
                  </Link>
                </A1MotionCard>
              ))}
            </div>
            <p className="landing-reveal mx-auto mt-12 max-w-2xl text-center text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]" data-reveal>
              {copy.closeLead}
            </p>
            <div className="landing-reveal mt-6 flex flex-wrap justify-center gap-3" data-reveal>
              <Link
                to="/register"
                className="fl-cta-glow inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-7 py-3 text-sm font-extrabold uppercase text-[#0D1B2E] transition hover:bg-[#33c0f5]"
              >
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
