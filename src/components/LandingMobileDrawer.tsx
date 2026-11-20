import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import {
  getLandingDict,
  readLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import {
  COURSE_HREFS,
  RESOURCE_HREFS,
  START_HREFS,
  zipMenuLinks,
  type MenuLink,
} from '../lib/landingMenuLinks'

type Props = {
  open: boolean
  onClose: () => void
  lang?: LandingLangCode
  /** En landing usa anclas #; en legales navega a / */
  sectionMode?: 'hash' | 'route'
  activeLegalSlug?: string
}

export function LandingMobileDrawer({
  open,
  onClose,
  lang: langProp,
  sectionMode = 'hash',
  activeLegalSlug,
}: Props) {
  const { dark } = useTheme()
  const lang = langProp ?? readLandingLang()
  const t = useMemo(() => getLandingDict(lang), [lang])
  const [accordion, setAccordion] = useState<'start' | 'course' | 'resources' | 'plans' | 'legal' | null>('start')

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
  const legalLinks = useMemo(
    () => t.footerLegal.map((item) => ({ label: item.label, href: item.to })),
    [t],
  )

  const topLinks = [
    { href: '#inicio', to: '/', label: t.navHome },
    { href: '/contacto', to: '/contacto', label: t.navContact },
  ]

  if (!open) return null

  function toggle(key: 'start' | 'course' | 'resources' | 'plans' | 'legal') {
    setAccordion((cur) => (cur === key ? null : key))
  }

  function sectionHref(item: MenuLink): string {
    if (item.href.startsWith('/')) return item.href
    return sectionMode === 'route' ? '/' : item.href
  }

  const shell = dark
    ? 'bg-[#0D1B2E] text-white'
    : 'bg-white text-[#0D1B2E]'
  const border = dark ? 'border-white/10' : 'border-slate-100'
  const muted = dark ? 'text-white/55' : 'text-slate-500'
  const link = dark
    ? 'text-white/90 hover:bg-white/10'
    : 'text-[#1e293b] hover:bg-slate-50'
  const closeBtn = dark
    ? 'text-white/70 hover:bg-white/10 hover:text-white'
    : 'text-slate-500 hover:bg-slate-100'
  const loginBtn = dark
    ? 'border-white/50 text-white hover:bg-white/10'
    : 'border-[#0D1B2E] text-[#0D1B2E] hover:bg-slate-50'
  const panelBg = dark ? 'bg-[#121C2E]' : 'bg-[#F8FAFC]'
  const accordionTitle = dark
    ? 'text-white hover:bg-white/5'
    : 'text-[#0f172a] hover:bg-slate-50'
  const itemCls = dark
    ? 'text-white/80 hover:bg-white/10 hover:text-white'
    : 'text-[#334155] hover:bg-slate-100'
  const activeItem = dark ? 'bg-white/15 text-white' : 'bg-[#E8F0FE] text-brand'
  const chevron = 'text-cyan'

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t.mobileNav}>
      <button
        type="button"
        className={`absolute inset-0 ${dark ? 'bg-black/50' : 'bg-black/40'}`}
        aria-label={t.closeMenu}
        onClick={onClose}
      />
      <aside
        id="landing-side-drawer"
        className={`landing-drawer-in absolute inset-y-0 left-0 flex w-[min(100vw-2.25rem,340px)] flex-col shadow-2xl ${shell}`}
        style={{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className={`flex items-center gap-3 border-b px-4 pb-3 ${border}`}>
          <img src="/logo.png" alt="" width={40} height={40} className="rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className={`truncate text-base font-extrabold ${dark ? 'text-white' : 'text-brand'}`}>
              FluidLearn
            </p>
            <p className={`truncate text-xs ${muted}`}>{t.uniShort}</p>
          </div>
          <button
            type="button"
            className={`rounded-lg p-2 ${closeBtn}`}
            aria-label={t.closeMenu}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className={`border-b py-1 ${border}`}>
            {topLinks.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('/') || sectionMode === 'route' ? (
                  <Link
                    to={item.href.startsWith('/') ? item.href : item.to}
                    className={`block px-5 py-3.5 text-[16px] font-medium transition ${link}`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`block px-5 py-3.5 text-[16px] font-medium transition ${link}`}
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <DrawerAccordion
            title={t.menuStartTitle}
            items={startLinks}
            open={accordion === 'start'}
            onToggle={() => toggle('start')}
            onPick={onClose}
            resolveHref={sectionHref}
            useRouter={sectionMode === 'route'}
            border={border}
            accordionTitle={accordionTitle}
            panelBg={panelBg}
            itemCls={itemCls}
            chevron={chevron}
          />
          <DrawerAccordion
            title={t.menuCourseTitle}
            items={courseLinks}
            open={accordion === 'course'}
            onToggle={() => toggle('course')}
            onPick={onClose}
            resolveHref={sectionHref}
            useRouter={sectionMode === 'route'}
            border={border}
            accordionTitle={accordionTitle}
            panelBg={panelBg}
            itemCls={itemCls}
            chevron={chevron}
          />
          <DrawerAccordion
            title={t.navResourcesFree}
            items={resourceLinks}
            open={accordion === 'resources'}
            onToggle={() => toggle('resources')}
            onPick={onClose}
            resolveHref={sectionHref}
            useRouter={sectionMode === 'route'}
            border={border}
            accordionTitle={accordionTitle}
            panelBg={panelBg}
            itemCls={itemCls}
            chevron={chevron}
          />
          <DrawerAccordion
            title={t.navPlans}
            items={planLinks}
            open={accordion === 'plans'}
            onToggle={() => toggle('plans')}
            onPick={onClose}
            resolveHref={sectionHref}
            useRouter={sectionMode === 'route'}
            border={border}
            accordionTitle={accordionTitle}
            panelBg={panelBg}
            itemCls={itemCls}
            chevron={chevron}
          />

          <DrawerAccordion
            title="Documentos legales"
            items={legalLinks}
            open={accordion === 'legal'}
            onToggle={() => toggle('legal')}
            onPick={onClose}
            resolveHref={(item) => item.href}
            useRouter
            border={border}
            accordionTitle={accordionTitle}
            panelBg={panelBg}
            itemCls={itemCls}
            chevron={chevron}
            activeHref={
              activeLegalSlug === 'privacidad'
                ? '/legal/privacidad'
                : activeLegalSlug
                  ? `/legal/${activeLegalSlug}`
                  : undefined
            }
            activeItem={activeItem}
            uppercaseItems
          />
        </div>

        <div className={`flex gap-2 border-t p-3 ${border}`}>
          <Link
            to="/login"
            className={`flex-1 rounded-full border py-2.5 text-center text-[15px] font-semibold transition ${loginBtn}`}
            onClick={onClose}
          >
            {t.login}
          </Link>
          <Link
            to="/register"
            className="flex-1 rounded-full bg-[#FF6B2C] py-2.5 text-center text-[15px] font-semibold text-white"
            onClick={onClose}
          >
            {t.register}
          </Link>
        </div>
      </aside>
    </div>
  )
}

function DrawerAccordion({
  title,
  items,
  open,
  onToggle,
  onPick,
  resolveHref,
  useRouter,
  activeHref,
  activeItem = '',
  border,
  accordionTitle,
  panelBg,
  itemCls,
  chevron,
  uppercaseItems,
}: {
  title: string
  items: MenuLink[]
  open: boolean
  onToggle: () => void
  onPick: () => void
  resolveHref: (item: MenuLink) => string
  useRouter: boolean
  activeHref?: string
  activeItem?: string
  border: string
  accordionTitle: string
  panelBg: string
  itemCls: string
  chevron: string
  uppercaseItems?: boolean
}) {
  return (
    <div className={`border-b ${border}`}>
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-[16px] font-semibold transition ${accordionTitle}`}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition ${chevron} ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <ul className={`pb-1 ${panelBg}`}>
          {items.map((item) => {
            const href = resolveHref(item)
            const active = activeHref === href || (activeHref && href.startsWith(activeHref))
            const className = `block px-5 py-3.5 text-[15px] font-medium transition ${itemCls}${
              uppercaseItems ? ' uppercase tracking-wide' : ''
            }${active ? ` ${activeItem}` : ''}`
            return (
              <li key={item.label}>
                {useRouter || href.startsWith('/') ? (
                  <Link to={href} className={className} onClick={onPick}>
                    {item.label}
                  </Link>
                ) : (
                  <a href={href} className={className} onClick={onPick}>
                    {item.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
