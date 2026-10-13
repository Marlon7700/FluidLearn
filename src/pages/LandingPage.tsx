import { useEffect, useLayoutEffect, useMemo, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Check,
  CheckCircle2,
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
import { LandingFooter } from '../components/LandingFooter'
import { LandingLanguageSelect } from '../components/LandingLanguageSelect'
import { LandingMobileDrawer } from '../components/LandingMobileDrawer'
import { LandingNavDropdown } from '../components/LandingNavDropdown'
import { LandingChatbot } from '../components/LandingChatbot'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LetterReveal, letterRevealDurationMs } from '../components/LetterReveal'
import { useTabLoading } from '../components/RouteLoadingOverlay'
import { useTheme } from '../context/ThemeContext'
import { useLandingReveal } from '../hooks/useLandingReveal'
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
} from '../lib/landingMenuLinks'

const FONT_KEY = 'fluidlearn-font-scale'
/** Tamaño base un poco mayor en la landing (navbar no escala) */
const LANDING_TEXT_BASE = 1.12
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
  const { loading: tabLoading, startLoading: startTabLoading } = useTabLoading()
  const [fontHint, setFontHint] = useState('')
  const t = useMemo(() => getLandingDict(lang), [lang])
  const contentZoom = Math.round(fontScale * LANDING_TEXT_BASE * 100) / 100
  const fontPercent = Math.round(contentZoom * 100)

  useLandingReveal([lang, langLoading])

  const heroTitleStart = 180
  const heroTitleCharMs = 28
  const heroSubStart = letterRevealDurationMs(t.heroTitle, heroTitleStart, heroTitleCharMs) + 80
  const heroSubCharMs = 22
  const heroCtaDelay = letterRevealDurationMs(t.heroSub, heroSubStart, heroSubCharMs) + 40

  const startLinks = useMemo(() => zipMenuLinks(t.menuStartItems, START_HREFS), [t])
  const courseLinks = useMemo(() => zipMenuLinks(t.menuCourseItems, COURSE_HREFS), [t])
  const resourceLinks = useMemo(() => zipMenuLinks(t.menuResourcesItems, RESOURCE_HREFS), [t])

  const navLinkClass =
    'whitespace-nowrap px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:text-[#98E7FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98E7FF] xl:px-3 xl:text-[12px]'

  /**
   * Escala solo el contenido (no el navbar): si se cambia fontSize de <html>,
   * los rem de la barra se desordenan.
   */
  useLayoutEffect(() => {
    document.documentElement.style.fontSize = ''
    document.documentElement.style.setProperty('--landing-font-scale', String(contentZoom))
    try {
      localStorage.setItem(FONT_KEY, String(fontScale))
    } catch {
      /* ignore */
    }
    return () => {
      document.documentElement.style.removeProperty('--landing-font-scale')
    }
  }, [fontScale, contentZoom])

  useEffect(() => {
    if (!fontHint) return
    const tId = window.setTimeout(() => setFontHint(''), 1800)
    return () => window.clearTimeout(tId)
  }, [fontHint])

  useEffect(() => {
    document.documentElement.lang = htmlLangFor(lang)
    saveLandingLang(lang)
  }, [lang])

  /** Fondo de landing; el scroll vertical lo lleva solo html (evita línea doble) */
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('landing-page')
    document.body.style.overflow = ''
    document.body.style.backgroundColor = '#0D1B2E'
    const themeMeta = document.querySelector('meta[name="theme-color"]')
    const prevTheme = themeMeta?.getAttribute('content') ?? ''
    themeMeta?.setAttribute('content', '#0D1B2E')
    return () => {
      root.classList.remove('landing-page')
      document.body.style.backgroundColor = ''
      if (themeMeta) themeMeta.setAttribute('content', prevTheme || '#162A4E')
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
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
    <div className="landing-root flex min-h-svh flex-col bg-[#0D1B2E] text-[#0D1B2E] dark:text-[#F1F5F9]">
      <FluidLearnLoadingOverlay
        show={langLoading || tabLoading}
        message={langLoading ? t.loadingLang : t.loadingTab}
      />

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

      <header
        className="landing-navbar text-white"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)', top: 0, margin: 0 }}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between gap-3 pl-2 pr-4 sm:h-[76px] sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
          {/* Logo */}
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5" aria-label="FluidLearn">
            <img
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              className="landing-logo-spin h-10 w-10 shrink-0 rounded-xl object-cover sm:h-11 sm:w-11"
            />
            <span className="truncate text-[18px] font-extrabold tracking-tight sm:text-[20px]">
              Fluid<span className="text-[#98E7FF]">Learn</span>
            </span>
          </Link>

          {/* Centro: menús FluidLearn (misma info / desplegables) */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-visible lg:flex xl:gap-2"
            aria-label={t.navAria}
          >
            <a href="#inicio" className={navLinkClass}>
              {t.navHome}
            </a>
            <LandingNavDropdown label={t.menuStartTitle} items={startLinks} uppercase />
            <LandingNavDropdown label={t.menuCourseTitle} items={courseLinks} uppercase />
            <LandingNavDropdown label={t.menuResourcesTitle} items={resourceLinks} uppercase />
            <a href="#promociones" className={navLinkClass}>
              {t.navPromo}
            </a>
            <a href="#planes" className={navLinkClass}>
              {t.navPlans}
            </a>
            <a href="#contacto" className={navLinkClass}>
              {t.navContact}
            </a>
          </nav>

          {/* Derecha: Accede · Regístrate (píldora) · idioma · tema */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
            <Link
              to="/login"
              className="whitespace-nowrap text-sm font-semibold text-white transition hover:text-[#98E7FF]"
            >
              {t.login}
            </Link>
            <Link
              to="/register"
              className="whitespace-nowrap rounded-full bg-[#00AEEF] px-5 py-2.5 text-sm font-bold text-[#0D1B2E] shadow-sm transition hover:bg-[#33c0f5]"
            >
              {t.register}
            </Link>
            <LandingLanguageSelect
              value={lang}
              onChange={changeLanguage}
              disabled={langLoading}
              selectLabel={t.selectLang}
            />
            <button
              type="button"
              onClick={toggle}
              className="rounded-full p-2 hover:bg-white/10"
              aria-label={dark ? t.lightOn : t.darkOn}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Móvil / tablet */}
          <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 lg:hidden">
            <Link
              to="/login"
              className="hidden whitespace-nowrap px-1 text-sm font-semibold text-white sm:inline"
            >
              {t.login}
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-[#00AEEF] px-3.5 py-2 text-[11px] font-bold text-[#0D1B2E] sm:px-4 sm:text-xs"
            >
              {t.register}
            </Link>
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
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <LandingMobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} sectionMode="hash" />

      <main
        id="contenido"
        className={`flex-1 bg-[#F7F9FC] dark:bg-[#0A1220] ${langLoading || tabLoading ? 'pointer-events-none select-none opacity-60' : ''}`}
      >
        {/* Espacio fijo bajo el navbar (px → no se deforma con +A/−A) */}
        <div
          className="shrink-0 sm:hidden"
          style={{ height: 'calc(68px + env(safe-area-inset-top, 0px))' }}
          aria-hidden
        />
        <div
          className="hidden shrink-0 sm:block"
          style={{ height: 'calc(76px + env(safe-area-inset-top, 0px))' }}
          aria-hidden
        />
        <div
          className="landing-content-scale origin-top"
          style={{ zoom: contentZoom } as CSSProperties}
        >
        <section
          id="inicio"
          className="landing-hero relative isolate min-h-[100svh] overflow-hidden"
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
          <div className="relative mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-center px-4 py-14 pr-16 sm:px-6 sm:py-20 sm:pr-20 lg:px-10 lg:py-24 lg:pr-24 xl:pr-10">
            <div
              className="landing-reveal mb-6"
              data-reveal
              style={{ '--reveal-delay': '40ms' } as CSSProperties}
            >
              <img
                src="/logo.png"
                alt="FluidLearn"
                width={72}
                height={72}
                className="landing-logo-float h-[72px] w-[72px] rounded-[22%] object-cover shadow-xl"
              />
            </div>
            <LetterReveal
              key={`hero-title-${lang}`}
              as="h1"
              id="hero-title"
              text={t.heroTitle}
              className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
              startDelayMs={heroTitleStart}
              charMs={heroTitleCharMs}
            />
            <LetterReveal
              key={`hero-sub-${lang}`}
              as="p"
              text={t.heroSub}
              className="mt-4 max-w-lg text-base text-white/85 sm:text-lg"
              startDelayMs={heroSubStart}
              charMs={heroSubCharMs}
            />
            <div
              className="landing-reveal mt-8 flex flex-wrap gap-3"
              data-reveal
              style={{ '--reveal-delay': `${heroCtaDelay}ms` } as CSSProperties}
            >
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

        <section
          id="promociones"
          className="landing-section mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16"
          aria-labelledby="promo-title"
        >
          <div className="landing-reveal" data-reveal>
            <SectionTitle id="promo-title" icon={<Percent className="landing-icon-spin text-[#FF6B2C]" size={22} />}>
              {t.promoTitle}
            </SectionTitle>
          </div>
          <div className="mt-8 grid overflow-hidden rounded-2xl shadow-lg md:grid-cols-2">
            <div
              className="landing-reveal bg-[#1967D2] px-6 py-8 text-white sm:px-8"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as CSSProperties}
            >
              <GraduationCap className="mb-3" size={32} aria-hidden />
              <p className="text-lg font-bold sm:text-xl">{t.promoPremium}</p>
              <p className="mt-2 text-sm text-white/85">
                {t.promoBefore} <span className="line-through">$34.900</span>
              </p>
            </div>
            <div
              className="landing-reveal bg-[#FF6B2C] px-6 py-8 text-white sm:px-8"
              data-reveal
              style={{ '--reveal-delay': '180ms' } as CSSProperties}
            >
              <Building2 className="mb-3" size={32} aria-hidden />
              <p className="text-lg font-bold sm:text-xl">{t.promoDiscount}</p>
              <p className="mt-2 text-sm text-white/90">{t.promoLicenses}</p>
            </div>
          </div>
        </section>

        <section
          id="planes"
          className="landing-section bg-[#E8EEF8] py-14 dark:bg-[#121C2E] sm:py-16"
          aria-labelledby="planes-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="landing-reveal" data-reveal>
              <SectionTitle
                id="planes-title"
                icon={<CheckCircle2 className="landing-icon-pulse text-[#1967D2] dark:text-[#98E7FF]" size={22} />}
              >
                {t.plansTitle}
              </SectionTitle>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <PlanCard
                tone="free"
                title={t.planFree}
                price={t.planFreePrice}
                points={t.planFreePoints}
                cta={t.planStart}
                delayMs={60}
              />
              <PlanCard
                tone="premium"
                title={t.planPremium}
                price={t.planPremiumPrice}
                points={t.planPremiumPoints}
                cta={t.planStart}
                featured
                delayMs={160}
              />
              <PlanCard
                tone="inst"
                title={t.planInst}
                price={t.planInstPrice}
                points={t.planInstPoints}
                cta={t.planStart}
                delayMs={260}
              />
            </div>
          </div>
        </section>

        <section
          id="nosotros"
          className="landing-section mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16"
          aria-labelledby="about-title"
        >
          <h2
            id="about-title"
            className="landing-reveal text-center text-2xl font-extrabold text-[#0D1B2E] dark:text-white sm:text-3xl"
            data-reveal
          >
            {t.aboutTitle}
          </h2>
          <p
            className="landing-reveal mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-[#334155] dark:text-[#CBD5E1] sm:text-lg"
            data-reveal
            style={{ '--reveal-delay': '100ms' } as CSSProperties}
          >
            {t.aboutBody}
          </p>
          <div
            className="landing-reveal mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10"
            data-reveal
            style={{ '--reveal-delay': '200ms' } as CSSProperties}
          >
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
          className="landing-section relative overflow-hidden bg-white py-14 dark:bg-[#0F1728] sm:py-16"
          aria-labelledby="compare-title"
        >
          <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rotate-12 rounded-3xl bg-[#1967D2]/10" aria-hidden />
          <div className="pointer-events-none absolute -right-10 bottom-16 h-36 w-36 -rotate-12 rounded-3xl bg-[#FF6B2C]/15" aria-hidden />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <h2
              id="compare-title"
              className="landing-reveal mx-auto max-w-3xl text-center text-2xl font-extrabold leading-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
              data-reveal
            >
              {t.compareTitle}
            </h2>
            <p
              className="landing-reveal mx-auto mt-3 max-w-2xl text-center text-sm text-[#475569] dark:text-[#94A3B8] sm:text-base"
              data-reveal
              style={{ '--reveal-delay': '90ms' } as CSSProperties}
            >
              {t.compareSub}
            </p>

            <div
              className="landing-reveal mt-5 flex flex-wrap items-center justify-center gap-2 text-sm"
              data-reveal
              style={{ '--reveal-delay': '160ms' } as CSSProperties}
            >
              <span className="font-semibold">{t.excellent}</span>
              <span className="inline-flex text-[#22C55E]" aria-label="5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </span>
              <span className="text-[#64748B] dark:text-[#94A3B8]">{t.reviews}</span>
            </div>

            <div
              className="landing-reveal mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-2 rounded-full bg-[#F1F5F9] p-1.5 dark:bg-[#1A2438]"
              data-reveal
              style={{ '--reveal-delay': '220ms' } as CSSProperties}
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
                  onClick={() => {
                    if (opt.id === billing || langLoading || tabLoading) return
                    startTabLoading()
                    setBilling(opt.id)
                  }}
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

            <div
              className="landing-reveal-group mt-8 overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white shadow-sm dark:border-[#2A3650] dark:bg-[#1A2438]"
              data-reveal
            >
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <caption className="sr-only">{t.compareCaption}</caption>
                <thead>
                  <tr
                    className="border-b border-[#E2E8F0] dark:border-[#2A3650]"
                    data-reveal-child
                    style={{ '--reveal-delay': '40ms' } as CSSProperties}
                  >
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
                  {compareRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className="border-b border-[#F1F5F9] last:border-0 dark:border-[#243044]"
                      data-reveal-child
                      style={{ '--reveal-delay': `${90 + i * 70}ms` } as CSSProperties}
                    >
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

            <div
              className="landing-reveal mt-8 flex justify-center"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as CSSProperties}
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6B2C] px-10 py-3.5 text-base font-bold text-white shadow-lg transition hover:brightness-110"
              >
                {t.continueFree}
              </Link>
            </div>
          </div>
        </section>
        </div>
      </main>

      <div
        className="landing-content-scale origin-top"
        style={{ zoom: contentZoom } as CSSProperties}
      >
        <LandingFooter lang={lang} />
      </div>

      <LandingChatbot />
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
  delayMs = 0,
}: {
  title: string
  price: string
  points: string[]
  tone: 'free' | 'premium' | 'inst'
  featured?: boolean
  cta: string
  delayMs?: number
}) {
  const shell =
    tone === 'free'
      ? 'bg-white text-[#0D1B2E] dark:bg-[#1A2438] dark:text-[#E8EEF8]'
      : tone === 'premium'
        ? 'bg-[#FF6B2C] text-white'
        : 'bg-[#1967D2] text-white'
  return (
    <article
      className={`landing-reveal landing-reveal-group flex flex-col rounded-2xl p-6 shadow-md ${shell} ${featured ? 'md:-translate-y-2 md:shadow-xl ring-2 ring-[#FF6B2C]/40' : ''}`}
      data-reveal
      style={{ '--reveal-delay': `${delayMs}ms` } as CSSProperties}
    >
      <h3
        className="text-lg font-bold"
        data-reveal-child
        style={{ '--reveal-delay': '40ms' } as CSSProperties}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl"
        data-reveal-child
        style={{ '--reveal-delay': '100ms' } as CSSProperties}
      >
        {price}
      </p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-snug opacity-95">
        {points.map((p, i) => (
          <li
            key={p}
            className="flex gap-2"
            data-reveal-child
            style={{ '--reveal-delay': `${160 + i * 70}ms` } as CSSProperties}
          >
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 opacity-90" aria-hidden />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/register"
        data-reveal-child
        style={{ '--reveal-delay': `${200 + points.length * 70}ms` } as CSSProperties}
        className={`mt-6 inline-flex justify-center rounded-full px-4 py-2.5 text-sm font-bold transition ${
          tone === 'free' ? 'bg-[#0D1B2E] text-white hover:bg-[#162A4E]' : 'bg-white/95 text-[#0D1B2E] hover:bg-white'
        }`}
      >
        {cta}
      </Link>
    </article>
  )
}

