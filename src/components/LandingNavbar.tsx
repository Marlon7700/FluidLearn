import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import {
  getLandingDict,
  type LandingLangCode,
} from '../lib/landingI18n'
import {
  COURSE_HREFS,
  RESOURCE_HREFS,
  START_HREFS,
  zipMenuLinks,
  type MenuLink,
} from '../lib/landingMenuLinks'
import { LandingLanguageSelect } from './LandingLanguageSelect'
import { LandingMobileDrawer } from './LandingMobileDrawer'
import { LandingNavDropdown } from './LandingNavDropdown'
import { useScrollChrome } from '../hooks/useScrollChrome'

type Props = {
  lang: LandingLangCode
  onLangChange: (code: LandingLangCode) => void
  langLoading?: boolean
  /** hash = anclas en landing; route = volver al inicio */
  sectionMode?: 'hash' | 'route'
}

export function LandingNavbar({ lang, onLangChange, langLoading = false, sectionMode = 'hash' }: Props) {
  const { dark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const { down, scrolled } = useScrollChrome()

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [menuOpen])
  const t = useMemo(() => getLandingDict(lang), [lang])
  const startLinks = useMemo(() => zipMenuLinks(t.menuStartItems, START_HREFS), [t])
  const courseLinks = useMemo(() => zipMenuLinks(t.menuCourseItems, COURSE_HREFS), [t])
  const resourceLinks = useMemo(() => zipMenuLinks(t.menuResourcesItems, RESOURCE_HREFS), [t])
  const planLinks = useMemo(
    () => [
      { label: t.navPromo, href: '#promociones' },
      { label: t.plansTitle, href: '#planes' },
      { label: t.planFree, href: '#planes' },
      { label: t.planPremium, href: '#planes' },
      { label: t.planInst, href: '#planes' },
    ],
    [t],
  )

  const routeHome = sectionMode === 'route'
  const mapped = (items: MenuLink[]) =>
    routeHome ? items.map((item) => (item.href.startsWith('#') ? { ...item, href: '/' } : item)) : items

  const navLinkClass =
    'whitespace-nowrap px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan xl:px-3 xl:text-[12px]'

  return (
    <>
      <header
        className={`landing-navbar text-white ${scrolled ? 'is-scrolled' : ''} ${down ? 'is-scroll-down' : ''}`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)', top: 0, margin: 0 }}
      >
        <div className="mx-auto flex h-17 w-full max-w-350 items-center justify-between gap-3 pl-2 pr-4 sm:h-19 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5" aria-label="FluidLearn">
            <img
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              className="landing-logo-spin h-10 w-10 shrink-0 rounded-xl object-cover sm:h-11 sm:w-11"
            />
            <span className="truncate text-[18px] font-extrabold tracking-tight sm:text-[20px]">
              Fluid<span className="text-cyan">Learn</span>
            </span>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-visible lg:flex xl:gap-2"
            aria-label={t.navAria}
          >
            {routeHome ? (
              <Link to="/" className={navLinkClass}>
                {t.navHome}
              </Link>
            ) : (
              <a href="#inicio" className={navLinkClass}>
                {t.navHome}
              </a>
            )}
            <LandingNavDropdown label={t.menuStartTitle} items={mapped(startLinks)} uppercase />
            <LandingNavDropdown label={t.menuCourseTitle} items={mapped(courseLinks)} uppercase />
            <LandingNavDropdown label={t.menuResourcesTitle} items={mapped(resourceLinks)} uppercase />
            <LandingNavDropdown label={t.navPlans} items={mapped(planLinks)} uppercase />
            {routeHome ? (
              <Link to="/" className={navLinkClass}>
                {t.navContact}
              </Link>
            ) : (
              <a href="#contacto" className={navLinkClass}>
                {t.navContact}
              </a>
            )}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
            <Link
              to="/login"
              className="whitespace-nowrap text-sm font-semibold text-white transition hover:text-cyan"
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
              onChange={onLangChange}
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

          <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 lg:hidden">
            <Link to="/login" className="hidden whitespace-nowrap px-1 text-sm font-semibold text-white sm:inline">
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

      <LandingMobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        lang={lang}
        sectionMode={sectionMode}
      />
    </>
  )
}
