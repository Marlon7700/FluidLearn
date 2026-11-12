import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  BookOpen,
  CheckCircle2,
  Headphones,
  Keyboard,
  LayoutDashboard,
  Mic,
  MonitorSmartphone,
  PenLine,
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
import { getHowItWorksCopy } from '../lib/howItWorksI18n'
import { A1MotionCard, A1Title } from './LevelTestPage'

const IMG = {
  film: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80',
  party: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=600&q=80',
  medical: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
  numbers: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
  hotel: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  live: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
  t1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  t2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  t3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  t4: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  t5: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  t6: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
}

export function HowItWorksPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getHowItWorksCopy(lang), [lang])

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
      <div className="shrink-0 bg-[#0D1B2E] sm:hidden" style={{ height: 'calc(68px + env(safe-area-inset-top, 0px))' }} aria-hidden />
      <div className="hidden shrink-0 bg-[#0D1B2E] sm:block" style={{ height: 'calc(76px + env(safe-area-inset-top, 0px))' }} aria-hidden />

      <section className="bg-[#E8EEF8] py-16 text-center dark:bg-[#121C2E] sm:py-20">
        <LetterReveal
          as="h1"
          text={copy.heroTitle}
          whenVisible
          charMs={22}
          className="mx-auto max-w-3xl px-4 text-3xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-5xl"
        />
        <p className="landing-reveal mx-auto mt-4 max-w-md px-4 text-sm text-[#475569] dark:text-[#94A3B8]" data-reveal>
          {copy.heroSubtitle}
        </p>
        <Link
          to="/test"
          className="fl-cta-glow landing-reveal mt-6 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
          data-reveal
        >
          {copy.heroCta}
        </Link>
      </section>

      <main>
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="landing-reveal text-[15px] leading-[1.85] text-[#334155] dark:text-[#CBD5E1]" data-reveal>
            {copy.intro}
          </p>
        </section>

        <section className="bg-[#F7F9FC] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <A1Title text={copy.courseTitle} />
              <p className="landing-reveal mt-5 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]" data-reveal>
                {copy.courseText}
              </p>
            </div>
            <div className="mx-auto flex w-full max-w-xl items-center justify-center">
              <img
                src="/course-video-phones.png"
                alt={copy.courseImageAlt}
                className="fl-float-delay h-auto w-full max-w-[520px] object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <A1Title text={copy.classesTitle} />
              <p className="landing-reveal mt-5 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]" data-reveal>
                {copy.classesText}
              </p>
              <ul className="mt-5 space-y-2">
                {copy.classesItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#FF6B2C]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto h-80 w-full max-w-sm">
              <img
                src={IMG.live}
                alt=""
                className="fl-float h-72 w-full rounded-4xl object-cover shadow-xl"
              />
              {[
                { src: IMG.t1, className: 'left-0 top-8 h-14 w-14' },
                { src: IMG.t2, className: 'right-2 top-4 h-12 w-12' },
                { src: IMG.t4, className: 'bottom-10 left-2 h-12 w-12' },
                { src: IMG.t6, className: 'bottom-6 right-0 h-14 w-14' },
              ].map((p) => (
                <img
                  key={p.className}
                  src={p.src}
                  alt=""
                  className={`fl-continue-icon absolute rounded-2xl object-cover shadow-lg ring-2 ring-white ${p.className}`}
                />
              ))}
              <span className="absolute right-8 top-6 rounded-full bg-[#FF2D55] px-2 py-0.5 text-[10px] font-extrabold text-white">
                LIVE
              </span>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F9FC] py-14 text-center dark:bg-[#121C2E] sm:py-16">
          <A1Title
            text={copy.teacherTitle}
            className="text-center text-2xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
          />
          <p className="landing-reveal mx-auto mt-4 max-w-2xl px-4 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]" data-reveal>
            {copy.teacherText}
          </p>
          <div className="relative mx-auto mt-10 h-72 max-w-lg">
            <img src={IMG.t5} alt="" className="fl-float absolute left-[28%] top-2 h-36 w-36 rounded-3xl object-cover shadow-xl" />
            <img src={IMG.t1} alt="" className="fl-float-delay absolute left-4 top-16 h-28 w-28 rounded-3xl object-cover shadow-lg" />
            <img src={IMG.t4} alt="" className="fl-continue-icon absolute right-6 top-10 h-28 w-28 rounded-3xl object-cover shadow-lg" />
            <img src={IMG.t3} alt="" className="fl-float absolute bottom-4 left-[22%] h-24 w-24 rounded-3xl object-cover shadow-lg" />
            <img src={IMG.t2} alt="" className="fl-float-delay absolute bottom-2 right-[22%] h-24 w-24 rounded-3xl object-cover shadow-lg" />
            <span className="absolute right-[30%] top-24 rounded-full bg-[#FF2D55] px-2 py-0.5 text-[10px] font-extrabold text-white">
              LIVE
            </span>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <A1Title text={copy.aiTitle} />
          <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]" data-reveal>
            {copy.aiText}
          </p>
          <div className="landing-reveal-group mt-8 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {copy.aiItems.map((item, i) => (
              <A1MotionCard
                key={item}
                as="p"
                className="flex gap-3 rounded-xl bg-[#F7F9FC] p-4 text-sm dark:bg-[#1A2438]"
                style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
              >
                <CheckCircle2 className="shrink-0 text-[#00AEEF]" size={18} />
                {item}
              </A1MotionCard>
            ))}
          </div>
        </section>

        <section className="bg-[#E8EEF8] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text={copy.methodologyTitle} />
            <p className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]" data-reveal>
              {copy.methodologyText}
            </p>
            <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-4" data-reveal>
              {copy.methodology.map((item, i) => {
                const Icon = [Headphones, Mic, BookOpen, PenLine][i]
                return (
                  <A1MotionCard
                    key={item.title}
                    as="article"
                    className="rounded-2xl bg-white p-5 dark:bg-[#1A2438]"
                    style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                  >
                    <Icon className="text-[#00AEEF]" size={24} />
                    <h3 className="mt-3 font-extrabold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[#475569] dark:text-[#94A3B8]">{item.text}</p>
                  </A1MotionCard>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:grid lg:grid-cols-2 lg:gap-12">
          <div>
            <A1Title text={copy.timeTitle} />
            <p className="landing-reveal mt-4 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]" data-reveal>
              {copy.timeText}
            </p>
            <ul className="mt-5 space-y-2">
              {copy.timeItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <CheckCircle2 size={16} className="mt-0.5 text-[#FF6B2C]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 lg:mt-0">
            <A1Title text={copy.devicesTitle} />
            <div className="mt-6 flex flex-wrap gap-3">
              {copy.devices.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0D1B2E] px-4 py-2 text-sm font-bold text-white"
                >
                  <MonitorSmartphone size={16} className="text-cyan" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7F9FC] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text={copy.dashboardTitle} />
            <div className="landing-reveal-group mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {copy.dashboardItems.map((item, i) => (
                <A1MotionCard
                  key={item}
                  as="p"
                  className="flex gap-3 rounded-xl bg-white p-4 text-sm dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
                >
                  <LayoutDashboard className="shrink-0 text-[#00AEEF]" size={18} />
                  {item}
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <A1Title text={copy.institutionsTitle} />
          <ul className="landing-reveal-group mt-8 grid gap-3 sm:grid-cols-2" data-reveal>
            {copy.institutionsItems.map((item, i) => (
              <li
                key={item}
                data-reveal-child
                className="flex gap-3 text-sm text-[#334155] dark:text-[#CBD5E1]"
                style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
              >
                <CheckCircle2 className="shrink-0 text-[#FF6B2C]" size={18} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#0D1B2E] px-4 py-14 text-white sm:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-extrabold uppercase sm:text-3xl">{copy.accessibilityTitle}</h2>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {copy.accessibility.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                  {index === 3 && <Headphones size={14} />}
                  {index === 4 && <Keyboard size={14} />}
                  {item}
                </span>
              ))}
            </div>
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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/test"
              className="inline-flex rounded-full bg-[#00AEEF] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
            >
              {copy.startCta}
            </Link>
            <Link
              to="/register"
              className="inline-flex rounded-full border-2 border-[#0D1B2E] px-8 py-3.5 text-sm font-extrabold uppercase text-[#0D1B2E] dark:border-white dark:text-white"
            >
              {copy.accountCta}
            </Link>
          </div>
        </section>
      </main>
      <LandingFooter lang={lang} />
    </div>
  )
}
