import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { CheckCircle2, ChevronDown, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import { getPronounsCopy } from '../lib/pronounsI18n'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { A1MotionCard, A1Title } from './LevelTestPage'
import { GrammarQuizLaunch } from './GrammarTopicQuizPage'

const HERO_IMG = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80'

export function PronounsPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const [fn, setFn] = useState('')
  const [picked, setPicked] = useState<number[]>(() => Array(7).fill(-1))
  const [checked, setChecked] = useState(false)
  const [openFaq, setOpenFaq] = useState(-1)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getPronounsCopy(lang), [lang])
  const selected = copy.functions.find((item) => item.id === fn)

  useLandingReveal([lang, fn, checked])

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
      setPicked(Array(7).fill(-1))
      setChecked(false)
      window.setTimeout(() => setLangLoading(false), 280)
    }, 400)
  }

  const miniScore = copy.mini.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0)

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
              <Link to="/pronombres/test" className="inline-flex rounded-full border border-white/30 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:border-[#00AEEF] hover:text-[#00AEEF]">
                {copy.heroTestCta}
              </Link>
            </div>
          </div>
          <A1MotionCard as="aside" className="rounded-2xl border border-white/15 bg-[#0D1B2E]/80 p-5 backdrop-blur">
            <p className="text-sm leading-relaxed text-white/80">{copy.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {copy.nav.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white hover:bg-[#00AEEF] hover:text-[#0D1B2E]">
                  {item.label}
                </a>
              ))}
            </div>
          </A1MotionCard>
        </div>
      </section>

      <main>
        <section id="decision" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.decideKicker}</p>
            <A1Title text={copy.decideTitle} className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.decideLead}
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="flex flex-col gap-2">
                {copy.functions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFn(item.id)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      fn === item.id
                        ? 'border-[#00AEEF] bg-[#E8F7FC] text-[#0D1B2E]'
                        : 'border-slate-200 hover:border-[#00AEEF] dark:border-[#2A3650]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <A1MotionCard as="aside" className="rounded-3xl bg-[#0D1B2E] p-6 text-white">
                {selected ? (
                  <>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{selected.type}</p>
                    <p className="mt-3 text-lg font-extrabold">{selected.rule}</p>
                    <p className="mt-4 rounded-xl bg-white/10 px-4 py-3 text-sm">{selected.example}</p>
                    <a href={`#tipo-${selected.id}`} className="mt-5 inline-block text-sm font-semibold text-[#00AEEF]">
                      → {selected.type}
                    </a>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed text-white/70">{copy.decideIdle}</p>
                )}
              </A1MotionCard>
            </div>
          </div>
        </section>

        <section id="que-son" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <A1Title text={copy.whatTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.whatLead}
            </p>
            <p className="mt-4 text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]">{copy.whatNote}</p>
            <A1MotionCard as="article" className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{copy.whatQ}</p>
              <p className="mt-2 font-semibold">{copy.whatA}</p>
            </A1MotionCard>
          </div>
        </section>

        <section id="personales" className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <A1Title text={copy.personTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.personLead}
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#2A3650]">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-[#0D1B2E] text-white">
                  <tr>
                    {copy.headers.map((h) => (
                      <th key={h} className="px-3 py-3 font-extrabold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.rows.map((row) => (
                    <tr key={row.subject} className="border-t border-slate-100 dark:border-[#2A3650]">
                      <td className="px-3 py-3">
                        <p className="font-extrabold text-[#00AEEF]">{row.subject}</p>
                        <p className="text-xs text-[#64748B]">{row.note}</p>
                      </td>
                      <td className="px-3 py-3 font-semibold">{row.object}</td>
                      <td className="px-3 py-3">{row.det}</td>
                      <td className="px-3 py-3">{row.poss}</td>
                      <td className="px-3 py-3">{row.refl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{copy.checksTitle}</p>
            <ul className="mt-3 space-y-2">
              {copy.checks.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tipos" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text={copy.typesTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.typesLead}
            </p>
            <div className="landing-reveal-group mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.types.map((item, i) => (
                <div key={item.id} id={`tipo-${item.id}`} className="scroll-mt-28">
                <A1MotionCard as="article" className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]" style={{ '--reveal-delay': `${i * 60}ms` } as CSSProperties}>
                  <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{item.title}</p>
                  <h3 className="mt-2 font-extrabold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{item.body}</p>
                  <p className="mt-3 text-sm font-semibold text-[#00AEEF]">{item.forms}</p>
                  <p className="mt-2 text-sm">{item.example}</p>
                </A1MotionCard>
                </div>
              ))}
            </div>
            <A1Title text={copy.mapTitle} className="mt-14 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B]">{copy.mapLead}</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-[#2A3650] dark:bg-[#1A2438]">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#0D1B2E] text-white">
                  <tr>
                    {copy.mapHeaders.map((h) => (
                      <th key={h} className="px-3 py-3 font-extrabold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.types.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100 dark:border-[#2A3650]">
                      <td className="px-3 py-3 font-extrabold text-[#00AEEF]">{item.title}</td>
                      <td className="px-3 py-3">{item.q}</td>
                      <td className="px-3 py-3 text-[#64748B]">{item.body}</td>
                      <td className="px-3 py-3 font-semibold">{item.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <A1Title text={copy.diffsTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B]">{copy.diffsLead}</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {copy.diffs.map((item) => (
                <A1MotionCard key={item.title} as="article" className="rounded-2xl border border-slate-200 p-5 dark:border-[#2A3650]">
                  <h3 className="font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{item.body}</p>
                  <p className="mt-3 text-sm text-[#DC2626]">{item.before}</p>
                  <p className="mt-1 text-sm font-semibold text-[#059669]">{item.after}</p>
                  <p className="mt-3 text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{item.tip}</p>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section id="practica" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <A1Title text={copy.practiceTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="mt-4 text-[15px] leading-[1.85] text-[#64748B]">{copy.practiceLead}</p>
            <ol className="mt-8 space-y-5">
              {copy.mini.map((item, i) => (
                <A1MotionCard key={item.q} as="li" className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#2A3650] dark:bg-[#1A2438]">
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
                                  ? 'border-[#00AEEF] bg-[#E8F7FC]'
                                  : 'border-slate-200 dark:border-[#2A3650]'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                  {checked && <p className="mt-3 text-sm text-[#00AEEF]">{item.why}</p>}
                </A1MotionCard>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="rounded-full bg-[#0D1B2E] px-5 py-2.5 text-xs font-extrabold uppercase text-white" onClick={() => setChecked(true)}>
                {copy.practiceCheck}
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-300 px-5 py-2.5 text-xs font-extrabold uppercase"
                onClick={() => {
                  setPicked(Array(7).fill(-1))
                  setChecked(false)
                }}
              >
                {copy.practiceReset}
              </button>
              <p className="self-center text-sm text-[#64748B]">{checked ? `${miniScore} / ${copy.mini.length}` : copy.practiceIdle}</p>
            </div>
          </div>
        </section>

        <section className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <A1Title text={copy.errorsTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <p className="mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B]">{copy.errorsLead}</p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {copy.errors.map((item) => (
                <article key={item.issue} className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]">
                  <p className="font-extrabold">{item.issue}</p>
                  <p className="mt-2 text-sm text-[#DC2626]">{item.wrong}</p>
                  <p className="mt-1 text-sm font-semibold text-[#059669]">{item.right}</p>
                  <p className="mt-2 text-sm text-[#64748B]">{item.why}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ejercicios" className="scroll-mt-28 bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <GrammarQuizLaunch to="/pronombres/test" kicker={copy.quizKicker} title={copy.quizTitle} lead={copy.quizLead} cta={copy.heroTestCta} />
          </div>
        </section>

        <section className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <A1Title text={copy.faqTitle} className="text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <div className="mt-8 divide-y divide-slate-200 dark:divide-[#2A3650]">
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
            <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-extrabold">{copy.closeLead}</p>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-[1.85] text-[#475569]">{copy.closeBody}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/gramatica" className="fl-cta-glow inline-flex rounded-full bg-[#00AEEF] px-7 py-3 text-sm font-extrabold uppercase text-[#0D1B2E]">
                {copy.grammarCta}
              </Link>
              <a href="#decision" className="inline-flex rounded-full border-2 border-[#0D1B2E] px-7 py-3 text-sm font-extrabold uppercase dark:border-white">
                {copy.testCta}
              </a>
            </div>
            <A1Title text={copy.moreTitle} className="mt-14 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {copy.more.map((item) => (
                <A1MotionCard key={item.to} as="article" className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650]">
                  <Link to={item.to} className="block">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">{item.tag}</p>
                    <p className="mt-1 font-extrabold">{item.title} →</p>
                  </Link>
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <LandingFooter lang={lang} />
    </div>
  )
}
