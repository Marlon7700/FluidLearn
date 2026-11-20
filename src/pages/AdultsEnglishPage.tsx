import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Bot, CheckCircle2, ChevronDown, GraduationCap, LayoutDashboard, Mic, MonitorSmartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { useLandingReveal } from '../hooks/useLandingReveal'
import { getAdultsCopy } from '../lib/adultsI18n'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'

const IMG = {
  hero: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
  teacher: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
  t1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  t2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  t3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  t4: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center text-[22px] font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-[28px]">
      {children}
    </h2>
  )
}

export function AdultsEnglishPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number>(2)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const copy = useMemo(() => getAdultsCopy(lang), [lang])

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

      <section className="relative overflow-hidden bg-[#0D1B2E] text-white">
        <img
          src={IMG.hero}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-45"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0D1B2E] via-[#0D1B2E]/88 to-[#0D1B2E]/25" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <LetterReveal
            as="h1"
            text={copy.heroTitle}
            whenVisible
            charMs={16}
            className="max-w-xl text-[28px] font-extrabold uppercase leading-tight tracking-tight sm:text-[40px]"
          />
          <p className="landing-reveal mt-4 text-[15px] text-white/75" data-reveal>
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
      </section>

      <main>
        <section className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          {copy.intro.map((p, i) => (
            <p
              key={p}
              className="landing-reveal mt-5 text-[15px] leading-[1.85] text-[#475569] first:mt-0 dark:text-[#94A3B8]"
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
            >
              {p}
            </p>
          ))}
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="text-[22px] font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-[26px]">
                {copy.methodTitle}
              </h2>
              {copy.methodLead.map((p) => (
                <p key={p} className="mt-4 text-[15px] leading-[1.85] text-[#475569] dark:text-[#94A3B8]">
                  {p}
                </p>
              ))}
            </div>
            <div className="relative mx-auto h-80 w-full max-w-sm">
              <img src={IMG.teacher} alt="" className="fl-float h-72 w-full rounded-3xl object-cover shadow-xl" />
              <img src={IMG.t1} alt="" className="absolute left-0 top-8 h-12 w-12 rounded-xl object-cover shadow-lg ring-2 ring-white" />
              <img src={IMG.t2} alt="" className="absolute right-2 top-4 h-12 w-12 rounded-xl object-cover shadow-lg ring-2 ring-white" />
              <img src={IMG.t3} alt="" className="absolute bottom-10 left-2 h-12 w-12 rounded-xl object-cover shadow-lg ring-2 ring-white" />
              <img src={IMG.t4} alt="" className="absolute bottom-8 right-0 h-14 w-14 rounded-xl object-cover shadow-lg ring-2 ring-white" />
              <span className="absolute right-6 top-6 rounded-full bg-[#00AEEF] px-2 py-0.5 text-[10px] font-extrabold text-[#0D1B2E]">
                LIVE
              </span>
            </div>
          </div>
        </section>

        <section className="bg-[#0D1B2E] px-4 py-12 text-center text-white sm:py-14">
          <h2 className="text-xl font-extrabold sm:text-2xl">{copy.midCtaTitle}</h2>
          <Link
            to="/register"
            className="mt-6 inline-flex rounded-full bg-[#00AEEF] px-7 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0D1B2E]"
          >
            {copy.startCta}
          </Link>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <Heading>{copy.tipsTitle}</Heading>
            <div className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
              {copy.tips.map((item, i) => (
                <article key={item.title} className={i === 4 ? 'sm:col-span-2 sm:max-w-xl' : ''}>
                  <h3 className="text-[17px] font-extrabold text-[#00AEEF]">
                    {i + 1}. {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Heading>{copy.faqTitle}</Heading>
            <div className="mt-8 space-y-3">
              {copy.faq.map((item, i) => {
                const open = openFaq === i
                return (
                  <article key={item.q} className="overflow-hidden rounded-lg border border-slate-200 bg-[#F4F8FB] dark:border-[#2A3650] dark:bg-[#1A2438]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      <span className="text-sm font-bold text-[#00AEEF]">{item.q}</span>
                      <ChevronDown className={`shrink-0 text-[#94A3B8] transition ${open ? 'rotate-180' : ''}`} size={18} />
                    </button>
                    {open && (
                      <p className="border-t border-slate-200 px-4 py-3 text-sm leading-relaxed text-[#475569] dark:border-[#2A3650] dark:text-[#94A3B8]">
                        {item.a}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <Heading>{copy.offerTitle}</Heading>
            <p className="landing-reveal mx-auto mt-6 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
              {copy.offerLead}
            </p>
            <div className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-2">
              {copy.offer.map((item) => (
                <article key={item.title}>
                  <h3 className="font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-[#475569] dark:text-[#94A3B8]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] pb-6 pt-4 dark:bg-[#121C2E]">
          <img
            src="/course-video-phones.png"
            alt={copy.devicesImageAlt}
            className="fl-float mx-auto h-auto w-full max-w-2xl object-contain px-4"
          />
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <Heading>{copy.whyTitle}</Heading>
            <p className="mt-6 text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">{copy.whyLead}</p>
            <ul className="mx-auto mt-8 grid max-w-2xl gap-2 sm:grid-cols-2">
              {copy.whyItems.map((item) => (
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
            <Heading>{copy.bestTitle}</Heading>
            <p className="mx-auto mt-5 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">
              {copy.bestLead}
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                { title: copy.aiTitle, lead: copy.aiLead, items: copy.aiItems, Icon: Bot },
                { title: copy.teachersTitle, lead: copy.teachersLead, items: copy.teachersItems, Icon: Mic },
                { title: copy.microTitle, lead: copy.microText, items: [] as string[], Icon: GraduationCap },
              ].map((block) => (
                <article key={block.title}>
                  <block.Icon className="text-[#00AEEF]" size={22} />
                  <h3 className="mt-3 font-extrabold text-[#0D1B2E] dark:text-white">{block.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B] dark:text-[#94A3B8]">{block.lead}</p>
                  {block.items.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-[#334155] dark:text-[#CBD5E1]">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#00AEEF]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <Heading>{copy.levelsTitle}</Heading>
            <p className="mx-auto mt-5 max-w-3xl text-center text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]">
              {copy.levelsLead}
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.levels.map((level) => (
                <article key={level.code} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]">
                  <p className="text-2xl font-black text-[#0D1B2E] dark:text-white">{level.code}</p>
                  <p className="mt-1 text-sm font-semibold text-[#00AEEF]">{level.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{level.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F8FB] py-16 dark:bg-[#121C2E] sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
                <LayoutDashboard className="text-[#00AEEF]" size={22} />
                {copy.dashTitle}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#64748B] dark:text-[#94A3B8]">{copy.dashLead}</p>
              <ul className="mt-5 space-y-2">
                {copy.dashItems.map((item) => (
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

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white">
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

        <section className="px-4 py-16 text-center sm:py-20">
          <Heading>{copy.closeTitle}</Heading>
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
            className="landing-reveal mt-8 inline-flex rounded-full bg-[#00AEEF] px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]"
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
