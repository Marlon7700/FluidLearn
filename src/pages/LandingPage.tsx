import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  MapPin,
  Menu,
  Moon,
  Percent,
  Star,
  Sun,
  X,
} from 'lucide-react'
import { LandingAccessibilityRail } from '../components/LandingAccessibilityRail'
import { LandingNavDropdown } from '../components/LandingNavDropdown'
import { LandingChatbot } from '../components/LandingChatbot'
import { useTheme } from '../context/ThemeContext'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import {
  COURSE_HREFS,
  RESOURCE_HREFS,
  START_HREFS,
  zipMenuLinks,
  type MenuLink,
} from '../lib/landingMenuLinks'

const FONT_KEY = 'fluidlearn-font-scale'
const HERO_PHOTO = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
const heroSrc = (w: number, h?: number) =>
  `${HERO_PHOTO}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=80`

function readScale(): number {
  try {
    const n = Number(localStorage.getItem(FONT_KEY))
    if (n >= 0.85 && n <= 1.4) return n
  } catch {
    /* ignore */
  }
  return 1
}

export function LandingPage() {
  const { dark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [fontScale, setFontScale] = useState(readScale)
  const [billing, setBilling] = useState<'3m' | '12m' | 'forever'>('12m')
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const [fontHint, setFontHint] = useState('')
  const [drawerAccordion, setDrawerAccordion] = useState<'start' | 'course' | 'resources' | null>('resources')
  const [footerStartOpen, setFooterStartOpen] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])
  const fontPercent = Math.round(fontScale * 100)

  const startLinks = useMemo(() => zipMenuLinks(t.menuStartItems, START_HREFS), [t])
  const courseLinks = useMemo(() => zipMenuLinks(t.menuCourseItems, COURSE_HREFS), [t])
  const resourceLinks = useMemo(() => zipMenuLinks(t.menuResourcesItems, RESOURCE_HREFS), [t])

  /** Enlace corto de escritorio: sin duplicar lo de los desplegables */
  const desktopNav = useMemo(
    () =>
      [
        { href: '#promociones', label: t.navPromo },
        { href: '#planes', label: t.navPlans },
        { href: '#contacto', label: t.navContact },
      ] as const,
    [t],
  )

  const navLinkClass =
    'whitespace-nowrap rounded-lg px-2.5 py-2 text-[15px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B2C]'

  function toggleDrawerAccordion(key: 'start' | 'course' | 'resources') {
    setDrawerAccordion((cur) => (cur === key ? null : key))
  }

  /** Tailwind usa rem → escala en <html> mientras estás en la landing. */
  useLayoutEffect(() => {
    const px = 16 * fontScale
    document.documentElement.style.fontSize = `${px}px`
    document.documentElement.style.setProperty('--landing-font-scale', String(fontScale))
    try {
      localStorage.setItem(FONT_KEY, String(fontScale))
    } catch {
      /* ignore */
    }
    return () => {
      document.documentElement.style.fontSize = ''
      document.documentElement.style.removeProperty('--landing-font-scale')
    }
  }, [fontScale])

  useEffect(() => {
    if (!fontHint) return
    const tId = window.setTimeout(() => setFontHint(''), 1800)
    return () => window.clearTimeout(tId)
  }, [fontHint])

  useEffect(() => {
    document.documentElement.lang = htmlLangFor(lang)
    saveLandingLang(lang)
  }, [lang])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  function bumpFont(delta: number) {
    setFontScale((s) => {
      const next = Math.min(1.4, Math.max(0.85, Math.round((s + delta) * 100) / 100))
      setFontHint(`${Math.round(next * 100)}%`)
      return next
    })
  }

  function changeLanguage(next: LandingLangCode) {
    if (next === lang || langLoading) return
    setLangLoading(true)
    setMenuOpen(false)
    window.setTimeout(() => {
      setLang(next)
      window.setTimeout(() => setLangLoading(false), 280)
    }, 650)
  }

  const compareRows: { feature: string; premium: CompareValue; inst: CompareValue; free: CompareValue }[] =
    t.compareRows.map((row, i) => {
      const last = i === t.compareRows.length - 1
      return {
        feature: row.feature,
        premium: last ? false : true,
        inst: true,
        free: i === 0 ? (row.freeLabel ?? true) : i === 1 ? true : false,
      }
    })

  return (
    <div className="landing-root min-h-svh overflow-x-hidden bg-[#F7F9FC] text-[#0D1B2E] dark:bg-[#0A1220] dark:text-[#F1F5F9]">
      {langLoading && (
        <div
          className="landing-lang-overlay fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-[#0D1B2E]/80 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="relative">
            <img
              src="/logo.png"
              alt=""
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-2xl object-cover shadow-xl"
            />
            <span
              className="landing-lang-spinner absolute -inset-2 rounded-3xl border-2 border-transparent border-t-[#98E7FF] border-r-[#FF6B2C]"
              aria-hidden
            />
          </div>
          <p className="text-sm font-semibold text-white">{t.loadingLang}</p>
        </div>
      )}

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#FF6B2C] focus:px-4 focus:py-2 focus:text-white"
      >
        {t.skip}
      </a>

      <LandingAccessibilityRail
        lang={lang}
        onLangChange={changeLanguage}
        langLoading={langLoading}
        selectLabel={t.selectLang}
        fontSizeLabel={t.fontSize}
        decreaseFont={t.decreaseFont}
        increaseFont={t.increaseFont}
        fontPercent={fontPercent}
        fontHint={fontHint}
        onDecreaseFont={() => bumpFont(-0.1)}
        onIncreaseFont={() => bumpFont(0.1)}
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0D1B2E] text-white shadow-md">
        <div
          className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 sm:gap-3 sm:px-5"
          style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
        >
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5" aria-label="FluidLearn">
            <img
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              className="landing-logo-spin h-10 w-10 shrink-0 rounded-2xl object-cover ring-2 ring-[#98E7FF]/40 sm:h-11 sm:w-11"
            />
            <span className="truncate text-base font-bold tracking-tight sm:text-lg xl:text-xl">FluidLearn</span>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 lg:flex xl:justify-center xl:gap-1"
            aria-label={t.navAria}
          >
            <a href="#inicio" className={navLinkClass}>
              {t.navHome}
            </a>
            <LandingNavDropdown label={t.menuStartTitle} items={startLinks} />
            <LandingNavDropdown label={t.menuCourseTitle} items={courseLinks} />
            <LandingNavDropdown label={t.menuResourcesTitle} items={resourceLinks} />
            {desktopNav.map((item) => (
              <a key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Escritorio: tema */}
          <div className="ml-auto hidden shrink-0 items-center lg:flex">
            <button
              type="button"
              onClick={toggle}
              className="rounded-full p-2 hover:bg-white/10"
              aria-label={dark ? t.lightOn : t.darkOn}
            >
              {dark ? <Sun size={18} className="animate-bounce-soft" /> : <Moon size={18} />}
            </button>
          </div>

          {/* Móvil: tema + hamburguesa arriba a la derecha; el panel abre a la izquierda */}
          <div className="ml-auto flex items-center gap-0.5 lg:hidden">
            <button
              type="button"
              onClick={toggle}
              className="rounded-full p-2 hover:bg-white/10"
              aria-label={dark ? t.lightOn : t.darkOn}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              className="shrink-0 rounded-lg p-2 hover:bg-white/10"
              aria-expanded={menuOpen}
              aria-controls="landing-side-drawer"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer izquierdo (solo móvil / tablet) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t.mobileNav}>
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label={t.closeMenu}
            onClick={() => setMenuOpen(false)}
          />
          <aside
            id="landing-side-drawer"
            className="landing-drawer-in absolute inset-y-0 left-0 flex w-[min(100vw-2.25rem,340px)] flex-col bg-white text-[#0D1B2E] shadow-2xl dark:bg-[#121C2E] dark:text-[#E8EEF8]"
            style={{
              paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
              paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
            }}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 pb-3 dark:border-[#2A3650]">
              <img src="/logo.png" alt="" width={40} height={40} className="rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-extrabold text-[#1967D2] dark:text-[#98E7FF]">FluidLearn</p>
                <p className="truncate text-xs text-slate-500">{t.uniShort}</p>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-[#243044]"
                aria-label={t.closeMenu}
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ul className="border-b border-slate-100 py-1 dark:border-[#2A3650]">
                {[
                  { href: '#inicio', label: t.navHome },
                  ...desktopNav,
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block px-5 py-3.5 text-[16px] font-medium text-[#1e293b] transition hover:bg-slate-50 dark:text-[#E8EEF8] dark:hover:bg-[#243044]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <MobileDrawerAccordion
                title={t.menuStartTitle}
                items={startLinks}
                open={drawerAccordion === 'start'}
                onToggle={() => toggleDrawerAccordion('start')}
                onPick={() => setMenuOpen(false)}
              />
              <MobileDrawerAccordion
                title={t.menuCourseTitle}
                items={courseLinks}
                open={drawerAccordion === 'course'}
                onToggle={() => toggleDrawerAccordion('course')}
                onPick={() => setMenuOpen(false)}
              />
              <MobileDrawerAccordion
                title={t.navResourcesFree}
                items={resourceLinks}
                open={drawerAccordion === 'resources'}
                onToggle={() => toggleDrawerAccordion('resources')}
                onPick={() => setMenuOpen(false)}
              />
            </div>

            <div className="flex gap-2 border-t border-slate-100 p-3 dark:border-[#2A3650]">
              <Link
                to="/login"
                className="flex-1 rounded-full border border-[#0D1B2E] py-2.5 text-center text-[15px] font-semibold dark:border-white/40"
                onClick={() => setMenuOpen(false)}
              >
                {t.login}
              </Link>
              <Link
                to="/register"
                className="flex-1 rounded-full bg-[#FF6B2C] py-2.5 text-center text-[15px] font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                {t.register}
              </Link>
            </div>
          </aside>
        </div>
      )}

      <main id="contenido" className={langLoading ? 'pointer-events-none select-none opacity-60' : ''}>
        <section
          id="inicio"
          className="landing-hero relative isolate min-h-[100dvh] overflow-hidden sm:min-h-[92dvh] lg:min-h-[min(90svh,820px)]"
          aria-labelledby="hero-title"
        >
          <picture className="pointer-events-none absolute inset-0">
            <source media="(max-width: 480px)" srcSet={heroSrc(640, 960)} />
            <source media="(max-width: 768px)" srcSet={heroSrc(960, 1280)} />
            <source media="(max-width: 1200px)" srcSet={heroSrc(1400)} />
            <img
              src={heroSrc(2000)}
              alt=""
              className="landing-hero-img"
              fetchPriority="high"
              decoding="async"
              sizes="100vw"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2E]/93 via-[#0D1B2E]/78 to-[#0D1B2E]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/50 via-transparent to-[#0D1B2E]/30" />
          <div className="relative mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-center px-4 py-16 pr-[4.75rem] sm:px-6 sm:py-20 sm:pr-24 lg:px-10 lg:py-28 lg:pr-10">
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="FluidLearn"
                width={72}
                height={72}
                className="landing-logo-float h-[72px] w-[72px] rounded-[22%] object-cover shadow-xl"
              />
            </div>
            <h1
              id="hero-title"
              className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              {t.heroTitle}
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/85 sm:text-lg">{t.heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#planes"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6B2C] px-7 py-3.5 text-base font-bold text-white shadow-lg transition hover:brightness-110"
              >
                {t.heroCtaPlans}
              </a>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                {t.heroCtaApp}
              </Link>
            </div>
          </div>
        </section>

        <section id="promociones" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="promo-title">
          <SectionTitle id="promo-title" icon={<Percent className="landing-icon-spin text-[#FF6B2C]" size={22} />}>
            {t.promoTitle}
          </SectionTitle>
          <div className="mt-8 grid overflow-hidden rounded-2xl shadow-lg md:grid-cols-2">
            <div className="bg-[#1967D2] px-6 py-8 text-white sm:px-8">
              <GraduationCap className="mb-3 animate-bounce-soft" size={32} aria-hidden />
              <p className="text-lg font-bold sm:text-xl">{t.promoPremium}</p>
              <p className="mt-2 text-sm text-white/85">
                {t.promoBefore} <span className="line-through">$34.900</span>
              </p>
            </div>
            <div className="bg-[#FF6B2C] px-6 py-8 text-white sm:px-8">
              <Building2 className="mb-3 animate-bounce-soft" size={32} aria-hidden />
              <p className="text-lg font-bold sm:text-xl">{t.promoDiscount}</p>
              <p className="mt-2 text-sm text-white/90">{t.promoLicenses}</p>
            </div>
          </div>
        </section>

        <section id="planes" className="bg-[#E8EEF8] py-14 dark:bg-[#121C2E] sm:py-16" aria-labelledby="planes-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle
              id="planes-title"
              icon={<CheckCircle2 className="landing-icon-pulse text-[#1967D2] dark:text-[#98E7FF]" size={22} />}
            >
              {t.plansTitle}
            </SectionTitle>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <PlanCard tone="free" title={t.planFree} price={t.planFreePrice} points={t.planFreePoints} cta={t.planStart} />
              <PlanCard
                tone="premium"
                title={t.planPremium}
                price={t.planPremiumPrice}
                points={t.planPremiumPoints}
                cta={t.planStart}
                featured
              />
              <PlanCard tone="inst" title={t.planInst} price={t.planInstPrice} points={t.planInstPoints} cta={t.planStart} />
            </div>
          </div>
        </section>

        <section id="nosotros" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="about-title">
          <h2
            id="about-title"
            className="text-center text-2xl font-extrabold text-[#0D1B2E] dark:text-white sm:text-3xl"
          >
            {t.aboutTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-[#334155] dark:text-[#CBD5E1] sm:text-lg">
            {t.aboutBody}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <MapPin className="text-red-500" size={20} aria-hidden />
              <span>{t.location}</span>
            </p>
            <p className="max-w-md text-center text-sm text-[#475569] dark:text-[#94A3B8]">
              <span className="font-semibold text-[#0D1B2E] dark:text-white">{t.founders}</span>{' '}
              Jean Freddy Acevedo, Marlon Enrique Pérez, Yhon Alejandro Villamizar
            </p>
          </div>
        </section>

        <section
          id="comparativa"
          className="relative overflow-hidden bg-white py-14 dark:bg-[#0F1728] sm:py-16"
          aria-labelledby="compare-title"
        >
          <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rotate-12 rounded-3xl bg-[#1967D2]/10" aria-hidden />
          <div className="pointer-events-none absolute -right-10 bottom-16 h-36 w-36 -rotate-12 rounded-3xl bg-[#FF6B2C]/15" aria-hidden />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="compare-title"
              className="mx-auto max-w-3xl text-center text-2xl font-extrabold leading-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
            >
              {t.compareTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#475569] dark:text-[#94A3B8] sm:text-base">
              {t.compareSub}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="font-semibold">{t.excellent}</span>
              <span className="inline-flex text-[#22C55E]" aria-label="5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </span>
              <span className="text-[#64748B] dark:text-[#94A3B8]">{t.reviews}</span>
            </div>

            <div
              className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-2 rounded-full bg-[#F1F5F9] p-1.5 dark:bg-[#1A2438]"
              role="tablist"
              aria-label={t.billingAria}
            >
              {(
                [
                  { id: '3m' as const, label: t.bill3 },
                  { id: '12m' as const, label: t.bill12, best: true },
                  { id: 'forever' as const, label: t.billForever },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={billing === opt.id}
                  onClick={() => setBilling(opt.id)}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${
                    billing === opt.id
                      ? 'bg-[#0D1B2E] text-white shadow dark:bg-[#FF6B2C]'
                      : 'text-[#475569] hover:text-[#0D1B2E] dark:text-[#94A3B8]'
                  }`}
                >
                  {'best' in opt && opt.best && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0D1B2E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF6B2C] dark:bg-white dark:text-[#FF6B2C]">
                      {t.bestOffer}
                    </span>
                  )}
                  {opt.label}
                </button>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-[#64748B] dark:text-[#94A3B8]">
              {billing === '3m' && t.billHint3}
              {billing === '12m' && t.billHint12}
              {billing === 'forever' && t.billHintForever}
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white shadow-sm dark:border-[#2A3650] dark:bg-[#1A2438]">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">{t.compareCaption}</caption>
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-[#2A3650]">
                    <th scope="col" className="px-4 py-4 font-semibold text-[#64748B]">
                      {t.features}
                    </th>
                    <th scope="col" className="px-3 py-4 text-center font-bold text-[#FF6B2C]">
                      {t.colPremium}
                      <span className="mt-0.5 block text-xs font-normal text-[#64748B]">
                        {billing === '3m' ? t.bill3 : billing === '12m' ? t.bill12 : t.billForever}
                      </span>
                    </th>
                    <th scope="col" className="px-3 py-4 text-center font-bold text-[#1967D2] dark:text-[#98E7FF]">
                      {t.colInst}
                      <span className="mt-0.5 block text-xs font-normal text-[#64748B]">{t.licenses}</span>
                    </th>
                    <th scope="col" className="px-3 py-4 text-center font-bold">
                      {t.colFree}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature} className="border-b border-[#F1F5F9] last:border-0 dark:border-[#243044]">
                      <th scope="row" className="px-4 py-3.5 text-left font-medium">
                        {row.feature}
                      </th>
                      <td className="px-3 py-3.5 text-center">
                        <CompareCell value={row.premium} included={t.included} missing={t.notIncluded} />
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <CompareCell value={row.inst} included={t.included} missing={t.notIncluded} />
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <CompareCell value={row.free} included={t.included} missing={t.notIncluded} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6B2C] px-10 py-3.5 text-base font-bold text-white shadow-lg transition hover:brightness-110"
              >
                {t.continueFree}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contacto"
        className="relative overflow-hidden bg-[#141820] text-white"
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_1.6fr]">
            {/* Brand + redes */}
            <div>
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="" width={48} height={48} className="rounded-full object-cover" />
                <div>
                  <p className="text-lg font-bold">FluidLearn</p>
                  <p className="text-[11px] uppercase tracking-wide text-white/60">{t.brandTagline}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5" aria-label="Social">
                <SocialHref label="Facebook" href="https://facebook.com">
                  <SocialSvg path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </SocialHref>
                <SocialHref label="Instagram" href="https://instagram.com">
                  <SocialSvg path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" circle />
                </SocialHref>
                <SocialHref label="X" href="https://x.com">
                  <SocialSvg path="M4 4l7.5 9L4 20h2.5l6-7.2L18.5 20H20l-7.8-9.4L20 4h-2.5l-5.7 6.8L5.5 4H4z" />
                </SocialHref>
                <SocialHref label="YouTube" href="https://youtube.com">
                  <SocialSvg path="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.7 4.8 12 4.8 12 4.8s-6.7 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.2 12a29 29 0 0 0 .3 4.8 2.8 2.8 0 0 0 2 2c1.8.4 8.5.4 8.5.4s6.7 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .3-4.8 29 29 0 0 0-.3-4.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
                </SocialHref>
                <SocialHref label="LinkedIn" href="https://linkedin.com">
                  <SocialSvg path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </SocialHref>
              </div>
              <a className="mt-4 inline-block text-sm text-white/70 underline-offset-2 hover:text-white hover:underline" href="mailto:info@fluidlearn.com">
                info@fluidlearn.com
              </a>
            </div>

            {/* Quiénes somos */}
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{t.footerWhoTitle}</p>
              <ul className="space-y-2.5 text-sm text-white/65">
                {t.footerWhoLinks.map((label) => (
                  <li key={label}>
                    <a href="#nosotros" className="transition hover:text-white">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Desplegable Para empezar */}
              <div className="relative mt-6">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-left text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
                  aria-expanded={footerStartOpen}
                  onClick={() => setFooterStartOpen((o) => !o)}
                >
                  {t.menuStartTitle}
                  <ChevronDown size={18} className={`shrink-0 transition ${footerStartOpen ? 'rotate-180' : ''}`} aria-hidden />
                </button>
                {footerStartOpen && (
                  <ul className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-white py-1 text-[#334155] shadow-xl">
                    {startLinks.map((item) => (
                      <li key={item.label}>
                        {item.href.startsWith('/') ? (
                          <Link
                            to={item.href}
                            className="block px-4 py-2.5 text-sm transition hover:bg-slate-50"
                            onClick={() => setFooterStartOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className="block px-4 py-2.5 text-sm transition hover:bg-slate-50"
                            onClick={() => setFooterStartOpen(false)}
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Recursos */}
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-white">{t.footerResourcesTitle}</p>
              <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-white/65 sm:grid-cols-2 md:grid-cols-3">
                {t.footerResourceLinks.map((label) => (
                  <a key={label} href="#planes" className="transition hover:text-white">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/50">{t.footerCopyright}</p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-wide text-white/80" aria-label="Legal">
              {t.footerLegal.map((label) => (
                <a key={label} href="#contacto" className="hover:text-white">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      <LandingChatbot />
    </div>
  )
}

/** Acordeón estilo ABA: barra gris + lista blanca sin iconos */
function MobileDrawerAccordion({
  title,
  items,
  open,
  onToggle,
  onPick,
}: {
  title: string
  items: MenuLink[]
  open: boolean
  onToggle: () => void
  onPick: () => void
}) {
  const itemClass =
    'block px-5 py-3.5 text-[16px] font-normal text-[#1e293b] transition hover:bg-slate-50 dark:text-[#E8EEF8] dark:hover:bg-[#1A2438]'

  return (
    <div className="border-b border-slate-100 dark:border-[#2A3650]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 bg-[#ECEFF3] px-5 py-3.5 text-left text-[16px] font-bold text-[#0f172a] transition hover:bg-[#e2e8f0] dark:bg-[#1A2438] dark:text-[#E8EEF8] dark:hover:bg-[#243044]"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{title}</span>
        {open ? (
          <span className="block h-0.5 w-4 shrink-0 rounded-full bg-[#98E7FF]" aria-hidden />
        ) : (
          <ChevronDown size={18} className="shrink-0 text-[#98E7FF]" aria-hidden />
        )}
      </button>
      {open && (
        <ul className="bg-white dark:bg-[#121C2E]">
          {items.map((item) => (
            <li key={item.label}>
              {item.href.startsWith('/') ? (
                <Link to={item.href} className={itemClass} onClick={onPick}>
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} className={itemClass} onClick={onPick}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

type CompareValue = true | false | string

function CompareCell({
  value,
  included,
  missing,
}: {
  value: CompareValue
  included: string
  missing: string
}) {
  if (value === true) {
    return (
      <span className="inline-flex text-[#E8A317]" aria-label={included}>
        <Check size={20} strokeWidth={3} aria-hidden />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex text-[#CBD5E1] dark:text-[#475569]" aria-label={missing}>
        <X size={18} strokeWidth={2.5} aria-hidden />
      </span>
    )
  }
  return <span className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">{value}</span>
}

function SectionTitle({
  id,
  children,
  icon,
}: {
  id: string
  children: React.ReactNode
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="hidden h-px w-12 bg-[#1967D2]/50 sm:block" aria-hidden />
      <h2
        id={id}
        className="inline-flex items-center gap-2 text-center text-2xl font-extrabold text-[#0D1B2E] dark:text-white sm:text-3xl"
      >
        {icon}
        {children}
      </h2>
      <span className="hidden h-px w-12 bg-[#1967D2]/50 sm:block" aria-hidden />
    </div>
  )
}

function PlanCard({
  title,
  price,
  points,
  tone,
  featured,
  cta,
}: {
  title: string
  price: string
  points: string[]
  tone: 'free' | 'premium' | 'inst'
  featured?: boolean
  cta: string
}) {
  const shell =
    tone === 'free'
      ? 'bg-white text-[#0D1B2E] dark:bg-[#1A2438] dark:text-[#E8EEF8]'
      : tone === 'premium'
        ? 'bg-[#FF6B2C] text-white'
        : 'bg-[#1967D2] text-white'
  return (
    <article
      className={`landing-card-rise flex flex-col rounded-2xl p-6 shadow-md ${shell} ${featured ? 'md:-translate-y-2 md:shadow-xl ring-2 ring-[#FF6B2C]/40' : ''}`}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{price}</p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-snug opacity-95">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 opacity-90" aria-hidden />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/register"
        className={`mt-6 inline-flex justify-center rounded-full px-4 py-2.5 text-sm font-bold transition ${
          tone === 'free' ? 'bg-[#0D1B2E] text-white hover:bg-[#162A4E]' : 'bg-white/95 text-[#0D1B2E] hover:bg-white'
        }`}
      >
        {cta}
      </Link>
    </article>
  )
}

function SocialHref({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#FF6B2C]"
    >
      {children}
    </a>
  )
}

function SocialSvg({ path, circle }: { path: string; circle?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {circle ? (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d={path} />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      ) : (
        <path d={path} />
      )}
    </svg>
  )
}
