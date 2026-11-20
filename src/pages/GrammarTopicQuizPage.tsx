import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAdjectivesCopy } from '../lib/adjectivesI18n'
import { getAdverbsCopy } from '../lib/adverbsI18n'
import { getPronounsCopy } from '../lib/pronounsI18n'
import { htmlLangFor, readLandingLang, saveLandingLang, type LandingLangCode } from '../lib/landingI18n'
import type { GrammarQuizItem } from '../components/GrammarTimedQuiz'

const TOTAL_SECONDS = 10 * 60
const LETTERS = ['A', 'B', 'C'] as const

const UI = {
  es: {
    brand: 'FluidLearn',
    free: 'Test gratuito',
    start: 'Empieza el test',
    next: 'Siguiente',
    finish: 'Ver resultado',
    retry: 'Repetir test',
    back: 'Volver a la guía',
    time: 'Tiempo',
    of: '{n} / {total}',
    pending: 'Elige A, B o C',
    winTitle: '¡Felicidades! Pasaste el test de forma gratis',
    winLead: 'Completaste las 15 preguntas en FluidLearn, sin pagar. Sigue practicando y avanza con el curso.',
    score: 'Tu puntuación: {score} / {total}',
    expired: 'El tiempo se agotó, pero igual revisamos tu resultado.',
    register: 'Empieza gratis',
  },
  en: {
    brand: 'FluidLearn',
    free: 'Free test',
    start: 'Start the test',
    next: 'Next',
    finish: 'See result',
    retry: 'Try again',
    back: 'Back to the guide',
    time: 'Time',
    of: '{n} / {total}',
    pending: 'Choose A, B or C',
    winTitle: 'Congratulations! You passed the test for free',
    winLead: 'You completed all 15 questions on FluidLearn at no cost. Keep practising and move forward with the course.',
    score: 'Your score: {score} / {total}',
    expired: 'Time is up — here is your result anyway.',
    register: 'Start for free',
  },
} as const

export function GrammarTopicQuizPage({ topic }: { topic: 'adjetivos' | 'adverbios' | 'pronombres' }) {
  const [lang] = useState<LandingLangCode>(readLandingLang)
  const ui = lang === 'es' ? UI.es : UI.en
  const guide = topic === 'adjetivos' ? '/adjetivos' : topic === 'adverbios' ? '/adverbios' : '/pronombres'
  const pack = useMemo(() => {
    if (topic === 'adjetivos') return getAdjectivesCopy(lang)
    if (topic === 'adverbios') return getAdverbsCopy(lang)
    return getPronounsCopy(lang)
  }, [lang, topic])
  const items = pack.quiz as GrammarQuizItem[]

  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro')
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number[]>(() => Array(items.length).fill(-1))
  const [left, setLeft] = useState(TOTAL_SECONDS)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('legal-page')
    document.body.style.backgroundColor = '#0D1B2E'
    window.scrollTo(0, 0)
    document.documentElement.lang = htmlLangFor(lang)
    saveLandingLang(lang)
    return () => {
      root.classList.remove('legal-page')
      document.body.style.backgroundColor = ''
    }
  }, [lang])

  useEffect(() => {
    if (phase !== 'play') return
    const id = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          setExpired(true)
          setPhase('done')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [phase])

  const score = useMemo(
    () => items.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0),
    [items, picked],
  )
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const pct = Math.max(0, (left / TOTAL_SECONDS) * 100)
  const urgent = phase === 'play' && left <= 60
  const item = items[index]
  const last = index === items.length - 1

  function begin() {
    setPhase('play')
    setIndex(0)
    setPicked(Array(items.length).fill(-1))
    setLeft(TOTAL_SECONDS)
    setExpired(false)
  }

  function choose(oi: number) {
    setPicked((prev) => {
      const next = [...prev]
      next[index] = oi
      return next
    })
  }

  function goNext() {
    if (last) {
      setPhase('done')
      return
    }
    setIndex((n) => n + 1)
  }

  return (
    <div className="grammar-stage relative min-h-svh overflow-hidden bg-[#0D1B2E] text-white">
      <div className="grammar-stage-orb grammar-stage-orb-a" />
      <div className="grammar-stage-orb grammar-stage-orb-b" />
      <div className="grammar-stage-orb grammar-stage-orb-c" />
      <div className="grammar-stage-sparkles" aria-hidden>
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="grammar-stage-spark" style={{ '--i': i } as never} />
        ))}
      </div>

      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8">
        <Link to="/" className="text-sm font-extrabold tracking-tight">
          {ui.brand}
        </Link>
        <Link to={guide} className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-white/70 hover:text-[#00AEEF]">
          <ArrowLeft size={14} />
          {ui.back}
        </Link>
      </header>

      {phase === 'intro' && (
        <main className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-xl flex-col items-center justify-center px-4 pb-16 text-center">
          <p className="grammar-stage-kicker inline-flex items-center gap-2 rounded-full border border-[#00AEEF]/40 bg-[#00AEEF]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#00AEEF]">
            <Sparkles size={14} />
            {ui.free}
          </p>
          <h1 className="grammar-stage-title mt-5 text-[28px] font-extrabold leading-tight tracking-tight sm:text-[40px]">{pack.quizTitle}</h1>
          <p className="mt-4 text-[15px] leading-[1.8] text-white/70">{pack.quizLead}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-extrabold uppercase tracking-wide text-white/80">
            <span className="rounded-full bg-white/10 px-4 py-2">15 preguntas</span>
            <span className="rounded-full bg-white/10 px-4 py-2">10:00</span>
            <span className="rounded-full bg-white/10 px-4 py-2">A · B · C</span>
          </div>
          <button
            type="button"
            onClick={begin}
            className="grammar-stage-cta fl-cta-glow mt-8 inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
          >
            {ui.start}
            <ArrowRight size={16} />
          </button>
        </main>
      )}

      {phase === 'play' && item && (
        <main className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-16 pt-4 sm:px-6">
          <div className={`grammar-quiz-timer flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur ${urgent ? 'is-urgent' : ''}`}>
            <p className="inline-flex items-center gap-2 text-sm font-extrabold">
              <Clock size={16} className="text-[#00AEEF]" />
              {ui.time}: {mm}:{ss}
            </p>
            <div className="h-2 min-w-32 flex-1 overflow-hidden rounded-full bg-white/15">
              <span className="grammar-quiz-bar block h-full rounded-full bg-[#00AEEF]" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#00AEEF]">
              {ui.of.replace('{n}', String(index + 1)).replace('{total}', String(items.length))}
            </p>
          </div>

          <article key={item.q} className="grammar-stage-card mt-6 rounded-3xl border border-white/10 bg-[#122033]/90 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{pack.quizKicker}</p>
            <h2 className="mt-3 text-xl font-extrabold leading-snug sm:text-2xl">
              {index + 1}. {item.q}
            </h2>
            <div className="mt-6 grid gap-3">
              {item.options.slice(0, 3).map((option, oi) => {
                const active = picked[index] === oi
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choose(oi)}
                    className={`grammar-stage-option flex items-center gap-3 rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                      active
                        ? 'border-[#00AEEF] bg-[#00AEEF] text-[#0D1B2E] shadow-[0_0_0_6px_rgba(0,174,239,0.18)]'
                        : 'border-white/15 bg-white/5 hover:border-[#00AEEF]/70 hover:bg-white/10'
                    }`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${active ? 'bg-[#0D1B2E] text-[#00AEEF]' : 'bg-white/10 text-[#00AEEF]'}`}>
                      {LETTERS[oi]}
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-white/50">{picked[index] < 0 ? ui.pending : `${LETTERS[picked[index]]} · ${item.options[picked[index]]}`}</p>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E]"
              >
                {last ? ui.finish : ui.next}
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        </main>
      )}

      {phase === 'done' && (
        <main className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-xl flex-col items-center justify-center px-4 pb-16 text-center">
          <div className="grammar-stage-confetti" aria-hidden>
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className="grammar-stage-piece" style={{ '--i': i } as never} />
            ))}
          </div>
          <div className="grammar-stage-win relative rounded-3xl border border-[#00AEEF]/30 bg-[#122033]/95 px-6 py-10 shadow-[0_0_80px_rgba(0,174,239,0.28)] sm:px-10">
            <CheckCircle2 className="grammar-stage-check mx-auto text-[#00AEEF]" size={64} />
            <h1 className="mt-5 text-[26px] font-extrabold leading-tight tracking-tight sm:text-[34px]">{ui.winTitle}</h1>
            <p className="mt-3 text-[15px] leading-[1.8] text-white/75">{ui.winLead}</p>
            {expired && <p className="mt-2 text-sm text-[#FB923C]">{ui.expired}</p>}
            <p className="mt-5 text-lg font-extrabold text-[#00AEEF]">{ui.score.replace('{score}', String(score)).replace('{total}', String(items.length))}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={begin} className="rounded-full bg-[#00AEEF] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E]">
                {ui.retry}
              </button>
              <Link to="/register" className="rounded-full border border-white/30 px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white">
                {ui.register}
              </Link>
              <Link to={guide} className="rounded-full px-6 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white/70">
                {ui.back}
              </Link>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export function GrammarQuizLaunch({
  to,
  kicker,
  title,
  lead,
  cta,
}: {
  to: string
  kicker: string
  title: string
  lead: string
  cta: string
}) {
  return (
    <div className="grammar-stage-launch relative overflow-hidden rounded-3xl bg-[#0D1B2E] px-6 py-10 text-center text-white sm:px-10">
      <div className="grammar-stage-orb grammar-stage-orb-a !h-40 !w-40" />
      <div className="grammar-stage-orb grammar-stage-orb-b !right-0 !h-32 !w-32" />
      <p className="relative text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{kicker}</p>
      <h2 className="relative mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      <p className="relative mx-auto mt-4 max-w-lg text-[15px] leading-[1.8] text-white/70">{lead}</p>
      <div className="relative mt-5 flex flex-wrap justify-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-white/70">
        <span className="rounded-full bg-white/10 px-3 py-1">15 preguntas</span>
        <span className="rounded-full bg-white/10 px-3 py-1">10:00</span>
        <span className="rounded-full bg-white/10 px-3 py-1">A · B · C</span>
      </div>
      <Link
        to={to}
        className="grammar-stage-cta fl-cta-glow relative mt-7 inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-8 py-3 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E]"
      >
        {cta}
        <ArrowRight size={14} />
      </Link>
    </div>
  )
}
