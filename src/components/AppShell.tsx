import { BarChart3, Bell, HelpCircle, Home, LogOut, Menu, UserRound } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLiveCatalog } from '../lib/courseCatalogStore'
import { studentCopy } from '../lib/studentUi'
import type { UserProfile } from '../types'
import { Logo } from './Logo'
import { NotificationsPanel } from './NotificationsPanel'
import { ProfileMenu } from './ProfileMenu'
import { ThemeToggle } from './ThemeToggle'

export function AppShell() {
  const { profile, signOut, addTeacherNotice } = useAuth()
  const catalog = useLiveCatalog()
  const t = studentCopy(profile?.appLanguage)
  const noticeItems = [...catalog.notices.map((n) => ({ title: n.title, body: n.body, type: n.type, at: n.at })), ...(profile?.feedItems ?? [])]
  const [drawer, setDrawer] = useState(false)
  const [notes, setNotes] = useState(false)
  const navigate = useNavigate()
  const loc = useLocation()
  const home = loc.pathname === '/home'
  const me = loc.pathname === '/me'
  const showNav = home || me

  return (
    <div className="relative min-h-svh bg-[#F3F6FB] dark:bg-[#0F1728]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-[#E4EBF5] bg-white/90 px-5 py-7 backdrop-blur transition-colors duration-500 dark:border-[#2A3650] dark:bg-[#1A2438]/95 lg:flex">
        <div className="flex items-center gap-3">
          <Logo size={42} />
          <p className="text-xl font-extrabold text-[#1A6FE8]">FluidLearn</p>
        </div>
        <nav className="mt-10 space-y-1.5">
          <SideLink selected={home} label={t.home} icon={<Home size={20} />} onClick={() => navigate('/home')} />
          <SideLink selected={me} label={t.me} icon={<UserRound size={20} />} onClick={() => navigate('/me')} />
          <SideLink selected={loc.pathname === '/progress'} label={t.learningProgress} icon={<BarChart3 size={20} />} onClick={() => navigate('/progress')} />
          <SideLink selected={loc.pathname === '/help'} label={t.helpCenter} icon={<HelpCircle size={20} />} onClick={() => navigate('/help')} />
        </nav>
        <div className="mt-auto">
          <button
            type="button"
            className="w-full rounded-2xl px-3 py-3 text-left text-sm font-semibold text-[#CC3B5A] hover:bg-rose-50 dark:hover:bg-rose-950/40"
            onClick={() => void signOut()}
          >
            {t.signOut}
          </button>
        </div>
      </aside>

      <div className={`${showNav ? 'pb-28 lg:pb-8' : 'pb-8'} lg:pl-[248px]`}>
        <Outlet context={{ openMenu: () => setDrawer(true), openNotes: () => setNotes(true) }} />
      </div>

      {showNav && (
        <nav
          className="fixed inset-x-0 bottom-[14px] z-30 flex justify-center lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex h-[70px] w-[200px] items-center justify-evenly rounded-[28px] bg-white/95 shadow-[0_12px_32px_rgba(22,42,78,0.14)] dark:bg-[#1A2438]">
            <NavItem selected={home} label={t.home} onClick={() => navigate('/home')} icon={<Home size={20} />} />
            <NavItem selected={me} label={t.me} onClick={() => navigate('/me')} icon={<UserRound size={20} />} />
          </div>
        </nav>
      )}

      {drawer && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/35" onClick={() => setDrawer(false)} />
          <div className="absolute left-0 top-0 h-full w-[78%] max-w-[300px] bg-white shadow-xl dark:bg-[#1A2438]">
            <div className="bg-[#E7EEF8] px-5 pb-6 pt-12 dark:bg-[#243044]">
              <Logo size={44} />
              <p className="mt-3 text-[26px] font-extrabold text-[#1A6FE8]">FluidLearn</p>
            </div>
            <button className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-[16px] font-medium text-[#1A6FE8]" onClick={() => { setDrawer(false); navigate('/me') }}>
              <UserRound size={20} /> {t.profile}
            </button>
            <button className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-[16px] font-medium text-[#1A6FE8]" onClick={() => { setDrawer(false); navigate('/progress') }}>
              <BarChart3 size={20} /> {t.learningProgress}
            </button>
            <button className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-[16px] font-medium text-[#1A6FE8]" onClick={() => { setDrawer(false); navigate('/help') }}>
              <HelpCircle size={20} /> {t.helpCenter}
            </button>
            <hr className="mx-4 my-2 border-slate-200 dark:border-[#2A3650]" />
            <button className="flex w-full items-start gap-3 px-5 py-3.5 text-left text-[#1A6FE8]" onClick={() => { setDrawer(false); void addTeacherNotice() }}>
              <Bell size={20} className="mt-0.5" />
              <span>
                <span className="block text-[16px] font-medium">{t.demoNotice}</span>
                <span className="block text-[12px] text-[#9AA6B8]">{t.demoHint}</span>
              </span>
            </button>
            <button className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-[16px] font-medium text-[#CC3B5A]" onClick={() => { setDrawer(false); void signOut() }}>
              <LogOut size={20} /> {t.signOut}
            </button>
          </div>
        </div>
      )}

      {notes && (
        <div className="fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/20" onClick={() => setNotes(false)} />
          <div className="absolute right-3 top-16 w-[min(calc(100vw-1.5rem),360px)] lg:right-8">
            <NotificationsPanel
              items={noticeItems}
              onClose={() => setNotes(false)}
              onSeeAll={() => {
                setNotes(false)
                navigate('/notifications')
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function SideLink({
  selected,
  label,
  icon,
  onClick,
}: {
  selected: boolean
  label: string
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-[15px] ${
        selected ? 'bg-[#1A6FE8] font-bold text-white' : 'font-semibold text-[#1A6FE8] hover:bg-[#EEF4FF] dark:text-[#8BB4FF] dark:hover:bg-[#243044]'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function NavItem({
  selected,
  label,
  icon,
  onClick,
}: {
  selected: boolean
  label: string
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center">
      <span className={`grid h-9 w-9 place-items-center rounded-full ${selected ? 'bg-[#1A6FE8] text-white' : 'text-[#8C99AD]'}`}>
        {icon}
      </span>
      <span className={`text-[12px] ${selected ? 'font-bold text-[#1A6FE8]' : 'font-medium text-[#1A6FE8]/70'}`}>{label}</span>
    </button>
  )
}

export function TopIcon({
  children,
  onClick,
  className = '',
  badge,
}: {
  children: ReactNode
  onClick: () => void
  className?: string
  badge?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative grid h-10 w-10 place-items-center rounded-full bg-white text-[#717F95] shadow-[0_4px_12px_rgba(22,42,78,0.08)] hover:bg-[#E8EEF9] dark:bg-[#243044] dark:text-[#E8EEF8] dark:hover:bg-[#2C3B55] ${className}`}
    >
      {children}
      {badge && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#E24B4B]" />}
    </button>
  )
}

export function HeaderBar({
  onMenu,
  onNotes,
  onAvatar: _onAvatar,
  profile: _profile,
  unread,
}: {
  onMenu: () => void
  onNotes: () => void
  onAvatar: () => void
  profile?: UserProfile | null
  unread?: boolean
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-2 lg:hidden">
        <Logo size={32} />
        <p className="text-[22px] font-bold text-[#1A6FE8] dark:text-[#8BB4FF]">FluidLearn</p>
      </div>
      <div className="hidden items-center gap-2.5 lg:flex">
        <Logo size={36} />
        <p className="text-[22px] font-bold text-[#1A6FE8] dark:text-[#8BB4FF]">FluidLearn</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <TopIcon onClick={onNotes} badge={unread}>
          <Bell size={20} />
        </TopIcon>
        <ProfileMenu />
        <TopIcon onClick={onMenu} className="lg:hidden">
          <Menu size={20} />
        </TopIcon>
      </div>
    </div>
  )
}
