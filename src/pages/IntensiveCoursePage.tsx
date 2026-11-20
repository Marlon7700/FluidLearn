import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import {
  BookOpen,
  Bot,
  Building2,
  CheckCircle2,
  Headphones,
  Mic,
  MonitorSmartphone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import { getIntensiveCopy, type IntensiveBlock } from '../lib/intensiveI18n'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'

const IMG = {
  teacher: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  t1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  t2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  t3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  t4: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  t5: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center text-[22px] font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-[28px]">
      {children}
    </h2>
  )
}

function TwoColBlocks({ items }: { items: IntensiveBlock[] }) {
  return (
    <div className="mt-10 grid gap-x-16 gap-y-9 text-left sm:grid-cols-2">
      {items.map((item) => (
        <article key={item.title}>
          <p className="text-[15px] font-extrabold leading-snug text-[#0D1B2E] dark:text-white">{item.title}</p>
          {item.body ? (
            <p className="mt-2 text-[15px] font-normal leading-[1.75] text-[#334155] dark:text-[#CBD5E1]">{item.body}</p>
          ) : null}
        </article>
      ))}
    </div>
  )
}

export function IntensiveCoursePage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getIntensiveCopy(lang), [lang])

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

      <section className="bg-[#0D1B2E] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <LetterReveal
              as="h1"
              text={copy.heroTitle}
              whenVisible
              charMs={16}
              className="max-w-xl text-[28px] font-extrabold uppercase leading-tight tracking-tight sm:text-[40px]"
            />
            <p className="landing-reveal mt-5 max-w-md text-[15px] leading-[1.75] text-white/70" data-reveal>
              {copy.heroLead}
            </p>
            <Link
              to="/register"
              className="landing-reveal mt-7 inline-flex rounded-full bg-[#00AEEF] px-7 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0D1B2E] transition hover:bg-[#33c0f5]"
              data-reveal
            >
              {copy.startCta}
            </Link>
          </div>
          <img
            src="/course-video-phones.png"
            alt={copy.devicesImageAlt}
            className="fl-float mx-auto h-auto w-full max-w-[560px] object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-3xl px-6 py-14 text-center sm:py-16">
          <p className="landing-reveal text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]" data-reveal>
            {copy.intro[0]}
          </p>
          <p
            className="landing-reveal mt-6 text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]"
            data-reveal
            style={{ '--reveal-delay': '80ms' } as CSSProperties}
          >
            {copy.intro[1]}
          </p>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading>{copy.whyTitle}</SectionHeading>
            <p className="landing-reveal mx-auto mt-6 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.whyLead}
            </p>
            <TwoColBlocks items={copy.whyItems} />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading>{copy.chooseTitle}</SectionHeading>
            <p className="landing-reveal mx-auto mt-6 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.chooseLead[0]}
            </p>
            <p
              className="landing-reveal mx-auto mt-4 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as CSSProperties}
            >
              {copy.chooseLead[1]}
            </p>
            <TwoColBlocks items={copy.chooseItems} />
          </div>
        </section>

        <section className="overflow-hidden bg-white pb-4 pt-6 dark:bg-[#0F1728]">
          <div className="relative mx-auto h-72 max-w-lg sm:h-80">
            <img
              src={IMG.teacher}
              alt=""
              className="fl-float absolute left-1/2 top-6 h-52 w-72 -translate-x-1/2 rounded-md object-cover shadow-xl sm:h-60 sm:w-80"
            />
            <img src={IMG.t1} alt="" className="absolute left-6 top-16 h-14 w-14 rounded-lg object-cover shadow-lg ring-2 ring-white sm:left-0" />
            <img src={IMG.t2} alt="" className="absolute right-8 top-10 h-12 w-12 rounded-lg object-cover shadow-lg ring-2 ring-white sm:right-2" />
            <img src={IMG.t3} alt="" className="absolute bottom-10 left-10 h-12 w-12 rounded-lg object-cover shadow-lg ring-2 ring-white" />
            <img src={IMG.t4} alt="" className="absolute right-4 top-36 h-14 w-14 rounded-lg object-cover shadow-lg ring-2 ring-white" />
            <img src={IMG.t5} alt="" className="absolute bottom-8 right-16 h-11 w-11 rounded-lg object-cover shadow-lg ring-2 ring-white" />
            <span className="absolute bottom-16 left-1/2 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-[#00AEEF] text-[#0D1B2E] shadow-lg">
              <Mic size={16} />
            </span>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading>{copy.tipsTitle}</SectionHeading>
            <p className="landing-reveal mx-auto mt-6 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.tipsLead}
            </p>
            <TwoColBlocks items={copy.tipsItems} />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading>{copy.intensiveQ}</SectionHeading>
            <p className="landing-reveal mx-auto mt-6 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.intensiveLead}
            </p>
            <TwoColBlocks items={copy.intensiveItems} />
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <SectionHeading>{copy.onlineQ}</SectionHeading>
            <p className="landing-reveal mx-auto mt-6 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.onlineLead[0]}
            </p>
            <p
              className="landing-reveal mx-auto mt-4 max-w-3xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as CSSProperties}
            >
              {copy.onlineLead[1]}
            </p>
            <img
              src="/course-video-phones.png"
              alt={copy.devicesImageAlt}
              className="fl-float-delay mx-auto mt-10 h-auto w-full max-w-xl object-contain"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHeading>{copy.differentTitle}</SectionHeading>
            <p className="landing-reveal mx-auto mt-6 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.differentLead}
            </p>
            <ul className="mx-auto mt-8 grid max-w-2xl gap-2 sm:grid-cols-2">
              {copy.differentItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeading>{copy.methodTitle}</SectionHeading>
            <p className="landing-reveal mx-auto mt-5 max-w-2xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.methodLead}
            </p>
            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              {copy.method.map((item, i) => {
                const Icon = [Headphones, BookOpen, Mic][i]
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
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                {copy.paceTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.paceLead}</p>
              <ul className="mt-5 space-y-2">
                {copy.paceItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                {copy.devicesTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.devicesLead}</p>
              <ul className="mt-5 space-y-2">
                {copy.devices.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                    <MonitorSmartphone size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-[#64748B] dark:text-[#94A3B8]">{copy.devicesNote}</p>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                <Mic className="text-[#00AEEF]" size={22} />
                {copy.teachersTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.teachersLead}</p>
              <ul className="mt-5 space-y-2">
                {copy.teachersItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                <Bot className="text-[#00AEEF]" size={22} />
                {copy.aiTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.aiLead}</p>
              <ul className="mt-5 space-y-2">
                {copy.aiItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                <Building2 className="text-[#00AEEF]" size={22} />
                {copy.instTitle}
              </h2>
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
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                {copy.accessTitle}
              </h2>
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

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <SectionHeading>{copy.reviewsTitle}</SectionHeading>
            <p className="landing-reveal mx-auto mt-6 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.reviewsLead}
            </p>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {copy.reviews.map((item) => (
                <blockquote key={item.name} className="text-[15px] leading-[1.8] text-[#475569] dark:text-[#94A3B8]">
                  <p>“{item.quote}”</p>
                  <footer className="mt-4 text-sm font-semibold text-[#0D1B2E] dark:text-white">
                    {item.name} — {item.place}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 text-center sm:py-20">
          <SectionHeading>{copy.closeTitle}</SectionHeading>
          <p className="landing-reveal mx-auto mt-5 max-w-2xl text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
            {copy.closeLead}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {copy.closeItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-[#334155] dark:text-[#CBD5E1]">
                <CheckCircle2 size={16} className="text-[#00AEEF]" />
                {item}
              </span>
            ))}
          </div>
          <Link
            to="/register"
            className="landing-reveal mt-8 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]"
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
