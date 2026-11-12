import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  Mic,
  MonitorSmartphone,
  PenLine,
  Sparkles,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { getEnglishLevelsCopy } from '../lib/englishLevelsI18n'
import { A1MotionCard, A1Title } from './LevelTestPage'

const MCER_ROWS = [
  { band: 'Proficient', code: 'C2', ielts: '8.5-9', aptis: 'Adv', cambridge: 'CPE', toefl: '115-120' },
  { band: '', code: 'C1', ielts: '7-8', aptis: 'Adv', cambridge: 'CAE', toefl: '94-104' },
  { band: 'Independent', code: 'B2', ielts: '5.5-6.5', aptis: 'Cen', cambridge: 'FCE', toefl: '46-93' },
  { band: '', code: 'B1', ielts: '4-5', aptis: 'Cen', cambridge: 'PET', toefl: '34-45' },
  { band: 'Basic', code: 'A2', ielts: '3.5', aptis: 'Cen', cambridge: 'KET', toefl: '34' },
  { band: '', code: 'A1', ielts: '—', aptis: '—', cambridge: '—', toefl: '—' },
] as const

export function EnglishLevelsPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const [openId, setOpenId] = useState<string | null>('a1')
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getEnglishLevelsCopy(lang), [lang])

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

      <section className="relative overflow-hidden bg-[#E8EEF8] py-14 text-center dark:bg-[#121C2E] sm:py-16">
        <span className="pointer-events-none absolute left-[12%] top-8 text-2xl text-[#00AEEF]/70" aria-hidden>
          +
        </span>
        <span className="pointer-events-none absolute right-[18%] top-10 h-2.5 w-2.5 rounded-sm bg-[#00AEEF]" aria-hidden />
        <span className="pointer-events-none absolute bottom-8 left-[22%] h-2 w-2 rounded-full bg-[#0D1B2E]/20 dark:bg-white/30" aria-hidden />
        <span className="pointer-events-none absolute right-[28%] bottom-10 h-2 w-2 rotate-45 bg-[#FF6B2C]" aria-hidden />
        <LetterReveal
          as="h1"
          text={copy.heroTitle}
          whenVisible
          charMs={18}
          className="mx-auto max-w-xl text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
        />
        <Link
          to="/register"
          className="landing-reveal mt-6 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]"
          data-reveal
        >
          {copy.heroCta}
        </Link>
      </section>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
          <div>
            <A1Title text={copy.pageTitle} />
            <p
              className="landing-reveal mt-5 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
            >
              {copy.intro[0]}
            </p>
            <p
              className="landing-reveal mt-4 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
              style={{ '--reveal-delay': '100ms' } as CSSProperties}
            >
              {copy.intro[1]}
            </p>
          </div>
          <div
            className="landing-reveal mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-[#2A3650] dark:bg-[#1A2438] lg:mt-0"
            data-reveal
          >
            <table className="w-full min-w-136 border-collapse text-center text-[11px] sm:text-xs">
              <thead>
                <tr className="text-[#64748B]">
                  {copy.tableHeaders.map((header) => (
                    <th key={header} className="px-1 py-2 font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MCER_ROWS.map((row) => (
                  <tr key={row.code} className="border-t border-slate-100 dark:border-[#2A3650]">
                    <td className="px-1 py-2.5 text-left text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                      {row.band}
                    </td>
                    <td className="px-1 py-2.5">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#00AEEF] text-xs font-extrabold text-[#0D1B2E]">
                        {row.code}
                      </span>
                    </td>
                    <td className="px-1 py-2.5 font-extrabold text-[#0D1B2E] dark:text-white">{row.code}</td>
                    <td className="px-1 py-2.5 text-[#475569] dark:text-[#94A3B8]">{row.ielts}</td>
                    <td className="px-1 py-2.5 text-[#475569] dark:text-[#94A3B8]">{row.aptis}</td>
                    <td className="px-1 py-2.5 text-[#475569] dark:text-[#94A3B8]">{row.cambridge}</td>
                    <td className="px-1 py-2.5 text-[#475569] dark:text-[#94A3B8]">{row.toefl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <h2 className="text-lg font-extrabold text-[#0D1B2E] dark:text-white">{copy.interestTitle}</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {copy.interestLinks.map((item) => (
              <Link key={item.label} to={item.to} className="text-sm text-[#00AEEF] hover:underline">
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-100 px-4 py-14 dark:border-[#2A3650] sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <A1Title
              text={copy.sectionTitle}
              className="text-3xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-4xl"
            />
            <p
              className="landing-reveal mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
            >
              {copy.sectionIntro}
            </p>
            <Link
              to="/register"
              className="landing-reveal mt-6 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
              data-reveal
            >
              {copy.register}
            </Link>
            <div className="landing-reveal mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-[#0D1B2E] dark:text-white" data-reveal>
              {copy.benefits.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#00AEEF]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <p className="landing-reveal mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]" data-reveal>
            {copy.summary}
          </p>

          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {copy.levels.map((level) => {
              const open = openId === level.id
              return (
                <article
                  key={level.id}
                  id={level.id}
                  className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-[#2A3650] dark:bg-[#1A2438]"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : level.id)}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-3xl font-black tracking-tight text-[#0D1B2E] dark:text-white sm:text-4xl">
                        {level.code}
                      </span>
                      <span className="text-sm font-semibold text-[#00AEEF]">{level.label}</span>
                    </span>
                    <ChevronDown
                      className={`shrink-0 text-[#00AEEF] transition ${open ? 'rotate-180' : ''}`}
                      size={22}
                    />
                  </button>
                  {open && (
                    <div className="border-t border-slate-100 px-5 py-5 dark:border-[#2A3650]">
                      <h3 className="font-extrabold text-[#0D1B2E] dark:text-white">{level.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{level.lead}</p>
                      <ul className="mt-4 space-y-2">
                        {level.can.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#FF6B2C]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm font-bold text-[#0D1B2E] dark:text-white">{copy.developedSkills}</p>
                      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                        {level.skills.map((item) => (
                          <li key={item} className="text-sm text-[#475569] dark:text-[#94A3B8]">
                            · {item}
                          </li>
                        ))}
                      </ul>
                      {'to' in level && level.to && (
                        <Link
                          to={level.to}
                          className="mt-5 inline-flex rounded-full bg-[#0D1B2E] px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-white"
                        >
                          {copy.takeTest.replace('{level}', level.code)}
                        </Link>
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <section className="bg-[#F7F9FC] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text={copy.helpTitle} />
            <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-4" data-reveal>
              {copy.helpCards.map((item, i) => {
                const Icon = [MonitorSmartphone, Bot, Mic, GraduationCap][i]
                return (
                  <A1MotionCard
                    key={item.title}
                    as="article"
                    className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1A2438]"
                    style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                  >
                    <Icon className="text-[#00AEEF]" size={26} />
                    <h3 className="mt-3 font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.text}</p>
                  </A1MotionCard>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#E8F7FC] py-16 dark:bg-[#102033]">
          <div className="fl-diamond fl-diamond--left-outer" aria-hidden />
          <div className="fl-diamond fl-diamond--left-inner" aria-hidden />
          <div className="fl-diamond fl-diamond--right-outer" aria-hidden />
          <div className="fl-diamond fl-diamond--right-inner" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00AEEF]">{copy.continueKicker}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#0D1B2E] dark:text-white sm:text-3xl">
              {copy.continueTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#475569] dark:text-[#94A3B8]">
              {copy.continueText}
            </p>
            <div className="landing-reveal-group mt-10 grid gap-8 sm:grid-cols-3" data-reveal>
              {copy.continueCards.map((item, i) => {
                const Icon = [BookOpen, Users, PenLine][i]
                return (
                  <div key={item.title} data-reveal-child style={{ '--reveal-delay': `${i * 100}ms` } as CSSProperties}>
                    <span className={`fl-continue-icon fl-continue-icon--${i + 1} mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-sm dark:bg-[#1A2438]`}>
                      <Icon className="text-[#00AEEF]" size={26} />
                    </span>
                    <h3 className="mt-3 font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">{item.text}</p>
                  </div>
                )
              })}
            </div>
            <Link
              to="/register"
              className="fl-cta-glow mt-10 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
            >
              {copy.register}
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <A1Title text={copy.whyTitle} />
          <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2" data-reveal>
            {copy.whyCards.map((item, i) => {
              const Icon = [Bot, GraduationCap, Sparkles, LayoutDashboard][i]
              return (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl bg-[#0D1B2E] p-5 text-white"
                  style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                >
                  <Icon className="text-cyan" size={22} />
                  <h3 className="mt-3 font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.text}</p>
                </A1MotionCard>
              )
            })}
          </div>
        </section>

        <section className="px-4 py-16 text-center sm:py-20">
          <A1Title
            text={copy.journeyTitle}
            className="mx-auto max-w-3xl text-center text-2xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
          />
          <p className="landing-reveal mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]" data-reveal>
            {copy.journeyText}
          </p>
          <Link
            to="/test"
            className="landing-reveal mt-8 inline-flex rounded-full bg-[#00AEEF] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
            data-reveal
          >
            {copy.testCta}
          </Link>
        </section>
      </main>

      <LandingFooter lang={lang} />
    </div>
  )
}
