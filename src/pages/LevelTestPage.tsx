import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from 'react'
import {
  Accessibility,
  BookOpen,
  Bot,
  CheckCircle2,
  Clapperboard,
  Gamepad2,
  GraduationCap,
  Headphones,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  Mic,
  Music,
  PenLine,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { FLUIDLEARN_TEST_LINKS, LEVEL_TEST_SECONDS, scoreLevelTest } from '../data/levelTest'
import type { LevelTestSpec } from '../data/levelTestSpecs'
import { useLandingReveal } from '../hooks/useLandingReveal'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

const EVAL_ICONS: Record<string, LucideIcon> = {
  Listening: Headphones,
  Reading: BookOpen,
  Writing: PenLine,
  Speaking: Mic,
  'Gramática y vocabulario': ListChecks,
}

const TIP_ICONS: Record<string, LucideIcon> = {
  'Aprende con imágenes': ImageIcon,
  'Practica con otras personas': Users,
  'Aprende jugando': Gamepad2,
  'Escucha música en inglés': Music,
  'Mira contenido audiovisual': Clapperboard,
  'Mira series y películas en inglés': Clapperboard,
  'Aprende mediante la música': Music,
  'Conversa con otras personas': Users,
  'Utiliza FluidLearn diariamente': Sparkles,
  'Aprende de forma interactiva': Gamepad2,
  'Consume contenido en inglés': Clapperboard,
  'Lee con frecuencia': BookOpen,
  'Habla sin miedo': Mic,
  'Escucha podcasts': Headphones,
  'Practica diariamente': Sparkles,
  'Lee contenido auténtico': BookOpen,
  'Mira contenido en versión original': Clapperboard,
  'Escucha podcasts y conferencias': Headphones,
  'Escribe con frecuencia': PenLine,
  'Habla constantemente': Mic,
}

const METHOD_ICONS: Record<string, LucideIcon> = {
  'Inteligencia Artificial Educativa': Bot,
  'Profesores conectados': GraduationCap,
  'Microlearning inteligente': Sparkles,
  'Dashboard de progreso': LayoutDashboard,
  'Accesibilidad para todos': Accessibility,
}

function formatClock(totalSeconds: number) {
  const s = Math.max(0, totalSeconds)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

export function LevelTestPage({ spec }: { spec: LevelTestSpec }) {
  const { questions } = spec
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState<Array<number | null>>(() => questions.map(() => null))
  const [secondsLeft, setSecondsLeft] = useState(LEVEL_TEST_SECONDS)
  const [result, setResult] = useState<ReturnType<typeof scoreLevelTest> | null>(null)
  const [timedOut, setTimedOut] = useState(false)
  const finishRef = useRef<(fromTimeout?: boolean) => void>(() => {})
  const heroRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const whyHasTitles = spec.whyItems.some((item) => item.title)

  useLandingReveal([lang, spec.slug])

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('legal-page')
    document.body.style.backgroundColor = '#0D1B2E'
    window.scrollTo(0, 0)
    setOpen(false)
    setResult(null)
    setAnswers(questions.map(() => null))
    return () => {
      root.classList.remove('legal-page')
      document.body.style.backgroundColor = ''
    }
  }, [questions, spec.slug])

  useEffect(() => {
    document.documentElement.lang = htmlLangFor(lang)
    saveLandingLang(lang)
  }, [lang])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 520)
        el.style.setProperty('--scroll-zoom', String(1 + y / 1200))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [spec.slug])

  const finish = useCallback(
    (fromTimeout = false) => {
      setResult(scoreLevelTest(questions, answers, spec.passLabel, spec.failLabel))
      setTimedOut(fromTimeout)
    },
    [answers, questions, spec.failLabel, spec.passLabel],
  )

  finishRef.current = finish

  useEffect(() => {
    if (!open || result) return
    const started = Date.now()
    const id = window.setInterval(() => {
      const left = Math.max(0, LEVEL_TEST_SECONDS - Math.floor((Date.now() - started) / 1000))
      setSecondsLeft(left)
      if (left <= 0) {
        window.clearInterval(id)
        finishRef.current(true)
      }
    }, 250)
    return () => window.clearInterval(id)
  }, [open, result])

  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [open])

  function changeLanguage(next: LandingLangCode) {
    if (next === lang || langLoading) return
    setLangLoading(true)
    window.setTimeout(() => {
      setLang(next)
      window.setTimeout(() => setLangLoading(false), 280)
    }, 400)
  }

  function startTest() {
    setAnswers(questions.map(() => null))
    setSecondsLeft(LEVEL_TEST_SECONDS)
    setResult(null)
    setTimedOut(false)
    setOpen(true)
  }

  function closeTest() {
    setOpen(false)
    setResult(null)
    setTimedOut(false)
  }

  function pick(qi: number, oi: number) {
    if (result) return
    setAnswers((prev) => {
      const next = [...prev]
      next[qi] = oi
      return next
    })
  }

  function submitForm(e: FormEvent) {
    e.preventDefault()
    if (result) return
    finish(false)
  }

  const unanswered = answers.filter((a) => a === null).length
  const clockUrgent = secondsLeft <= 20

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

      <section className="grid min-h-[min(32rem,70svh)] overflow-hidden bg-[#0D1B2E] lg:grid-cols-2" aria-labelledby="level-hero-title">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <p
            className="landing-reveal text-xs font-bold uppercase tracking-[0.2em] text-cyan"
            data-reveal
            style={{ '--reveal-delay': '40ms' } as CSSProperties}
          >
            {spec.heroKicker}
          </p>
          <LetterReveal
            key={`${spec.slug}-hero-${lang}`}
            as="h1"
            id="level-hero-title"
            text={spec.heroTitle}
            whenVisible
            startDelayMs={80}
            charMs={24}
            className="mt-3 max-w-[14ch] text-3xl font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl"
          />
          <p
            className="landing-reveal mt-5 max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
            data-reveal
            style={{ '--reveal-delay': '220ms' } as CSSProperties}
          >
            {spec.heroLead}
          </p>
          <button
            type="button"
            onClick={startTest}
            className="landing-reveal mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#00AEEF] px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] shadow-lg transition hover:bg-[#33c0f5]"
            data-reveal
            style={{ '--reveal-delay': '360ms' } as CSSProperties}
          >
            {spec.heroCta}
          </button>
        </div>
        <div className="relative min-h-56 overflow-hidden lg:min-h-full">
          <div ref={heroRef} className="a1-tower-frame">
            <img src={spec.heroImage} alt="" className="a1-tower-img grayscale" />
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <div>
            <A1Title text={spec.introTitle} />
            {spec.introParas.map((para, i) => (
              <p
                key={para.slice(0, 40)}
                className="landing-reveal mt-5 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1] sm:text-base"
                data-reveal
                style={{ '--reveal-delay': `${80 + i * 100}ms` } as CSSProperties}
              >
                {para}
              </p>
            ))}
          </div>
          <A1MotionCard
            as="aside"
            reveal="self"
            className="mt-10 rounded-2xl bg-[#0D1B2E] p-6 text-white shadow-xl lg:mt-0"
            style={{ '--reveal-delay': '220ms' } as CSSProperties}
          >
            <p className="text-sm font-bold uppercase tracking-wide text-cyan">{spec.sideTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{spec.sideText}</p>
            <button
              type="button"
              onClick={startTest}
              className="mt-5 w-full rounded-full bg-[#FF6B2C] py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
            >
              Comenzar test de nivel
            </button>
          </A1MotionCard>
        </section>

        <section className="bg-[#F7F9FC] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text={spec.whyTitle} />
            <p
              className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as CSSProperties}
            >
              {spec.whyLead}
            </p>
            {whyHasTitles ? (
              <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
                {spec.whyItems.map((item, i) => (
                  <A1MotionCard
                    key={item.title ?? item.text}
                    as="article"
                    className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1A2438]"
                    style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                  >
                    <CheckCircle2 className="text-[#FF6B2C]" size={22} aria-hidden />
                    <h3 className="mt-3 text-lg font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.text}</p>
                  </A1MotionCard>
                ))}
              </div>
            ) : (
              <ul className="landing-reveal-group mt-8 grid gap-3 perspective-[1100px] sm:grid-cols-2" data-reveal>
                {spec.whyItems.map((item, i) => (
                  <A1MotionCard
                    key={item.text}
                    as="li"
                    className="flex gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-[#1A2438]"
                    style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#FF6B2C]" size={20} aria-hidden />
                    <span className="text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">{item.text}</span>
                  </A1MotionCard>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <A1Title text={spec.evalTitle} />
          <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {spec.evalItems.map((item, i) => {
              const Icon = EVAL_ICONS[item.title] ?? ListChecks
              return (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 100}ms` } as CSSProperties}
                >
                  <Icon className="text-[#00AEEF]" size={26} aria-hidden />
                  <h3 className="mt-3 text-lg font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.text}</p>
                </A1MotionCard>
              )
            })}
          </div>
        </section>

        {spec.topics && spec.topics.length > 0 && (
          <section className="bg-[#F7F9FC] py-14 dark:bg-[#121C2E] sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <A1Title text={spec.topicsTitle ?? 'Temas esenciales'} />
              <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
                {spec.topics.map((topic, i) => (
                  <A1MotionCard
                    key={topic.title}
                    as="article"
                    className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1A2438]"
                    style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                  >
                    <h3 className="text-lg font-extrabold text-[#00AEEF]">{topic.title}</h3>
                    {topic.text && (
                      <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{topic.text}</p>
                    )}
                    {topic.items && topic.items.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {topic.items.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00AEEF]" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </A1MotionCard>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-[#E8EEF8] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <A1Title text={spec.readyTitle} />
            <p
              className="landing-reveal mt-4 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as CSSProperties}
            >
              {spec.readyLead}
            </p>
            <ul className="landing-reveal-group mt-6 space-y-3" data-reveal>
              {spec.readyItems.map((item, i) => (
                <li
                  key={item}
                  data-reveal-child
                  className="flex gap-3 text-[15px] leading-relaxed text-[#334155] dark:text-[#CBD5E1]"
                  style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#FF6B2C]" size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#0D1B2E] px-4 py-10 text-center sm:py-12">
          <LetterReveal
            as="h2"
            text={spec.midCtaTitle}
            whenVisible
            charMs={22}
            className="text-xl font-extrabold text-white sm:text-2xl"
          />
          <button
            type="button"
            onClick={startTest}
            className="landing-reveal mt-6 inline-flex items-center justify-center rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]"
            data-reveal
            style={{ '--reveal-delay': '160ms' } as CSSProperties}
          >
            {spec.midCta}
          </button>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <A1Title text={spec.afterTitle} />
          <div className="landing-reveal-group mt-8 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {spec.afterItems.map((item, i) => (
              <A1MotionCard
                key={item}
                as="p"
                className="flex gap-3 rounded-xl bg-[#F7F9FC] p-4 text-sm dark:bg-[#1A2438]"
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <CheckCircle2 className="shrink-0 text-[#00AEEF]" size={18} aria-hidden />
                {item}
              </A1MotionCard>
            ))}
          </div>
        </section>

        <section className="bg-[#F7F9FC] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text={spec.tipsTitle} />
            <div className="landing-reveal-group mt-8 grid gap-5 perspective-[1100px] sm:grid-cols-2" data-reveal>
              {spec.tips.map((item, i) => {
                const Icon = TIP_ICONS[item.title] ?? Sparkles
                return (
                  <A1MotionCard
                    key={item.title}
                    as="article"
                    className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1A2438]"
                    style={{ '--reveal-delay': `${i * 100}ms` } as CSSProperties}
                  >
                    <h3 className="flex items-center gap-2 text-lg font-extrabold text-[#00AEEF]">
                      <Icon size={20} aria-hidden />
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.text}</p>
                  </A1MotionCard>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <A1Title text={spec.methodTitle} />
          <div className="landing-reveal-group mt-8 grid gap-5 perspective-[1100px] sm:grid-cols-2" data-reveal>
            {spec.methodItems.map((item, i) => {
              const Icon = METHOD_ICONS[item.title] ?? Bot
              return (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl bg-[#0D1B2E] p-5 text-white"
                  style={{ '--reveal-delay': `${i * 100}ms` } as CSSProperties}
                >
                  <Icon className="text-cyan" size={24} aria-hidden />
                  <h3 className="mt-3 font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.text}</p>
                </A1MotionCard>
              )
            })}
          </div>
        </section>

        <section className="bg-[#E8EEF8] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <A1Title text={spec.schoolsTitle} />
            <p
              className="landing-reveal mt-4 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as CSSProperties}
            >
              {spec.schoolsBody}
            </p>
            {spec.schoolsItems && spec.schoolsItems.length > 0 && (
              <ul className="landing-reveal-group mt-6 space-y-3" data-reveal>
                {spec.schoolsItems.map((item, i) => (
                  <li
                    key={item}
                    data-reveal-child
                    className="flex gap-3 text-[15px] leading-relaxed text-[#334155] dark:text-[#CBD5E1]"
                    style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#FF6B2C]" size={18} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="px-4 py-16 text-center sm:py-20">
          <A1Title
            text={spec.ctaTitle}
            className="mx-auto max-w-3xl text-center text-2xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
          />
          <p
            className="landing-reveal mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
            data-reveal
            style={{ '--reveal-delay': '100ms' } as CSSProperties}
          >
            {spec.ctaLead}
          </p>
          <button
            type="button"
            onClick={startTest}
            className="landing-reveal mt-8 inline-flex items-center justify-center rounded-full bg-[#00AEEF] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]"
            data-reveal
            style={{ '--reveal-delay': '220ms' } as CSSProperties}
          >
            {spec.ctaButton}
          </button>
        </section>

        <section
          className="border-t border-slate-100 px-4 py-14 dark:border-[#2A3650] sm:py-16"
          aria-label={spec.moreTestsTitle}
        >
          <A1Title
            text={spec.moreTestsTitle}
            className="mx-auto max-w-4xl text-center text-xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-2xl"
          />
          <div
            className="landing-reveal-group mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4"
            data-reveal
          >
            {FLUIDLEARN_TEST_LINKS.map((col, ci) => (
              <ul
                key={col[0].label}
                data-reveal-child
                className="space-y-3 text-center sm:text-left"
                style={{ '--reveal-delay': `${ci * 90}ms` } as CSSProperties}
              >
                {col.map((item) => {
                  const active = item.to && location.pathname.endsWith(item.to)
                  return (
                    <li key={item.label}>
                      {item.to ? (
                        <Link
                          to={item.to}
                          className={`text-sm font-medium underline-offset-2 transition hover:underline ${
                            active ? 'text-[#00AEEF]' : 'text-[#475569] hover:text-[#0D1B2E] dark:text-[#94A3B8] dark:hover:text-white'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">{item.label}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            ))}
          </div>
        </section>
      </main>

      <LandingFooter lang={lang} />

      {open && (
        <div className="fixed inset-0 z-70 flex items-end justify-center bg-[#0D1B2E]/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="level-test-title"
            className="a1-test-dialog flex max-h-svh w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl dark:bg-[#0F1728] sm:max-h-[90svh] sm:rounded-2xl"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 bg-[#0D1B2E] px-4 py-3 text-white sm:px-6">
              <div>
                <p id="level-test-title" className="text-sm font-extrabold uppercase tracking-wide">
                  Test de nivel {spec.slug.toUpperCase()}
                </p>
                <p className="text-xs text-white/70">Selecciona la respuesta correcta</p>
              </div>
              <div className="flex items-center gap-3">
                {!result && (
                  <p
                    className={`rounded-full px-3 py-1 font-mono text-lg font-extrabold tabular-nums ${
                      clockUrgent ? 'bg-[#FF6B2C] text-white' : 'bg-cyan text-[#0D1B2E]'
                    }`}
                    aria-live="polite"
                  >
                    {formatClock(secondsLeft)}
                  </p>
                )}
                <button
                  type="button"
                  onClick={closeTest}
                  className="rounded-lg px-2 py-1 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Cerrar
                </button>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              {result ? (
                <div className="py-6 text-center">
                  <p className="text-sm font-bold uppercase tracking-wide text-[#00AEEF]">Resultado inmediato</p>
                  {timedOut && (
                    <p className="mt-2 text-sm text-[#FF6B2C]">El tiempo de 1:30 se agotó. Guardamos tus respuestas.</p>
                  )}
                  <p className="mt-4 text-4xl font-extrabold text-[#0D1B2E] dark:text-white">{result.percent}%</p>
                  <p className="mt-2 text-lg font-bold text-[#0D1B2E] dark:text-white">{result.levelLabel}</p>
                  <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                    {result.correct} de {result.total} correctas
                  </p>
                  <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
                    {result.passed ? spec.passedMsg : spec.failMsg}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={startTest}
                      className="rounded-full bg-[#FF6B2C] px-6 py-2.5 text-sm font-extrabold uppercase text-white"
                    >
                      Repetir test
                    </button>
                    <button
                      type="button"
                      onClick={closeTest}
                      className="rounded-full border-2 border-[#0D1B2E] px-6 py-2.5 text-sm font-bold text-[#0D1B2E] dark:border-white dark:text-white"
                    >
                      Volver a la página
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitForm} className="space-y-6">
                  {questions.map((q, qi) => (
                    <fieldset
                      key={q.id}
                      className="rounded-2xl border border-slate-200 p-4 dark:border-[#2A3650] sm:p-5"
                    >
                      <legend className="px-1 text-sm font-extrabold text-[#0D1B2E] dark:text-white">
                        {q.id}. {q.prompt}
                      </legend>
                      {q.reading && (
                        <blockquote className="mt-3 rounded-xl bg-[#E8EEF8] px-4 py-3 text-sm italic text-[#0D1B2E] dark:bg-[#1A2438] dark:text-[#E8EEF8]">
                          “{q.reading}”
                        </blockquote>
                      )}
                      {q.stem && (
                        <p className="mt-3 text-base font-semibold text-[#0D1B2E] dark:text-cyan">{q.stem}</p>
                      )}
                      <div className="mt-3 grid gap-2">
                        {q.options.map((opt, oi) => {
                          const selected = answers[qi] === oi
                          const inputId = `${spec.slug}-q${q.id}-${oi}`
                          return (
                            <label
                              key={opt}
                              htmlFor={inputId}
                              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                                selected
                                  ? 'border-[#00AEEF] bg-[#00AEEF]/10 dark:bg-[#00AEEF]/15'
                                  : 'border-slate-200 hover:border-[#00AEEF]/60 dark:border-[#2A3650]'
                              }`}
                            >
                              <input
                                id={inputId}
                                type="radio"
                                name={`q-${q.id}`}
                                className="mt-0.5 accent-[#00AEEF]"
                                checked={selected}
                                onChange={() => pick(qi, oi)}
                              />
                              <span>
                                <span className="font-extrabold text-[#00AEEF]">{OPTION_LETTERS[oi]}) </span>
                                {opt}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </fieldset>
                  ))}
                  <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-4 py-3 dark:border-[#2A3650] dark:bg-[#0F1728]/95 sm:-mx-6 sm:px-6">
                    <p className="text-xs text-[#64748B]">
                      {unanswered === 0 ? 'Listo para enviar.' : `${unanswered} sin responder`}
                    </p>
                    <button
                      type="submit"
                      className="rounded-full bg-[#FF6B2C] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
                    >
                      Enviar test
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function A1MotionCard({
  as: Tag,
  className,
  style,
  children,
  reveal = 'child',
}: {
  as: 'li' | 'article' | 'p' | 'aside'
  className?: string
  style?: CSSProperties
  children: ReactNode
  reveal?: 'child' | 'self'
}) {
  const ref = useRef<HTMLElement>(null)

  function moveTo(clientX: number, clientY: number) {
    const el = ref.current
    if (!el) return
    const box = el.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (clientX - box.left) / box.width))
    const y = Math.min(1, Math.max(0, (clientY - box.top) / box.height))
    el.style.setProperty('--rx', `${((0.5 - y) * 13).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${((x - 0.5) * 16).toFixed(2)}deg`)
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    el.classList.add('is-tilting')
  }

  function reset() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.classList.remove('is-tilting')
  }

  return (
    <Tag
      ref={ref as never}
      className={`a1-motion-card relative overflow-hidden ${reveal === 'self' ? 'landing-reveal' : ''} ${className ?? ''}`}
      {...(reveal === 'self' ? { 'data-reveal': '' } : { 'data-reveal-child': '' })}
      style={style}
      onMouseMove={(e) => moveTo(e.clientX, e.clientY)}
      onMouseLeave={reset}
      onTouchStart={(e) => {
        const t = e.touches[0]
        if (t) moveTo(t.clientX, t.clientY)
      }}
      onTouchMove={(e) => {
        const t = e.touches[0]
        if (t) moveTo(t.clientX, t.clientY)
      }}
      onTouchEnd={reset}
      onTouchCancel={reset}
    >
      <span className="landing-plan-shine" aria-hidden />
      {children}
    </Tag>
  )
}

export function A1Title({ text, className }: { text: string; className?: string }) {
  return (
    <LetterReveal
      key={text}
      as="h2"
      text={text}
      whenVisible
      charMs={22}
      className={
        className ??
        'text-2xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl'
      }
    />
  )
}
