import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { BookOpen, CheckCircle2, PenLine, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import { getTipsCopy } from '../lib/tipsI18n'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { A1Title } from './LevelTestPage'

const MCER_ROWS = [
  { band: 'Proficient', code: 'C2', ielts: '8.5-9', aptis: 'Adv', cambridge: 'CPE', toefl: '115-120' },
  { band: '', code: 'C1', ielts: '7-8', aptis: 'Adv', cambridge: 'CAE', toefl: '94-104' },
  { band: 'Independent', code: 'B2', ielts: '5.5-6.5', aptis: 'Cen', cambridge: 'FCE', toefl: '46-93' },
  { band: '', code: 'B1', ielts: '4-5', aptis: 'Cen', cambridge: 'PET', toefl: '34-45' },
  { band: 'Basic', code: 'A2', ielts: '3.5', aptis: 'Cen', cambridge: 'KET', toefl: '34' },
  { band: '', code: 'A1', ielts: '—', aptis: '—', cambridge: '—', toefl: '—' },
] as const

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center text-[22px] font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-[28px]">
      {children}
    </h2>
  )
}

export function LearningTipsPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getTipsCopy(lang), [lang])

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

      <section className="relative overflow-hidden bg-white py-14 text-center dark:bg-[#0F1728] sm:py-16">
        <LetterReveal
          as="h1"
          text={copy.heroTitle}
          whenVisible
          charMs={18}
          className="mx-auto max-w-xl text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-4xl"
        />
        <p className="landing-reveal mx-auto mt-4 max-w-2xl px-4 text-sm leading-relaxed text-[#64748B] dark:text-[#94A3B8]" data-reveal>
          {copy.heroLead}
        </p>
        <Link
          to="/register"
          className="landing-reveal mt-6 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]"
          data-reveal
        >
          {copy.startCta}
        </Link>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 px-4 text-sm">
          {copy.featured.map((item) => (
            <Link key={item.to} to={item.to} className="inline-flex items-center gap-1.5 font-medium text-[#00AEEF] hover:underline">
              <CheckCircle2 size={16} />
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-3xl px-6 py-10">
          {copy.intro.map((p) => (
            <p key={p} className="mt-4 text-[15px] leading-[1.85] text-[#475569] first:mt-0 dark:text-[#94A3B8]">
              {p}
            </p>
          ))}
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-16">
          <h2 className="text-xl font-extrabold text-[#0D1B2E] dark:text-white sm:text-2xl">{copy.tipsTitle}</h2>
          <p className="mt-3 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">{copy.tipsLead}</p>
          <ol className="mt-8 space-y-7">
            {copy.tips.map((item, i) => (
              <li key={item.title}>
                <h3 className="text-[16px] font-extrabold text-[#0D1B2E] dark:text-white">
                  {i + 1}. {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.8] text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0D1B2E] dark:text-white">{copy.levelTitle}</h2>
              {copy.levelLead.map((p) => (
                <p key={p} className="mt-4 text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]">
                  {p}
                </p>
              ))}
              <Link
                to="/test"
                className="mt-6 inline-flex rounded-full bg-[#00AEEF] px-7 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0D1B2E]"
              >
                {copy.levelCta}
              </Link>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-[#2A3650] dark:bg-[#1A2438]">
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
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-extrabold text-[#0D1B2E] dark:text-white">{copy.resourcesTitle}</h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">{copy.resourcesLead}</p>
            <div className="mt-8 space-y-6">
              {copy.resources.map((item) => (
                <article key={item.title}>
                  <h3 className="font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.8] text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <Heading>{copy.futureTitle}</Heading>
            <p className="mx-auto mt-5 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">
              {copy.futureLead}
            </p>
            <ul className="mx-auto mt-8 grid max-w-2xl gap-2 sm:grid-cols-2">
              {copy.futureItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-extrabold text-[#0D1B2E] dark:text-white">{copy.instTitle}</h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.instLead}</p>
              <ul className="mt-5 space-y-2">
                {copy.instItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#0D1B2E] dark:text-white">{copy.accessTitle}</h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.accessLead}</p>
              <ul className="mt-5 space-y-2">
                {copy.accessItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-14 dark:bg-[#121C2E]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-lg font-extrabold text-[#0D1B2E] dark:text-white">{copy.interestTitle}</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {copy.interestLinks.map((item) => (
                <Link key={item.label} to={item.to} className="text-sm text-[#00AEEF] hover:underline">
                  {item.label}
                </Link>
              ))}
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
            <h2 className="mt-2 text-2xl font-extrabold text-[#0D1B2E] dark:text-white sm:text-3xl">{copy.continueTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#475569] dark:text-[#94A3B8]">{copy.continueText}</p>
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
              {copy.startCta}
            </Link>
          </div>
        </section>

        <section className="px-4 py-16 text-center sm:py-20">
          <A1Title
            text={copy.closeTitle}
            className="mx-auto max-w-3xl text-center text-2xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
          />
          <p className="landing-reveal mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]" data-reveal>
            {copy.closeLead}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {copy.closeItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#00AEEF]" />
                {item}
              </span>
            ))}
          </div>
          <Link
            to="/register"
            className="landing-reveal mt-8 inline-flex rounded-full bg-[#00AEEF] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
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
